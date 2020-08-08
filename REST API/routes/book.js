const book = require('../controllers/book');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', book.get);
router.get('/:id', book.getSpecificBook);
router.get('/author/:id', book.getBookByAuthor);
router.get('/publisher/:id', book.getBookByPublisher);
router.get('/genre/:id', book.getBookByGenre);

router.post('/', auth(), book.post);

router.delete('/:id', book.delete);

router.put('/editBook/:id', auth(), book.editWholeBook);
router.put('/editBookRaiting/:id', auth(), book.editRaitings);


module.exports = router;

