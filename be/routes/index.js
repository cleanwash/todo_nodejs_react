const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');
router.use('/tasks',taskApi); //'tasks' 주소가 불리면, taskApi를 사용

module.exports = router;
