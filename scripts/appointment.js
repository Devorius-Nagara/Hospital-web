const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const closeBtn = document.getElementById('closeBtn')
const secondGeneralBlock = document.getElementById('secondGeneralBlock')
const createCaseFirst = document.getElementById('createCaseFirst')
const createCaseSecond = document.getElementById('createCaseSecond')
const selectedSymptoms = document.getElementById('selectedSymptoms')
const caseRemoveFirst = document.getElementById('caseRemoveFirst')
const caseRemoveSecond = document.getElementById('caseRemoveSecond')
const diseasesSelect = document.getElementById('diseases')
const dataInfo = document.getElementById('dataInfo')
const errorText = document.getElementById('errorText')
let createCaseData = {
    appoimentId: 0,
    patientId: 0,
    doctorId: 0,
    diseaseId: 0,
    officeId: 0
}
let logged;

$(document).ready(function() {
    $('.js-example-basic-multiple').select2({
        ajax: {
            url: host + '/Symptoms',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + [token]);
            },
            data: function (params) {
                var requestData = params.term;
                console.log('Request data:', requestData);
                return JSON.stringify(requestData);
            },
            processResults: function (data) {
                var options = [];
                console.log(options)
                if (data && data.length) {
                    for (var i = 0, len = data.length; i < len; i++) {
                        var item = data[i];
                        var option = {
                            id: item.id,
                            text: item.name
                        };
                        options.push(option);
                    }
                }
                return {
                    results: options
                };
            }
        }
    });
    $('#selectedSymptoms').on('select2:select', function (e) {
        let symptoms = [];
        let selectedOptions = selectedSymptoms.selectedOptions;
        for (var i = 0; i < selectedOptions.length; i++) {
            var option = selectedOptions[i];
            var currSymptoms = option.text;
            symptoms.push(currSymptoms);
        }
        fetch(host + '/Diseases', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + [token],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(symptoms),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                var diseasesRemove = $("#diseases option:not(:first)");
                diseasesRemove.remove();
                for(var diseasesNum = 0; diseasesNum < data.length; diseasesNum++){
                    var optionForDisease = document.createElement("option");
                    optionForDisease.value = data[diseasesNum].id;
                    optionForDisease.text = data[diseasesNum].name;
                    diseasesSelect.add(optionForDisease);
                }
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
    });
    $('.diseases').select2()
});

