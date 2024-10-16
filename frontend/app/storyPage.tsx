import { Text, View, FlatList, ScrollView, Alert } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse } from '@/components/ResponseBoxes';
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Header } from "@/components/header";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface MicIconProps {
    
    listening: boolean;
    saveBtnEvent: any;
}

export function MicIcon({ listening, saveBtnEvent}: MicIconProps) {
    if(listening){
        return (
            <Feather style={styles.micIcon} name="mic" size={30} color="white" backgroundColor="transparent" onPress={saveBtnEvent} />
            
        );

    }
    return (
        <Feather style={styles.micIcon} name="mic-off" size={30} color="white" backgroundColor="transparent" onPress={saveBtnEvent} />
    );
};



export default function StoryPage() {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const { storyProps } = route.params;


    const test = [new NarratorResponse(""), new UserResponse("")]
    const [responses, setResponses] = useState<Response[]>(test);
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

    const micBtnEvent = () => {
        if(listening){
            setlistening(false);

        } else{
            setlistening(true);
        }
        
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

    //PLace function to save responses to storage here
    const saveBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

    // const useSettingsBtnEvent = () => {
    //     //why doesnt this work?!?!
    //    // console.log(createResponse("", 0));

    //     //const response = createResponse("", 0);
    //     // const newResponses = [...responses, new NarratorResponse("")];
    //     setResponses([...responses, createResponse("", 0)]);


    // }

    const createResponse = (text: string, type: number) => {
        let response: Response;

        if (type == 0) {
            response = new NarratorResponse(text);
        } else {
            response = new UserResponse(text);
        }
        return response;


    }

    

    

    


    let storyName: string = storyProps?.title;
    return (

        <View style={styles.pageStyle}>
            <Header
                title={storyProps?.title}></Header>
            <Text>
            </Text>


            {/* <Feather style={styles.settingsIcon} name="settings" size={30} color="white" backgroundColor="transparent" onPress={() => useSettingsBtnEvent()} /> */}
            <MicIcon listening={listening} saveBtnEvent={() => saveBtnEvent()} />
            <Feather style={styles.micIcon} name="mic" size={30} color="white" backgroundColor="transparent" onPress={micBtnEvent} />
            <Feather style={styles.saveIcon} name="save" size={30} color="white" backgroundColor="transparent" onPress={saveBtnEvent} />

            <ScrollView style={styles.scrollStyle} >
                {responses.map(response => {
                    if (response.type == "U") {
                        return <UserTextbox
                            key={response.id}
                            response={response}
                            setInput={setInputText}
                            input={inputText}
                            submitInput={() => submitResponseBtnEvent(response.id)}
                            editInput={() => editInput(response.id)} />

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





