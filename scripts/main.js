const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const logRegOrRecord = document.getElementById('logRegOrRecord');
const logOnProf = document.getElementById('logOnProf');
const txtOfBtn = document.querySelector('.txtOfBtn');
let logged;


/** Перехід на профіль **/
document.getElementById('profileCase').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});

/** Зміна теми **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata === "dark") {
        changeTheme()
    }
});
function changeTheme() {
    let themedata;
    if (css.href.match('styles/main-white.css')) {
        css.href = 'styles/main-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/main-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));

}

/** Запити на сервер **/
let token = localStorage.getItem('auth_token');

$.ajax({
    url: host + '/Profile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logOnProf.classList.remove("hiding");
        txtOfBtn.textContent = "Записатись до лікара";
        logged = true;
    },
    error: function (error) {
        logOnProf.classList.add("hiding");
        localStorage.removeItem('auth_token');
        txtOfBtn.textContent = "Увійдіть або зареєструйтесь";
        logged = false;
    }
});

logRegOrRecord.addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "city.html";
    }else {
        window.location.href = "login-register.html";
    }
});
logOnProf.addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});

