/// 수강신청 페이지
const log = document.querySelector("#see_log");
const openButton = document.querySelector("button.log");
const closeButton = document.querySelector("button.close_btn");

const endButton = document.querySelector(".end");
const enterButton = document.querySelector(".enter");
const resetButton = document.querySelector(".reset");
const inputButton = document.querySelector(".input");
const cancelButton = document.querySelector(".cancel");
const modifyButton = document.querySelector(".modify");
const deleteButton = document.querySelector(".delete");

console.log(log);
console.log(openButton);
console.log(closeButton);

console.log(endButton);
console.log(enterButton);
console.log(resetButton);
console.log(inputButton);
console.log(cancelButton);
console.log(modifyButton);
console.log(deleteButton);

//로그보기 관련
function openLog() {
    log.style.display='flex';
}

function closeLog() {
    log.style.display='none';
}

window.onclick=function(event) {
    if(event.target==log){
        closeLog();
    }
}

openButton.addEventListener('click', openLog);
closeButton.addEventListener('click', closeLog);