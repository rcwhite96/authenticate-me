const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const { Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const noteError = (message) => {
    const err = new Error(message);
    err.status = 401;
    err.title = 'failed';
    err.errors = [message];
    return err;
  };

//GET ALL NOTES
router.get('/', restoreUser, asyncHandler(async (req, res, next) => {
    const {user} = req
    if(!user){
        return next(noteError('Must be logged in to see notes'))
    }
    const notebooks = await Note.findAll({
        order: [['updatedAt']]
    })
    return res.json(notebooks)
}))

//GET ONE NOTE
router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
    const {user} = req
    if(!user){
        return next(noteError('Must be logged in to see notes'))
    }
    const note = await Note.findByPk(req.params.id)
    return res.json(note)
}))

const validateNote = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Your note must have a title')
      .isLength({ max: 250 })
      .withMessage('Title cannot be more than 250 characters long'),
    handleValidationErrors,
  ];

//ADD NEW NOTE
router.post('/', restoreUser, validateNote, asyncHandler(async (req, res, next) =>{
    const{title, hookSize, needleSize, yarn, description} = req.body
    const{user}= req
    if(!user){
        return next(noteError('Must be logged in to create a note'))
    }
    const newNote = await Note.create({ userId: user.dataValues.id, title, hookSize, needleSize, yarn, description})
    return res.json(newNote)
}))

//EDIT NOTE
router.put('/:id(\\d+)', restoreUser, validateNote, asyncHandler(async (req, res, next) => {
  const noteUpdate = await Note.findByPk(req.params.id)
  const {title} = req.body
  const { user } = req;
  if (!user) {
    return next(fetchNotesError('You must be logged in to edit a note'));
  }
  const note = { title, userId: user.dataValues.id };
  await noteUpdate.update(note);
  return res.json(noteUpdate)


}))

//DELETE NOTE
router.delete('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(fetchNotesError('You must be logged in to delete a note'));
  }
  const note = await Note.findByPk(req.params.id)
  await note.destroy();
  return res.json({message: "Note sucessfully deleted."})

}))

module.exports = router
