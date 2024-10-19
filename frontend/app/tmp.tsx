
import React, { useState, useContext } from "react";
import { Text, View, Image, Button, ScrollView, Alert, Pressable, StatusBar, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';


import { LibraryContext } from "@/context/LibraryContext";
import { StoryGenerator } from "./story/storyManager";

import { Header } from "@/components/header";
import Story from "@/components/storyBrief";
import * as Storage from "./story/storage";

// import Styles from "./Styles";

export default function Index() {
  const navigation: any = useNavigation();
  const { library } = useContext(LibraryContext)
  console.log(library)

  // async function test() {
  //   const id = await Storage.createStory(Storage.StoryGenre.CRIME, Storage.StoryLength.SHORT);
  //   const story = await Storage.getCurrentStory();

  //   if (story === null) {
  //     return;
  //   }
    
  //   const gen = new StoryGenerator(story);
  //   let intro = await gen.initialize()

  //   console.log(intro);

  //   const response = "Create a distraction";
  //   const sentiment = "happy";
  //   let genResponse = await gen.continueStory({sentiment, userResponse: response});

  //   console.log(genResponse);
  // }
    
  return (
     <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",
      }}
    >
      <Header title="Library"></Header>
      
      <ScrollView 
        style={{ width: "100%"}}>
        {library.map((story) => <Story storyProps={story} key={story?.key}></Story>)}
      </ScrollView>
      
      <View>
        <Feather.Button
          style={{margin: 30, borderColor: "white", borderWidth: 5, borderRadius: 50, width: "80%", fontFamily: "Roboto"}}
          name="plus-circle"
          size={50}
          backgroundColor={"#192637"}
          borderRadius={100}
          onPress={() => {
            navigation.navigate("Create Story")
          }}> New Story
        </Feather.Button>
      </View>
    </View> 
    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: "100%",
    backgroundColor: "red"
  },
});

