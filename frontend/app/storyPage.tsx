import { Text, View, FlatList, ScrollView, Alert } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse } from '@/components/ResponseBoxes';
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent,} from "expo-speech-recognition";
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Header } from "@/components/header";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface MicIconProps {
    listening: boolean;
    micBtnEvent: any;
}

export function MicIcon({ listening, micBtnEvent}: MicIconProps) {
    if(listening){
        return (
            <Feather style={styles.micIcon} name="mic" size={30} color="white" backgroundColor="transparent" onPress={micBtnEvent} />
            
        );

    }
    return (
        <Feather style={styles.micIcon} name="mic-off" size={30} color="white" backgroundColor="transparent" onPress={micBtnEvent} />
    );
};



export default function StoryPage() {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const { storyProps } = route.params;

    const [responses, setResponses] = useState<Response[]>([new NarratorResponse(""), new UserResponse("")]);
    const [recognizing, setRecognizing] = useState(false);
    const [transcript, setTranscript] = useState("");
    let [timeoutID] = useState(Number)    

    const test = [new NarratorResponse(""), new UserResponse("")]
    const [inputText, setInputText] = useState("");
    const [listening, setlistening] = useState(true);

    //Place function to play from beggining text to speech here
    const playfromStartBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

 
    //Place function to play/pause text to speech here
    const playBtnEvent = (id: string) => {
        
        const updatedResponses = responses.map(response => {
            if (response.id === id) {
                const newResponse = response;
                console.log("Old Response = " + JSON.stringify(newResponse));
                if(newResponse.playing == false){
                    newResponse.playing = true;
                } else {
                    newResponse.playing = false;
                }
                console.log("New Response = " + JSON.stringify(newResponse));
                return newResponse;
            } else {
                return response;
            }
        });
        setResponses(updatedResponses);
    }

    // const micBtnEvent = () => {
    //     if(listening){
    //         setlistening(false);

    //     } else{
    //         setlistening(true);
    //     }
        
    // }

    const record = () => {
        handleSTT();


    }

    const submitResponseBtnEvent = (id: string) => {
        console.log("Old Response = " + JSON.stringify(responses[responses.length - 1]));
        const updatedResponses = responses.map(response => {
            if (response.id === id) {
                const newResponse = response;
                newResponse.text = inputText;
                newResponse.editing = false;
                return newResponse;
            } else {
                return response;
            }
        });
        setResponses(updatedResponses);
        console.log("New Response = " + JSON.stringify(responses[responses.length - 1]));
    }

    const editInput = (id: string) => {
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

    const stopRecording = () => {
        ExpoSpeechRecognitionModule.stop()
    }

    useSpeechRecognitionEvent("start", () => {
        setRecognizing(true);
        // console.log("STT Recording Started")
    })
    useSpeechRecognitionEvent("end", () => {
        setRecognizing(false);
        // console.log("STT END")
        createResponse(transcript, 1)
        // setTimeout(handleSTT, 2000)
    })
    useSpeechRecognitionEvent("result", (event: any) => {
        // console.log("STT RESULT")
        window.clearTimeout(timeoutID)
        if (event.isFinal){
          setTranscript(transcript => {
            console.log(transcript + event.results[0]?.transcript)
            return transcript + event.results[0]?.transcript;
          });
          timeoutID = (window.setTimeout(stopRecording, 4000))
          console.log(timeoutID)
        }
        // console.log(event);
    });
    useSpeechRecognitionEvent("error", (event: any) => {
        console.log("error code:", event.error, "error messsage:", event.message);
    });

    const handleSTT = async () => {
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



    let storyName: string = storyProps?.title;
    return (

        <View style={styles.pageStyle}>
            <Header
                title={storyProps?.title}></Header>
            <Text>
            </Text>


            {/* <Feather style={styles.settingsIcon} name="settings" size={30} color="white" backgroundColor="transparent" onPress={() => useSettingsBtnEvent()} /> */}
            {/* <MicIcon listening={listening} micBtnEvent={() => micBtnEvent()} /> */}
            {/* <Feather style={styles.micIcon} name="mic" size={30} color="white" backgroundColor="transparent" onPress={micBtnEvent} /> */}
            <Feather style={styles.saveIcon} name="arrow-left-circle" size={30} color="white" backgroundColor="transparent" onPress={backBtnEvent} />

            <ScrollView style={styles.scrollStyle} >
                {responses.map(response => {
                    if (response.type == "U") {
                        return <UserTextbox
                            key={response.id}
                            response={response}
                            setInput={setInputText}
                            input={inputText}
                            submitInput={() => submitResponseBtnEvent(response.id)}
                            editInput={() => editInput(response.id)}
                            micBtnEvent={() => record()}  />

                    };
                    return <NarratorTextbox
                    key={response.id}
                        response={response}
                        backBtn={playfromStartBtnEvent}
                        playBtn={() => playBtnEvent(response.id)}
                    />;

                })}

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
    saveIcon: {
        position: 'absolute',
        top: 180,
        left: 10,
    },
    micIcon: {
        position: 'absolute',
        top: 180,
        left: 190,
    },




});





