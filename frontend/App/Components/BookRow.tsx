import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BookBox from './BookBox';
import { AllBooks } from '../Sources/Models/books';

interface BookRowProps {
  title: string;
  setVisible?: any;
  setGenre?: any;
}

const BookRow = ({ title, setVisible, setGenre }: BookRowProps) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, fontFamily: "Itim" }}>{title}</Text>
        
        {title !== "Recommended Books" && (
          <TouchableOpacity onPress={() => { setGenre(title); setVisible(true); }}>
            <Text style={{ fontSize: 20, fontFamily: "Itim" }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: width * 0.85, height: height * 0.25, backgroundColor: "#b5d4b5", borderRadius: 15, }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: 15, paddingHorizontal: 20, }}>
          {title === "Recommended Books" ? (
            AllBooks.slice(0, 5).map(book => (
              <BookBox key={book.id} book={book} />
            ))
          ) : (
            AllBooks.filter(book => book.genre === title).slice(0, 5).map(book => (
              <BookBox key={book.id} book={book} />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default BookRow