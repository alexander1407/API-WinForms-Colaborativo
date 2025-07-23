// Importar el modelo de usuarios para acceso a la base de datos
const usuariosModel = require("../models/usuariosModel");

module.exports = {
    /**
     * Obtener todos los usuarios o buscar por nombre/apellido
     * GET /api/usuarios?search=valor
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    getUsuario: (req, res) => {
        // Extraer el parámetro de búsqueda de la query string
        const { search } = req.query;

        // Si se proporciona un término de búsqueda, buscar por nombre o apellido
        if (search) {
            usuariosModel.buscarPorNombreOApellido(search, (err, result) => {
                if (err) {
                    // Retornar error del servidor si hay problemas con la consulta
                    res.status(500).json({ error: err.message });
                    return;
                }
                // Retornar los resultados de la búsqueda
                res.status(200).json({ data: result });
            });
        } else {
            // Si no hay término de búsqueda, obtener todos los usuarios
            usuariosModel.getUsuario((err, result) => {
                if (err) {
                    // Retornar error del servidor si hay problemas con la consulta
                    res.status(500).json({ error: err.message });
                    return;
                }
                // Retornar todos los usuarios
                res.status(200).json({ data: result });
            });
        }
    },
    
    /**
     * Obtener un usuario específico por su ID
     * GET /api/usuarios/:id
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    getUsuarioById: (req, res) => {
        // Extraer el ID del usuario de los parámetros de la URL
        let { id } = req.params;

        // Llamar al modelo para buscar el usuario por ID
        usuariosModel.getUsuarioById(id, (err, result) => {
            if (err) {
                // Retornar error del servidor si hay problemas con la consulta
                res.status(500).json({ error: err.message });
                return;
            }
            // Verificar si se encontró el usuario
            if (result.length === 0) {
                // Retornar error 404 si no se encuentra el usuario
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            // Retornar los datos del usuario encontrado
            res.status(200).json({ data: result });
        });
    },
    
    /**
     * Crear un nuevo usuario
     * POST /api/usuarios
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    postUsuario: (req, res) => {
        // Extraer los datos del usuario del cuerpo de la petición
        let { nombre, apellidos, email, sexo } = req.body;

        // Llamar al modelo para crear el nuevo usuario
        usuariosModel.postUsuario(nombre, apellidos, email, sexo, (err, result) => {
            if (err) {
                // Retornar error del servidor si hay problemas con la inserción
                res.status(500).json({ error: err.message });
                return;
            }
            // Retornar mensaje de éxito
            res.status(200).json({ message: "Usuario ingresado correctamente" });
        });
    },
    
    /**
     * Actualizar un usuario existente por su ID
     * PUT /api/usuarios/:id
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    putUsuario: (req, res) => {
        // Extraer el ID del usuario de los parámetros de la URL
        let id = req.params.id;
        // Extraer los nuevos datos del usuario del cuerpo de la petición
        let { nombre, apellidos, email, sexo } = req.body;

        // Llamar al modelo para actualizar el usuario
        usuariosModel.putUsuario(id, nombre, apellidos, email, sexo, (err, result) => {
            if (err) {
                // Retornar error del servidor si hay problemas con la actualización
                res.status(500).json({ error: err.message });
                return;
            }
            // Retornar mensaje de éxito
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        });
    },
    
    /**
     * Eliminar un usuario por su ID
     * DELETE /api/usuarios/:id
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    deleteUsuario: (req, res) => {
        // Extraer el ID del usuario de los parámetros de la URL
        let id = req.params.id;

        // Llamar al modelo para eliminar el usuario
        usuariosModel.deleteUsuario(id, (err, result) => {
            if (err) {
                // Retornar error del servidor si hay problemas con la eliminación
                res.status(500).json({ error: err.message });
                return;
            }
            // Retornar mensaje de éxito
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        });
    },

};