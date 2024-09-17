import { Text, View, Image, Button, ScrollView, Alert, Pressable, StatusBar} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@/components/header";

import Story from "@/components/storyBrief";

import Styles from "./Styles";

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
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
      <Button 
        title="Go to Loading"
        onPress={() => navigation.navigate("Loading")}></Button>
    </View> 
    
  );
}
