import { Text, View, Image, StatusBar } from "react-native";
import { StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

type headerProps = {
    title: string;
    showBackButton: boolean;
  };

export function Header(props: headerProps) {
  const navigation: any = useNavigation();

    return (
        <View
            style={styles.header}>
            {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
            <View
                style={styles.container}> 
                
                <Text
                    style={styles.logoText}>HEAR'S A STORY</Text>
                <Image 
                    style={styles.logoImage}
                    source={require('@/assets/images/hears-a-story-logo.png')}></Image>
            </View>
            <View
                style={styles.container}> 
              {props.showBackButton ?  <Feather style={styles.backIcon} name="arrow-left-circle" size={35} color="white" backgroundColor="transparent" onPress={() => navigation.goBack()} /> : null}
              <Text
                  style={styles.heading}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      marginTop: "15%",
      paddingLeft: "5%",
      paddingBottom: "2%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginRight: "auto",
      gap: 10,
      borderBottomColor: "#FFF",
      borderBottomWidth: 1,
      width: "100%"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        color: "#FFF",
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "900"
    },
    logo: {
        height: 48,
        width: 48
    },
    heading: {
      color: "#FFF",
        fontFamily: "Roboto",
        fontSize: 32,
        fontWeight: "500",
        // marginLeft: 10,
        // backgroundColor: "red"
    },
    logoImage:{
        height: 60,
        width: 60,
        bottom: -5,
        right: -275,
        position: 'absolute',
    
      },
      titleContainer: {
        paddingBottom: 110,
        borderColor: 'white',
        borderStyle: "solid",
        borderBottomWidth: 1,
       
      },
      logoText:{
        color: 'white',
        fontWeight: 'bold',
        fontFamily: "Roboto",
        textAlign: 'center',
        bottom: 10,
        right: -220,
        position: 'absolute',
        fontSize: 16,
      },
      backIcon: {
        // marginTop: 10,
        marginRight: 10,
        padding: 4
      },
  });