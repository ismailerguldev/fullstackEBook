import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import HomeStack from "./Stacks/HomeStack"
import AuthScreen from "./Stacks/AuthScreen"
import { StatusBar } from "expo-status-bar"
const Stack = createStackNavigator()
const RootNavigator = () => {
    const [isLogged, setLogged] = useState<boolean>(false)
    const [key, setKey] = useState<number>(0)
    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem("user")
            if (user !== null) {
                setLogged(true)
                setKey(a => a + 1)
            } else {
                setLogged(false)
                setKey(a => a - 1)
            }
        }
        getUser()
    }, [])
    return (
        <NavigationContainer key={key}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} initialRouteName={isLogged ? "HomeStack" : "AuthPage"}>
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="AuthPage" component={AuthScreen} />
            </Stack.Navigator>
            <StatusBar style='light' />
        </NavigationContainer>
    )
}

export default RootNavigator