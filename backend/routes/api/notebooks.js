const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const { Notebook, Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const notebookError = (message) => {
    const err = new Error(message);
    err.status = 401;
    err.title = 'failed';
    err.errors = [message];
    return err;
  };

//GET ALL NOTEBOOKS
router.get('/', restoreUser, asyncHandler(async (req, res, next) => {
    const {user} = req
    if(!user){
        return next(notebookError('Must be logged in to see notebooks'))
    }
    const notebooks = await Notebook.findAll({
        order: [['updatedAt']]
    })
    return res.json(notebooks)
}))

//GET ONE NOTEBOOK
router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
  const notebookId = req.params.id
    const {user} = req
    if(!user){
        return next(notebookError('Must be logged in to see notebooks'))
    }
    const notebook = await Notebook.findAll(
      {order: [['updatedAt']],
        where: {
          id: notebookId
        },
        include: [
          {model: Note}
      ]}
    )
    return res.json(notebook)
}))

const validateNotebook = [
    check('title')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Your notebook must have a title')
      .isLength({ max: 250 })
      .withMessage('Title cannot be more than 250 characters long'),
    handleValidationErrors,
  ];

//ADD NEW NOTEBOOK
router.post('/', restoreUser, validateNotebook, asyncHandler(async (req, res, next) =>{
    const{title} = req.body
    const{user}= req
    if(!user){
        return next(notebookError('Must be logged in to create a notebook'))
    }
    const newNotebook = await Notebook.create({ userId: user.dataValues.id, title})
    return res.json(newNotebook)
}))

//EDIT NOTEBOOK
router.put('/:id(\\d+)', restoreUser, validateNotebook, asyncHandler(async (req, res, next) => {
  const notebookUpdate = await Notebook.findByPk(req.params.id)
  const {title} = req.body
  const { user } = req;
  if (!user) {
    return next(fetchNotesError('You must be logged in to edit a notebook'));
  }
  const notebook = { title, userId: user.dataValues.id };
  await notebookUpdate.update(notebook);
  return res.json(notebookUpdate)


}))

//DELETE NOTEBOOK
router.delete('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(fetchNotesError('You must be logged in to delete a notebook'));
  }
  const notebook = await Notebook.findByPk(req.params.id)
  await notebook.destroy();
  return res.json({message: "Notebook sucessfully deleted."})

}))

module.exports = router
