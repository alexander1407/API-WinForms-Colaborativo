/**
 * Modelo de usuarios - Representa la capa de acceso a datos para la tabla usuarios
 * Maneja todas las operaciones CRUD relacionadas con los usuarios en la base de datos
 */

// Importar la conexión a la base de datos
const db = require("../config/db");

class Usuarios {
    /**
     * Obtiene todos los usuarios de la base de datos
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    getUsuario(callback) {
        // Query SQL para seleccionar todos los usuarios
        const sql = "SELECT * FROM usuarios";
        // Ejecutar la consulta y pasar el resultado al callback
        db.query(sql, callback);
    }

    /**
     * Obtiene un usuario específico por su ID
     * @param {number} id - ID del usuario a buscar
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    getUsuarioById(id, callback) {
        // Query SQL con parámetro preparado para buscar por ID
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        // Ejecutar la consulta con el ID como parámetro para prevenir inyección SQL
        db.query(sql, [id], callback);
    }

    /**
     * Busca usuarios por nombre o apellido usando coincidencia parcial
     * @param {string} valor - Término de búsqueda para filtrar usuarios
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    buscarPorNombreOApellido(valor, callback) {
        // Query SQL con LIKE para búsqueda parcial en nombre y apellidos
        const sql = `
            SELECT * FROM usuarios
            WHERE nombre LIKE ? OR apellidos LIKE ?
        `;
        // Crear patrón de búsqueda con wildcards para coincidencia parcial
        const searchPattern = `%${valor}%`;
        // Ejecutar la consulta con el mismo patrón para ambos campos
        db.query(sql, [searchPattern, searchPattern], callback);
    }

    /**
     * Inserta un nuevo usuario en la base de datos
     * @param {string} nombre - Nombre del usuario
     * @param {string} apellidos - Apellidos del usuario
     * @param {string} email - Correo electrónico del usuario
     * @param {string} sexo - Género del usuario
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    postUsuario(nombre, apellidos, email, sexo, callback) {
        // Query SQL para insertar un nuevo usuario con parámetros preparados
        const sql = "INSERT INTO usuarios (nombre, apellidos, email, sexo) VALUES (?, ?, ?, ?)";
        // Ejecutar la inserción con los datos del usuario
        db.query(sql, [nombre, apellidos, email, sexo], callback);
    }

    /**
     * Actualiza los datos de un usuario existente
     * @param {number} id - ID del usuario a actualizar
     * @param {string} nombre - Nuevo nombre del usuario
     * @param {string} apellidos - Nuevos apellidos del usuario
     * @param {string} email - Nuevo correo electrónico del usuario
     * @param {string} sexo - Nuevo género del usuario
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    putUsuario(id, nombre, apellidos, email, sexo, callback) {
        // Query SQL para actualizar un usuario específico por ID
        const sql = "UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, sexo = ? WHERE id = ?";
        // Ejecutar la actualización con los nuevos datos y el ID del usuario
        db.query(sql, [nombre, apellidos, email, sexo, id], callback);
    }

    /**
     * Elimina un usuario de la base de datos
     * @param {number} id - ID del usuario a eliminar
     * @param {Function} callback - Función de callback que maneja la respuesta
     */
    deleteUsuario(id, callback) {
        // Query SQL para eliminar un usuario específico por ID
        const sql = "DELETE FROM usuarios WHERE id = ?";
        // Ejecutar la eliminación usando el ID como parámetro
        db.query(sql, [id], callback);
    }
}

// Exportar una instancia única de la clase (patrón Singleton)
// Esto permite que el mismo objeto sea reutilizado en toda la aplicación
module.exports = new Usuarios();
