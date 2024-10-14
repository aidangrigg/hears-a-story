import React, { useContext } from "react";
import { View, ScrollView, Text, Button, TextInput, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { RadioButton } from "react-native-paper";

import { Header } from "@/components/header";

import { Story } from "@/types/Story";

import { LibraryContext } from "@/context/LibraryContext";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function CreateStory() {
    const navigation: any = useNavigation();

    const [title, onChangeName] = React.useState('');
    const [hours, onChangeHours] = React.useState('');
    const [minutes, onChangeMinutes] = React.useState('');

    const { addStory } = useContext(LibraryContext);
    const { library } = useContext(LibraryContext);
    const lastBook = library.at(-1);
    const newKey = lastBook ? lastBook.key + 1 : 0;

    const [newGenre, setGenre] = React.useState('crime');
    const [newDuration, setDuration] = React.useState('medium');
    const [contentFilter, setContentFilter] = React.useState(false);
    
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
                        style={styles.heading}>Story Duration</Text>
                    <Text
                        style={styles.detail}>Enter a duration for your new story</Text>
                        <RadioButton.Group onValueChange={value => setDuration(value)} value={newDuration}>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Short"
                                color="white"
                                value="short"
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "70%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Medium"
                                color="white"
                                value="medium"
                                status="unchecked"
                                labelStyle={{color: "white",  marginRight: "63%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Long"
                                color="white"
                                value="long"
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "71%"}}
                            ></RadioButton.Item>
                        </RadioButton.Group>
                    {/* <View style={{flexDirection: "row", gap: 15, justifyContent: "flex-start", alignItems: "center", padding: 0, marginTop: 10}}>
                        <TextInput
                            // placeholder="Enter a title"
                            style={styles.durationInput}
                            onChangeText={onChangeHours}
                            value={hours}
                        />
                        <Text
                            style={styles.detail}>Hrs</Text>
                        <TextInput
                            // placeholder="Enter a title"
                            style={styles.durationInput}
                            onChangeText={onChangeMinutes}
                            value={minutes}
                        />
                        <Text
                            style={styles.detail}>Min</Text>
                    </View> */}
                </View>
                <View>
                    <Text
                        style={styles.heading}>Genre</Text>
                    <Text
                        style={styles.detail}>Choose the genre(s) for your story</Text>
                        <RadioButton.Group onValueChange={value => setGenre(value)} value={newGenre}>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Crime"
                                color="white"
                                value="crime"
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "70%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Sci-Fi"
                                color="white"
                                value="sci-fi"
                                status="unchecked"
                                labelStyle={{color: "white",  marginRight: "70%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Fantasy"
                                color="white"
                                value="fantasy"
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "65%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Mystery"
                                color="white"
                                value="mystery"
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "64.5%"}}
                            ></RadioButton.Item>
                        </RadioButton.Group>
                </View>
                <View>
                    <Text
                        style={styles.heading}>Content Filter</Text>
                    <Text
                        style={styles.detail}>Allow for adult (18+) content</Text>    
                    <RadioButton.Group onValueChange={value => setContentFilter(value === 'true' ? true : false)} value={contentFilter === true ? 'true' : 'false'}>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="Yes"
                                color="white"
                                value='true'
                                status="unchecked"
                                labelStyle={{color: "white", marginRight: "75%"}}
                            ></RadioButton.Item>
                            <RadioButton.Item
                                position="leading"
                                mode="android"
                                label="No"
                                color="white"
                                value='false'
                                status="unchecked"
                                labelStyle={{color: "white",  marginRight: "76.5%"}}
                            ></RadioButton.Item>
                        </RadioButton.Group>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <SimpleLineIcons.Button 
                    name="arrow-right-circle" 
                    size={50}
                    iconStyle={{marginLeft: 10}}
                    backgroundColor={"#192637"}
                    borderRadius={100}
                    onPress={() => {
                        const newBook: Story = {key: newKey, title: title, status: "Ongoing", duration: newDuration, genre: newGenre, allowAdultContent: contentFilter}
                        addStory(newBook)

                        navigation.goBack();
                    }}>

                </SimpleLineIcons.Button>
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
    },
    durationInput: {
        width: "30%",
        height: 40,
        marginVertical: "auto",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5, 
        backgroundColor: "white",
        paddingLeft: 10        
    }
});