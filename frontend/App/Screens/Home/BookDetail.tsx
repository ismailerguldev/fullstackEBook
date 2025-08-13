import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from '../../Navigation/Stacks/HomeStack';
import { Button } from 'react-native-paper';
import { UserContext } from '../../Components/UserContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Book, UserValues } from '../../Sources/Models/models';

type Props = RouteProp<HomeStackParams, "BookDetail">;

const BookDetail = () => {
    const route = useRoute<Props>();
    const book: Book = route.params;
    const { width, height } = Dimensions.get("screen");

    const tempUser: UserValues = useContext(UserContext);
    const [user, setUser] = useState<UserValues>(tempUser);
    const [isReaden, setReaden] = useState<boolean>();
    const [isFavorite, setFavorite] = useState<boolean>();
    const handleRead = async () => {
        if (!user.readedBooks.includes(book)) {
            user.readedBooks.push(book)
        } else {
            const index = user.readedBooks.indexOf(book)
            if (index > -1) {
                user.readedBooks.splice(index, 1)
            }
        }
        await fetch(`http://192.168.1.76:5000/add/readedBook/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ readedBook: user.readedBooks })
        }).then(
            async res => {
                if (!res.ok) {
                    const text = await res.text()
                    throw new Error(text)
                }
            }
        ).then(() => {
            if (user.readedBooks.includes(book)) {
                setReaden(true)
            } else {
                setReaden(false)
            }
        }).catch(e => console.log("An error occured while adding readed book"))
    }
    const handleFavorite = async () => {
        if (!user.favoriteBooks.includes(book)) {
            user.favoriteBooks.push(book)
        } else {
            const index = user.favoriteBooks.indexOf(book)
            if (index > -1) {
                user.favoriteBooks.splice(index, 1)
            }
        }
        await fetch(`http://192.168.1.76:5000/add/favoritebook/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ favBooks: user.favoriteBooks })
        }).then(
            async res => {
                if (!res.ok) {
                    const text = await res.text()
                    throw new Error(text)
                }
            }
        ).then(() => {
            if (user.favoriteBooks.includes(book)) {
                setFavorite(true)
            } else {
                setFavorite(false)
            }
        }).catch(e => console.log("An error occured while adding favorite book", e))
    }
    useEffect(() => {
        if (user.readedBooks.includes(book)) {
            setReaden(true)
        } else {
            setReaden(false)
        }
        if (user.favoriteBooks.includes(book)) {
            setFavorite(true)
        } else {
            setFavorite(false)
        }
    }, [route.params])
    return (
        <View style={{ width: width, height: height, padding: 20, }}>
            {
                book ?
                    <View style={{ gap: 15, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                            <View style={{ width: width * 0.25, height: height * 0.18, backgroundColor: "#E7D2CD" }} />
                            <TouchableOpacity style={{ position: "absolute", right: 0, top: 0 }} onPress={handleFavorite}>
                                {isFavorite ? (
                                    <AntDesign name="star" size={24} color="black" />
                                ) : (
                                    <AntDesign name="staro" size={24} color="black" />
                                )}
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: "Itim", fontSize: 24 }}>{book.title}</Text>
                                <Text style={{ fontFamily: "Itim", fontSize: 18 }}>Author: {book.author}</Text>
                                <Text style={{ fontFamily: "Itim", fontSize: 18 }}>Read Status: {isReaden ? "Yes" : "No"}</Text>
                                <Text style={{ fontFamily: "Itim", fontSize: 18 }}>Genre: {book.genre}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: "Itim", fontSize: 24, }}>Description</Text>
                            <Text>{book.description}</Text>
                        </View>
                        <Button
                            onPress={handleRead}
                            mode="contained"
                            style={{ width: width * 0.8, height: height * 0.05, justifyContent: "center", alignItems: "center", marginTop: height * 0.1 }}
                        >
                            <Text>{isReaden ? "Mark as Unread" : "Mark as Read"}</Text>
                        </Button>
                    </View>
                    :
                    <Text>Select a book</Text>
            }
        </View>
    )
};
export default BookDetail