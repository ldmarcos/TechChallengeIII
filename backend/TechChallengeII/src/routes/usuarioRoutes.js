const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/signup', usuarioController.signup);
router.post('/login', usuarioController.login);

module.exports = router;
