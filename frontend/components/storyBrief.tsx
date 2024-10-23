import { View, Image, Text, Pressable, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import { useContext, useState } from "react";

import { LibraryContext } from "@/context/LibraryContext";
import Feather from '@expo/vector-icons/Feather';
import type { Story } from "@/types/Story";
import { capitalize } from "@/utils/formatting";
import * as Storage from "@/app/story/storage";

import { showMessage, hideMessage } from "react-native-flash-message";
import { Button } from "react-native-paper";

export default function Story({storyProps} : {storyProps: any}) {
  const { removeStory } = useContext(LibraryContext);
  const navigation: any = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  let imgSrc: any
  storyProps.genre == "crime" ? imgSrc = require("@/assets/storyImages/crime.png") : 
  storyProps.genre == "fantasy" ? imgSrc = require("@/assets/storyImages/fantasy.png") : 
  storyProps.genre == "sci-fi" ? imgSrc = require("@/assets/storyImages/scifi.png") : 
  storyProps.genre == "mystery" ? imgSrc = require("@/assets/storyImages/mystery.png") : 
  imgSrc = require("@/assets/storyImages/default.png")
  
    return (
        <View 
            style={styles.content}>
          <Image 
            style={styles.icon}
            source={imgSrc}
            ></Image>
            
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
            onPress={() => setModalVisible(true)}>
          </Feather.Button>


          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={styles.modalTitle}>Delete Confirmation</Text>
                <Text 
                  style={styles.modalText}>Are you sure you want to delete '{storyProps.title}'?</Text>
                <View style={styles.modalButtonsContainer}>
                  <Button
                    onPress={() => {
                      removeStory(storyProps.id);

                      showMessage({
                        message: "Story Deleted",
                        description: `${storyProps.title} has been successfully deleted.`,
                        type: "warning",
                        icon: "warning"
                      });

                      setModalVisible(!modalVisible);
                    }}
                    buttonColor="#fe4058"
                    textColor="white"
                    labelStyle={styles.buttonText}
                    style={styles.buttonStyle}>Delete</Button>
                  <Button
                    onPress={() => setModalVisible(!modalVisible)}
                    buttonColor="#c1c1c1"
                    textColor="black"
                    labelStyle={styles.buttonText}
                    style={styles.buttonStyle}>Cancel</Button>
                </View>
              </View>
            </View>
          </Modal>
        
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
      borderRadius: 10
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
    },


    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 22,
      // position: "static",
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
    },
    modalView: {
      width: 350,
      height: 200,
      // position: "relative",
      // margin: 20,
      flex: 0,
      borderRadius: 20,
      // paddingVertical: 10,
      padding: 35,
      backgroundColor: "#f1f4f9",
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: "column",
      justifyContent: "center",
      gap: 20
    },
    modalButtonsContainer: {
      flexDirection: "row-reverse",
      justifyContent: "flex-start",
      gap: 10
      // flexGrow: 0
    },
    buttonStyle: {
      borderRadius: 10
    },
    buttonText: {
      fontFamily: "Roboto", 
      fontWeight: "bold"
    },
    modalText: {
      backgroundColor: "#f8d7da",
      fontFamily: "Roboto",
      color: "#7b565e",
      padding: 10,
      borderRadius: 10,
      // marginBottom: 15,
      textAlign: 'center',
    },
    modalTitle: {
      // color: "#192637",
      fontWeight: 'bold',
      fontFamily: "Roboto",
      fontSize: 18,
    }
});