let storedAppointmentId = localStorage.getItem('appointmentData');
let token = localStorage.getItem('auth_token');
let appointmentId = JSON.parse(storedAppointmentId);
fetch(host + '/Appoiment', {
    method: 'POST',
    body: JSON.stringify(appointmentId.id),
    headers: {
        'Authorization': 'Bearer ' + [token],
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        if (data.id === appointmentId.id) {
            if (appointmentId.patientStatus === "Клієнт"){
                secondGeneralBlock.style.display = 'none';
                createCaseFirst.style.display = 'none';
                createCaseSecond.style.display = 'none';
                document.getElementById('caseWithFirstButtons').style.justifyContent = 'flex-end'
            }
            createCaseData.doctorId = data.doctorId;
            createCaseData.officeId = data.officeId;
            createCaseData.patientId = data.patientId;
            dataInfo.textContent = data.date;
            let patientBirthDate = new Date(data.patient.birthDate);
            let patientAgeDifMs = Date.now() - patientBirthDate.getTime();
            let patientAgeDate = new Date(patientAgeDifMs);
            let patientAge = Math.abs(patientAgeDate.getUTCFullYear() - 1970);

            let doctorBirthDate = new Date(data.doctor.birthDate);
            let doctorAgeDifMs = Date.now() - doctorBirthDate.getTime();
            let doctorAgeDate = new Date(doctorAgeDifMs);
            let doctorAge = Math.abs(doctorAgeDate.getUTCFullYear() - 1970);


            document.getElementById('patientInfo').innerHTML =
                "<p class=\"titleText1\">Пацієнт</p>" +
                "<p class=\"simpleInfoText\">ПІБ: "+ data.patient.surname + " " + data.patient.name + " " + data.patient.middleName + "</p>" +
                "<p class=\"simpleInfoText\">Вік: " + patientAge + " Років</p>" +
                "<p class=\"simpleInfoText\">Стать: " + data.patient.gender + "</p>" +
                "<p class=\"titleText2\">Контактні дані:</p>" +
                "<p class=\"simpleInfoText\">" + data.patient.phoneNumber + "</p>" +
                "<p class=\"simpleInfoText\"> " + data.patient.mail + " </p>"
            document.getElementById('doctorInfo').innerHTML =
                "<p class=\"titleText1\">Лікар</p>" +
                "<p class=\"simpleInfoText\">ПІБ: "+ data.doctor.surname + " " + data.doctor.name + " " + data.doctor.middleName + "</p>" +
                "<p class=\"simpleInfoText\">Вік: " + doctorAge + " Років</p>" +
                "<p class=\"simpleInfoText\">Стать: " + data.doctor.gender + "</p>" +
                "<p class=\"titleText2\">Контактні дані:</p>" +
                "<p class=\"simpleInfoText\">" + data.doctor.phoneNumber + "</p>" +
                "<p class=\"simpleInfoText\"> " + data.doctor.mail + " </p>"
            for (let [key, value] of Object.entries(data.indexesOfPatient)) {
                if (value === null || value === 0) {
                    data.indexesOfPatient[key] = "не вказано";
                }
            }
            console.log(data.indexesOfPatient);
            document.getElementById('indexesInfo').innerHTML =
                "<p class=\"titleText1\">Показники пацієнта</p>" +
                "<p class=\"simpleInfoText\">Ріст: " + data.indexesOfPatient.height +"</p>" +
                "<p class=\"simpleInfoText\">Вага: " + data.indexesOfPatient.weight +"</p>" +
                "<p class=\"simpleInfoText\">Тиск: "+ data.indexesOfPatient.bloodPressure +"</p>" +
                "<p class=\"simpleInfoText\">Пульс: "+ data.indexesOfPatient.pulse +"</p>" +
                "<p class=\"simpleInfoText\">Глюкоза: "+ data.indexesOfPatient.bloodSugar +"</p>" +
                "<p class=\"simpleInfoText\">Температура тіла: "+ data.indexesOfPatient.bodyTemperature +"</p>" +
                "<p class=\"simpleInfoText\">Опис: "+ data.indexesOfPatient.additionalInformation +"</p>"

            document.getElementById('officeInfo').innerHTML =
                "<p class=\"titleText1\">Відомості про офіс</p>" +
                "<p class=\"simpleInfoText\">Офіс: " + data.officeName +"</p>" +
                "<p class=\"simpleInfoText\">Опис: " + data.officeDesc +"</p>"

        }else {
            window.location = "profile.html"
        }

    })
    .catch(error => {
        console.error('Помилка:', error);
    });
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
        css.href = 'styles/appointment-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }else if (themedata === "white"){
        css.href = 'styles/appointment-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
    }else if(themedata === "dark") {
        let themedata;
        css.href = 'styles/appointment-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }
});
function changeTheme() {
    let themedata;
    if (css.href.match('styles/appointment-white.css')) {
        css.href = 'styles/appointment-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/appointment-white.css';
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



createCaseSecond.addEventListener('click', caseCreatingFunc);
createCaseFirst.addEventListener('click', caseCreatingFunc);
const searchDiseaseQ = $('#diseases');
function caseCreatingFunc(){
    let selectedDiseases = $(searchDiseaseQ).find(':selected').val() || null;
    createCaseData.diseaseId = selectedDiseases;
    createCaseData.appoimentId = appointmentId.id;
    console.log(createCaseData)
    fetch(host + '/CreateCase', {
        method: 'POST',
        body: JSON.stringify(createCaseData),
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = "Дані успішно збережено.";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                    setTimeout(function() {
                        window.location = "case.html"
                    });
                }, 1000);

                return response.json();
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .then(data => {
            localStorage.removeItem('appointmentData');
            localStorage.setItem('caseId', data.id)
        })
        .catch(error => {
            console.error(error);
                errorText.textContent = "Виникла помилка. Перевірте введені дані або спрбуйте пізніше.";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                }, 5000);


        });
}




caseRemoveFirst.addEventListener('click', caseRemovingFunc)
caseRemoveSecond.addEventListener('click', caseRemovingFunc)
function caseRemovingFunc(){
    console.log(appointmentId.id)
    fetch(host + '/DeleteAppoiment', {
        method: 'POST',
        body: JSON.stringify(appointmentId.id),
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                errorText.textContent = "Запис успішно видалено.";
                $("#errorWin").animate({top: '70'}, 400);
                setTimeout(function() {
                    $("#errorWin").animate({top: '-100'}, 400);
                    setTimeout(function() {
                        window.location = "profile.html"
                    });
                }, 1000);

                return response.text();
            } else {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
        })
        .then(responseText => {
            console.log("Відповідь сервера: " + responseText);
        })
        .catch(error => {
            console.error(error);
            errorText.textContent = "Виникла помилка, Спрбуйте пізніше.";
            $("#errorWin").animate({top: '70'}, 400);
            setTimeout(function() {
                $("#errorWin").animate({top: '-100'}, 400);
            }, 5000);


        });
}


