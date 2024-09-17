import { Stack } from "expo-router";
import { Image, Text, View, StyleSheet } from 'react-native';


function LogoTitle() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.headerText}>HEARS A STORY </Text>
      <Image style={styles.logo} source={require('@/assets/images/hears-a-story-logo.png')}/>
      
      
      
    </View>
    
  );
}

export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen 
      name="storyPage" 
      options={{
        headerStyle: { backgroundColor: 'rgba(25, 38, 55, 1)'},
        headerTitleStyle: { fontWeight: 'bold',},
        headerTitle: props => <LogoTitle/>,
        headerTintColor: '#fff',
      }
      }/> 
    </Stack>
  );
}
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    
  },
  logo:{
    height: 60,
    width: 60,
    bottom: -10,
    right: -60,
    position: 'absolute',

  },
  titleContainer: {
    flexDirection: 'row',
   
  },
  headerText:{
    color: 'white',
    fontWeight: 'bold',
    fontFamily: "Roboto",
    paddingBottom: 10,
  },
});

