import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import HomeStack from "./Stacks/HomeStack"
import AuthScreen from "./Stacks/AuthScreen"
import { StatusBar } from "expo-status-bar"
import { Provider } from "react-redux"
import { store } from "../Redux/store"
import { getUser, setLogged, setUser, userSelector } from "../Redux/userSlice"
import { useAppDispatch, useAppSelector } from "../Redux/hook"
const Stack = createStackNavigator()
const RootNavigator = () => {
    const state = useAppSelector(userSelector)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animation: "none"
            }} initialRouteName={state.isLogged ? "HomeStack" : "AuthPage"}>
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="AuthPage" component={AuthScreen} />
            </Stack.Navigator>
            <StatusBar style='light' />
        </NavigationContainer>

    )
}

export default RootNavigator