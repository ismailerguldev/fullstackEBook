import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { Book } from '../Sources/Models/models';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../Navigation/Stacks/HomeStack';

// BookBox için prop tipleri
interface BookBoxProps {
  book: Book;
}

const BookBox = ({ book }: BookBoxProps) => {
  const { width, height } = Dimensions.get("window");
  
  // useNavigation hook'u ile navigasyon nesnesini al
  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("BookDetail", book)} 
      style={{ 
        width: width * 0.17, 
        height: height * 0.12, 
        backgroundColor: "#E7D2CD", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 15, 
        padding: 5 
      }}
    >
      <Text style={{ fontFamily: "Itim" }}>
        {book.title.slice(0, 10)}...
      </Text>
      <Text style={{ fontFamily: "Itim" }}>
        {book.author.slice(0, 5)}...
      </Text>
    </TouchableOpacity>
  );
};

export default BookBox;