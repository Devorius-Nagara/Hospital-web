const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const closeBtn = document.getElementById('closeBtn');
const dataTable = document.getElementById('table');
const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('input', validatePhone);
const surnameD = document.getElementById("surname");
const nameD = document.getElementById("name");
const middleNameD = document.getElementById("middleName");
const selectSpec = document.getElementById('searchSpec');
const searchOffice = document.getElementById('searchOffice')
const errorWin = document.getElementById('errorWin')
const errorText = document.getElementById('errorText')
const submitDocRequest = document.getElementById('submitDocRequest');
let logged;

let token = localStorage.getItem('auth_token');
let hospitalId = localStorage.getItem('hospitalId');
console.log(hospitalId)
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
        window.location = "main.html";
    }
});

$(document).ready(function() {
    $('.select2').select2();
});

/** Перехід на профіль **/
document.getElementById('profileCase').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "profile.html";
    }else {
        window.location.href = "login-register.html";
    }
});
document.getElementById('btnCancel').addEventListener("click", function logRegOrRecord(event) {
    if (logged) {
        window.location.href = "city.html";
    }else {
        window.location.href = "login-register.html";
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata === "dark") {
        changeTheme()
    }
});
function changeTheme() {
    let themedata;
    if (css.href.match('styles/choosing-white.css')) {
        css.href = 'styles/choosing-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        themedata = "dark";
        console.log(themedata);
    } else {
        css.href = 'styles/choosing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        themedata = "white";
        console.log(themedata);
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}

/** ВАЛІДАЦІЯ **/
function validatePhone() {
    let regex = /^\+380\s\d{2}\s\d{4}\s\d{3}$/;

    // Перевірка, чи введено дійсний номер телефону
    if (!regex.test(phoneInput.value)) {
        errorText.textContent = 'Введіть номер за прикладом: +380 95 ХХХХ ХХХ';
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




/** Запити **/
let doctors;
fetch(host + '/Doctors', {
    method: 'POST',
    body: JSON.stringify(hospitalId),
    headers: {
        'Authorization': 'Bearer ' + [token],
        'Content-Type': 'application/json'
    }
})
    .then(response => {
    return response.json();
    })
    .then(data => {
        doctors = data;
        console.log(data);
        let shortName;
        let shortMiddleName;
        for (let selectedDoctorNum = 0; selectedDoctorNum < data.length; selectedDoctorNum++){
            shortName = data[selectedDoctorNum].name[0];
            shortMiddleName = data[selectedDoctorNum].middleName[0];
                var infoTitleDiv = $("<div>", {"class": "infoTitle"});
                var leftInfoTitleDiv = $("<div>", {"class": "leftInfoTitle"});
                var leftInfoTitleP = $("<p>").text();
                var centerInfoTitleDiv = $("<div>", {"class": "centerInfoTitle"});
                var infoTitleTextP = $("<p>", {"class": "infoTitleText"}).text();
                var regionDescP = $("<p>").text();
                var settlementDescP = $("<p>").text();
                var rightInfoTitleDiv = $("<div>", {"class": "rightInfoTitle"});
                var rightInfoTitleP = $("<p>").text("Розгорнути");

// Додавання дочірніх елементів до елементу з класом "infoTitle"
                leftInfoTitleDiv.append(leftInfoTitleP);
                centerInfoTitleDiv.append(infoTitleTextP, regionDescP, settlementDescP);
                rightInfoTitleDiv.append(rightInfoTitleP);
                infoTitleDiv.append(leftInfoTitleDiv, centerInfoTitleDiv, rightInfoTitleDiv);

// Додавання доч
                var div = document.createElement('div');
                $(div).addClass('infoCase');

                var infoTitle = document.createElement('div');
                $(infoTitle).addClass('infoTitle');

                var leftInfoTitle = document.createElement('div');
                $(leftInfoTitle).addClass('leftInfoTitle');
                $(leftInfoTitle).append('<p>'+ data[selectedDoctorNum].surname + '.' + shortName + '.' + shortMiddleName + '</p>');
                $(infoTitle).append(leftInfoTitle);

                var centerInfoTitle = document.createElement('div');
                $(centerInfoTitle).addClass('centerInfoTitle');
                $(centerInfoTitle).append('<p class="infoTitleText">Лікар</p>');
                let specText = "";
                for (let specNum = 0; specNum < data[selectedDoctorNum].specialties.length; specNum++){
                    specText = specText  + data[selectedDoctorNum].specialties[specNum].name;
                    if (specNum + 1 < data[selectedDoctorNum].specialties.length){
                        specText = specText + ', ';
                    }
                }
                $(centerInfoTitle).append('<p>' + specText + '</p>');
                $(infoTitle).append(centerInfoTitle);

                var rightInfoTitle = document.createElement('div');
                $(rightInfoTitle).addClass('rightInfoTitle');
                $(rightInfoTitle).append('<p>Розгорнути</p>');
                $(infoTitle).append(rightInfoTitle);

                $(div).append(infoTitle);

                var infoSpoiler = document.createElement('div');
                $(infoSpoiler).addClass('infoSpoiler');

                var infoSpoilerCase = document.createElement('div');
                $(infoSpoilerCase).addClass('infoSpoilerCase');

                var leftSpoilerTitle = document.createElement('div');
                $(leftSpoilerTitle).addClass('leftSpoilerTitle');

                var leftSpoilerTitle_LeftCase = document.createElement('div');
                $(leftSpoilerTitle_LeftCase).addClass('leftSpoilerTitle_LeftCase');
                $(leftSpoilerTitle_LeftCase).append('<p>ПІБ: ' + data[selectedDoctorNum].surname + '.' + shortName + '.' + shortMiddleName + '</p>');
                $(leftSpoilerTitle_LeftCase).append('<p>Вік: ' + data[selectedDoctorNum].age + '</p>');
                $(leftSpoilerTitle).append(leftSpoilerTitle_LeftCase);

                var contactInfo = document.createElement('div');
                $(contactInfo).append('<p class="infoTitleText">Контактні дані</p>');
                $(contactInfo).append('<p>' + data[selectedDoctorNum].doctor.phoneNumber + '</p>');
                $(contactInfo).append('<p>' + data[selectedDoctorNum].mail + '</p>');
                $(leftSpoilerTitle).append(contactInfo);

                $(infoSpoilerCase).append(leftSpoilerTitle);

                var centerSpoilerTitle = document.createElement('form');
                $(centerSpoilerTitle).addClass('centerSpoilerTitle');
                $(centerSpoilerTitle).append('<button class="infoBtns" id="GoToDoc" data-doc-num="' + selectedDoctorNum + '">Записатись</button>');
                $(infoSpoilerCase).append(centerSpoilerTitle);

                var rightSpoilerTitle = document.createElement('form');
                $(rightSpoilerTitle).addClass('rightSpoilerTitle');
                $(rightSpoilerTitle).append('<p>' + specText + '</p>');
                $(infoSpoilerCase).append(rightSpoilerTitle);

                $(infoSpoiler).append(infoSpoilerCase);
                $(div).append(infoSpoiler);

                dataTable.appendChild(div);

        }

        $('.infoTitle').click(function (event){
            var isActive = $(this).hasClass('active');
            $(this).toggleClass('active');
            $(this).css('border-radius', '20px 20px 0px 0px');
            $(this).find('.rightInfoTitle').html(isActive ? '<p>Розгорнути</p>' : '<p>Згорнути</p>');
            $(this).next().slideToggle(300, function() {
                if (isActive) {
                    $(this).prev('.infoTitle').css('border-radius', '20px');
                    $(this).prev('.infoTitle').find('.rightInfoTitle').html('<p>Розгорнути</p>');
                }
            });
        });
    })
    .catch(error => {
        console.error('Помилка:', error);
        errorText.textContent = "Виникла помилка";
        $("#errorWin").animate({top: '70'}, 400);
        setTimeout(function() {
            $("#errorWin").animate({top: '-100'}, 400);
        }, 5000);
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
            selectSpec.add(optionForSpec);
        }
    },
    error: function (error) {
        window.location = "main.html";
    }
});



/** ПОШУК ТА ФІЛЬТРАЦІЯ **/
let doctorList;
const selectSpecQ = $('#searchSpec');
document.getElementById('docForm').addEventListener('submit', function (){
    event.preventDefault();
    let selectedSpec = $(selectSpecQ).find(':selected').val() || null;
    dataTable.innerHTML = "";
    doctorList = [];
    let currentDoc;
    for (let doctorNum = 0; doctorNum < doctors.length; doctorNum++){
        currentDoc = true;
        if (doctors[doctorNum].name !== nameD.value && nameD.value !== ""){
            currentDoc = false;
            continue;
        }
        if (doctors[doctorNum].surname !== surnameD.value && surnameD.value !== ""){
            currentDoc = false;
            continue;
        }
        if (doctors[doctorNum].middleName !== middleNameD.value && middleNameD.value !== ""){
            currentDoc = false;
            continue;
        }
        if (doctors[doctorNum].doctor.phoneNumber !== phoneInput.value && phoneInput.value !== "+380 "){
            currentDoc = false;
            continue;
        }
        for (let selectedSpecNum = 0; selectedSpecNum < doctors[doctorNum].specialties.length; selectedSpecNum++){
            if (doctors[doctorNum].specialties[selectedSpecNum].id === selectedSpec){
                console.log('1')
                break;
            }else if(doctors[doctorNum].specialties[selectedSpecNum].id !== selectedSpec && selectedSpec !== null){
                currentDoc = false;
                console.log('2')
            }
        }
        if (currentDoc === false){
            console.log('3')
            continue;
        }

        shortName = doctors[doctorNum].name[0];
        shortMiddleName = doctors[doctorNum].middleName[0];
        var infoTitleDiv = $("<div>", {"class": "infoTitle"});
        var leftInfoTitleDiv = $("<div>", {"class": "leftInfoTitle"});
        var leftInfoTitleP = $("<p>").text();
        var centerInfoTitleDiv = $("<div>", {"class": "centerInfoTitle"});
        var infoTitleTextP = $("<p>", {"class": "infoTitleText"}).text();
        var regionDescP = $("<p>").text();
        var settlementDescP = $("<p>").text();
        var rightInfoTitleDiv = $("<div>", {"class": "rightInfoTitle"});
        var rightInfoTitleP = $("<p>").text("Розгорнути");

// Додавання дочірніх елементів до елементу з класом "infoTitle"
        leftInfoTitleDiv.append(leftInfoTitleP);
        centerInfoTitleDiv.append(infoTitleTextP, regionDescP, settlementDescP);
        rightInfoTitleDiv.append(rightInfoTitleP);
        infoTitleDiv.append(leftInfoTitleDiv, centerInfoTitleDiv, rightInfoTitleDiv);

// Додавання доч
        var div = document.createElement('div');
        $(div).addClass('infoCase');

        var infoTitle = document.createElement('div');
        $(infoTitle).addClass('infoTitle');

        var leftInfoTitle = document.createElement('div');
        $(leftInfoTitle).addClass('leftInfoTitle');
        $(leftInfoTitle).append('<p>'+ doctors[doctorNum].surname + '.' + shortName + '.' + shortMiddleName + '</p>');
        $(infoTitle).append(leftInfoTitle);

        var centerInfoTitle = document.createElement('div');
        $(centerInfoTitle).addClass('centerInfoTitle');
        $(centerInfoTitle).append('<p class="infoTitleText">Лікар</p>');
        let specText = "";
        for (let specNum = 0; specNum < doctors[doctorNum].specialties.length; specNum++){
            specText = specText  + doctors[doctorNum].specialties[specNum].name;
            if (specNum + 1 < doctors[doctorNum].specialties.length){
                specText = specText + ', ';
            }
        }
        $(centerInfoTitle).append('<p>' + specText + '</p>');
        $(infoTitle).append(centerInfoTitle);

        var rightInfoTitle = document.createElement('div');
        $(rightInfoTitle).addClass('rightInfoTitle');
        $(rightInfoTitle).append('<p>Розгорнути</p>');
        $(infoTitle).append(rightInfoTitle);

        $(div).append(infoTitle);

        var infoSpoiler = document.createElement('div');
        $(infoSpoiler).addClass('infoSpoiler');

        var infoSpoilerCase = document.createElement('div');
        $(infoSpoilerCase).addClass('infoSpoilerCase');

        var leftSpoilerTitle = document.createElement('div');
        $(leftSpoilerTitle).addClass('leftSpoilerTitle');

        var leftSpoilerTitle_LeftCase = document.createElement('div');
        $(leftSpoilerTitle_LeftCase).addClass('leftSpoilerTitle_LeftCase');
        $(leftSpoilerTitle_LeftCase).append('<p>ПІБ: ' + doctors[doctorNum].surname + '.' + shortName + '.' + shortMiddleName + '</p>');
        $(leftSpoilerTitle_LeftCase).append('<p>Вік: ' + doctors[doctorNum].age + '</p>');
        $(leftSpoilerTitle).append(leftSpoilerTitle_LeftCase);

        var contactInfo = document.createElement('div');
        $(contactInfo).append('<p class="infoTitleText">Контактні дані</p>');
        $(contactInfo).append('<p>' + doctors[doctorNum].doctor.phoneNumber + '</p>');
        $(contactInfo).append('<p>' + doctors[doctorNum].mail + '</p>');
        $(leftSpoilerTitle).append(contactInfo);

        $(infoSpoilerCase).append(leftSpoilerTitle);

        var centerSpoilerTitle = document.createElement('form');
        $(centerSpoilerTitle).addClass('centerSpoilerTitle');
        $(centerSpoilerTitle).append('<button class="infoBtns" id="GoToDoc" data-doc-num="' + doctorNum + '">Записатись</button>');
        $(infoSpoilerCase).append(centerSpoilerTitle);

        var rightSpoilerTitle = document.createElement('form');
        $(rightSpoilerTitle).addClass('rightSpoilerTitle');
        $(rightSpoilerTitle).append('<p>' + specText + '</p>');
        $(infoSpoilerCase).append(rightSpoilerTitle);

        $(infoSpoiler).append(infoSpoilerCase);
        $(div).append(infoSpoiler);

        dataTable.appendChild(div);
        doctorList.push(doctors[doctorNum]);
    }
    $('.infoTitle').click(function (event){
        var isActive = $(this).hasClass('active');
        $(this).toggleClass('active');
        $(this).css('border-radius', '20px 20px 0px 0px');
        $(this).find('.rightInfoTitle').html(isActive ? '<p>Розгорнути</p>' : '<p>Згорнути</p>');
        $(this).next().slideToggle(300, function() {
            if (isActive) {
                $(this).prev('.infoTitle').css('border-radius', '20px');
                $(this).prev('.infoTitle').find('.rightInfoTitle').html('<p>Розгорнути</p>');
            }
        });
    });
    if (dataTable.innerHTML === ""){
        errorText.textContent = 'Данних не знайдено';
        $("#errorWin").animate({top: '70'}, 400);
        setTimeout(function() {
            $("#errorWin").animate({top: '-100'}, 400);
        }, 5000);
    }
    console.log(doctorList);
})




/** МОДАЛЬНЕ ВІКНО **/
const modal = document.getElementById('modal')
$(document).on('click', '#GoToDoc', function() {
    event.preventDefault();
    let DoctorNum = $(this).data('doc-num');
    submitDocRequest.setAttribute("data-doctor-id", DoctorNum);
    let officesData = {
        doctorId: doctors[DoctorNum].doctor.id,
        hospitalId: hospitalId
    }
    fetch(host + '/Doctor/Offices', {
        method: 'POST',
        body: JSON.stringify(officesData),
        headers: {
            'Authorization': 'Bearer ' + [token],
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            var officeRemove = $("#searchOffice option:not(:first)");
            officeRemove.remove();
            $("#searchOffice").trigger("change");

            for (let officeNum = 0; officeNum < data.length; officeNum++){
                var optionForOffice = document.createElement("option");
                optionForOffice.value = data[officeNum].id;
                optionForOffice.text = data[officeNum].name;
                searchOffice.add(optionForOffice);
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            errorText.textContent = "Виникла помилка";
            $("#errorWin").animate({top: '70'}, 400);
            setTimeout(function() {
                $("#errorWin").animate({top: '-100'}, 400);
            }, 5000);
        });

    modal.style.display = "flex";
    console.log(doctors[DoctorNum])
});
$(document).on('click', '#modalCancel', function() {
    event.preventDefault();
    modal.style.display = "none";
});

function timeRequest(){
    let selectedOffice = $(searchOfficeQ).find(':selected').val() || null;
    let selectedData = document.getElementById('dataInput').value || null;
    let DoctorNum = $('#submitDocRequest').data('doctor-id');
    let dataToServer = {
        doctorId: doctors[DoctorNum].doctor.id,
        officeId: selectedOffice,
        date: selectedData
    }



    fetch(host + '/Doctor/Time', {
        method: 'POST',
        body: dataToServer,
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
        })
        .catch(error => {
            console.error('Помилка:', error);
            errorText.textContent = "Виникла помилка";
            $("#errorWin").animate({top: '70'}, 400);
            setTimeout(function() {
                $("#errorWin").animate({top: '-100'}, 400);
            }, 5000);
        });

    console.log(dataToServer)
}

const searchOfficeQ = $('#searchOffice');
const searchDataQ = $('#dataInput');

searchDataQ.change(function(){
    let selectedOffice = $(searchOfficeQ).find(':selected').val() || null;
    let selectedData = document.getElementById('dataInput').value || null;
    if (selectedOffice !== null && selectedData !== null){
        timeRequest();
    }
})

searchOfficeQ.change(function(){
    let selectedOffice = $(searchOfficeQ).find(':selected').val() || null;
    let selectedData = document.getElementById('dataInput').value || null;
    if (selectedOffice !== null && selectedData !== null){
        timeRequest();
    }
})
