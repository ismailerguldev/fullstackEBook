import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { ScrollView } from 'react-native-gesture-handler'
import { AllBooks } from '../Sources/Models/books'
import AuthorBox from './AuthorBox'

const TopAuthors = () => {
    const { width, height } = Dimensions.get("screen")
    return (
        <View style={{ gap: 15, }}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "500", }}>Top Authors</Text>
            <BlurView intensity={10} style={{ padding: 10, borderRadius: 20, overflow: "hidden", height: height * 0.2 }}>
                <ScrollView decelerationRate={0} snapToInterval={width * 0.3 + 15} snapToAlignment='center' bounces={false} disableIntervalMomentum scrollEventThrottle={12} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: 15, }}>
                    {
                        AllBooks.slice(0, 10).map(book => (
                            <AuthorBox key={book.id} book={book} />
                        ))
                    }
                </ScrollView>
            </BlurView>
        </View>
    )
}

export default TopAuthors