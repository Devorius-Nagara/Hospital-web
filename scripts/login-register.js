const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const emailInput = document.getElementById('email-registration');
emailInput.addEventListener('input', validateEmail);
const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', validatePhone);
const regBtn = document.getElementById('regBtn');
const loginForm = document.getElementById("login");
const registrationForm = document.getElementById("registration");
const errorText = document.querySelector('.errorText');
let passwordInput = document.getElementById('password-registration');
passwordInput.addEventListener('input', validatePassword);
const surnameD = document.getElementById("surname");
const nameD = document.getElementById("name");
const middleNameD = document.getElementById("middleName");
let logged;

/** Перехід на профіль **/
let token = localStorage.getItem('auth_token');
$.ajax({
    url: 'https://localhost:44391/Profile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        window.location = "profile.html";
    },
    error: function (error) {
        logged = false;
    }
});
profile.addEventListener("click", function logRegOrRecord(event) {
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
    if (css.href.match('styles/login-register-white.css')) {
        css.href = 'styles/login-register-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/login-register-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}


/** ВАЛІДАЦІЯ ПІБ **/
// Функція, яка перетворює першу букву тексту на велику літеру
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
surnameD.addEventListener('input', function() {
    let name = surnameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    surnameD.value = name;
});

nameD.addEventListener('input', function() {
    let name = nameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    nameD.value = name;
});

middleNameD.addEventListener('input', function() {
    let name = middleNameD.value.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    middleNameD.value = name;
});



/** ЛОГІН **/
loginForm.addEventListener("submit", function logRequest(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки
    const mail = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    const data = {
        "mail": mail,
        "password": password
    };
    // Відправляємо запит на сервер
    fetch('https://localhost:44391/Auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ${token}'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.text(); // якщо відповідь успішна, повертаємо текст
            } else {
                throw new Error("Помилка HTTP: " + response.status);
            }
        })
        .then(data => {
            localStorage.setItem('auth_token', data); // зберігаємо токен аутентифікації в локальному сховищі
            window.location.href = "main.html"; // перенаправляємо користувача на іншу сторінку
        })
        .catch(error => {
            console.error(error)
            errorText.textContent = 'Ви ввели невірний логін або пароль. Будь-ласка, перевірте правильність написання данних.';
            $("#errorWin").animate({top: '70'}, 400);
            setTimeout(function() {
                $("#errorWin").animate({top: '-100'}, 400);
            }, 5000);
        });
});

/** РЕЄСТРАЦІЯ **/
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки
    const surname = document.getElementById("surname").value;
    const name = document.getElementById("name").value;
    const middleName = document.getElementById("middleName").value;
    const password = document.getElementById("password-registration").value;
    const mail = document.getElementById("email-registration").value;
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    let gender = "";
    genderRadios.forEach(radio => {
        if (radio.checked) {
            gender = radio.value;
        }
    });
    const birthDate = document.getElementById("birthDate").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const settlementName = document.getElementById("searchCity").value;
    const data = { surname, name, middleName, password, mail, gender, birthDate, phoneNumber, settlementName };

    fetch('https://localhost:44391/Auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.text(); // якщо відповідь успішна, повертаємо текст
            } else {
                throw new Error("Помилка HTTP: " + response.status);
            }
        })
        .then(data => {
            localStorage.setItem('auth_token', data); // зберігаємо токен аутентифікації в локальному сховищі
            window.location.href = "main.html"; // перенаправляємо користувача на іншу сторінку
        })
        .catch(error => {
            console.error(error)
            errorText.textContent = 'Виникла помилка. Можливо користувач з таким номером або поштовою скринькою вже існує.';
            $("#errorWin").animate({top: '70'}, 400);
            setTimeout(function() {
                $("#errorWin").animate({top: '-100'}, 400);
            }, 5000);
        });
    });

/** ВАЛІДАЦІЯ **/
/** НОМЕР **/
function validatePhone() {
    let regex = /^(0[1-9][0-9]{8})$/;

    // Перевірка, чи введено дійсний номер телефону
    if (!regex.test(phoneInput.value)) {
        errorText.textContent = 'Введіть ваш номер за прикладом:\n095 ХХХХ ХХХ';
        $("#errorWin").animate({top: '70'}, 400);
        regBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        regBtn.disabled = false;
    }
}

/** ПОШТА **/
function validateEmail() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // регулярний вираз для перевірки електронної пошти

    // Перевірка, чи введена дійсна електронна пошта
    if (!regex.test(emailInput.value)) {
        errorText.textContent = 'Введіть вашу поштову скриньку за прикладом:\n example@gmail.com';
        $("#errorWin").animate({top: '70'}, 400);
        regBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        regBtn.disabled = false;
    }
}

/** Пароль **/
function validatePassword() {
    let regex = /^[a-zA-Z0-9_.,]{8,}$/;

    if (!regex.test(passwordInput.value)) {
        errorText.textContent = 'Введіть пароль який буде складатись що найменше з 8-ми символів та лише з цифр або алфавіту.';
        $("#errorWin").animate({top: '70'}, 400);
        regBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        regBtn.disabled = false;
    }
}