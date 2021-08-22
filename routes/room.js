const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(__dirname + '/css'));
router.use(express.static(__dirname + '/js'));
router.use(express.static(__dirname + '/routes'));
router.use(express.static(__dirname));

var count=0;
    
var counttoID={}; //[count] : socket.id
var counttoName={}; //[count] : Name

router.get('/start', (req,res) => {
    res.sendFile(path.resolve(__dirname + "/../4.html"));
});

router.get('/result', (req,res) => {
    res.sendFile(path.resolve(__dirname + "/../5.html"));
});

module.exports = router;