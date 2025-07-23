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


};