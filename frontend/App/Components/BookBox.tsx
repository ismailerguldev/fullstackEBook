import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import React, { ElementType, JSX, JSXElementConstructor, useContext, useState } from 'react';
import { Book } from '../Sources/Models/models';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../Navigation/Stacks/HomeStack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur';
interface BookBoxProps {
  book: Book;
}

const BookBox = ({ book }: BookBoxProps) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  return (
    <BlurView intensity={20} style={{ overflow: "hidden", borderRadius: 10, }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetail", book)}
        style={{
          width: width * 0.8,
          height: height * 0.15,
          borderRadius: 15,
          padding: 5,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Image source={{ uri: "https://picsum.photos/500/500" }} style={{ flex: 2.5, borderRadius: 7, resizeMode: "cover", flexShrink: 1 }} />
        <View style={{ flex: 7 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexShrink: 1, }}>
              <Text style={{ color: "gray", fontSize: 16 }}>{book.author}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <AntDesign name="star" size={16} color="white" />
              <Text style={{ color: "white", fontSize: 16, }}>4.2/5</Text>
            </View>
          </View>
          <Text style={{ color: "white", fontSize: 16 }}>{book.title}</Text>
          <Text style={{ color: "#aaa", fontSize: 16 }}>{book.description.slice(0, 70)}...</Text>
        </View>
      </TouchableOpacity>
    </BlurView>
  );
};

export default BookBox;