import { Link } from "expo-router";
import { ActivityIndicator, Text, View, Image } from "react-native";
// import { pipeline } from '@xenova/transformers';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",
      }}
    >
      <Text
        style={{
            fontSize: 40, 
            fontFamily: "Roboto", 
            color: "#FFF", 
            textAlign: "center", 
            width: 300, 
            fontWeight: 900, marginTop: 50,
            height: "17%", 
            }}>HEAR'S A STORY</Text>
      <Image 
        source={require("@/assets/images/logo.png")}
        style={{width: 250, height: 250}}
        ></Image>
      <ActivityIndicator
        size="large" 
        color="#FFF"
        style={{flex: 1}}
      />
    </View>
  );
}