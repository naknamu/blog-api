const express = require('express');
const router = express.Router();

const { loginUser, createUser } = require("../controllers/userController");

router.post('/login', loginUser);

router.post('/create', createUser);

module.exports = router;