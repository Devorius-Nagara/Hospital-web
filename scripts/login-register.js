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
var selectElement = document.getElementById("searchCity");


$(document).ready(function() {
    $('.select2').select2();
});

/** Перехід на профіль **/
let token = localStorage.getItem('auth_token');
$.ajax({
    url: host + '/Profile',
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
document.getElementById('profileCase').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});

/** ПОЛУЧЕННЯ ДАННИХ ПРО НАСЕЛЕНИЙ ПУНКТ **/
$.ajax({
    url: host + '/Auth',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        for (var settlementNum = 0; settlementNum < data.settlements.length; settlementNum++) {
            for (var districtNum = 0; districtNum < data.districts.length; districtNum++){
                if(data.districts[districtNum].id === data.settlements[settlementNum].districtId){
                    for(var regionNum = 0; regionNum < data.regions.length; regionNum++){
                        if (data.regions[regionNum].id === data.districts[districtNum].regionId){
                            var option = document.createElement("option");
                            // Встановлюємо значення атрибута value
                            option.value = data.settlements[settlementNum].name;
                            // Встановлюємо текст опції
                            option.text = data.settlements[settlementNum].name + ", " + data.districts[districtNum].name + ", " + data.regions[regionNum].name;
                            // Додаємо опцію до вибору
                            selectElement.add(option);
                        }
                    }
                }
            }

        }
    },
    error: function (error) {
        console.error(error);
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
    let name = surnameD.value;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    surnameD.value = name;
});

nameD.addEventListener('input', function() {
    let name = nameD.value;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    nameD.value = name;
});

middleNameD.addEventListener('input', function() {
    let name = middleNameD.value;
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
    fetch(host + '/Auth/login', {
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

    var selectedOption = selectElement.options[selectElement.selectedIndex];
    if (selectedOption.value === "Не вказано") {
        console.log("Не вибрано");
        errorText.textContent = 'Виберіть місце проживання';
        $("#errorWin").animate({top: '70'}, 400);
        setTimeout(function() {
            $("#errorWin").animate({top: '-100'}, 400);
        }, 5000);
        return;
    }

    fetch(host + '/Auth/register', {
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
    let regex = /^\+380\s\d{2}\s\d{4}\s\d{3}$/;

    // Перевірка, чи введено дійсний номер телефону
    if (!regex.test(phoneInput.value)) {
        errorText.textContent = 'Введіть ваш номер за прикладом:\n+380 95 ХХХХ ХХХ';
        $("#errorWin").animate({top: '70'}, 400);
        regBtn.disabled = true;
    } else {
        $("#errorWin").animate({top: '-100'}, 300);
        regBtn.disabled = false;
    }
}


phoneInput.addEventListener('input', function() {

    const originalValue = this.value;
    let numericValue = originalValue.replace(/\D/g, '');

    if (event.inputType === 'deleteContentBackward') {
        const lastChar = originalValue.charAt(originalValue.length - 1);
        if (lastChar === ' ') {
            numericValue = numericValue.slice(0, -1);
        }
        formattedValue = '';
    }

    if (numericValue.length > 10) {
        numericValue = numericValue.slice(0, 12);
    }

    let formattedValue = '';

    if (numericValue.length > 2) {
        formattedValue += `+${numericValue.slice(0, 3)} `;
        numericValue = numericValue.slice(3);
    }

    if (numericValue.length > 4) {
        formattedValue += `${numericValue.slice(0, 2)} `;
        numericValue = numericValue.slice(2);
    }

    if (numericValue.length > 0) {
        formattedValue += `${numericValue.slice(0, 4)} `;
        numericValue = numericValue.slice(4);
    }

    if (numericValue.length > 0) {
        formattedValue += `${numericValue}`;
    }

    this.value = formattedValue;
});









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