import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BookBox from '../../Components/BookBox';
import { UserValues } from '../../Sources/Models/models';

const FavoritesPage = () => {
    const tempUser = useContext(UserContext);
    const [user, setUser] = useState<UserValues>(tempUser);
    const [key, setKey] = useState<number>(0);
    const { width, height } = Dimensions.get("screen")
    useFocusEffect(
        useCallback(() => {
            setKey(a => a + 1);
            setUser(tempUser);
        }, [tempUser])
    );

    return (
        <View key={key} style={{ flex: 1, padding: 25, alignItems: "center", backgroundColor: "#151515", paddingTop: 70, gap: 20 }}>
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