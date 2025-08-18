import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import BookRow from '../../Components/BookRow';
import { LinearGradient } from 'expo-linear-gradient';
import TopAuthors from '../../Components/TopAuthors';
import Animated, { BounceInDown, BounceInLeft, BounceInRight } from 'react-native-reanimated';
import { userSelector } from '../../Redux/userSlice';
import { useAppSelector } from '../../Redux/hook';
const HomePage = () => {
  const { width, height } = Dimensions.get("screen");
  const state = useAppSelector(userSelector)
  const user = state.user
  useEffect(() => {
    console.log(state.isLoading)
  },[])
  return (
    <View style={{ width: width, height: height, backgroundColor: "#151515", paddingTop: 100, paddingHorizontal: 20, gap: 40, }}>
      <LinearGradient colors={["#57379a", "transparent"]} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height * 0.5,
        filter: "blur(10px);"
      }} />
      {
        !state.isLoading ? <View style={{ gap: 20,}}>
          <Animated.View entering={BounceInLeft.duration(800)}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "500", }}>Welcome Back, {user.username}!</Text>
          </Animated.View>
          <Animated.View entering={BounceInRight.duration(800).delay(500)}>
            <BookRow title='Recommended Books' />
          </Animated.View>
          <Animated.View entering={BounceInDown.duration(800).delay(600)}>
            <TopAuthors />
          </Animated.View>
        </View> :
          <ActivityIndicator color="white" size={"large"} />
      }
    </View>
  );
};

export default HomePage;