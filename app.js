// [ADICIONADO P/ RODAR] imports não mostrados nos slides
const express = require("express")
const { engine } = require("express-handlebars")
const mongoose = require("mongoose")
const admin = require("./routes/admin")
const app = express()

let session = require("express-session")
let flash = require("connect-flash")

app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

app.use(flash())
//Middleware
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

app.use(function (req, res, next) {
    console.log("Oi eu sou um Middleware")
    next()
})

// [ADICIONADO P/ RODAR] body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// [ADICIONADO P/ RODAR] handlebars
app.engine("handlebars", engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// [ADICIONADO P/ RODAR] mongoose
mongoose.connect("mongodb://localhost/blogapp").then(function () {
    console.log("Conectado ao mongo")
}).catch(function (erro) {
    console.log("Erro ao se conectar: " + erro)
})

// [ADICIONADO P/ RODAR] rotas
app.use("/admin", admin)

// [ADICIONADO P/ RODAR] servidor
app.listen(8081, function () {
    console.log("Servidor rodando em http://localhost:8081")
})
