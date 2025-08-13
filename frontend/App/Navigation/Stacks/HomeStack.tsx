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
                headerStyle: {
                    borderRadius: 30,
                    backgroundColor: "#A7C7E7"
                },
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 24,
                    fontFamily: "Itim"
                },
                tabBarStyle: {
                    borderRadius: 30,
                    backgroundColor: "#d9d9d9"
                }
            }}>
                <Tabs.Screen name="HomePage" component={HomePage} options={{ title: "Home Page" }} />
                <Tabs.Screen name="CategoryPage" component={CategoriesPage} options={{ title: "Categories Page" }} />
                <Tabs.Screen name="BookDetail" component={BookDetail} options={{ title: "Book Detail" }} />
                <Tabs.Screen name="FavoritePage" component={FavoritesPage} options={{ title: "Favoriets" }} />
                <Tabs.Screen name="ProfilePage" component={ProfilePage} options={{ title: "Profile" }} />
            </Tabs.Navigator>
        </UserContext.Provider>
    )

}
export default HomeStack