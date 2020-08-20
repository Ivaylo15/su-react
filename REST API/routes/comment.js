const comment = require('../controllers/comment');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', comment.get);
router.get('/book/:id', comment.getCommentsForSpecificBook);
router.get('/user/:id', comment.getCommentsForSpecificUser);
router.get('/specComment/:id', comment.getSpecComment);


router.post('/', auth(), comment.post);

router.put('/:id', auth(), comment.put);

router.delete('/:id', comment.delete);

module.exports = router;