import express from "express"
import sql from "mysql2"
const app = express()
const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "isbelvalex123",
    database: "ebookdb"
})
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send(`Server running successfully on Port: ${port}`)
})

app.post("/register", (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) { return res.status(400).send("Please fill all fields") }
    con.query("INSERT INTO userdb (username,email,password) VALUES(?,?,?)", [username, email, password], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while add user") }
        res.send("Register User Succeedd")
    })
})
app.post("/login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) { return res.status(400).send("Please fill all fields") }
    con.query("SELECT id, username, email, password, favoriteBooks, readedBooks FROM userdb WHERE email = ? AND password = ? LIMIT 1", [email, password], (err, result) => {
        if (err) { return res.status(500).send("An error occured while login") }
        if (result.length === 0) { return res.status(401).send("Invalid email or password") }
        const user = result[0]
        user.favoriteBooks = user.favoriteBooks ? user.favoriteBooks : []
        user.readedBooks = user.readedBooks ? user.readedBooks : []
        res.json(user)
    })
})
app.put("/add/favoritebook/:id/", (req, res) => {
    const favBooks = JSON.stringify(req.body.favBooks)
    const id = req.params.id
    if (!favBooks) { return res.status(400).send("Please fill all fields") }
    con.query("UPDATE userdb SET favoriteBooks = ? WHERE id = ?", [favBooks, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while edit favorite books") }
        res.send("Favorite Books Edited Successfully")
    })
})
app.put("/add/readedbook/:id/", (req, res) => {
    const readedBook = JSON.stringify(req.body.readedBook)
    const id = req.params.id
    if (!readedBook) { return res.status(400).send("Please fill all fields") }
    con.query("UPDATE userdb SET readedBooks = ? WHERE id = ?", [readedBook, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while edit readed books") }
        res.send("Readed Books Edited Successfully")
    })
})
app.put("/change/username/:id", (req, res) => {
    const { username } = req.body
    const id = req.params.id
    if (!username) { return res.status(400).send("Please fill all fields") }
    con.query("UPDATE userdb SET username = ? WHERE id = ?", [username, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while change username") }
        res.send("Username changed successfully")
    })
})
app.put("/change/password/:id", (req, res) => {
    const { password } = req.body
    const id = req.params.id
    if (!password) { return res.status(400).send("Please fill all fields") }
    con.query("UPDATE userdb SET password = ? WHERE id = ?", [password, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while change password") }
        res.send("Password changed successfully")
    })
})
con.connect((err) => {
    if (err) throw err
    console.log("Connected to MySQL2")
})
app.listen(port, () => {
    console.log("Server Started on Port:", port)
})
