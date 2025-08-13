import { View, Text, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Book } from '../../Sources/Models/models';
import { AllBooks } from '../../Sources/Models/books';
import BookRow from '../../Components/BookRow';
import BookBox from '../../Components/BookBox';

const CategoriesPage = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [genre, setGenre] = useState<string>('');
    const { width, height } = Dimensions.get("screen");
    const genres = Array.from(new Set(AllBooks.map((book: Book) => book.genre)));
    return (
        <View style={{ width: width, padding: 20, }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center", gap: 15, }}>
                {genres.map((genre, index) => (
                    <BookRow
                        key={index}
                        title={genre}
                        setVisible={setModalVisible}
                        setGenre={setGenre}
                    />
                ))}
            </ScrollView>

            <Modal visible={modalVisible} backdropColor="#fafafa" onRequestClose={() => setModalVisible(false)}>
                <View style={{ width: width, height: height, justifyContent: "center", alignItems: "center", gap: 15, }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", right: 10, top: 50 }}>
                        <AntDesign name="closecircleo" size={36} color="black" />
                    </TouchableOpacity>

                    <Text style={{ fontFamily: "Itim", fontSize: 24, }}>All {genre} Books</Text>

                    <View style={{ flexDirection: "row", gap: 15, flexWrap: "wrap", padding: 15, justifyContent: "center" }}>
                        {AllBooks.filter(book => book.genre === genre)
                            .map(book => (
                                <BookBox
                                    key={book.id}
                                    book={book}
                                />
                            ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CategoriesPage;