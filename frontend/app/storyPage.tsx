import { Text, View } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';
import NarratorTextbox from '@/components/NarratorTextbox';
import UserTextbox from '@/components/UserTextbox';

interface textBox{
  id: number;
  pov: boolean;
  text: string;
}

let text1 = new textBox(id: 01, pov: false, text: "dwadawdawda");
const textBoxes: textBox[] = []


let text = "TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText";
let storyName: string = "Story Name";
export default function Index() {
  return (
    <View style={styles.pageStyle}>
      <NarratorTextbox text = {text}/>
      <UserTextbox text = {text}/>
    

   
    </View>
  );
};

const styles = StyleSheet.create({

  
  pageStyle:{
    flex: 1,
    backgroundColor: 'rgba(25, 38, 55, 1)',
    borderColor: 'white',
    borderStyle: "solid",
    borderTopWidth: 2,
  },
  
});





