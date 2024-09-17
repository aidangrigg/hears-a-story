import { StyleSheet, ViewComponent } from 'react-native';
import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';



export default function UserTextbox(props){
    return (
        <View style={styles.boxStyle}>
            <Ionicons style={styles.icon} name="person-sharp" size={24} color="white" />
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
    borderTopRightRadius: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'white',
    borderStyle: "solid",
    borderWidth: 1,
    },
    icon:{
    position: 'absolute',
    right: 5,
    top: 5,
      
    },
    text:{
        paddingTop: 25,
        color: "white",
        
    },
    
  });  