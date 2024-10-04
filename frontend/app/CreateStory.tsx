import React from "react";
import { View, ScrollView, Text, Button, TextInput, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

import { Header } from "@/components/header";

export default function CreateStory() {
    const [title, onChangeName] = React.useState('');

    return (
        <View
            style={styles.container}>
            <Header
                title="New Story"></Header>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                indicatorStyle="white"                
                >
                <View>
                    <Text
                        style={styles.heading}>Story Name</Text>
                    <Text
                        style={styles.detail}>Enter a name for your new story</Text>
                    <TextInput
                        // placeholder="Enter a title"
                        style={styles.nameInput}
                        onChangeText={onChangeName}
                        value={title}
                        />
                </View>
                <View>
                    <Text
                        style={styles.heading}>Genre</Text>
                    <Text
                        style={styles.detail}>Choose the genre(s) for your story</Text>
                </View>
                <View>
                    <Text
                        style={styles.heading}>Content Filter</Text>
                    <Text
                        style={styles.detail}>Allow for adult (18+) content</Text>    
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <SimpleLineIcons.Button 
                    name="arrow-right-circle" 
                    size={50}
                    iconStyle={{marginLeft: 10}}
                    backgroundColor={"#192637"}
                    borderRadius={100}
                    onPress={() => Alert.alert(`Created ${title}`)}></SimpleLineIcons.Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",   
    },
    scrollContainer: {
        width: "100%",
    },
    scrollContent: {
        padding: "10%",
        gap: 50,
    },
    heading: {
        color: "#FFF",
        fontFamily: "Roboto",
        fontSize: 36,
        fontWeight: "500",
    },
    detail: {
        color: "#FFF",
        fontFamily: "Roboto",
        fontSize: 20,
        fontWeight: "500",
    },
    buttonContainer: {
        padding: "5%",
    },
    nameInput: {
        width: "100%",
        height: 40,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5, 
        backgroundColor: "white",
        paddingLeft: 10        
    }
});