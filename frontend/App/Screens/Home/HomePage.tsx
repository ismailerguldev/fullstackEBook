import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { UserValues } from '../../Sources/Models/models';
import BookRow from '../../Components/BookRow';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native-gesture-handler';
import { AllBooks } from '../../Sources/Models/books';
import TopAuthors from '../../Components/TopAuthors';
import Animated, { BounceInDown, BounceInLeft, BounceInRight, SlideInDown, SlideInLeft, SlideInRight, ZoomInLeft } from 'react-native-reanimated';
const HomePage = () => {
  const tempUser = useContext(UserContext);
  const [user, setUser] = useState<UserValues>(tempUser);
  const [key, setKey] = useState<number>(0);
  useFocusEffect(
    useCallback(() => {
      setKey(a => a + 1);
      setUser(tempUser);
    }, [tempUser])
  );

  const { width, height } = Dimensions.get("screen");

  return (
    <View key={key} style={{ width: width, height: height, backgroundColor: "#151515", paddingTop: 100, paddingHorizontal: 20, gap: 40, }}>
      <LinearGradient colors={["#57379a", "transparent"]} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height * 0.5,
        filter: "blur(10px);"
      }} />
      <Animated.View entering={BounceInLeft.duration(800)}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "500", }}>Welcome Back, {user.username}!</Text>
      </Animated.View>
      <Animated.View entering={BounceInRight.duration(800).delay(500)}>
        <BookRow title='Recommended Books' />
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(800).delay(600)}>
        <TopAuthors />
      </Animated.View>
    </View>
  );
};

export default HomePage;