import { View, Text, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Book } from '../../Sources/Models/models';
import { AllBooks } from '../../Sources/Models/books';
import BookRow from '../../Components/BookRow';
import BookBox from '../../Components/BookBox';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
const CategoriesPage = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [genre, setGenre] = useState<string>('');
    const { width, height } = Dimensions.get("screen");
    const [search, setSearch] = useState<string>("")
    const genres = Array.from(new Set(AllBooks.map((book: Book) => book.genre)));
    return (
        <View style={{ width: width, height: height, paddingTop: 70, paddingHorizontal: 20, backgroundColor: "#151515", gap: 20 }}>
            <LinearGradient colors={["#57379a", "transparent"]} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: height * 0.5,
                filter: "blur(10px);"
            }} />
            <View>
                <ScrollView style={{ minHeight: height, }} showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", gap: 15, }}>
                    <View style={{ width: "100%", gap: 10 }}>
                        <Text style={{ fontSize: 26, fontWeight: 500, color: "white" }}>Search</Text>
                        <BlurView intensity={50} style={{ borderRadius: 20, overflow: "hidden", justifyContent: "center", paddingLeft: 45, gap: 10, borderWidth: 0.6, borderColor: "#ccc" }}>
                            <FontAwesome name="search" size={24} color="#aaa" style={{ position: "absolute", left: 20 }} />
                            <TextInput placeholder='Search Category' placeholderTextColor="#aaa" style={{ fontSize: 16, color: "#fafafa" }} onChangeText={setSearch} />
                        </BlurView>
                    </View>
                    {genres.filter(genre => genre.toLowerCase().includes(search.toLowerCase())).map((genre, index) => (
                        <BookRow
                            key={index}
                            title={genre}
                            setVisible={setModalVisible}
                            setGenre={setGenre}
                        />
                    ))}
                </ScrollView>
            </View>
            <Modal visible={modalVisible} backdropColor="#151515" onRequestClose={() => setModalVisible(false)}>
                <ScrollView contentContainerStyle={{ width: width, minHeight: height, justifyContent: "center", alignItems: "center", gap: 15, }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", right: 10, top: 50 }}>
                        <AntDesign name="closecircleo" size={36} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Itim", fontSize: 24, color: "white" }}>All {genre} Books</Text>
                    <View style={{ flexDirection: "row", gap: 15, flexWrap: "wrap", padding: 15, justifyContent: "center" }}>
                        {AllBooks.filter(book => book.genre === genre)
                            .map(book => (
                                <BookBox
                                    key={book.id}
                                    book={book}
                                />
                            ))}
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};

export default CategoriesPage;