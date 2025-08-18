import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BookBox from '../../Components/BookBox';
import { UserValues } from '../../Sources/Models/models';
import { LinearGradient } from 'expo-linear-gradient';
import { userSelector } from '../../Redux/userSlice';
import { useAppSelector } from '../../Redux/hook';
const FavoritesPage = () => {
    const state = useAppSelector(userSelector)
    const user = state.user
    const [key, setKey] = useState<number>(0);
    const { width, height } = Dimensions.get("screen")
    return (
        <View key={key} style={{ flex: 1, padding: 25, alignItems: "center", backgroundColor: "#151515", paddingTop: 70, gap: 20 }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.5,
                filter: "blur(10px);"
            }} />
            <Text style={{ color: "white", fontSize: 24, fontWeight: 500, alignSelf: "flex-start" }}>Favorites</Text>
            {user.favoriteBooks.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 15, minHeight: height }}>
                    {user.favoriteBooks.map(book => (
                        <BookBox key={book.id} book={book} />
                    ))}
                </ScrollView>
            ) : (
                <Text>There is no book in favorites</Text>
            )}
        </View>
    );
};

export default FavoritesPage;