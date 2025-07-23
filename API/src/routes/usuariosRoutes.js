/**
 * Rutas para el manejo de usuarios
 * Define todos los endpoints relacionados con las operaciones CRUD de usuarios
 */

// Importar Express para crear el router
const express = require("express")
// Crear una instancia del router de Express
const router = express.Router()
// Importar el controlador de usuarios que contiene la lógica de negocio
const usuariosController = require("../controllers/usuariosController")

/**
 * RUTAS DE USUARIOS
 * Base URL: /api/usuarios
 */

// GET /api/usuarios - Obtener todos los usuarios o buscar por término
// Soporta query parameter 'search' para filtrar por nombre o apellido
router.get("/", usuariosController.getUsuario)

// GET /api/usuarios/:id - Obtener un usuario específico por su ID
router.get("/:id", usuariosController.getUsuarioById)

// POST /api/usuarios - Crear un nuevo usuario
// Requiere en el body: nombre, apellidos, email, sexo
router.post("/", usuariosController.postUsuario)

// PUT /api/usuarios/:id - Actualizar un usuario existente por su ID
// Requiere en el body: nombre, apellidos, email, sexo
router.put("/:id", usuariosController.putUsuario)

// DELETE /api/usuarios/:id - Eliminar un usuario por su ID
router.delete("/:id", usuariosController.deleteUsuario)

// Exportar el router para ser usado en la aplicación principal
// Esto permite que las rutas sean montadas en el servidor Express
module.exports = router
