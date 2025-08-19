interface IQuery {
    registerQuery: string
    loginQuery: string
    changeUsernameQuery: string
    changePasswordQuery: string
}
const UserQueries: IQuery = {
    registerQuery: "INSERT INTO userdb (username,email,password) VALUES(?,?,?)",
    loginQuery: "SELECT id, username, email, password, favoriteBooks, readedBooks FROM userdb WHERE email = ? AND password = ? LIMIT 1",
    changeUsernameQuery: "UPDATE userdb SET username = ? WHERE id = ?",
    changePasswordQuery:"UPDATE userdb SET password = ? WHERE id = ?"
}
export default UserQueries