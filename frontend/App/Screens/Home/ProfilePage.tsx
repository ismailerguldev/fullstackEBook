import { View, Text, Dimensions, Modal, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams, UserValues } from '../../Sources/Models/models';
import { removeUser, setStateUser, setUser, userSelector } from '../../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';

const ProfilePage = () => {
    const { width, height } = Dimensions.get("screen");
    const state = useAppSelector(userSelector)
    const user = state.user
    const [key, setKey] = useState<number>(0);
    const [modalVisible, setVisible] = useState<boolean>(false);
    const [isChangeUsername, setChange] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch()
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
        if (isChangeUsername) {
            await fetch(`http://192.168.1.76:5000/change/username/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username })
            })
                .then(() => {
                    const newUser = { ...user, username: username };
                    setVisible(false);
                    setUsername("");
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
    };

    return (
        <View key={key} style={{ justifyContent: "center", alignItems: "center", gap: 30, }}>
            <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>

                <View style={{ width: width * 0.2, height: height * 0.11, backgroundColor: "#E7D2CD", borderRadius: height * 0.13 / 2 }} />
                <Text style={{ fontFamily: "Itim", fontSize: 24 }}>{user.username}</Text>
            </View>
            <View style={{ gap: 15 }}>
                <Text style={{ fontFamily: "Itim", fontSize: 24 }}>Total Reads: {user.readedBooks.length}</Text>
                <Text style={{ fontFamily: "Itim", fontSize: 24 }}>Favorites: {user.favoriteBooks.length}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <Button
                    onPress={() => { setChange(true); setVisible(true); }}
                    mode="contained"
                    buttonColor="#E7D2CD"
                    textColor="black"
                    style={{ borderWidth: 1, borderColor: "black" }}
                >
                    Change Username
                </Button>
                <Button
                    onPress={() => { setChange(false); setVisible(true); }}
                    mode="contained"
                    buttonColor="#E7D2CD"
                    textColor="black"
                    style={{ borderWidth: 1, borderColor: "black" }}
                >
                    Change Password
                </Button>
            </View>
            <Button
                mode="contained"
                buttonColor="#F7191C"
                style={{ borderWidth: 2, borderColor: "black" }}
                onPress={removeAcc}
            >
                <Text>Log Out</Text>
            </Button>
            <Modal visible={modalVisible}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 30 }}>
                    <TextInput
                        placeholder={isChangeUsername ? "Username" : "Password"}
                        label={isChangeUsername ? "Username" : "Password"}
                        style={{ width: "70%" }}
                        mode="outlined"
                        onChangeText={isChangeUsername ? setUsername : setPassword}
                    />
                    <TouchableOpacity onPress={handleChange}>
                        <Text>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
};
export default ProfilePage