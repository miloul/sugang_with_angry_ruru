const express = require('express');
const app = express();

// http
const http = require('http').Server(app);
const io = require('socket.io')(http);

// DB
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/static", express.static('public"'));

const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "[qom3192mop!@]",
    database: "sugang"
});
connection.connect();

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/client.html')
});

// http 함수
io.on('connection', function(socket) {
    socket.on('update class', function(cNumber, cName, cType, cCredit, cTime, pLimit, pNow) {
        var cNumberBox = cNumber;
        console.log(cNumber);
        connection.query(
            "INSERT INTO subject(classNumber, className, classType, classCredit, classTime, personLimit, personNow) \
                VALUES (?, ?, ?, ?, ?, ?, ?)", [cNumber, cName, cType, cCredit, cTime, pLimit, pNow]),
        io.emit('update finish', cNumberBox) //, cName, cType, cCredit, cTime, pLimit, pNow)
    });
});

http.listen(3000, function() {
    console.log("SERVER");
})