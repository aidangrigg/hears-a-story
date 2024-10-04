import { View, Image, Text, Pressable, Alert } from "react-native";
import { StyleSheet } from 'react-native';

export default function Story({storyProps} : {storyProps: any}) {
    return (
        <View 
            style={styles.content}>
        <Image 
          style={styles.icon}
          source={require("@/assets/images/react-logo.png")}></Image>
        <View
          style={styles.container}>
          <Text
            style={styles.title}>{storyProps?.title}</Text>
          <Text
            style={styles.status}>Status: {storyProps?.status}</Text>
          <Text
            style={styles.duration}>Duration: {storyProps?.duration}</Text>
        </View>
        
        <Pressable
          onPress={() => Alert.alert(`Opening ${storyProps?.title}`)} >
          <Image 
            style={{height:48, width: 48, margin: "auto"}}
            source={require("@/assets/images/playButton.png")}/>
        </Pressable>
        
      </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        gap: 20,
    },
    icon: {
        width: 81,
        height: 81,
    },
    container: {
        width: "40%",
        flexDirection: "column",
    },
    title: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 24,
        fontWeight: 500
    },
    status: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 16,
        fontWeight: 500
    },
    duration: {
        fontFamily: "Roboto",
        color: "#FFF",
        fontSize: 16,
        fontWeight: 500
    },
});