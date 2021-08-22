//방만들기 화면
const inviteButton = document.querySelector("button.invite");
const readyButton = document.querySelector(".ready");
const startButton = document.querySelector(".start");
const nameButton = document.querySelector("#ok");
const makeButton= document.querySelector(".make");
const getsubButton = document.querySelector(".getsub");

const clock_DoneButton = document.querySelector(".time_submit");
const clock_ModifyButton = document.querySelector(".time_modify");

const selectbox0 = document.querySelector("#selectbox");
const selectbox1 = document.querySelector("#subselectbox01");
const selectbox2 = document.querySelector("#subselectbox02");
const selectbox3 = document.querySelector("#subselectbox03");
const querybox = document.querySelector("#query");
const automaker = document.querySelector("#automaker");

let countMember = document.querySelector(".count_member");

//준비 버튼
readyButton.addEventListener('click', ready);
function ready() {

}

startButton.addEventListener('click', start);
function start() {
    
}

// +, - 버튼
document.getElementById("p").addEventListener('click', plus);
function plus() {
    let member=document.getElementById("all_member").innerText;
    let member_int=Number(member);
    
    member_int=member_int+1;
    const allMember = document.querySelector("#all_member");
    allMember.innerText=member_int;
}

document.getElementById("m").addEventListener('click', minus);
function minus() {
    let member=document.getElementById("all_member").innerText;
    let member_int=Number(member);
    
    if (member_int>1) {
        member_int=member_int-1;
    }
    
    const allMember = document.querySelector("#all_member");
    allMember.innerText=member_int;
}

console.log(readyButton);
console.log(startButton);
console.log(nameButton);
console.log(makeButton);
console.log(getsubButton);
console.log(clock_DoneButton);
console.log(clock_ModifyButton);

// 초대링크 버튼
inviteButton.addEventListener('click', copyUrl);
function copyUrl() {
    let url = window.location.href;
    let tmp=document.createElement('input');

    document.body.appendChild(tmp);
    tmp.value=url;
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);

    alert("복사되었습니다");
}

//닉네임 설정완료 버튼
nameButton.addEventListener('click', submit);
function submit() {
    const name=document.getElementById("name_txt");
    console.log(name);
    if (name.value==""){
        alert("닉네임을 입력하세요");
    }
    else {
        name.disabled=true;
        socket.emit('mychangeName', $('#name_txt').val());
        alert("설정완료");
    }
}

//과목설정 - 직접 만들기
const make = document.querySelector("#set_myself");

makeButton.addEventListener('click', openSub);
function openSub() {
    make.style.display='flex';
}

function closeSub() {
    make.style.display='none';
}


//과목설정 - 가져오기
const get = document.querySelector("#set_fromdata");

getsubButton.addEventListener('click', openSearch);
function openSearch() {
    get.style.display='flex';
}

function closeSearch() {
    get.style.display='none';
}

//과목설정창 없애기
window.onclick=function(event) {
    if(event.target==get){
        closeSearch();
    }
    if(event.target==make){
        closeSub();
    }
}


//가상시계 설정완료, 수정 버튼
clock_DoneButton.addEventListener('click', submit_clock);
function submit_clock() {

}

clock_ModifyButton.addEventListener('click', modify_clock);
function modify_clock() {

}



//선택박스 0 1 2 3\
/*const spawn=require('child_process').spawn;

const result = spawn('python3', ['../scraping/datachange.py', 'NULL', 'NULL', 'NULL', 'NULL', '박종육']);

result.stdout.on('data', function(data){
    console.log(data.toString());
});
result.stderr.on('data', function(data){ 
    console.log(data.toString()); 
});*/

