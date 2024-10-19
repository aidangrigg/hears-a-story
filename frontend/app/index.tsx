import { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { StoryGenerator } from "./story/storyManager";
import * as Storage from "./story/storage";

export default function StoryGenTest() {
    let [storyGen, setStoryGen] = useState<StoryGenerator | null>(null);
    let [loading, setLoading] = useState(true);
    let [responses, setResponses] = useState<string[]>([]);
    let [inputText, setInputText] = useState("");

    function narratorResponse(s: string) {
        return `Narrator: ${s}`;
    }

    function userResponse(s: string) {
        return `User: ${s}`;
    }

    function onSubmit() {
        let res = inputText;
        setResponses([...responses, userResponse(res)]);

        if (storyGen === null) {
            return;
        }

        storyGen.continueStory({ sentiment: "happy", userResponse: inputText })
            .then((narResponse) => {
                if (narResponse === undefined) {
                    return;
                }

                setResponses([...responses, userResponse(res), narratorResponse(narResponse)]);
            });
    }


    useEffect(() => {
        const prepStorage = async () => {
            let story = await Storage.getCurrentStory();

            if (story === null) {
                console.error("something bad happened");
                return;
            }

            let storyGen = new StoryGenerator(story);
            let intro = await storyGen.initialize();

            if (intro) {
                setResponses([narratorResponse(intro)]);
            } else {
                let something = story.responses.map((res) => {
                    if (res.type === Storage.StoryResponseType.NARRATOR) {
                        return narratorResponse(res.text);
                    } else if (res.type === Storage.StoryResponseType.USER) {
                        return userResponse(res.text);
                    }
                    console.error("something terrible happened");
                    return "something terrible happened";
                })

                setResponses(something);
            }

            setLoading(false);
            setStoryGen(storyGen);
        };

        prepStorage().catch(console.error);
    }, []);

    let responseTextBoxes = loading ?
        <Text>Loading</Text> :
        <FlatList
            data={responses}
            renderItem={({ item }) => <Text style={{ color: "white" }}>{item}</Text>}
        />;

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#192637",
            }}
        >
            {responseTextBoxes}
            <TextInput
                onChangeText={setInputText}
                value={inputText}
            />
            <Button
                title="Submit"
                onPress={onSubmit}
            />
        </View>
    );
}
