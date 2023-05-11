const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const closeBtn = document.getElementById('closeBtn')
const errorText = document.getElementById('errorText')
const dataInfo = document.getElementById('dataInfo')
let logged;
let patientId;

let token = localStorage.getItem('auth_token');
let caseId = localStorage.getItem('caseId') //'83d8e883-6f2e-5831-a776-6efabe41f21b'
$.ajax({
    url: host + '/Profile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        logged = true;
    },
    error: function (error) {
        window.location = 'main.html'
        logged = false;
    }
});



/** Зміна теми **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);


    if (themedata !== "dark" && themedata !== "white"){
        let themedata;
        css.href = 'styles/case-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }else if (themedata === "white"){
        css.href = 'styles/case-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
    }else if(themedata === "dark") {
        let themedata;
        css.href = 'styles/case-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }
});
function changeTheme() {
    let themedata;
    if (css.href.match('styles/case-white.css')) {
        css.href = 'styles/case-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/case-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));

}

/** Селекти **/
$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
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

let allData
/** ЗАПИТИ **/
fetch(host + '/CaseManagment', {
    method: 'POST',
    body: JSON.stringify(caseId),
    headers: {
        'Authorization': 'Bearer ' + [token],
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
        allData = data
        const dateCreateString = data.createDate;
        const date = new Date(dateCreateString);
        const day = date.getDate().toString().padStart(2, '0'); // день з ведучим нулем
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // місяць з ведучим нулем
        const year = date.getFullYear().toString();
        const formattedDate = `${day}/${month}/${year}`;
        dataInfo.textContent = formattedDate;


        let patientBirthDate = new Date(data.patientModel.birthDate);
        let patientAgeDifMs = Date.now() - patientBirthDate.getTime();
        let patientAgeDate = new Date(patientAgeDifMs);
        let patientAge = Math.abs(patientAgeDate.getUTCFullYear() - 1970);
        let doctorBirthDate = new Date(data.doctorModel.birthDate);
        let doctorAgeDifMs = Date.now() - doctorBirthDate.getTime();
        let doctorAgeDate = new Date(doctorAgeDifMs);
        let doctorAge = Math.abs(doctorAgeDate.getUTCFullYear() - 1970);

        document.getElementById('anamnesisData').innerHTML =
            "<p class=\"simpleInfoText\">" + data.anamnesis + "</p>"
        document.getElementById('moreInfoData').innerHTML =
            "<p class=\"simpleInfoText\">" + data.treatmentInformation + "</p>"
        document.getElementById('diseaseName').innerHTML =
            "<p class=\"titleText1\">" + data.diseaseName + "</p>"

        document.getElementById('patientInfo').innerHTML =
            "<p class=\"titleText1\">Пацієнт</p>" +
            "<p class=\"simpleInfoText\">ПІБ: "+ data.patientModel.surname + " " + data.patientModel.name + " " + data.patientModel.middleName + "</p>" +
            "<p class=\"simpleInfoText\">Вік: " + patientAge + " Років</p>" +
            "<p class=\"simpleInfoText\">Стать: " + data.patientModel.gender + "</p>" +
            "<p class=\"titleText2\">Контактні дані:</p>" +
            "<p class=\"simpleInfoText\">" + data.patientModel.phoneNumber + "</p>" +
            "<p class=\"simpleInfoText\"> " + data.patientModel.mail + " </p>"
        document.getElementById('doctorInfo').innerHTML =
            "<p class=\"titleText1\">Лікар</p>" +
            "<p class=\"simpleInfoText\">ПІБ: "+ data.doctorModel.surname + " " + data.doctorModel.name + " " + data.doctorModel.middleName + "</p>" +
            "<p class=\"simpleInfoText\">Вік: " + doctorAge + " Років</p>" +
            "<p class=\"simpleInfoText\">Стать: " + data.doctorModel.gender + "</p>" +
            "<p class=\"titleText2\">Контактні дані:</p>" +
            "<p class=\"simpleInfoText\">" + data.doctorModel.phoneNumber + "</p>" +
            "<p class=\"simpleInfoText\"> " + data.doctorModel.mail + " </p>"

        document.getElementById('officeAndHospitalInformation').innerHTML =
            "<p class=\"titleText1\">Лікарня</p>" +
            "<p class=\"simpleInfoText\">Назва: " + data.hospital.name + "</p>" +
            "<p class=\"simpleInfoText\">Область: " + data.hospital.regionDesc + "</p>" +
            "<p class=\"simpleInfoText\">Нас.пункт: " + data.hospital.disctrictDesc + "</p>" +
            "<p class=\"simpleInfoText\">Тип: " + data.hospital.typeDesc + "</p>" +
            "<p class=\"titleText2\">Контактні дані:</p>" +
            "<p class=\"simpleInfoText\">" + data.hospital.contactNumber + "</p>" +
            "<p class=\"simpleInfoText\"> " + data.hospital.adressDesc + " </p>" +
            "<p class=\"titleText2\">Палата</p>" +
            "<p class=\"simpleInfoText\">" + data.office.name + "</p>" +
            "<p class=\"simpleInfoText\">Опис: " + data.office.additionalInformation + " </p>"

        return fetch(host + '/Indexes', {
            method: 'POST',
            body: JSON.stringify(caseId),
            headers: {
                'Authorization': 'Bearer ' + [token],
                'Content-Type': 'application/json'
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
        patientId = data.patiendId
         document.getElementById('indexesInfo').innerHTML =
             "<p class=\"titleText1\">Показники пацієнта</p>" +
             "<p class=\"simpleInfoText\">Ріст: " + data.height +"</p>" +
             "<p class=\"simpleInfoText\">Вага: " + data.weight +"</p>" +
             "<p class=\"simpleInfoText\">Тиск: "+ data.bloodPressure +"</p>" +
             "<p class=\"simpleInfoText\">Пульс: "+ data.pulse +"</p>" +
             "<p class=\"simpleInfoText\">Глюкоза: "+ data.bloodSugar +"</p>" +
             "<p class=\"simpleInfoText\">Температура тіла: "+ data.bodyTemperature +"</p>" +
             "<p class=\"simpleInfoText\">Опис: "+ data.additionalInformation +"</p>"
        return fetch(host + '/getStatuses', {
            method: 'POST',
            body: JSON.stringify(caseId),
            headers: {
                'Authorization': 'Bearer ' + [token],
                'Content-Type': 'application/json'
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
        return fetch(host + '/Allergens', {
            method: 'POST',
            body: JSON.stringify(patientId),
            headers: {
                'Authorization': 'Bearer ' + [token],
                'Content-Type': 'application/json'
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
        document.getElementById('alergData').innerHTML +=
            "<p class=\"titleText1\">Протипоказані препарати</p>"
        for (let alergNum = 0; alergNum < data.length; alergNum++){
            document.getElementById('alergData').innerHTML +=
                "<p class=\"simpleInfoText\">Препарат  " + (alergNum + 1) + ": " + data[alergNum].substanceName +"</p>"
        }


        return fetch(host + '/Treatment', {
            method: 'POST',
            body: JSON.stringify(caseId),
            headers: {
                'Authorization': 'Bearer ' + [token],
                'Content-Type': 'application/json'
            }
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error);
        errorText.textContent = "Виникла помилка.";
        $("#errorWin").animate({top: '70'}, 400);
        setTimeout(function() {
            $("#errorWin").animate({top: '-100'}, 400);
        }, 5000);


    });





function openTab(evt, tabName) {
    // Declare all variables
    var i, navContent, navPoint;

    // Get all elements with class="tabcontent" and hide them
    navContent = document.getElementsByClassName("navContent");
    for (i = 0; i < navContent.length; i++) {
        navContent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    navPoint = document.getElementsByClassName("navPoint");
    for (i = 0; i < navPoint.length; i++) {
        navPoint[i].className = navPoint[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "flex";
    evt.currentTarget.className += " active";
}