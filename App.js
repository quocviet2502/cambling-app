import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login,Signup,Welcome,Home,Detail,Add,Observation,AddObservation,DetailObservation } from './screens';
import Database from "./Database";
const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = "Welcome"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Observation"
          component={Observation}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="AddObservation"
          component={AddObservation}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="DetailObservation"
          component={DetailObservation}
          options={{
            headerShown:false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})