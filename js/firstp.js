//방만들기 화면
const inviteButton = document.querySelector("button.invite");
const readyButton = document.querySelector(".ready");
const startButton = document.querySelector(".start");
const nameButton = document.querySelector("#ok");
const makeButton= document.querySelector(".make");
const getsubButton = document.querySelector(".get_sub");

const clock_DoneButton = document.querySelector(".time_submit");
const clock_ModifyButton = document.querySelector(".time_modify");

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
        alert("설정완료");
    }
}

//과목설정 - 직접 만들기
makeButton.addEventListener('click', makeSub);
function makeSub() {
    
}

//과목설정 - 가져오기
getsubButton.addEventListener('click', openGetsub);
function openGetsub() {

}

//가상시계 설정완료, 수정 버튼
clock_DoneButton.addEventListener('click', submit_clock);
function submit_clock() {

}

clock_ModifyButton.addEventListener('click', modify_clock);
function modify_clock() {

}