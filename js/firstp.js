//방만들기 화면
const checkClock = document.querySelector("#check_clock");
const result_c = document.querySelector("#result_c");
const checkLogin = document.querySelector("#check_login");
const result_l = document.querySelector("#result_l");
const inviteButton = document.querySelector("button.invite");

const readyButton = document.querySelector(".ready");
const startButton = document.querySelector(".start");
const nameButton = document.querySelector(".ok");
const member_pButton = document.querySelector(".p");
const member_mButton = document.querySelector(".m");
const makeButton= document.querySelector(".make");
const getsubButton = document.querySelector(".get_sub");

const clock_DoneButton = document.querySelector(".time_submit");
const clock_ModifyButton = document.querySelector(".time_modify");
const login_DoneButton = document.querySelector(".id_submit");
const login_ModifyButton = document.querySelector(".id_modify");

const countMember = document.querySelector(".count_member");
const allMember = document.querySelector(".all_member");

member_pButton.addEventListener('click', plusMember);
member_nButton.addEventListener('click', minusMember);

function plusMember() {
    let allMember_int=Number(allMember.value);
    allMember.innerText=allMember_int;

}

console.log(readyButton);
console.log(startButton);
console.log(nameButton);
console.log(member_pButton);
console.log(member_mButton);
console.log(makeButton);
console.log(getsubButton);
console.log(clock_DoneButton);
console.log(clock_ModifyButton);
console.log(login_DoneButton);
console.log(login_ModifyButton);

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

/*result_c.style.display="none";
checkClock.addEventListener('change', function(e){
    if (checkClock.checked){
        result_c.style.display="initial";
    }
    else {
        result_c.style.display="none";
    }
});*/
result_l.style.display="none";
checkLogin.addEventListener('change', function(e){
    if (checkLogin.checked){
        result_l.style.display="initial";
    }
    else {
        result_l.style.display="none";
    }
});