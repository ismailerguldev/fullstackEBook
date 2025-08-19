import { con } from "../db/mysql.js"
import queries from "../models/bookModel.ts"
const addFavBook = (req, res) => {
    const favBooks = JSON.stringify(req.body.favBooks)
    const id = req.params.id
    if (!favBooks) { return res.status(400).send("Please fill all fields") }
    con.query(queries.addFavBookQuery, [favBooks, id], (err, result) => {
        if (err) { return res.status(500).send(`Server Error occured while edit favorite books. => ${err.message}`) }
        res.send("Favorite Books Edited Successfully")
    })
}
const addReadedBook = (req, res) => {
    const readedBook = JSON.stringify(req.body.readedBook)
    const id = req.params.id
    if (!readedBook) { return res.status(400).send("Please fill all fields") }
    con.query(queries.addReadedBookQuery, [readedBook, id], (err, result) => {
        if (err) { return res.status(500).send("Server Error occured while edit readed books") }
        res.send("Readed Books Edited Successfully")
    })
}
export default { addFavBook, addReadedBook }