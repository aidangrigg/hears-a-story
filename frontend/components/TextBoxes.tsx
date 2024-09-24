import { StyleSheet, ViewComponent } from 'react-native';
import { Text, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


export class Response{
    id: number;
    text: string;
    type: string;
     constructor(id: number, text: string){
        this.id = id,
        this.text = text;
        this.type = "";
    }
};

export class NarratorResponse extends Response{
    constructor(id: number, text: string){
        super(id, text);
        this.type = "N";
    }

}

export class UserResponse extends Response{
    constructor(id: number, text: string){
        super(id, text);
        this.type = "U";
    }

}



export function NarratorTextbox(props: NarratorResponse){
    return (
        <View style={styles.narratorBox}>
            <FontAwesome6 style={styles.narratorIcon} name="book-open-reader" size={30} color="rgba(0, 224, 255, 1)" />
            <Text style={styles.narratorText}>{props.text}</Text>
            <View style={styles.playIconView}>
            <Entypo.Button style={styles.playIcon} name="controller-play" size={30} color="rgba(0, 224, 255, 1)" />
            </View>
            <View style={styles.backIconView}>
            <Entypo.Button style={styles.backIcon} name="controller-jump-to-start" size={30} color="rgba(0, 224, 255, 1)"  />
            
            </View>

            

            
            
        </View>
    );
};

export function UserTextbox(props: UserResponse){
    return (
        <View style={styles.userBox}>
            <Ionicons style={styles.userIcon} name="person-sharp" size={30} color="white" />
            <Text style={styles.userText}>{props.text}</Text>
            <View style={styles.trashIconView}>
            <Entypo.Button style={styles.trashIcon} name="trash" size={25} color="white" />

            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({

  
    narratorBox:{
        marginTop: 10,
        marginLeft:12,
        marginRight:12,
        marginBottom: 10,
        borderRadius: 15,
        borderTopLeftRadius: 0,
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'rgba(0, 224, 255, 1)',
        borderStyle: "solid",
        borderWidth: 1,
    },
    narratorIcon:{
        position: 'absolute',
        top: 10,
        left: 10,
    },
    narratorText:{
        paddingTop: 40,
        color: "rgba(0, 224, 255, 1)",
        fontSize:16,
        paddingBottom: 22,

    },
    playIconView:{
        position: 'absolute',
        bottom: 5,
        left: '60%',
    },
    playIcon:{
        backgroundColor: 'rgba(25, 38, 55, 1)',
    },
    backIconView:{
        position: 'absolute',
        bottom: 5,
        left: '35%',
    },
    
    backIcon:{
        backgroundColor: 'rgba(25, 38, 55, 1)',
    },
    userBox:{
        marginTop: 10,
        marginLeft:12,
        marginRight:12,
        marginBottom: 10,
        borderRadius: 15,
        borderTopRightRadius: 0,
        paddingTop: 10,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
    },
    userIcon:{
        position: 'absolute',
        right: 10,
        top: 10,
    },
    userText:{
        paddingTop: 40,
        color: "white",
        fontSize:16,
        paddingBottom: 25,
    },
    trashIconView:{
        position: 'absolute',
        bottom: 5,
        left: 5,
    },
    trashIcon:{
        backgroundColor: 'rgba(25, 38, 55, 1)',

    },
    
    
  });  