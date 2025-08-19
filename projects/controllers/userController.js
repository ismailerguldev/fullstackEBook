import { con } from "../db/mysql.js"
import queries from "../models/userModel.ts"
const port = 5000
const test = (req, res) => {
    res.status(200).send(`Server running successfully on Port: ${port}`)
}
const registerUser = (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) { return res.status(400).send("Please fill all fields") }
    con.query(queries.registerQuery, [username, email, password], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while add user") }
        res.send("Register User Succeedd")
    })
}
const login = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) { return res.status(400).send("Please fill all fields") }
    con.query(queries.loginQuery, [email, password], (err, result) => {
        if (err) { return res.status(500).send("An error occured while login") }
        if (result.length === 0) { return res.status(401).send("Invalid email or password") }
        const user = result[0]
        user.favoriteBooks = user.favoriteBooks ? user.favoriteBooks : []
        user.readedBooks = user.readedBooks ? user.readedBooks : []
        res.json(user)
    })
}

const changeUsername = (req, res) => {
    const { username } = req.body
    const id = req.params.id
    if (!username) { return res.status(400).send("Please fill all fields") }
    con.query(queries.changeUsernameQuery, [username, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while change username") }
        res.send("Username changed successfully")
    })
}
const changePassword = (req, res) => {
    const { password } = req.body
    const id = req.params.id
    if (!password) { return res.status(400).send("Please fill all fields") }
    con.query(queries.changePasswordQuery, [password, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while change password") }
        res.send("Password changed successfully")
    })
}
export default {registerUser, login, changeUsername, changePassword, test}