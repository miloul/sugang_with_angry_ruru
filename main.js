const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const compression = require('compression');
// const fs = require('fs');
// const path = require('path');
//const view = require('./js/view.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fetch = require("node-fetch");
const homeRouter = require("./routes/home.js");
const roomRouter = require("./routes/room.js");
const examRouter = require("./routes/exam.js");
const spawn=require('child_process').spawn;

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/routes'));
app.use(express.static(__dirname + '/scrapping'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

    var count=0;
    
    var counttoID={}; //[count] : socket.id
    var counttoName={}; //[count] : Name

    app.get('/sugang_practice/room', (req,res) => {
        function MakeNamesList(){
            var Names=[];
            for(var key in counttoID){
                Names.push(counttoName[key]);
                console.log(counttoName[key]);
            }
            return Names;
        }

        function findcount(id){
            for(var key in counttoID){
                if(counttoID[key]==id){
                    return key;
                }
            }
            return -1;
        }

            

        io.on('connection', function(socket){
            if(findcount(socket.id)!=-1)
                return;

            console.log('user connected: ', socket.id);
            
            count++;
            console.log(count);
            console.log(counttoName);

            counttoID[count]=socket.id;
            fetch('https://nickname.hwanmoo.kr/?format=json&count=1')
                .then(res => res.json())
                .then(res => {  
                    counttoName[count] = res.words[0];
                })
                .then(() => {
                    io.emit('listupdate', MakeNamesList());
                })

            socket.on('mychangeName', function(newName){
                counttoName[findcount(socket.id)]=newName;
                io.emit('listupdate', MakeNamesList());
                console.log(counttoName);
            });
            socket.on('disconnect', function(){
                console.log(findcount(socket.id));
                delete counttoID[findcount(socket.id)];
                delete counttoName[findcount(socket.id)];
                console.log('user disconnected: ', socket.id);
                io.emit('listupdate', MakeNamesList());
                console.log(counttoName);

                count--;
            });

            socket.on('search', function(first, second, third, yr, txt){
                const result = spawn('python3', ['scraping/datachange.py', first, second, third, yr, txt]);

                result.stdout.on('data', function(data){
                    io.emit('autocomplete', data.toString());
                });
                result.stderr.on('data', function(data){ 
                    console.log(data.toString()); 
                });
            });
        });
        res.sendFile(__dirname + "/2.html");
    });

    app.use('/sugang_practice', homeRouter);
    app.use('/sugang_practice/room', roomRouter);
    app.use('/sugang_practice/exam', examRouter);

app.use((req,res,next) => {
    res.status(404).send('Sorry can\'t find that!');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  http.listen(3000, function() {
    console.log("SERVER");
    });
// app.get('/sugang_practice', (req, res) => {
//     const title = 'KNU 수강신청 연습사이트';
//     const html = view.printScreen(title, 
//     `
//     <section id="content">
//         <div class="title1">
//             <h1>경북대학교 수강신청 연습사이트</h1>
//         </div>
//         <div class="buttons">
//             <div class="room">
//                 <button class="room_btn"><a href=/sugang_practice/room>친구들과<br>함께 연습하기</a></button>
//             </div>
//             <div class="test">
//                 <button class="test_btn"><a href=/sugang_practice/exam>모의 수강신청<p>오픈기간 : xx.xx.xx ~ xx.xx.xx</p></a></button>
//             </div>
//         </div>
//     </section>
//     <script src="firstp.js"></script>
//     `);
//     res.send(html);
// });

// app.get('/sugang_practice/room', (req, res) => {
//     const title = '방만들기';
//     const html = view.printScreen(title, 
//     `
//     <section id="room_intro">
//         <div>
//             <h2>모의수강신청 방만들기</h2>
//             <span class="mm">
//                 [대기방인원 <span class="count_member"></span>/<span id="all_member">1</span>]
//             </span>
//             <button class="ready">준비</button>
//             <button class="start"><a href=/sugang_practice/room/start>시작</a></button>
//             <button class="invite">초대링크</button>
//         </div>
//     </section>
//     <section id="setting">
//         <h3><span>* </span>방장선택</h3>
//         <div class="setting_wrap">
//             <div class="member">
//                 대기방 인원
//                 <button id="p">+</button>
//                 <button id="m">-</button>
//             </div>
//             <div class="clock">
//                 가상시계
//                 <div id="result_c">
//                     <div class="result_wrap">
//                         <div>
//                             현재시간 <input type="time" id="current_time">
//                         </div>
//                         <div>
//                             시작시간 <input type="time" id="start_time">
//                         </div>
//                         <div class="time_ok">
//                             <button class="time_submit">완료</button>
//                             <button class="time_modify">수정</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     <section>
//         <h3><span>01 </span>설정</h3>
//         <div class="name">
//             닉네임설정 <input type="text" id="name_txt">
//             <button id="ok">설정완료</button>
//         </div>
//     </section>
//     <section id="subject">
//         <h3><span>02 </span>과목설정<span class="notice"> (경쟁률은 알아서 인원조정 부탁드려요)</span></h3>
//         <div>
//             <button class="make">직접만들기</button>
//             <button class="get_sub">경북대 수강목록에서 가져오기</button>
//         </div>
//     </section>
//     <section style="width:100%; height:150px; overflow-y:scroll;">
//         <div class="result_table">
//             <table class=tables>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//         <div class="result_table_b">
//             <table class=tables_body>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//     </section>
//     <section>
//         <h3><span>03 </span>내 수강꾸러미 목록</h3>
//         <div class="sugg" style="width:100%; height:150px; overflow-y:scroll;">
//             <table class=tables>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                         <td>신청클릭<br>횟수</td>
//                         <td>수강신청</td>
//                     </tr>
//                 </thead>
//             </table>
//             <table class=tables_body>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                         <td>신청클릭<br>횟수</td>
//                         <td>수강신청</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//     </section>
//     <script src="js/firstp.js"></script>
//     `);
//     res.send(html);
// });

// app.get('/sugang_practice/exam', (req, res) => {
//     const title = 'KNU 모의수강신청';
//     const html = view.printScreen(title, 
//     `
//         <h1>이 페이지는 준비중입니다</h1>
//     `);
//     res.send(html);
// });

// app.get('/sugang_practice/room/start', (req, res) => {
//     const title = 'KNU 모의수강신청';
//     const html = view.printScreen(title, 
//     `
//     <section id="top">
//     <div class="title">
//         <h2><span>KNU</span>온라인수강신청</h2>
//         <button class="end"><a href=/sugang_practice/room/result>종료</a></button>
//         <button class="log">로그보기</button>
//     </div>
//     </section>
//     <section id="inform">
//         <div class="inform">
//             <div class="b">학번/성명 <input type="text" readonly="true"></div>
//             <div class="b">소속 <input type="text" readonly="true"></div>
//             <div class="b">수강제한학점 <input type="text" readonly="true"></div>
//         </div>
//     </section>
//     <section id="search">
//         <h3><span>01</span> 교과목검색</h3>
//         <div class="search">
//             <div class="subcode">교과목번호(10자리) <input type="text"></div>
//             <div class="monza">자동입력방지문자 <input type="text">
//             <span>[이미지변경]</span></div>
//             <button class="enter">Enter</button>
//             <button class="reset">Reset</button>
//         </div>
//     </section>
//     <section id="s_result">
//         <h3><span>02</span> 교과목검색결과</h3>
//         <button class="input">입력</button>
//         <button class="cancel">취소</button>
//     </section>
//     <section style="width:100%; height:150px; overflow-y:scroll;">
//         <div class="result_table">
//             <table class=tables>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//         <div class="result_table_b">
//             <table class=tables_body>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//     </section>
//     <section id="list">
//         <h3><span>03</span> 수강신청목록</h3>
//         <button class="modify">수정</button>
//         <button class="delete">삭제</button>
//     </section>
//     <section style="width:100%; height:200px; overflow-y:scroll;">
//         <div class="s_list">
//             <table class=tables>
//                 <thead>
//                     <tr>
//                         <td>삭제선택</td>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//         <div class="result_table_b">
//             <table class=tables_body>
//                 <thead>
//                     <tr>
//                         <td>삭제선택</td>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//     </section>
//     <section id="sugg_list">
//         <div class="sugg_intro">
//             <h3><span>04</span> 수강꾸러미 목록</h3>
//             <p>수강신청의 <span>"신청"을 500회 이상</span> 클릭 시 "수강꾸러미목록"에서 <span>해당 과목이 삭제</span>됩니다.<br>* 만약 수강꾸러미목록에서 삭제된 교과목을 수강신청하려면 위의 "교과목검색"에서 수강신청 할 수 있음</p>
//         </div>
//     </section>
//     <section style="width:100%; height:200px; overflow-y:scroll;">
//         <div class="sugg_table">
//             <table class=tables>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                         <td>신청클릭<br>횟수</td>
//                         <td>수강신청</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//         <div class="result_table_b">
//             <table class=tables_body>
//                 <thead>
//                     <tr>
//                         <td>교과목번호</td>
//                         <td>교과목명</td>
//                         <td>교과구분</td>
//                         <td>학점</td>
//                         <td>강의시간</td>
//                         <td>제한인원</td>
//                         <td>수강인원</td>
//                         <td>신청클릭<br>횟수</td>
//                         <td>수강신청</td>
//                     </tr>
//                 </thead>
//             </table>
//         </div>
//     </section>
//     <section id="see_log">
//         <div class="log_wrap">
//             <div class="cheer">
//                 <h1>로그</h1>
//             </div>
//             <div class="btn">
//                 <button class="close_btn">닫기</button>
//             </div>
//         </div>
//     </section>
//     <script src="js/sugang.js"></script>
//     `);
//     res.send(html);
// });

// app.get('/sugang_practice/room/result', (req, res) => {
//     const title = '결과!';
//     const html = view.printScreen(title, 
//     `
//     <div class="title1">
//     <div>
//         <h2>가장 빠른 1등! <span>누구누구</span></h2>
//         <br><h2>가장 많이 성공한 1등! <span>누구누구</span></h2>
//     </div>
//     </div>
//     <div class="buttons">
//         <button class="re" onclick=""><a href=/sugang_practice/room>다시하기</a></button>
//         <button class="home"><a href=/sugang_practice>홈으로</a></button>
//     </div>
//     `);
//     res.send(html);
// });
