import sql from "mysql2"
export const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "isbelvalex123",
    database: "ebookdb"
})
con.connect((err) => {
    if (err) throw err
    console.log("Connected to MySQL2")
})