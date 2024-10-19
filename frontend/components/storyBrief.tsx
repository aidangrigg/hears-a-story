import { View, Image, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import { useContext } from "react";

import Feather from '@expo/vector-icons/Feather';

export default function Story({storyProps} : {storyProps: any}) {
  
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
              style={styles.title}>{storyProps?.title}</Text>
            <Text
              style={styles.status}>Status: {storyProps?.status}</Text>
            <Text
              style={styles.duration}>Duration: {storyProps?.duration}</Text>
          </View>

          <Feather.Button
            style={styles.buttonContainer}
            name="play-circle"
            size={41}
            backgroundColor={"#192637"} 
            iconStyle={styles.icons}
            borderRadius={100}
            onPress={() => navigation.navigate('Story Page', {storyProps: storyProps})}>
          </Feather.Button>

          <Feather.Button
            style={styles.buttonContainer}
            name="more-vertical"
            size={41}
            backgroundColor={"#192637"} 
            iconStyle={styles.icons}
            borderRadius={100}
            onPress={() => Alert.alert("Settings")}>
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
        width: "40%",
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