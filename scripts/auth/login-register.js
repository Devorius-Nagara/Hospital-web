const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
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


    $.ajax({
        url: 'https://localhost:44391/api/test',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.error(error);
        }
    });


const loginForm = document.getElementById("login");
const registrationForm = document.getElementById("registration");

// Додаємо обробник подій для форми входу
loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки
    const mail = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    const data = {
        "mail": mail,
        "password": password
    };
    console.log(data);
    // Відправляємо запит на сервер
    fetch('https://localhost:44391/Auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            localStorage.setItem('auth_token', JSON.stringify(response.text));
        })
        .catch(error => {
            alert(error);
        });
});

// Додаємо обробник подій для форми реєстрації
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
    const settlementName = "Коломия";
    const data = { surname, name, middleName, password, mail, gender, birthDate, phoneNumber, settlementName };
    console.log(data);

    fetch('https://localhost:44391/Auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            alert(error);
            console.log(error);
        });
});
