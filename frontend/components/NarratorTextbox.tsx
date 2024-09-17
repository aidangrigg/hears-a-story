import { StyleSheet, ViewComponent } from 'react-native';
import { Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';



export default function NarratorTextbox(props){
    return (
        <View style={styles.boxStyle}>
            <FontAwesome6 style={styles.icon} name="book-open-reader" size={24} color="rgba(0, 224, 255, 1)" />
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

  
    boxStyle:{
        
    marginTop: 10,
    marginLeft:12,
    marginRight:28,
    marginBottom: 10,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'rgba(0, 224, 255, 1)',
    borderStyle: "solid",
    borderWidth: 1,
    },
    icon:{
        position: 'absolute',
        top: 5,
        left: 5,
    },
    text:{
        paddingTop: 25,
        color: "rgba(0, 224, 255, 1)",

    },
    
  });  