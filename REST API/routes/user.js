const user = require('../controllers/user');
const router = require('express').Router();

router.get('/', user.get);
router.get('/:id', user.getSpecificUser);

router.post('/register', user.post.register);

router.post('/login', user.post.login);

router.post('/logout', user.post.logout);

router.put('/:id', user.put);
router.put('/editUserInfo/:id', user.editUserInfo);

router.delete('/:id', user.delete);

module.exports = router;