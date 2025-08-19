import express from "express"
import cors from "cors"
import userRoute from "./routes/user.js"
import bookRoute from "./routes/book.js"
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRoute)
app.use("/", bookRoute)
app.listen(port, () => {
    console.log("Server Started on Port:", port)
})