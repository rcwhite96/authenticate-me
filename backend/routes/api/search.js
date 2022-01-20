const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { Note } = require('../../db/models');

const router = express.Router();

const searchError = (message) => {
    const error = new Error(message)
    error.status = 401
    error.title = 'Search failed.'
    error.errors = [message]
    return err
}

async function searchNotes(term){
    const notes = await Note.findAll({
        where: {
            title: {[Op.iLike]: `%${term}%`}
        }
    })
    return notes
}

router.get('/:searchTerm', asyncHandler(async(req, res) => {
    const data = req.params.searchTerm
    const notes = await searchNotes(data)
    return res.json(notes)
}))

module.exports = router;
