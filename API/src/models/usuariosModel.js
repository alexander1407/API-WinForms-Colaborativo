/*
 Modelo es una representación de la base de datos 
 */

const db = require("../config/db");

class Usuarios {
    getUsuario(callback) {
        const sql = "SELECT * FROM usuarios";
        db.query(sql, callback);
    }

    getUsuarioById(id, callback) {
        const sql = "SELECT * FROM usuarios WHERE id = ?";
        db.query(sql, [id], callback);
    }

    buscarPorNombreOApellido(valor, callback) {
        const sql = `
            SELECT * FROM usuarios
            WHERE nombre LIKE ? OR apellidos LIKE ?
        `;
        const searchPattern = `%${valor}%`;
        db.query(sql, [searchPattern, searchPattern], callback);
    }

    postUsuario(nombre, apellidos, email, sexo, callback) {
        const sql = "INSERT INTO usuarios (nombre, apellidos, email, sexo) VALUES (?, ?, ?, ?)";
        db.query(sql, [nombre, apellidos, email, sexo], callback);
    }

    putUsuario(id, nombre, apellidos, email, sexo, callback) {
        const sql = "UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, sexo = ? WHERE id = ?";
        db.query(sql, [nombre, apellidos, email, sexo, id], callback);
    }

    deleteUsuario(id, callback) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        db.query(sql, [id], callback);
    }
}

module.exports = new Usuarios();
