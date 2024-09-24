import { Text, View, FlatList, ScrollView, Button } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import { NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse } from '@/components/TextBoxes';

import { PrototypeStoryGenerator } from "./story/prototypeStoryManager"
import InputBox from "@/components/InputBox";
import React, { useEffect, useState } from 'react';
import { TTS } from "./story/tts";

enum ResponseKind {
    NARRATOR,
    USER
};

let textNum = 1;

let storyName: string = "Story Name";

export default function Index() {
    const story = new PrototypeStoryGenerator("adventure");
    const tts = new TTS();

    const [responses, setResponses] = useState<Response[]>([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
      story.generateNewStory().then((text) => {
            if (!text) {
                console.error("Error generating new story");
                return;
            }

            setResponses([...responses, createResponse(text, ResponseKind.NARRATOR)]);
        });
    }, [])

    const createResponse = (text: string, kind: ResponseKind) => {
        let response: Response;

        switch (kind) {
            case ResponseKind.NARRATOR:
                response = new NarratorResponse(textNum++, text);
                tts.speak(text, {});
                break;
            case ResponseKind.USER:
                response = new UserResponse(textNum++, text);
                break;
        }

        return response;
    };

    const onSubmit = () => {
        let user = createResponse(inputText, ResponseKind.USER);

        story.continueStory({
            user_decision: inputText,
            emotional_state: "idk"
        }).then((response) => {
            if (!response) {
                console.error("response is undefined");
                return;
            }

            let narrator = createResponse(response, ResponseKind.NARRATOR);

            setResponses([...responses, user, narrator]);
        });
    };

    return (
        <View style={styles.pageStyle}>
            <ScrollView style={styles.scrollStyle}>
                {responses.map((response) => {
                    if (response.type == "U") {
                        return <UserTextbox {...response} />;
                    };
                    return <NarratorTextbox {...response} />;
                })}
                <View style={styles.hidden}>
                </View>
            </ScrollView>
            <InputBox
                onChangeText={setInputText}
                value={inputText}
            />
            <Button
                title="Submit"
                onPress={onSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'rgba(25, 38, 55, 1)',
        borderColor: 'white',
        borderStyle: "solid",
        borderTopWidth: 2,
    },
    scrollStyle: {
    },
    hidden: {
        height: 100,
    }

});
