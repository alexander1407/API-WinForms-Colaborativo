const express = require("express")
const usuariosRoutes = require("./src/routes/usuariosRoutes")
const app = express()

const port = 3000

app.use(express.json())
app.use("/api/usuarios", usuariosRoutes)

app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`)
})
