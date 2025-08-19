import express from "express"
import sql from "mysql2"
const app = express()

const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));




