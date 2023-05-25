const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const closeBtn = document.getElementById('closeBtn');
const errorText = document.querySelector('.errorText');
let logged;

$(document).ready(function() {
    $('.select2').select2();
});



/** ЗМІНА ТЕМИ **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata !== "dark" && themedata !== "white"){
        let themedata;
        css.href = 'styles/city-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }else if (themedata === "white"){
        css.href = 'styles/city-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
    }else if(themedata === "dark") {
        let themedata;
        css.href = 'styles/city-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }
});
function changeTheme() {
    let themedata;

    if (css.href.match('styles/city-white.css')) {
        css.href = 'styles/city-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/city-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}


/** Перехід на профіль **/
document.getElementById('profileCase').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});
closeBtn.addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});



/** ЗАПИТИ **/