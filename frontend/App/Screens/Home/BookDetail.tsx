import { View, Text, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { HomeStackParams } from '../../Navigation/Stacks/HomeStack';
import { Button } from 'react-native-paper';
import { UserContext } from '../../Components/UserContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Book, UserValues } from '../../Sources/Models/models';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { BounceInDown, BounceInLeft } from 'react-native-reanimated';
import BookBox from '../../Components/BookBox';
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from 'expo-blur';
import { addFavoriteBook, addReadedBook, removeFavoriteBook, removeReadedBook, userSelector } from '../../Redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
type Props = RouteProp<HomeStackParams, "BookDetail">;
const BookDetail = () => {
    const route = useRoute<Props>();
    const book: Book = route.params;
    const { width, height } = Dimensions.get("screen");
    const state = useAppSelector(userSelector)
    const user = state.user
    const [isReaden, setReaden] = useState<boolean>();
    const [isFavorite, setFavorite] = useState<boolean>();
    const [key, setKey] = useState<number>(0)
    const dispatch = useAppDispatch()
    useFocusEffect(() => {
        if (book) {
            if (user.readedBooks.find(item => item.id === book.id)) {
                setReaden(true)
            } else {
                setReaden(false)
            }
            if (user.favoriteBooks.find(item => item.id === book.id)) {
                setFavorite(true)
            } else {
                setFavorite(false)
            }
        }
    })
    return (
        <View style={{ width: width, height: height, paddingHorizontal: 20, backgroundColor: "#151515", alignItems: "center", paddingTop: 70, }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.5,
                filter: "blur(10px);"
            }} />
            {
                book && !state.isLoading ?
                    <Animated.View style={{ gap: 15, alignItems: "center" }} key={key} entering={BounceInLeft.duration(1000).springify()}>
                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 24, fontWeight: "500", flex: 1, textAlign: "center" }}>Book Detail</Text>
                            <TouchableOpacity onPress={() => {
                                if (isFavorite) {
                                    dispatch(removeFavoriteBook(book))
                                    setFavorite(false)
                                } else {
                                    dispatch(addFavoriteBook(book))
                                    setFavorite(true)
                                }
                            }} >
                                {isFavorite ? (
                                    <AntDesign name="star" size={24} color="white" />
                                ) : (
                                    <AntDesign name="staro" size={24} color="white" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <BookBox book={book} />
                        <View style={{ gap: 10, }}>
                            <Text style={{ fontFamily: "Itim", fontSize: 24, color: "#fafafa" }}>Description</Text>
                            <BlurView intensity={15} style={{ padding: 10, overflow: "hidden", borderRadius: 15, }}>
                                <Text style={{ color: "#d9d9d9", lineHeight: 25 }}>{book.description}</Text>
                            </BlurView>
                        </View>
                        <Button
                            onPress={() => {
                                if (isReaden) {
                                    dispatch(removeReadedBook(book))
                                    setReaden(false)
                                } else {
                                    dispatch(addReadedBook(book))
                                    setReaden(true)
                                }
                            }}
                            mode="outlined"
                            theme={{ colors: { outline: "#6443acff" } }}
                            style={{ width: width * 0.8, height: height * 0.05, justifyContent: "center", alignItems: "center", marginTop: height * 0.1 }}
                        >
                            <Text style={{ color: "white" }}>{isReaden ? "Mark as Unread" : "Mark as Read"}</Text>
                        </Button>

                    </Animated.View>
                    : state.isLoading ? <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", width: width, height: height }}><ActivityIndicator color={"white"} size={"large"} /></View> : <Text>Select a book</Text>
            }
        </View>
    )

};
export default BookDetail