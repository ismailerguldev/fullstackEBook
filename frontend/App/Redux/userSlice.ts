import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, UserValues } from "../Sources/Models/models";
import { RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUser = createAsyncThunk<UserValues, void, { state: RootState; rejectValue: string }>(
    'getUser',
    async (_, { rejectWithValue }) => {
        const AsyncUser = await AsyncStorage.getItem("user")
        if (AsyncUser !== null) {
            const user: UserValues = JSON.parse(AsyncUser)
            if (user.id !== "") {
                return user
            } else {
                return rejectWithValue("not logged yet")
            }
        }
        return rejectWithValue("not logged yet")
    }
)
export const setUser = createAsyncThunk<void, { user: UserValues }, { state: RootState }>(
    'setUser',
    async ({ user }, { dispatch, getState }) => {
        dispatch(setStateUser(user))
        const state = getState()
        const stateUser = state.userReducer.user
        await AsyncStorage.setItem("user", JSON.stringify(stateUser))
        dispatch(getUser())
    }
)
export const addReadedBook = createAsyncThunk<void, Book, { state: RootState }>(
    "addReadedBook",
    async (book, { getState, dispatch }) => {
        dispatch(addStateReadedBook(book))
        const state = getState()
        const user = state.userReducer.user
        try {
            await fetch(`http://192.168.1.76:5000/add/readedbook/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ readedBook: user.readedBooks })
            })
        } catch (e) {
            console.log("error while adding readed book", e)
        }
    }
)
export const removeReadedBook = createAsyncThunk<void, Book, { state: RootState }>(
    "removeReadedBook",
    async (book, { getState, dispatch }) => {
        dispatch(removeStateReadedBook(book))
        const state = getState()
        const user = state.userReducer.user
        try {
            await fetch(`http://192.168.1.76:5000/add/readedbook/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ readedBook: user.readedBooks })
            })
        } catch (e) {
            console.log("error while remove readed book", e)
        }
    }
)
export const addFavoriteBook = createAsyncThunk<void, Book, { state: RootState }>(
    "addFavoriteBook",
    async (book, { getState, dispatch }) => {
        dispatch(addStateFavoriteBook(book))
        const state = getState()
        const user = state.userReducer.user
        try {
            await fetch(`http://192.168.1.76:5000/add/favoritebook/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ favBooks: user.favoriteBooks })
            })
        } catch (e) {
            console.log("error while add favorite book", e)
        }
    }
)
export const removeFavoriteBook = createAsyncThunk<void, Book, { state: RootState }>(
    "addFavoriteBook",
    async (book, { getState, dispatch }) => {
        dispatch(removeStateFavoriteBook(book))
        const state = getState()
        const user = state.userReducer.user
        try {
            await fetch(`http://192.168.1.76:5000/add/favoritebook/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ favBooks: user.favoriteBooks })
            })
        } catch (e) {
            console.log("error while add favorite book", e)
        }
    }
)
interface SliceInterface {
    user: UserValues,
    isLoading: boolean,
    isLogged: boolean,
}
const initialState: SliceInterface = {
    user: {
        username: "",
        email: "",
        favoriteBooks: [],
        id: "",
        password: "",
        readedBooks: []
    },
    isLoading: false,
    isLogged: false
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setStateUser: (state, action: PayloadAction<UserValues>) => {
            state.user = action.payload
        },
        addStateReadedBook: (state, action: PayloadAction<Book>) => {
            state.user.readedBooks.push(action.payload)
        },
        removeStateReadedBook: (state, action: PayloadAction<Book>) => {
            const book = action.payload
            state.user.readedBooks = state.user.readedBooks.filter(item => item.id != book.id)
        },
        addStateFavoriteBook: (state, action: PayloadAction<Book>) => {
            state.user.favoriteBooks.push(action.payload)
        },
        removeStateFavoriteBook: (state, action: PayloadAction<Book>) => {
            const book = action.payload
            state.user.favoriteBooks = state.user.favoriteBooks.filter(item => item.id != book.id)
        },
        setLogged: (state, action: PayloadAction<boolean>) => {
            state.isLogged = action.payload
        },
        removeUser: (state) => {
            state.user = {
                username: "",
                email: "",
                favoriteBooks: [],
                id: "",
                password: "",
                readedBooks: []
            }
            state.isLogged = false
        },
        changeUserName: (state, action: PayloadAction<string>) => {
            state.user.username = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
                state.isLogged = false
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLogged = true
                state.isLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLogged = false
                state.isLoading = false
            })
            .addCase(setUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addReadedBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addReadedBook.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(removeReadedBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeReadedBook.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addFavoriteBook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addFavoriteBook.fulfilled, (state) => {
                state.isLoading = false
            })
    }
})
export const { addStateReadedBook, removeStateReadedBook, addStateFavoriteBook, removeStateFavoriteBook, setLogged, setStateUser, removeUser, changeUserName } = userSlice.actions
export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer