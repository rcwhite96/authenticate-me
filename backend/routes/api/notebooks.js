const express = require('express');
const asyncHandler = require('express-async-handler');
const csurf = require('csurf');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Notebook, Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { db } = require('../../config');

//GET ALL NOTEBOOKS
router.get('/notebooks', asyncHandler(async (req, res) => {
    const notebooks = await db.Notebook.findAll({
        order: [['updatedAt']]
    })
    return res.json({notebooks})
}))

//GET ONE NOTEBOOK
router.get('/notebooks/:id(\\d+)', asyncHandler(async (req, res) => {
    const notebook = await Notebook.findByPk(req.params.id)
    return res.json({notebook})
}))

//ADD NEW NOTEBOOK
router.post('notebooks/new', asyncHandler(async (req, res) =>{
    const{title} = req.body
    const newNotebook = await Notebook.create({title})
    return res.json({newNotebook})
}))

//EDIT NOTEBOOK
router.get('/notebooks/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const notebook = await Notebook.findByPk(req.params.id)
    if(notebook){
        notebook.title = req.body.title
        return res.json({notebook})
    }
}))

//DELETE NOTEBOOK
router.get('/notebooks/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const notebook = await Notebook.findByPk(req.params.id)
    await notebook.destroy();
    res.status(204).end()
}))

module.exports = router
