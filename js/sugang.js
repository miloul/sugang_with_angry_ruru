/// 수강신청 페이지
const log = document.querySelector("#see_log");
const openButton = document.querySelector("button.log");
const closeButton = document.querySelector("button.close_btn");

console.log(log);
console.log(openButton);
console.log(closeButton);

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