import { View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Animated, { BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParams } from '../../Sources/Models/models';
import Entypo from '@expo/vector-icons/Entypo';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParams>;

const AuthScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationProp>();
    const { width, height } = Dimensions.get("screen");
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const handleAuth = async () => {
        if (isSignUp) {
            if (!username || !email || !password) {
                setError("Please fill all fields");
            } else if (password.length < 8) {
                setError("The password must be longer than 8 characters.");
            } else {
                console.log("kayıt");
                await fetch("http://192.168.1.76:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ username, email, password })
                })
                    .then(() => handleLogin())
                    .catch(e => console.log("An error occured while sign up", e));
            }
        }
        else {
            handleLogin();
        }
    }
    const handleLogin = async () => {
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
                await AsyncStorage.setItem("user", JSON.stringify(user));
                navigation.navigate("HomeStack");
            })
            .catch(e => {
                console.log("An error occured while Sign In", e);
            });
    };
    return (
        <View style={{ width: width, height: height, justifyContent: "center", alignItems: "center", gap: 15, }}>
            <View style={{ width: width * 0.7, gap: 10, }}>

                <Animated.Text entering={BounceInLeft.duration(500)} style={{ fontSize: 24, fontFamily: "Itim" }}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Animated.Text>

                {isSignUp && (
                    <Animated.View entering={BounceInRight.duration(500).delay(100).springify()} style={{ width: "100%" }}>
                        <TextInput label="Username" placeholder="Username" mode="outlined" onChangeText={(value) => setUsername(value.trim())} />
                    </Animated.View>
                )}

                <Animated.View entering={isSignUp ? BounceInRight.duration(500).delay(200).springify() : BounceInRight.duration(500).delay(100).springify()} style={{ width: "100%" }}>
                    <TextInput label="Email" inputMode="email" autoCapitalize="none" placeholder="Email" mode="outlined" onChangeText={(value) => setEmail(value.trim())} />
                </Animated.View>

                <Animated.View entering={isSignUp ? BounceInRight.duration(500).delay(300).springify() : BounceInRight.duration(500).delay(200).springify()} style={{ width: "100%" }}>
                    <TextInput secureTextEntry={!isVisible} label="Password" placeholder="Password" mode="outlined" onChangeText={(value) => setPassword(value.trim())} />
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{ position: "absolute", right: 0, top: "50%", transform: [{ translateY: -15 }], }}>
                        {isVisible ? (
                            <Entypo name="eye-with-line" size={24} color="black" />
                        ) : (
                            <Entypo name="eye" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                </Animated.View>

                {error && (
                    <Text style={{ color: "darkred", fontFamily: "Itim" }}>
                        {error}
                    </Text>
                )}
                <Animated.View entering={isSignUp ? BounceInRight.duration(500).delay(400) : BounceInRight.duration(500).delay(300)}>
                    <Button buttonColor="#a7c7c7" mode="contained" onPress={handleAuth}>
                        <Text>{isSignUp ? "Sign Up" : "Sign In"}</Text>
                    </Button>
                </Animated.View>
                <Animated.View entering={isSignUp ? BounceInRight.duration(500).delay(500) : BounceInRight.duration(500).delay(400)}>
                    <Button mode="text" onPress={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Already have an account? Sign In!" : "Don't have an account? Sign Up!"}
                    </Button>
                </Animated.View>
            </View>
        </View>
    )
}
export default AuthScreen