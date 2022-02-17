const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const { Gallery } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const galleryError = (message) => {
    const err = new Error(message);
    err.status = 401;
    err.title = 'failed';
    err.errors = [message];
    return err;
  };

router.get('/', restoreUser, asyncHandler(async (req, res, next) => {
    const {user} = req
    if(!user){
        return next(galleryError('Must be logged in to see your gallery.'))
    }
    const gallery = await Gallery.findAll({
        order: [['updatedAt']]
    })
    return res.json(gallery)
}))

const validateGallery = [
  check('imageURL')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('You must add an image URL to post a photo.'),
  handleValidationErrors,
];


router.post('/', restoreUser, validateGallery, asyncHandler(async (req, res, next) =>{
    const{imageURL} = req.body
    const{user}= req
    if(!user){
        return next(galleryError('Must be logged in to create a notebook'))
    }
    const newPhoto = await Gallery.create({ userId: user.dataValues.id, imageURL})
    return res.json(newPhoto)
}))

router.put('/:id(\\d+)', restoreUser, validateGallery, asyncHandler(async (req, res, next) => {
  const galleryUpdate = await Gallery.findByPk(req.params.id)
  const {imageURL} = req.body
  const { user } = req;
  if (!user) {
    return next(galleryError('You must be logged in to edit a notebook'));
  }
  const data = { imageURL, userId: user.dataValues.id };
  await galleryUpdate.update(data);
  return res.json(galleryUpdate)
}))

router.delete('/:id(\\d+)', restoreUser, asyncHandler(async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(galleryError('You must be logged in to delete a notebook'));
  }
  const data = await Gallery.findByPk(req.params.id)
  await data.destroy();
  return res.json({message: "Photo sucessfully deleted."})

}))

module.exports = router
