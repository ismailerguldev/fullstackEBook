import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BookBox from '../../Components/BookBox'; 
import { UserValues } from '../../Sources/Models/models';

const FavoritesPage = () => {
    const tempUser = useContext(UserContext);
    const [user, setUser] = useState<UserValues>(tempUser);
    const [key, setKey] = useState<number>(0);

    useFocusEffect(
        useCallback(() => {
            setKey(a => a + 1);
            setUser(tempUser);
        }, [tempUser])
    );

    return (
        <View key={key} style={{ flex: 1, alignItems: "center", padding: 25, }}>
            {user.favoriteBooks.length > 0 ? (
                <ScrollView contentContainerStyle={{ flexDirection: "row", gap: 15, flexWrap: "wrap" }}>
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