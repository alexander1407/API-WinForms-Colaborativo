const express = require("express")
const router = express.Router()
const usuariosController = require("../controllers/usuariosController")


router.get("/", usuariosController.getUsuario)
router.get("/:id", usuariosController.getUsuarioById)
router.post("/", usuariosController.postUsuario)
router.put("/:id", usuariosController.putUsuario)
router.delete("/:id", usuariosController.deleteUsuario)


module.exports = router
