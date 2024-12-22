const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

//회원가입 
router.post('/', userController.signup);

//로그인 -> 로그인 성공 시에는, 토큰을 보내준다 -> 나중에는 fe에서, 이 정보를 저장한다 
router.post('/login', userController.login);

module.exports = router;
