/**
 * Archivo principal del servidor Express
 * Configura y ejecuta la API REST para el manejo de usuarios
 * Punto de entrada de la aplicación
 */

// Importar Express framework para crear el servidor web
const express = require("express")
// Importar las rutas de usuarios desde el módulo de rutas
const usuariosRoutes = require("./src/routes/usuariosRoutes")

// Crear una instancia de la aplicación Express
const app = express()

// Definir el puerto en el que correrá el servidor
const port = 3000

// MIDDLEWARES
// Configurar Express para parsear JSON en el cuerpo de las peticiones
app.use(express.json())

// RUTAS
// Montar las rutas de usuarios en el endpoint base '/api/usuarios'
app.use("/api/usuarios", usuariosRoutes)

// INICIALIZACIÓN DEL SERVIDOR
// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`)
})
