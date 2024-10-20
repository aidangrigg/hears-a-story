import { StyleSheet, TextInput  } from 'react-native';
import { Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Feather } from '@expo/vector-icons';

export class Response {
    id: string;
    text: string;
    type: string;
    mostCurrent: boolean;
    editing: boolean;
    playing: boolean;

    constructor() {
        this.id = uuidv4();
        this.text = "NULL";
        this.type = "NULL";
        this.mostCurrent = false;
        this.editing = false;
        this.playing = false;
    }
};

export class NarratorResponse extends Response {
    constructor(text: string) {
        super();
        this.text = text;
        this.type = 'N';
        this.mostCurrent = false;
        this.playing = false;
        this.editing = false;
    }

}

export class UserResponse extends Response {
    constructor(text: string, mostCurrent = true) {
        super();
        this.text = text;
        this.type = 'U';
        this.mostCurrent = mostCurrent;
        this.editing = true;
        this.playing = false;
    }
}

type buttonEvents = (params: any) => any;

interface NarratorTextboxProps {
    response: NarratorResponse;
    backBtn: buttonEvents;
    playBtn: any;
}



export function NarratorTextbox({ response, backBtn, playBtn }: NarratorTextboxProps) {
    if(response.playing == true){
        return (
            <View style={styles.narratorBox}>
                <FontAwesome6 style={styles.narratorIcon} name="book-open-reader" size={30} color="rgba(0, 224, 255, 1)" />
                <Text style={styles.narratorText}>{response.text}</Text>
                <View style={styles.NarratorMenuView}>
                    <Entypo.Button style={styles.backIcon} name="controller-jump-to-start" size={20} color="rgba(0, 224, 255, 1)" backgroundColor="transparent" onPress={backBtn} />
                    <Entypo.Button style={styles.playIcon} id="playButton" name="controller-paus" size={20} color="rgba(0, 224, 255, 1)" backgroundColor="transparent" onPress={playBtn} />
                </View>
            </View>
        );

    }
    return (
        <View style={styles.narratorBox}>
            <FontAwesome6 style={styles.narratorIcon} name="book-open-reader" size={30} color="rgba(0, 224, 255, 1)" />
            <Text style={styles.narratorText}>{response.text}</Text>
            <View style={styles.NarratorMenuView}>
                <Entypo.Button style={styles.backIcon} name="controller-jump-to-start" size={20} color="rgba(0, 224, 255, 1)" backgroundColor="transparent" onPress={backBtn} />
                <Entypo.Button style={styles.playIcon} id="playButton" name="controller-play" size={20} color="rgba(0, 224, 255, 1)" backgroundColor="transparent" onPress={playBtn} />
            </View>
        </View>
    );
};

interface UserTextboxProps {
    response: UserResponse;
    submitInput: any;
    input: string;
    setInput: any;
    editInput: any;
    toggleRecording: () => void;
}

export function UserTextbox({ response, submitInput, input, setInput, editInput, toggleRecording }: UserTextboxProps) {
    if (response.mostCurrent == true && response.editing == true) {
        return (
            <View style={styles.userBox}>
                <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
                <TextInput
                    style={styles.inputBoxStyle}
                    onChangeText={text => setInput(text)}
                    value={input}
                    placeholder="   Type response here..."
                    multiline
                />

                <View style={{ flexDirection: 'row-reverse', gap: 5 }}>
                    <Feather style={styles.micIcon} name={"mic"} size={24} color="white" backgroundColor="transparent" onPress={toggleRecording} />
                    <FontAwesome.Button style={styles.submitIcon} name="pencil" size={24} color="white" backgroundColor='transparent' onPress={submitInput}> Submit </FontAwesome.Button>
                </View>
            </View>

        )
    } else if (response.mostCurrent == true) {
        return (
            <View style={styles.userBox}>
                <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
                <Text style={styles.userText}>{response.text}</Text>
                <AntDesign.Button style={styles.RemoveIcon} name="edit" size={24} color="white" backgroundColor='transparent' onPress={editInput}> Edit Response </AntDesign.Button>
            </View>
        )
    }
    return (
        <View style={styles.userBox}>
            <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
            <Text style={styles.userText}>{response.text}</Text>




        </View>
    );
};

const styles = StyleSheet.create({


    narratorBox: {
        marginTop: 10,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 10,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'rgba(0, 224, 255, 1)',
        borderStyle: "solid",
        borderWidth: 1,
    },
    narratorIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    narratorText: {
        paddingTop: 40,
        color: "rgba(0, 224, 255, 1)",
        fontSize: 16,
        paddingBottom: 10,

    },
    NarratorMenuView: {
        flexDirection: 'row',

    },
    playIcon: {
        borderWidth: 1,
        justifyContent: 'center',
        width: '90%',
        borderRadius: 15,
        borderColor: "rgba(0, 224, 255, 1)",

    },

    backIcon: {
        borderWidth: 1,
        justifyContent: 'center',
        width: '90%',
        borderRadius: 15,
        borderColor: "rgba(0, 224, 255, 1)",

    },
    userBox: {
        marginTop: 10,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 10,
        borderRadius: 15,
        borderTopRightRadius: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
    },
    userIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    userText: {
        paddingTop: 45,
        color: "white",
        fontSize: 16,
        paddingBottom: 10,

    },
    RemoveIcon: {
        borderRadius: 15,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: 'center',



    },
    inputBoxStyle: {


        marginTop: 45,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,

    },
    submitIcon: {
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: "white",
    },
    micIcon: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: "white",
    },
    text: {

        paddingTop: 25,
        color: "white",

    },


});  
