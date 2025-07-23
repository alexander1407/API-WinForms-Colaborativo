/**
 * Configuración y conexión a la base de datos MySQL
 * Este módulo establece la conexión con la base de datos y la exporta
 * para ser utilizada en toda la aplicación
 */

// Importar el módulo mysql para conectarse a la base de datos
const mysql = require("mysql")

// Crear la conexión a la base de datos con los parámetros de configuración
const db = mysql.createConnection({
    host:"localhost",        // Servidor de base de datos (local)
    port: 3306,             // Puerto estándar de MySQL
    database: "tienda",     // Nombre de la base de datos
    user: "root",           // Usuario de la base de datos
    password: "",           // Contraseña (vacía para desarrollo local)

})

// Establecer la conexión a la base de datos
db.connect((err) => {
    if (err) {
        // Si hay error en la conexión, lanzar excepción para detener la aplicación
        throw err
    }
    // Mensaje de confirmación cuando la conexión es exitosa
    console.log('Conectado a la base de datos!!!')
})

// Exportar la conexión para que pueda ser utilizada en otros módulos
// Esto permite realizar consultas SQL desde los modelos
module.exports = db