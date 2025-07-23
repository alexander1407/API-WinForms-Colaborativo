const usuariosModel = require("../models/usuariosModel");

module.exports = {
    // GET /api/usuarios?search=valor
    getUsuario: (req, res) => {
        const { search } = req.query;

        if (search) {
            usuariosModel.buscarPorNombreOApellido(search, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(200).json({ data: result });
            });
        } else {
            usuariosModel.getUsuario((err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(200).json({ data: result });
            });
        }
    },
getUsuarioById: (req, res) => {
        let { id } = req.params;

        usuariosModel.getUsuarioById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ mensaje: "Registro no encontrado" });
                return;
            }
            res.status(200).json({ data: result });
        });
    },
    postUsuario: (req, res) => {
        let { nombre, apellidos, email, sexo } = req.body;

        usuariosModel.postUsuario(nombre, apellidos, email, sexo, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ message: "Usuario ingresado correctamente" });
        });
    },

};