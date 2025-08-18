import { View, Dimensions, Text, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParams, UserValues } from '../../Sources/Models/models';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
type AuthScreenNavigationProp = StackNavigationProp<RootStackParams>;
import Animated, { BounceInRight } from "react-native-reanimated"
import { MotiView } from 'moti';
import { getUser, setLogged, setUser, userSelector } from '../../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { enableScreens } from 'react-native-screens';
const AuthScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const { width, height } = Dimensions.get("screen");
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [inputKey, setInputKey] = useState<number>(0)
    const [randomX, setRandomX] = useState<number>(0)
    const [randomY, setRandomY] = useState<number>(0)
    const [randomX2, setRandomX2] = useState<number>(0)
    const [randomY2, setRandomY2] = useState<number>(0)
    const dispatch = useAppDispatch()
    const state = useAppSelector(userSelector)
    useEffect(() => {
        enableScreens()
        const AutoLogin = async () => {
            const userSt = await AsyncStorage.getItem("user")
            if (userSt !== null) {
                const user: UserValues = JSON.parse(userSt)
                handleLogin(user.email, user.password)
            }
        }
        AutoLogin()
    }, [])
    useEffect(() => {
        if (state.isLogged) {
            navigation.navigate("HomeStack")
        }
    }, [state])
    const handleAuth = async () => {
        if (isSignUp) {
            if (!username || !email || !password) {
                setError("Please fill all fields");
            } else if (password.length < 8) {
                setError("The password must be longer than 8 characters.");
            } else {
                await fetch("http://192.168.1.76:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ username, email, password })
                })
                    .then(() => handleLogin(email, password))
                    .catch(e => console.log("An error occured while sign up", e));
            }
        }
        else {
            handleLogin(email, password);
        }
    }
    const handleLogin = async (email: string, password: string) => {
        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }
        await fetch("http://192.168.1.76:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    setError("Invalid email or password");
                    throw new Error(text);
                }
                return res.json();
            })
            .then(async user => {
                dispatch(setUser({ user }))
                navigation.navigate("HomeStack");
            })
            .catch(e => {
                console.log("An error occured while Sign In", e);
            });
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={{ width: width, height: height, justifyContent: "center", alignItems: "center", gap: 15, backgroundColor: "#151515" }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.45,
            }} />
            {state.isLoading ? <ActivityIndicator color='white' size={'large'} /> :
                <View>
                    <View style={{ width: width * 0.8, gap: 15, alignItems: "center", zIndex: 1 }}>
                        <Text style={{ color: "white", fontSize: 32, }}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
                        <Animated.View entering={BounceInRight.springify().duration(800)} style={{ width: "100%", gap: 15 }} key={inputKey}>
                            {
                                isSignUp &&
                                <TextInput style={{
                                    borderColor: "#aeaeae", borderWidth: 0.3, borderRadius: 5, color: "white", paddingHorizontal: 20, height: height * 0.05
                                }} placeholder='Username' placeholderTextColor="white" onChangeText={setUsername} />
                            }
                            <TextInput style={{
                                borderColor: "#aeaeae", borderWidth: 0.3, borderRadius: 5, color: "white", paddingHorizontal: 20, height: height * 0.05
                            }} placeholder='Email' placeholderTextColor="white" onChangeText={setEmail} />
                            <TextInput style={{
                                borderColor: "#aeaeae", borderWidth: 0.3, borderRadius: 5, color: "white", paddingHorizontal: 20, height: height * 0.05
                            }} placeholder='Password' placeholderTextColor="white" onChangeText={setPassword} />
                        </Animated.View>
                        <Button onPress={handleAuth} mode='outlined' textColor='white' theme={{ colors: { outline: "#6443acff" } }} style={{ paddingHorizontal: 20, paddingVertical: 3, borderRadius: 10 }}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <Button mode='text' textColor='white' onPress={() => {
                            setIsSignUp(!isSignUp);
                            setInputKey(a => a + 1)
                        }}>
                            {isSignUp ? "Already have an account? Sign In!" : "Don't have an account? Sign Up!"}
                        </Button>
                    </View>
                    <MotiView style={{ width: 120, height: 120, backgroundColor: "#57379a", position: "absolute", zIndex: 0, filter: "blur(10px); brightness(0.6)", left: 0, top: 0 }}
                        from={{
                            left: 0, top: 0
                        }}
                        animate={{
                            left: randomX,
                            top: randomY
                        }}
                        transition={{ duration: 5000, loop: true, type: 'timing' }}
                        onDidAnimate={() => {
                            setRandomX(Math.random() * width - 120)
                            setRandomY(Math.random() * height - 120)
                        }}
                    />
                    <MotiView style={{ width: 120, height: 120, backgroundColor: "#57379a", position: "absolute", zIndex: 0, filter: "blur(10px); brightness(0.6)", left: 0, top: 0 }}
                        from={{
                            left: 0, top: 0
                        }}
                        animate={{
                            left: randomX2,
                            top: randomY2
                        }}
                        transition={{ duration: 5000, loop: true, type: 'timing' }}
                        onDidAnimate={() => {
                            setRandomX2(Math.random() * width - 120)
                            setRandomY2(Math.random() * height - 120)
                        }}
                    />
                </View>
            }
        </KeyboardAvoidingView>
    )

}
export default AuthScreen