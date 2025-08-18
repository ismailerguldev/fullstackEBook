import { View, Text } from 'react-native'; // 'view, text' import'ları resimde yok, ama ekledim.
import React, { createContext, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from '../../Components/UserContext';
import { Book, UserValues } from '../../Sources/Models/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookDetail from '../../Screens/Home/BookDetail';
import ProfilePage from '../../Screens/Home/ProfilePage';
import FavoritesPage from '../../Screens/Home/FavoritesPage';
import CategoriesPage from '../../Screens/Home/CategoriesPage';
import HomePage from '../../Screens/Home/HomePage';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Tabs = createBottomTabNavigator();
export type HomeStackParams = {
    HomePage: UserValues;
    BookDetail: Book;
};
const HomeStack = () => {
    const [user, setUser] = useState<UserValues>({
        id: "test",
        email: "test",
        favoriteBooks: [],
        password: "test",
        readedBooks: [],
        username: "test"
    });
    useEffect(() => {
        const getUser = async () => {
            const asyncUser = await AsyncStorage.getItem("user");
            if (asyncUser !== null) {
                setUser(JSON.parse(asyncUser));
            }
        };
        getUser();
    }, [])
    return (
        <UserContext.Provider value={user}>
            <Tabs.Navigator screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#151515",
                    borderColor: "#1c1c1c",
                    borderTopWidth: 1,
                    elevation: 0,
                },
                tabBarActiveTintColor: "white",
                headerShown: false,
                lazy: false 
            }}>
                <Tabs.Screen name="HomePage" component={HomePage} options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />

                }} />
                <Tabs.Screen name="CategoryPage" component={CategoriesPage} options={{
                    title: "Categories",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={24} color={color} />,

                }} />
                <Tabs.Screen name="BookDetail" component={BookDetail} options={{
                    title: "Book Detail",
                    tabBarIcon: ({ color }) => <Entypo name="book" size={24} color={color} />
                }} />
                <Tabs.Screen name="FavoritePage" component={FavoritesPage} options={{
                    title: "Favoriets",
                    tabBarIcon: ({ color }) => <Entypo name="heart" size={24} color={color} />
                }} />
                <Tabs.Screen name="ProfilePage" component={ProfilePage} options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />
                }} />
            </Tabs.Navigator>
        </UserContext.Provider>
    )

}
export default HomeStack