// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebookRouter = require('./notebooks.js')
const noteRouter = require('./notes')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebookRouter)
router.use('/notes', noteRouter)

module.exports = router;
