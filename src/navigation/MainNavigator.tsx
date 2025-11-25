import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types";

// Screens (we will create them soon)
import HomeScreen from '../screens/HomeScreen'
import AddUserScreen from '../screens/AddUserScreen'

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Zeller Customers" }} 
        />

        <Stack.Screen 
          name="AddUser" 
          component={AddUserScreen} 
          options={{ title: "Add User" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
