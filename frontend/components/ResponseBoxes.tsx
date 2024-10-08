import { Alert, StyleSheet, TextInput, ViewComponent, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity  } from 'react-native';
import { Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


export class Response{
    id: string;
    text: string;
    type: string;
    mostCurrent: boolean;
    editing: boolean;
   
     constructor( id: string){
        this.id = id;
        this.text = "NULL";
        this.type = "NULL";
        this.mostCurrent = false;
        this.editing = false;

    }
};

export class NarratorResponse extends Response{
    constructor(id: string, text: string){
        super(id);
        this.text = text;
        this.type = 'N';
        this.mostCurrent = false;
        this.editing = false;
    }

}

export class UserResponse extends Response{
    constructor(id: string, text: string){
        super(id);
        this.text = text;
        this.type = 'U';
        this.mostCurrent = true;
        this.editing = true;
    }

}

function submitUserResponse() {
    Alert.alert('You tapped the button!');
  }
  


type buttonEvents = (params: any) => any;


interface NarratorTextboxProps{
    response: NarratorResponse;
    backBtn:buttonEvents;
    playBtn:buttonEvents;

}

export function NarratorTextbox({response, backBtn, playBtn}:NarratorTextboxProps){
    
    return (
        <View style={styles.narratorBox}>
            <FontAwesome6 style={styles.narratorIcon} name="book-open-reader" size={30} color="rgba(0, 224, 255, 1)" />
            <Text style={styles.narratorText}>{response.text}</Text>
            <View style={styles.NarratorMenuView}>
            <Entypo.Button style={styles.backIcon} name="controller-jump-to-start" size={20} color="rgba(0, 224, 255, 1)"  backgroundColor="transparent" onPress={backBtn} />
            <Entypo.Button style={styles.playIcon} name="controller-play" size={20} color="rgba(0, 224, 255, 1)" backgroundColor="transparent" onPress={playBtn} />
            
             
                
               
           

            </View>

            

            
            
        </View>
    );
};

interface UserTextboxProps{
    response: UserResponse;
    submitResponseBtn:buttonEvents;


}

export function UserTextbox({response, submitResponseBtn} : UserTextboxProps){
    if(response.mostCurrent == true && response.editing == true){
    //    const [input, onInput] = React.useState('');
        return(
            <View style={styles.userBox}>
                <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
                <TextInput
                    style={styles.inputBoxStyle}
                  //  onChangeText={text => onInput(text)}
                    value={response.text}
                    placeholder="   Type response here..."
                    multiline
                    />

                <FontAwesome.Button style={styles.submitIcon} name="pencil" size={24} color="white"  backgroundColor ='transparent' onPress={submitResponseBtn}> Submit </FontAwesome.Button>
            </View>
            
        )
    } else if(response.mostCurrent == true){
        return(
            <View style={styles.userBox}>
            <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
            <Text style={styles.userText}>{response.text}</Text>
            <AntDesign.Button style={styles.RemoveIcon} name="edit"  size={24} color="white"  backgroundColor ='transparent'> Edit Response </AntDesign.Button>

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

  
    narratorBox:{
        marginTop: 10,
        marginLeft:12,
        marginRight:12,
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
    narratorIcon:{
        position: 'absolute',
        top: 10,
        left: 10,
    },
    narratorText:{
        paddingTop: 40,
        color: "rgba(0, 224, 255, 1)",
        fontSize:16,
        paddingBottom: 10,

    },
    NarratorMenuView:{
        flexDirection: 'row', 
     
    },
    playIcon:{
        borderWidth: 1,
        justifyContent: 'center',
        width:'90%',
        borderRadius: 15,
        borderColor: "rgba(0, 224, 255, 1)",
         
    },
    
    backIcon:{
        borderWidth: 1,
        justifyContent: 'center',
        width:'90%',
        borderRadius: 15,
        borderColor: "rgba(0, 224, 255, 1)",
    
    },
    userBox:{
        marginTop: 10,
        marginLeft:12,
        marginRight:12,
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
    userIcon:{
        position: 'absolute',
        right: 10,
        top: 10,
    },
    userText:{
        paddingTop: 45,
        color: "white",
        fontSize:16,
        paddingBottom: 10,
    
    },
    RemoveIcon:{
        borderRadius: 15,
        borderColor: "white",
        borderWidth: 1,
        justifyContent: 'center',
       
        

    },
    inputBoxStyle:{
    
   
        marginTop:45,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'black',
        borderRadius: 15,
    
    },
    submitIcon:{
        borderWidth: 1,
        justifyContent: 'center',
        
        borderRadius: 15,
        borderColor: "white",
        
    },
    text:{
        
        paddingTop: 25,
        color: "white",
            
    },
    
    
  });  