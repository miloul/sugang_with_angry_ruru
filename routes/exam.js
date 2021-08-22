const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/sugang_practice/exam', (req,res) => {
    res.sendFile(path.resolve(__dirname + "/../3.html"));
});

module.exports = router;