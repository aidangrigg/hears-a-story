import { StyleSheet, ViewComponent, TextInput} from 'react-native';
import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

type InputProps = {
  onChangeText: (text: string) => void;
  value: string
};

export default function InputBox(props: InputProps){
    return (

             <TextInput
            style={styles.inputBoxStyle}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder="Response..."
        />
       
    );
};

const styles = StyleSheet.create({


    inputBoxStyle:{
    position: 'absolute',
    bottom: 30,
    width: '95%',
        
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft:12,
    marginRight:12,
    
  
    backgroundColor: 'white',
  
   borderWidth:1,
   borderColor: 'black',
    borderRadius: 30,

    },
    icon:{
    position: 'absolute',
    right: 5,
    top: 5,
      
    },
    text:{
        paddingTop: 25,
        color: "white",
        
    },
    
  });  
