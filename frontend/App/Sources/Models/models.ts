export type UserValues = {
    id: string | number
    username: string
    email: string
    password: string
    favoriteBooks: Book[]
    readedBooks: Book[]
}
export type RootStackParams = {
    HomeStack: undefined
    AuthPage: undefined
}
export type Book = {
    readonly title: string
    readonly author: string
    readonly description: string
    readonly id: string
    readonly genre: string
}