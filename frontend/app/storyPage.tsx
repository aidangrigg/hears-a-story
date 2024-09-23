import { Text, View } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import NarratorTextbox from '@/components/NarratorTextbox';
import UserTextbox from '@/components/UserTextbox';
import InputBox from "@/components/InputBox";
import React from 'react';

class textBox{
  id: number;
  pov: boolean;
  text: string;

  constructor(id: number,  pov: boolean, text: string) {
    this.id = id;
    this.pov = pov;
    this.text = text;
  }
}

let text1 = new textBox(1, false, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text2 = new textBox(2, true, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text3 = new textBox(3, true, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");
let text4 = new textBox(4, false, "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText");

const textBoxes: textBox[] = [text1, text2, text3, text4];

const settextBoxes = textBoxes.map(textBox => {
  if(textBox.pov){
    return <UserTextbox text = {textBox.text}/>;
  };
  return <NarratorTextbox text = {textBox.text}/>;
    
});




let text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";
let storyName: string = "Story Name";
export default function Index() {
  return (
    <View style={styles.pageStyle}>
      {settextBoxes}
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
  
});





