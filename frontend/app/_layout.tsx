// import { Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

import Index from './index';
import Loading from './loading';
import CreateStory from './CreateStory';

import Styles from './Styles';

export default function RootLayout() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="Library" screenOptions={{ headerShown: false }} >
    {/* <Stack> */}
       {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="Library" component={Index} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Create Story" component={CreateStory} />
    {/* </Stack> */}
    </Stack.Navigator>
    </NavigationContainer>
  );
}
