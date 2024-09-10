import { Link } from "expo-router";
import { Text, View, Image, Button, ScrollView, Alert, Pressable } from "react-native";
// import { pipeline } from '@xenova/transformers';

export default function Index() {
  type storyProps = {
    title: string;
    status: string;
    duration: string;
  };
  
  const Story = (props: storyProps) => {
    return (
      <View 
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginVertical: 5,
          padding: 10,
          gap: 20,
          }}>
        <Image 
          style={{
            width: 81,
            height: 81,
          }}
          source={require("@/assets/images/react-logo.png")}
          ></Image>
        <View
          style={{
            width: "40%",
            flexDirection: "column",
          }}>
          <Text
            style={{
              fontFamily: "Roboto",
              color: "#FFF",
              fontSize: 24,
              fontWeight: 500
            }}
            >{props.title}</Text>
          <Text
            style={{
              fontFamily: "Roboto",
              color: "#FFF",
              fontSize: 16,
              fontWeight: 500
            }}
            >Status: {props.status}</Text>
          <Text
            style={{
              fontFamily: "Roboto",
              color: "#FFF",
              fontSize: 16,
              fontWeight: 500
            }}>Duration: {props.duration}</Text>
        </View>
        <Pressable
          onPress={() => Alert.alert(`Opening ${props.title}`)} >
          <Image 
            style={{height:48, width: 48, margin: "auto"}}
            source={require("@/assets/images/playButton.png")}/>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",
        
      }}
    >
      
      <ScrollView style={{ width: "100%"}}>
        <Story title="Story 1" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 2" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 3" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 1" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 2" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 3" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 1" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 2" status="Ongoing" duration="2h 3m"/>
        <Story title="Story 3" status="Ongoing" duration="2h 3m"/>
      </ScrollView>
      <Link href="/loading"
        >Loading</Link>
    </View>
  );
}
