const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    port: 3306,
    database: "tienda",
    user: "root",
    password: "",

})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Conectado a la base de datos!!!')
})

module.exports = db