import { Text, View, FlatList, ScrollView  } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import {NarratorTextbox, UserTextbox, Response, UserResponse, NarratorResponse} from '@/components/TextBoxes';
import InputBox from "@/components/InputBox";
import React from 'react';




let text1 = new NarratorResponse(1, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text2 = new UserResponse(2, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text3 = new NarratorResponse(3, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text4 = new UserResponse(4, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text5 = new NarratorResponse(5, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");

const Responses: Response[] = [text1, text2, text3, text4, text5];

const settextBoxes = Responses.map(Response => {
  if(Response.type == "U"){
    return <UserTextbox {...Response}/>;
  };
  return <NarratorTextbox {...Response}/>;
    
});




let text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";
let storyName: string = "Story Name";
export default function Index() {
  return (
    <View style={styles.pageStyle}>
      <ScrollView style={styles.scrollStyle}>
      {settextBoxes}
      <View style={styles.hidden}>
        </View>
      </ScrollView>
    <InputBox />
    

   
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





