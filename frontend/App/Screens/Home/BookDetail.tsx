import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from '../../Navigation/Stacks/HomeStack';
import { Button } from 'react-native-paper';
import { UserContext } from '../../Components/UserContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Book, UserValues } from '../../Sources/Models/models';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceInDown, BounceInLeft } from 'react-native-reanimated';

type Props = RouteProp<HomeStackParams, "BookDetail">;

const BookDetail = () => {
    const route = useRoute<Props>();
    const book: Book = route.params;
    const { width, height } = Dimensions.get("screen");
    const tempUser: UserValues = useContext(UserContext);
    const [user, setUser] = useState<UserValues>(tempUser);
    const [isReaden, setReaden] = useState<boolean>();
    const [isFavorite, setFavorite] = useState<boolean>();
    const [key, setKey] = useState<number>(0)
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
    useFocusEffect(
        useCallback(() => {
            setUser(tempUser);
            setKey(a => a + 1)
        }, [tempUser])
    );
    return (
        <View style={{ width: width, height: height, paddingTop: 70, paddingHorizontal: 20, backgroundColor: "#151515" }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.5,
                filter: "blur(10px);"
            }} />
            {
                book ?
                    <Animated.View style={{ gap: 15, alignItems: "center" }} key={key} entering={BounceInLeft.duration(1000).springify()}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                            <Image source={{ uri: "https://picsum.photos/500/500" }} style={{ width: width * 0.25, height: height * 0.18, borderRadius: 15, }} />
                            <View style={{ flex: 1, gap: 15, }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, flexShrink: 1, }}>
                                    <View style={{ flexShrink: 1, }}>
                                        <Text style={{ fontFamily: "Itim", fontSize: 24, color: "#d9d9d9" }}>{book.title}</Text>
                                    </View>
                                    <TouchableOpacity onPress={handleFavorite} >
                                        {isFavorite ? (
                                            <AntDesign name="star" size={24} color="white" />
                                        ) : (
                                            <AntDesign name="staro" size={24} color="white" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ fontFamily: "Itim", fontSize: 18, color: "#d9d9d9" }}>Author: {book.author}</Text>
                                <Text style={{ fontFamily: "Itim", fontSize: 18, color: "#d9d9d9" }}>Read Status: {isReaden ? "Yes" : "No"}</Text>
                                <Text style={{ fontFamily: "Itim", fontSize: 18, color: "#d9d9d9" }}>Genre: {book.genre}</Text>
                            </View>
                        </View>
                        <View style={{ gap: 10, }}>
                            <Text style={{ fontFamily: "Itim", fontSize: 24, color: "#fafafa" }}>Description</Text>
                            <Text style={{ color: "#d9d9d9", lineHeight: 25 }}>{book.description}</Text>
                        </View>

                        <Button
                            onPress={handleRead}
                            mode="outlined"
                            theme={{ colors: { outline: "#6443acff" } }}
                            style={{ width: width * 0.8, height: height * 0.05, justifyContent: "center", alignItems: "center", marginTop: height * 0.1 }}
                        >
                            <Text style={{ color: "white" }}>{isReaden ? "Mark as Unread" : "Mark as Read"}</Text>
                        </Button>

                    </Animated.View>
                    :
                    <Text>Select a book</Text>
            }
        </View>
    )
};
export default BookDetail