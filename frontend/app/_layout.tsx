import { Stack } from "expo-router";
import { Image, Text, View, StyleSheet } from 'react-native';

interface headerProps{
  pageName: String;
}
function LogoTitle({pageName}:headerProps) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.logoText}>HEARS A STORY </Text>
      <Image style={styles.logoImage} source={require('@/assets/images/hears-a-story-logo.png')}/>
      <Text style={styles.pageTitle}>{pageName}</Text>
      
      
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
        headerTitle: props => <LogoTitle pageName="Story Name"/>,
        headerTintColor: 'white',
      }
      }/> 
    </Stack>
  );
}
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    
  },
  logoImage:{
    height: 60,
    width: 60,
    bottom: 45,
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
    bottom: 60,
    right: -220,
    position: 'absolute',
    fontSize: 16,
  },
  pageTitle:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'normal',
    fontFamily: "Roboto",
    padding: 15,
    bottom: -5,
    right: -175,
    position: 'absolute',
  }
});

