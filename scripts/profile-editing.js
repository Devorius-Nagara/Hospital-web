const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');
const closeBtn = document.getElementById('closeBtn');
const updateProf = document.getElementById('updateProf');
const updatePswd = document.getElementById('updatePswd');
const healthForm = document.getElementById('healthForm');
const errorText = document.querySelector('.errorText');
const nameD = document.getElementById("name");
const surnameD = document.getElementById("sureName");
const middleNameD = document.getElementById("middleName");
const emailInput = document.getElementById('mail');
emailInput.addEventListener('input', validateEmail);
const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', validatePhone);
const birthDate = document.getElementById('birthDate');
const newPassword = document.getElementById('newPassword');
const repeatPassword = document.getElementById('repeatPassword');
newPassword.addEventListener('input', validatePassword);
repeatPassword.addEventListener('input', validateRPassword);
const maleRadio = document.querySelector('input[name="gender"][value="Чоловік"]');
const femaleRadio = document.querySelector('input[name="gender"][value="Жінка"]');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const bloodPressure = document.getElementById('bloodPressure');
const pulse = document.getElementById('pulse');
const bloodSugar = document.getElementById('bloodSugar');
const bodyTemperature = document.getElementById('bodyTemperature');
const additionalInformation = document.getElementById('additionalInformation');
const selectedSubstance = document.getElementById("selectedPils");
const searchCity = document.getElementById("searchCity");
const selectSpecialities = document.getElementById('selectSpecialities');
let logged;

/** ЗАПИТ ДАННИХ **/
let token = localStorage.getItem('auth_token');
$.ajax({
    url: host + '/EditProfile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logged = true;
        console.log(data);
        nameD.value = data.registrationModel.name;
        surnameD.value = data.registrationModel.surname;
        middleNameD.value = data.registrationModel.middleName;
        emailInput.value = data.registrationModel.mail;
        phoneInput.value = data.registrationModel.phoneNumber;

        var date = new Date(data.registrationModel.birthDate);
        var yyyy = date.getFullYear().toString();
        var dd = date.getDate().toString().padStart(2, '0');
        var MM = (date.getMonth() + 1).toString().padStart(2, '0');
        var formattedDate = yyyy + '-' + MM + '-' + dd;
        birthDate.value = formattedDate;

        let gender = data.registrationModel.gender;
        if (gender === 'Чоловік') {
            maleRadio.checked = true;
        } else if (gender === 'Жінка') {
            femaleRadio.checked = true;
        }

        if (data.indexes !== null){
            height.value = data.indexes.height;
            weight.value = data.indexes.weight;
            bloodPressure.value = data.indexes.bloodPressure;
            pulse.value = data.indexes.pulse;
            bloodSugar.value = data.indexes.bloodSugar;
            bodyTemperature.value = data.indexes.bodyTemperature;
            additionalInformation.value = data.indexes.additionalInformation;
        }



        for (var substance = 0; substance < data.noAllergySubstance.length; substance++) {
            var option = document.createElement("option");
            // Встановлюємо значення атрибута value
            option.value = data.noAllergySubstance[substance].id;
            // Встановлюємо текст опції
            option.text = data.noAllergySubstance[substance].substanceName;
            // Додаємо опцію до вибору
            selectedSubstance.add(option);
        }

        for (var alergNum = 0; alergNum < data.allergySubstance.length; alergNum++) {
            option = document.createElement("option");
            option.value = data.allergySubstance[alergNum].id;
            option.text = data.allergySubstance[alergNum].substanceName;
            option.selected = true;
            selectedSubstance.add(option);
        }



        let currentSettlement = data.registrationModel.settlementName;
        for (var settlementNum = 0; settlementNum < data.settlements.length; settlementNum++) {
            for (var districtNum = 0; districtNum < data.districts.length; districtNum++){
                if(data.districts[districtNum].id === data.settlements[settlementNum].districtId){
                    for(var regionNum = 0; regionNum < data.regions.length; regionNum++){
                        if (data.regions[regionNum].id === data.districts[districtNum].regionId){
                            let optionСity = document.createElement("option");
                            // Встановлюємо значення атрибута value
                            optionСity.value = data.settlements[settlementNum].name;
                            // Встановлюємо текст опції
                            optionСity.text = data.settlements[settlementNum].name + ", " + data.districts[districtNum].name + ", " + data.regions[regionNum].name;
                            // Додаємо опцію до вибору
                            searchCity.add(optionСity);
                            if (currentSettlement === data.settlements[settlementNum].name){
                                optionСity.selected = true;
                            }
                        }
                    }
                }
            }

        }
    },
    error: function (error) {
        console.error(error);
        window.location = "main.html";
    }
});

$.ajax({
    url: host + '/Specialities',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        for (var specNum = 0; specNum < data.length; specNum++) {
            var optionForSpec = document.createElement("option");
            optionForSpec.value = data[specNum].id;
            optionForSpec.text = data[specNum].name;
            selectSpecialities.add(optionForSpec);
        }
    },
    error: function (error) {
        window.location = "main.html";
    }
});

/** Селекти **/
$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
    $(".js-example-templating").select2();
    $('.selectCity').select2();
    $('.selectSpecialities').select2();
});

/** Відображення файлу **/
let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.files.length;

        if (countFiles)
            label.querySelector('.input__file-button-text').innerText = 'Файл вибрано';
        else
            label.querySelector('.input__file-button-text').innerText = labelVal;
    });
});


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

