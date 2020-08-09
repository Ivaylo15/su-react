const suggestedBook = require('../controllers/suggestedBook');
const router = require('express').Router();
const { auth } = require('../utils');


router.get('/', suggestedBook.get);

router.post('/', auth(), suggestedBook.post);

router.delete('/:id', auth(), suggestedBook.delete);

module.exports = router;

