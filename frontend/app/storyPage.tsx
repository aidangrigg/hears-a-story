import { Text, View } from "react-native";
import { StyleSheet, Image, Platform } from 'react-native';

let storyName: string = "Story Name";
export default function Index() {
  return (
    <View style={styles.pageStyle}>

    <View
      style={styles.headerStyle}>
      <Text style={styles.title}>{storyName}</Text>
    </View>

    <View >

    </View>
    </View>
  );
};

const styles = StyleSheet.create({

  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  pageStyle:{
    flex: 1,
    backgroundColor: 'rgba(25, 38, 55, 1)',
    borderColor: 'white',
    borderStyle: "solid",
  },
  headerStyle:{
    


    backgroundColor: 'rgba(25, 38, 55, 1)',
    borderColor: 'white',
    borderStyle: "solid",
    borderBottomWidth: 1,
    
  },
  title:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: "Roboto",
    padding: 10,
  }
});





