import { View, Image, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import { useContext } from "react";

import { LibraryContext } from "@/context/LibraryContext";
import Feather from '@expo/vector-icons/Feather';
import type { Story } from "@/types/Story";
import { capitalize } from "@/utils/formatting";
import * as Storage from "@/app/story/storage";

import { showMessage, hideMessage } from "react-native-flash-message";

export default function Story({storyProps} : {storyProps: any}) {
  const { removeStory } = useContext(LibraryContext);
  const navigation: any = useNavigation();
  
    return (
        <View 
            style={styles.content}>
          <Image 
            style={styles.icon}
            source={require("@/assets/images/react-logo.png")}></Image>
            
          <View
            style={styles.textContainer}>
            <Text
              style={styles.title}>{storyProps.title}</Text>
            <Text
              style={styles.status}>Status: {storyProps.isFinished ? "Complete" : "Ongoing"}</Text>
            <Text
               style={styles.duration}>Duration: {capitalize(storyProps.length)}</Text>
          </View>

          <Feather.Button
            style={styles.buttonContainer}
            name="play-circle"
            size={41}
            backgroundColor={"#192637"} 
            iconStyle={styles.icons}
            borderRadius={100}
            onPress={() => {
              Storage.setCurrentStory(storyProps.id);
              navigation.navigate('Story Page', {storyProps: storyProps});
            }}>
          </Feather.Button>

          <Feather.Button
            style={styles.buttonContainer}
            name="trash-2"
            size={41}
            backgroundColor={"#192637"} 
            iconStyle={styles.icons}
            borderRadius={100}
            onPress={() => {
              showMessage({
                message: "Story Deleted",
                description: `${storyProps.title} has been successfully deleted.`,
                type: "warning",
                icon: "warning"
              });

              removeStory(storyProps.id)
            }
            }>
          </Feather.Button>
        
      </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
    },
    icon: {
      width: "22.5%",
      height: "100%",
    },
    textContainer: {
        width: "39%",
        flexDirection: "column",
        marginHorizontal: "5%"
    },
    title: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 24,
        fontWeight: "500"
    },
    status: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500"
    },
    duration: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500"
    },
    buttonContainer: {
      borderRadius: 50, 
      padding: 0,
    },
    icons: {
      marginLeft: 9, 
      marginVertical: 9
    }
});
