const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');
const closeBtn = document.getElementById('closeBtn');
const updateProfBtn = document.getElementById('updateProfBtn');
const updatePswdBtn = document.getElementById('updatePswdBtn');
const errorText = document.querySelector('.errorText');
const nameD = document.getElementById("name");
const surnameD = document.getElementById("sureName");
const middleNameD = document.getElementById("middleName");
const emailInput = document.getElementById('mail');
emailInput.addEventListener('input', validateEmail);
const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', validatePhone);
let oldPassword = document.getElementById('oldPassword');
let newPassword = document.getElementById('newPassword');
let repeatPassword = document.getElementById('repeatPassword');
newPassword.addEventListener('input', validatePassword);
repeatPassword.addEventListener('input', validateRPassword);
let logged;

let token = localStorage.getItem('auth_token');
$.ajax({
    url: 'https://localhost:44391/EditProfile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logged = true;
        console.log(data);
    },
    error: function (error) {
        console.error(error);
        //window.location = "main.html";
    }
});



/** Перехід на профіль **/
profile.addEventListener("click", function logRegOrRecord(event) {
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



/** ЗМІНА ТЕМИ **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata === "dark") {
        changeTheme()
    }
});
function changeTheme() {
    let themedata;

    if (css.href.match('styles/profile-editing-white.css')) {
        css.href = 'styles/profile-editing-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/profile-editing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}



/** ВАЛІДАЦІЯ ПІБ **/
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
nameD.addEventListener('input', function() {
    let name = nameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    nameD.value = name;
});
surnameD.addEventListener('input', function() {
    let name = surnameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    surnameD.value = name;
});
middleNameD.addEventListener('input', function() {
    let name = middleNameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    middleNameD.value = name;
});



/** ВАЛІДАЦІЯ **/
/** НОМЕР **/
function validatePhone() {
    let regex = /^(0[1-9][0-9]{8})$/;

    // Перевірка, чи введено дійсний номер телефону
    if (!regex.test(phoneInput.value)) {
        errorText.textContent = 'Введіть ваш номер за прикладом:\n095 ХХХХ ХХХ';
        $("#errorWin").animate({top: '70'}, 400);
        updateProfBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        updateProfBtn.disabled = false;
    }
}
/** ПОШТА **/
function validateEmail() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // регулярний вираз для перевірки електронної пошти

    // Перевірка, чи введена дійсна електронна пошта
    if (!regex.test(emailInput.value)) {
        errorText.textContent = 'Введіть вашу поштову скриньку за прикладом:\n example@gmail.com';
        $("#errorWin").animate({top: '70'}, 400);
        updateProfBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        updateProfBtn.disabled = false;
    }
}
/** Пароль **/
function validatePassword() {
    let regex = /^[a-zA-Z0-9_.,]{8,}$/;
    return regex.test(newPassword.value);
}
function validateRPassword() {
    let passwordsMatch = repeatPassword.value === newPassword.value;
    let validPassword = validatePassword();
    if (validPassword && passwordsMatch) {
        $("#errorWin").animate({top: '-100'}, 300);
        updatePswdBtn.disabled = false;
        console.log(true);
        return true;
    } else {
        errorText.textContent = passwordsMatch ? 'Введіть пароль який буде складатись що найменше з 8-ми символів та лише з цифр або алфавіту.' : 'Паролі не співпадають';
        $("#errorWin").animate({top: '70'}, 400);
        updatePswdBtn.disabled = true;
        console.log(false);
        return false;
    }
}
