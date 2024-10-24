import { View, ScrollView, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse } from '@/components/ResponseBoxes';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent, } from "expo-speech-recognition";
import { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Header } from "@/components/header";
import * as Storage from "./story/storage";
import { StoryGenerator } from "./story/storyManager";
import { StoryResponseType, Emotions } from "@/types/Story";
import { TTS } from "./story/tts";
import { BarChart } from "react-native-gifted-charts";

export default function StoryPage() {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const { storyProps } = route.params;
    const tts = new TTS();

    const [responses, setResponses] = useState<Response[]>([]);
    const [recognizing, setRecognizing] = useState(false);

    const [inputText, setInputText] = useState("");
    const [storyGen, setStoryGen] = useState<StoryGenerator | null>(null);

    const [voiceInputIsOver, setVoiceInputIsOver] = useState(false);
    const [currentResponseId, setCurrentResponseId] = useState("");

    let timeoutId = 0;
    const [isFinished, setIsFinished] = useState(false);
    const [chartData, setChartData] = useState<Array<any>>([]);
    const [transcript, setTranscript] = useState("")
    // Place function to play from beggining text to speech here
    const playfromStartBtnEvent = async (response: Response) => {
        if (await tts.isSpeaking()) {
            await tts.stop();
        }
        await tts.speak(response.text, {});
    }

    useEffect(() => {
        const prepStorage = async () => {
            let story = await Storage.getCurrentStory();

            if (story === null) {
                console.error("Current story has not been set.");
                return;
            }

            setIsFinished(story.isFinished)

            let emotionCount: { [key: string] : number; } = {};
            for (const emote in story.emotionStream){
                emotionCount[story.emotionStream[emote]] = emotionCount[story.emotionStream[emote]] ? emotionCount[story.emotionStream[emote]] + 1 : 1;
            }

            // console.log("Emotion Count 1: " + JSON.stringify(emotionCount))

            // Sort by largest and reduce to top 5
            emotionCount = Object.entries(emotionCount).sort(([, a], [, b]) => b - a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                  

            // console.log("Emotion Count 2: " + JSON.stringify(emotionCount))

            for (const [key, value] of Object.entries(emotionCount).slice(0,5)) {
                setChartData(chartData => {                    
                    return [...chartData, {"label": key, "value": value, "labelTextStyle": {fontSize: 11, fontWeight:"bold"}}]
                })
            }

            // console.log("chartData: " + chartData)

            let storyGen = new StoryGenerator(story);

            let loadedResponses = story.responses.flatMap((response) => {
                console.log(response)
                switch (response.type) {
                    case StoryResponseType.NARRATOR:
                        return new NarratorResponse(response.text);
                    case StoryResponseType.USER:
                        return new UserResponse(response.text, false);
                }
            });

            if (story.isFinished) {
                setResponses(loadedResponses);
            } else {
                const userResponse = new UserResponse("");
                setCurrentResponseId(userResponse.id);
                setResponses([...loadedResponses, userResponse]);
            }

            setStoryGen(storyGen);
        };

        prepStorage().catch(console.error);
    }, []);

    useEffect(() => {
        if (voiceInputIsOver) {
            console.log("voice over, input: ", inputText);
            setVoiceInputIsOver(false);
            submitResponseBtnEvent(currentResponseId);
        }
    }, [voiceInputIsOver]);

    const toggleRecording = () => {
        if (recognizing) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const stopRecording = () => {
        ExpoSpeechRecognitionModule.stop()
    };

    useSpeechRecognitionEvent("start", () => {
        setRecognizing(true);
    });

    useSpeechRecognitionEvent("end", () => {
        setRecognizing(false);
        setVoiceInputIsOver(true);
    });

    useSpeechRecognitionEvent("result", (event: any) => {
        window.clearTimeout(timeoutId);
        setTranscript(transcript => {
            // console.log(transcript + event.results[0]?.transcript)
            setInputText(transcript + event.results[0]?.transcript);
            return transcript;
        });
        if (event.isFinal) {
            setTranscript(transcript => {
                // console.log(transcript + event.results[0]?.transcript)
                setInputText(transcript + event.results[0]?.transcript);
                return transcript + event.results[0]?.transcript;
            });
            timeoutId = window.setTimeout(stopRecording, 3000);
        }
    });

    useSpeechRecognitionEvent("error", (event: any) => {
        console.log("error code:", event.error, "error messsage:", event.message);
    });

    const startRecording = async () => {
        const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!result.granted) {
            console.warn("Permissions not granted", result);
            return;
        }
        // Start speech recognition
        ExpoSpeechRecognitionModule.start({
            lang: "en-US",
            interimResults: true,
            maxAlternatives: 1,
            continuous: true,
            requiresOnDeviceRecognition: false,
            addsPunctuation: true,
            contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
        });
    };

    // Place function to play/pause text to speech here
    const playBtnEvent = async (response: Response) => {
        if (await tts.isSpeaking()) {
            await tts.stop();
        }
        await tts.speak(response.text, {});
    }

    const submitResponseBtnEvent = async (id: string) => {
        const updatedResponses = responses.map(response => {
            if (response.id === id) {
                response.text = inputText;
                response.editing = false;
            }
            return response;
        });

        let narratorResponse = await storyGen?.continueStory({
            sentiment: "",
            userResponse: inputText
        });

        if (narratorResponse === undefined) {
            console.error("Failed to generate next story part.");
            return;
        }

        const userResponse = new UserResponse("");
        setCurrentResponseId(userResponse.id);
        setInputText("");
        setResponses([...updatedResponses, new NarratorResponse(narratorResponse), userResponse]);

        if (await tts.isSpeaking()) {
            await tts.stop();
        }
        
        await tts.speak(narratorResponse, {});
    }

    

    const submitTranscript = (text: string) => {
            const updatedResponses = responses.map(response => {
                if (response === responses[responses.length-1]) {
                    const newResponse = response;
                    console.log(newResponse);
                    newResponse.text = text;
                    newResponse.editing = false;
                    console.log(newResponse);
                    return newResponse;
                } else {
                    return response;
                }
            });
            setResponses(updatedResponses);
        
        
    }


    const editInputBtnEvent = (id: string) => {
        const updatedResponses = responses.map(response => {
            if (response.id === id) {
                const newResponse = response;
                newResponse.editing = true;
                return newResponse;
            } else {
                return response;
            }
        });
        setResponses(updatedResponses);
    }
    
    const backBtnEvent = () => {
        navigation.goBack();
    }



    const createResponse = (text: string, type: number) => {
        let response: Response;

        if (type == 0) {
            response = new NarratorResponse(text);
        } else {
            response = new UserResponse(text);
        }
        return response;
    }

    return (
        <View style={styles.pageStyle}>
            <Header
                title={storyProps?.title}
                showBackButton={true}></Header>
            <View>
                <Feather style={styles.backIcon} name="arrow-left-circle" size={30} color="white" backgroundColor="transparent" onPress={backBtnEvent} />

            </View>

            <ScrollView style={styles.scrollStyle} >
                {responses.map(response => {
                    if (response.type == "U") {
                        return (
                            <UserTextbox
                                key={response.id}
                                response={response}
                                setInput={setInputText}
                                input={inputText}
                                submitInput={() => submitResponseBtnEvent(response.id)}
                                toggleRecording={toggleRecording}
                            />
                        );
                    }
                    return (
                        <NarratorTextbox
                            key={response.id}
                            response={response}
                            backBtn={() => playfromStartBtnEvent(response)}
                            playBtn={() => playBtnEvent(response)}
                        />
                    );

                })}

                {/* 
                    Utilize storyProps.isfinished to check whether chart should appear !! :) 
                    Utilize story.responses???? to get emotion count maybe??
                    Probably ask a front end person how to make my chart not fly off the screen!
                */}
                
                {   isFinished &&
                    <View style={styles.graph}>
                    <BarChart
                        data={chartData} frontColor="green" initialSpacing={5} spacing={39} maxValue={chartData[0]["value"]} stepValue={1} noOfSections={chartData[0]["value"]}
                    />
                    </View>
                }   

                <View style={styles.hidden}>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({


    pageStyle: {
        flex: 1,
        paddingTop: 40,
        position: 'relative',
        backgroundColor: 'rgba(25, 38, 55, 1)',

    },
    scrollStyle: {
        marginTop: 40,
    },
    hidden: {
        height: 100,
    },
    settingsIcon: {
        position: 'absolute',
        top: 180,
        right: 10,

    },
    backIcon: {
        marginTop: 10,
        marginLeft: 10,
    },
    micIcon: {
        position: 'absolute',
        top: 180,
        left: 190,
    },
    graph: {
        width: "94%",
        backgroundColor:"lightgray",
        margin: 12,
        paddingRight: 12,
        overflow: "hidden",
    },
});
