interface IQuery {
    addReadedBookQuery: string
    addFavBookQuery: string
}
const BookQueries: IQuery = {
    addFavBookQuery:"UPDATE userdb SET favoriteBooks = ? WHERE id = ?",
    addReadedBookQuery:"UPDATE userdb SET readedBooks = ? WHERE id = ?",
}
export default BookQueries