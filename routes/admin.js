// [ADICIONADO P/ RODAR] router + model na variável novaCategoria
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const novaCategoria = mongoose.model("categorias")

// [ADICIONADO P/ RODAR] rotas GET mínimas
router.get("/", function (req, res) {
    res.render("admin/index")
})

router.get("/categorias", function (req, res) {
    novaCategoria.find().lean().then(function (categorias) {
        res.render("admin/categorias", { categorias: categorias })
    })
})

router.get("/categorias/add", function (req, res) {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", function (req, res) {

    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome invalido" })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: "Slug invalido" })
    }
    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" })
    }
    if (erros.length > 0) {
        res.render("admin/addcategorias", { erros: erros })
    }
    else {
        new novaCategoria({
            nome: req.body.nome,
            slug: req.body.slug
        }).save().then(function () {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch(function (erro) {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect("/admin")
        })
    }
})

// [ADICIONADO P/ RODAR]
module.exports = router
