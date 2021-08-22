const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const db = mysql.createConnection({
    host:'25.61.78.177',
    user:'dev',
    password:'[qom3192mop!@]',
    database:'sugang'
});
db.connect();
var room_cnt = 0;

router.use(express.static(__dirname));
router.use(express.static(__dirname+'/js'));
router.use(express.static(__dirname+'/css'));

router.get('/setname/master',(req,res) => {
    room_cnt++;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" tyep="text/css" href="/firstpage.css">
        <title>이름 설정</title>
    </head>
    <body>
        <section>
            <div>
                <h1>set name</h1>
            </div>
            <div>
                <form action="/sugang_practice/setname/process" method="post">
                    <input type="hidden" name="room_num" value="${room_cnt}">
                    <input type="text" name="name" placeholder="Input your name">
                    <input type="submit">
                </form>
            </div>
        </section>
    </body>
    </html>
    `;
    res.send(html);
});

router.post('/setname/process',(req,res) => {
    const post = req.body;
    const room_num = post.room_num;
    const student_name = post.name;
    db.query('INSERT INTO student (roomNumber, userID) VALUES(?, ?)',[room_num, student_name], (err, result) => {
        res.redirect(`/sugang_practice/room`);
    });
});

router.get(__dirname+'/setname/member/:roomID',(req,res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" tyep="text/css" href="/firstpage.css">
        <title>이름 설정</title>
    </head>
    <body>
        <section>
            <div>
                <h1>set name</h1>
            </div>
            <div>
                <form action="/sugang_practice/room/${req.params.roomID}" method="post">
                    <input type="hidden" name="room_num" value="${req.params.roomID}">
                    <input type="text" name="name">
                    <input type="submit">
                </form>
            </div>
        </section>
    </body>
    </html>
    `;
    res.send(html);
});

router.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname + "/../1.html"));
});

module.exports = router;