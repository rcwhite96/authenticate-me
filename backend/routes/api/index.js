// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebookRouter = require('./notebooks.js')
const noteRouter = require('./notes')
const noteSearch = require('./search')
const galleryRouter = require('./galleries')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebookRouter)
router.use('/notes', noteRouter)
router.use('/search', noteSearch)
router.use('/gallery', galleryRouter)

module.exports = router;
