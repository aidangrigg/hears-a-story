
// import { Stack } from "expo-router";
import React, { useContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button, StatusBar } from "react-native";

// Context API
import { LibraryProvider } from '@/context/LibraryContext';

// App Pages
import Index from './index';
import Loading from './loading';
import CreateStory from './CreateStory';
import StoryPage from './storyPage';

import FlashMessage from "react-native-flash-message";

// Stylesheet
import Styles from './Styles';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    
    <LibraryProvider>
      <FlashMessage position="bottom" />
      {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />  */}
      <NavigationContainer independent={true} >
        <Stack.Navigator initialRouteName="Library" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Library" component={Index}/>
          <Stack.Screen name="Create Story" component={CreateStory} />
          <Stack.Screen name="Story Page" component={StoryPage} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </LibraryProvider>

  );
}
