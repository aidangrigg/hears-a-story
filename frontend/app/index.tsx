
import { useEffect, useContext } from "react";
import { Text, View, Image, Button, ScrollView, Alert, Pressable, StatusBar, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from '@expo/vector-icons/Feather';


import { LibraryContext } from "@/context/LibraryContext";


import { Header } from "@/components/header";

import Story from "@/components/storyBrief";


// import Styles from "./Styles";

export default function Index() {
  const navigation: any = useNavigation();
  const { library, refresh } = useContext(LibraryContext)

  useEffect(() => {
    refresh();
  }, [])
    
  console.log(library)
  return (
     <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#192637",
      }}
    >
      <Header title="Library" showBackButton={false}></Header>
      
      <ScrollView 
        style={{ width: "100%"}}>
        {library.map((story) => <Story storyProps={story} key={story.id}></Story>)}
      </ScrollView>
      
      <View>
        <Feather.Button
          style={{margin: 30, borderColor: "white", borderWidth: 5, borderRadius: 50, width: "80%", fontFamily: "Roboto"}}
          name="plus-circle"
          size={50}
          backgroundColor={"#192637"}
          borderRadius={100}
          onPress={() => {
            navigation.navigate("Create Story")
          }}> New Story
        </Feather.Button>
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

