import { Text, View, Image, StatusBar } from "react-native";
import { StyleSheet } from 'react-native';

type headerProps = {
    title: string;
  };

export function Header(props: headerProps) {
    return (
        <View
            style={styles.header}>
            {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> */}
            <View
                style={styles.container}> 
                <Text
                    style={styles.name}>HEAR'S A STORY</Text>
                <Image 
                    style={styles.logo}
                    source={require('@/assets/images/logo.png')}></Image>
            </View>
            <Text
                style={styles.heading}>{props.title}</Text>
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
        fontWeight: "500"
    },
  });