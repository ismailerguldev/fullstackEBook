import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import BookBox from './BookBox';
import { AllBooks } from '../Sources/Models/books';
import { BlurView } from 'expo-blur';
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
        <Text style={{ fontSize: 22, color: "white", marginBottom: 15, }}>{title}</Text>

        {title !== "Recommended Books" && (
          <TouchableOpacity onPress={() => { setGenre(title); setVisible(true); }}>
            <Text style={{ fontSize: 20, fontFamily: "Itim", color:"#ccc" }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ height: height * 0.15, borderRadius: 15, overflow: "hidden" }}>
        <ScrollView decelerationRate={0} snapToInterval={width * 0.8 + 20} snapToAlignment='center' bounces={false} disableIntervalMomentum scrollEventThrottle={12} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: 15, paddingHorizontal: 10, }}>
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