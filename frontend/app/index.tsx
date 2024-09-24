import { Text, View, Image, Button, ScrollView, Alert, Pressable, StatusBar, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';

import { Header } from "@/components/header";

// import CreateStory from './CreateStory';
import Story from "@/components/storyBrief";

// import Styles from "./Styles";

export default function Index() {
  const navigation: any = useNavigation();

  return (
     <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",
        
      }}
    >
      {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
      <Header title="Library"></Header>
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
      <View>
        <Feather.Button
          style={{margin: 30, borderColor: "white", borderWidth: 5, borderRadius: 50, width: "80%", fontFamily: "Roboto"}}
          name="plus-circle"
          size={50}
          backgroundColor={"#192637"}
          borderRadius={100}
          onPress={() => navigation.navigate("Create Story")}>
            New Story
        </Feather.Button>
        {/* <Button
          title="New Story"
          onPress={() => navigation.navigate("Create Story")}>
          </Button> */}
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