import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Book } from '../Sources/Models/models'

const AuthorBox = ({ book }: { book: Book }) => {
    const { width } = Dimensions.get("screen")
    return (
        <TouchableOpacity
            style={{
                gap: 10,
                width: width * 0.3,
            }}
            key={book.id}
        >
            <Image source={{ uri: "https://picsum.photos/500/500" }} style={{ flex: 1, borderRadius: 7, resizeMode: "cover" }} />
            <Text style={{ textAlign: "center", color: "#ccc", fontWeight: 500 }}>{book.author.slice(0, 15)}...</Text>
        </TouchableOpacity>
    )
}

export default AuthorBox