/** ЗМІНА ТЕМИ **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata !== "dark" && themedata !== "white"){
        let themedata;
        css.href = 'styles/profile-editing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        themedata = "white";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }else if (themedata === "white"){
        css.href = 'styles/profile-editing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
    }else if(themedata === "dark") {
        let themedata;
        css.href = 'styles/profile-editing-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';
        themedata = "dark";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
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



/** LOGOUT **/
const btnLogOut = document.getElementById('btnLogOut')
btnLogOut.addEventListener('click', function logOut() {
    localStorage.removeItem('auth_token')
    window.location.href = "main.html"
})



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
/** ПІБ **/
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

/** Відправлення профільних данних **/
updateProf.addEventListener("submit", function(event) {
    event.preventDefault();
    const surname = document.getElementById("sureName").value;
    const name = document.getElementById("name").value;
    const middleName = document.getElementById("middleName").value;
    const mail = document.getElementById("mail").value;
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    let gender;
    genderRadios.forEach(radio => {
        if (radio.checked) {
            gender = radio.value;
        }
    });
    const birthDate = document.getElementById("birthDate").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const data = { surname, name, middleName, mail, gender, birthDate, phoneNumber};

    fetch(host + '/updateUserData', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = 'Дані успішно збережено.';
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            } else {
                response.text().then(errorMessage => {
                    errorText.textContent = errorMessage;
                    $("#errorWin").animate({top: '70'}, 400);
                    setTimeout(function() {
                        $("#errorWin").animate({top: '-100'}, 400);
                    }, 5000);
                });
            }
        })
});

/** Зміна паролю **/
updatePswd.addEventListener("submit", function(event) {
    event.preventDefault();
    let oldPassword = document.getElementById('oldPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    const data = { oldPassword, newPassword };
    console.log(data);

    fetch(host + '/updatePassword', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = 'Пароль успішно оновлено.';
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            } else {
                response.text().then(errorMessage => {
                    errorText.textContent = errorMessage;
                    $("#errorWin").animate({top: '70'}, 400);
                    setTimeout(function() {
                        $("#errorWin").animate({top: '-100'}, 400);
                    }, 5000);
                });
            }
        })
});

/** Здоров'я та самопочуття **/
healthForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let height = document.getElementById('height').value || null;
    let weight = document.getElementById('weight').value || null;
    let bloodPressure = document.getElementById('bloodPressure').value || null;
    let pulse = document.getElementById('pulse').value || null;
    let bloodSugar = document.getElementById('bloodSugar').value || null;
    let bodyTemperature = document.getElementById('bodyTemperature').value || null;
    let additionalInformation = document.getElementById('additionalInformation').value || null;
    const data = { height, weight, bloodPressure, pulse, bloodSugar, bodyTemperature, additionalInformation };

    console.log(data);

    fetch(host + '/updateIndexes', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = 'Ваші данні успішно оновлено.';
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            } else {
                errorText.textContent = "Виникла помилка";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            }
        })
});

/** Протипоказані речовини **/
document.getElementById("substanceForm").addEventListener("submit", function() {
    event.preventDefault();
    var selectedOptions = selectedSubstance.selectedOptions;
    var allergySubstance = [];
    for (var i = 0; i < selectedOptions.length; i++) {
        var option = selectedOptions[i];
        var substance = {
            id: option.value,
            substanceName: option.text
        };
        allergySubstance.push(substance);
    }
    fetch(host + '/updateAllergies', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(allergySubstance),
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = 'Ваші данні успішно оновлено.';
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            } else {
                errorText.textContent = "Виникла помилка";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            }
        })
});

/** Вибір міста проживання **/
document.getElementById("searchCityForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки
    const surname = null;
    const name = null;
    const middleName = null;
    const password = null;
    const mail = null;
    let gender = null;
    const birthDate = null;
    const phoneNumber = null;
    const settlementName = searchCity.value;
    console.log(settlementName)
    const data = { surname, name, middleName, password, mail, gender, birthDate, phoneNumber, settlementName };

    fetch(host + '/updateLocation', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = 'Ваші данні успішно оновлено.';
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            } else {
                errorText.textContent = "Виникла помилка";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);
            }
        })
});

/** Запит на лікара **/
document.getElementById("doctorRequest").addEventListener("submit", function(event) {
    event.preventDefault(); // Забороняємо перезавантаження сторінки

    const input = document.getElementById('input__file');
    const file = input.files[0];
    const reader = new FileReader();

    let specialitiesData = {
            id: $(".selectSpecialities").val(),
            substanceName: $(".selectSpecialities").find(':selected').text(),
        };

    reader.readAsDataURL(file);
    reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        const data = {
            photo: base64,
            specialities: specialitiesData
        };
        console.log(data)

        fetch(host + '/sendRequest', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    errorText.textContent = 'Заявка успішно відправлена.';
                    $("#errorWin").animate({top: '70'}, 400);
                    setTimeout(function() {
                        $("#errorWin").animate({top: '-100'}, 400);
                    }, 5000);
                } else {
                    errorText.textContent = "Виникла помилка";
                    $("#errorWin").animate({top: '70'}, 400);
                    setTimeout(function() {
                        $("#errorWin").animate({top: '-100'}, 400);
                    }, 5000);
                }
            })
    };
});