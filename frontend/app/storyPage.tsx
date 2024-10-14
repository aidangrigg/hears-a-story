import { Text, View, FlatList, ScrollView, Alert } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import { NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse } from '@/components/ResponseBoxes';
import { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';


export default function StoryPage({storyProps} : {storyProps: any}) {



    const [responses, setResponses] = useState<Response[]>([new NarratorResponse("")]);
    const [inputText, setInputText] = useState("");

    const backBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

    const playBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

    const submitResponseBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

    const saveBtnEvent = () => {
        Alert.alert('You tapped the button!');
    }

    const settingsBtnEvent = () => {
        setResponses([...responses, createResponse("", 0)]);
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

    // useEffect(() => {
    //     let eg =createResponse("",0);
    //     setResponses([...responses, eg]);
    // },[]);









    // let text1 = new NarratorResponse("TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
    // let text2 = new UserResponse("TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
    // let text3 = new NarratorResponse("TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
    // let text4 = new UserResponse("dddddd");
    // text2.mostCurrent = false;
    // const Responses: Response[] = [text1, text2, text3, text4];
    // text4.editing = false;
    // useEffect(() => {
    // addResponse();
    // }, []);







    let text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";
    let storyName: string = storyProps?.title;
    return (
        
        <View style={styles.pageStyle}>
            <Text>
            {storyName}
            </Text>
                
            
            <Feather style={styles.settingsIcon} name="settings" size={30} color="white" backgroundColor="transparent" onPress={settingsBtnEvent} />
            <Feather style={styles.saveIcon} name="save" size={30} color="white" backgroundColor="transparent" onPress={saveBtnEvent} />

            <ScrollView style={styles.scrollStyle} >
                {responses.map(response => {
                    if (response.type == "U") {
                        return <UserTextbox
                            response={response}
                            submitResponseBtn={submitResponseBtnEvent} />

                    };
                    return <NarratorTextbox
                        response={response}
                        backBtn={backBtnEvent}
                        playBtn={playBtnEvent}
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
        borderColor: 'white',
        borderStyle: "solid",
        borderTopWidth: 2,
    },
    scrollStyle: {
    },
    hidden: {
        height: 100,
    },
    settingsIcon: {
        position: 'absolute',
        top: 10,
        right: 10,

    },
    saveIcon: {
        position: 'absolute',
        top: 10,
        left: 10,

    },



});





