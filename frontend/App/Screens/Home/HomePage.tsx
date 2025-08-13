import { View, Text, Dimensions } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from '../../Components/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { UserValues } from '../../Sources/Models/models';
import BookRow from '../../Components/BookRow';

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
    <View key={key} style={{ width: width, height: height, alignItems: "center", gap: 100, marginTop: 100 }}>
      <Text style={{ fontSize: 24, fontFamily: "Itim" }}>
        Welcome Back {user.username}
      </Text>
      <BookRow title="Recommended Books" />
    </View>
  );
};

export default HomePage;