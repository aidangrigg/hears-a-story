import { Text, View, FlatList, ScrollView, Alert  } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import {NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse} from '@/components/ResponseBoxes';
import React, { useId } from 'react';

function backBtnEvent() {
    Alert.alert('You tapped the button!');
  }
function playBtnEvent() {
    Alert.alert('You tapped the button!');
  }

function submitResponseBtnEvent() {
    Alert.alert('You tapped the button!');
  }


let text1 = new NarratorResponse(useId(), "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text2 = new UserResponse(useId(), "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text3 = new NarratorResponse(useId(), "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text4 = new UserResponse(useId(), useId());
text2.mostCurrent = false;
const Responses: Response[] = [text1, text2, text3, text4];
text4.editing = false;


const settextBoxes = Responses.map(Response => {
  
  
  if(Response.type == "U"){
    return <UserTextbox 
    response={Response}
    submitResponseBtn={submitResponseBtnEvent}/>

  };
  return <NarratorTextbox 
  response={Response} 
  backBtn={backBtnEvent}
  playBtn={playBtnEvent}
  />;
    
});




let text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";
let storyName: string = "Story Name";
export default function Index() {
  return (
    <View style={styles.pageStyle}>
      <ScrollView style={styles.scrollStyle} >
      {settextBoxes}
      <View style={styles.hidden}>
        </View>
      </ScrollView>

    

   
    </View>
  );
};

const styles = StyleSheet.create({

  
  pageStyle:{
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(25, 38, 55, 1)',
    borderColor: 'white',
    borderStyle: "solid",
    borderTopWidth: 2,
  },
  scrollStyle:{
  },
  hidden:{
    height: 100,
  }
  
});





