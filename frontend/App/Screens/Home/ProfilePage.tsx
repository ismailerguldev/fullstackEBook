import { View, Text, Dimensions, Modal, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams, UserValues } from '../../Sources/Models/models';
import { changeUserName, removeUser, setStateUser, setUser, userSelector } from '../../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';

const ProfilePage = () => {
    const { width, height } = Dimensions.get("screen");
    const state = useAppSelector(userSelector)
    const user = state.user
    const [modalVisible, setVisible] = useState<boolean>(false);
    const [isChangeUsername, setChange] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch()
    const getRank = (): string => {
        const rank = user.readedBooks.length === 0 ? "Noob Reader" : user.readedBooks.length < 5 ? "Reader" : user.readedBooks.length < 10 ? "Pro Reader" : "Mega Reader"
        return rank
    }
    const removeAcc = async () => {
        try {
            await AsyncStorage.removeItem("user")
            dispatch(removeUser())
            navigation.navigate("AuthPage");

        } catch (e) {
            console.log("Error removing user:", e);
        }
    };
    const handleChange = async () => {
        if (username || password) {
            console.log("girdim")
            if (isChangeUsername) {
                await fetch(`http://192.168.1.76:5000/change/username/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username: username })
                })
                    .then(() => {
                        dispatch(changeUserName(username))
                        setVisible(false)
                    })
                    .catch(e => console.log("Error while change username", e));
            } else {
                await fetch(`http://192.168.1.76:5000/change/password/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password: password })
                })
                    .then(() => {
                        setVisible(false);
                        setPassword("");
                    })
                    .catch(e => console.log("Error while change password", e));
            }
        }
    };

    return (
        <View style={{ width: width, height: "100%", backgroundColor: "#151515", alignItems: "center", paddingTop: "45%", gap: 10 }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.5,
                filter: "blur(10px);"
            }} />
            <MaskedView maskElement={
                <LinearGradient colors={['#000', 'transparent']} style={{ width: "100%", height: "100%", position: "absolute" }} />
            } style={{ position: "absolute" }}>
                <Image style={{ width: width, height: height * 0.4 }} source={{ uri: "https://picsum.photos/1000/1000" }} resizeMode='stretch' />
            </MaskedView>
            <LinearGradient colors={["#bb52aa", "#63ff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 120, height: 120, borderRadius: 60 }}>
                <Image source={{ uri: "https://picsum.photos/500/500" }} style={{ borderRadius: 60, flex: 1, margin: 6 }} />
            </LinearGradient>
            <View style={{ justifyContent: "center", alignItems: "center", width: width, gap: 15, }}>
                <Text style={{ color: "white", fontSize: 28, fontFamily: "Itim" }}>{user.username}</Text>
                <Text style={{ color: "gray", fontSize: 16 }}>
                    {
                        user.readedBooks.length === 0 ? "Noob Reader" : user.readedBooks.length < 5 ? "Reader" : user.readedBooks.length < 10 ? "Pro Reader" : "Mega Reader"
                    }
                </Text>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "49.75%", justifyContent: "center", alignItems: "flex-end", paddingRight: 20, }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 28, fontFamily: "Itim" }}>{user.readedBooks.length}</Text>
                            <Text style={{ color: "gray", fontSize: 20, fontFamily: "Itim" }}>Readed</Text>
                        </View>
                    </View>
                    <View style={{ width: "0.5%", height: "50%", backgroundColor: "gray" }}></View>
                    <View style={{ width: "49.75%", justifyContent: "center", paddingLeft: 20, alignItems: "flex-start", }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 28, fontFamily: "Itim" }}>{user.favoriteBooks.length}</Text>
                            <Text style={{ color: "gray", fontSize: 20, fontFamily: "Itim" }}>Favorites</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: "100%", flexDirection: "row", justifyContent: "center", gap: 25 }}>
                    <LinearGradient colors={["#6a21f5", "#f74d84"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: "40%", padding: 15, borderRadius: 15, }} >
                        <Button textColor='white' onPress={() => {
                            setChange(true);
                            setVisible(!modalVisible)
                        }}>Change Username</Button>
                    </LinearGradient>
                    <LinearGradient colors={["#1b1b1b", "#3b3b3b"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: "40%", padding: 15, borderRadius: 15, }} >
                        <Button textColor='white' onPress={() => {
                            setChange(false)
                            setVisible(!modalVisible)
                        }}>Change Password</Button>
                    </LinearGradient>
                </View>
            </View>
            <View style={{ width: "70%", gap: 15, display: modalVisible ? "flex" : "none" }}>
                <BlurView intensity={15} style={{ overflow: "hidden", borderRadius: 5 }}>
                    <TextInput value={isChangeUsername ? username : password} onChangeText={isChangeUsername ? setUsername : setPassword} textColor='white' label={isChangeUsername ? "Username" : "Password"} mode='outlined' theme={{ colors: { background: "transparent" }, roundness: 5 }} />
                </BlurView>
                <Button style={{ alignSelf: "flex-start" }} mode='contained' onPress={() => handleChange()}>Submit</Button>
            </View>
            <View style={{ width: width, flex: 1, alignItems: "center", justifyContent: "center", }}>
                <LinearGradient colors={["red", "purple"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: "40%", padding: 15, borderRadius: 15 }} >
                    <Button textColor='white' onPress={removeAcc}>Log Out</Button>
                </LinearGradient>
            </View>
        </View >
    )
};
export default ProfilePage