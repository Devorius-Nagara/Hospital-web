const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');
const backroundImg = document.querySelector('.backroundImg');
const btnCloser = document.getElementById('btnCloser');
const btnOpener = document.getElementById('btnOpener');
const datatable = document.getElementById('datatable');
const blur = document.querySelector('.blur');
const dataTable = document.getElementById('table')
localStorage.removeItem('appointmentData');
let strStatus;

let appointmentCaseData = {
    gneralLeftCase: '',
    generalCenterUpCase: '',
    generalCenterDownCase: '',
    spoilerLeftUpCase: '',
    spoilerLeftDownCase: '',
    spoilerCenterCase: '',
    spoilerRightCase: ''
}
/** Зміна теми **/
document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('MyDoctorThemeData');
    const themedata = JSON.parse(themedataString);

    if (themedata !== "dark" && themedata !== "white"){
        let themedata;
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        backroundImg.src ='images/backround-dark.png'
        themedata = "white";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }else if (themedata === "white"){
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        backroundImg.src ='images/backround-dark.png'
    }else if(themedata === "dark") {
        let themedata;
        css.href = 'styles/profile-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';
        backroundImg.src ='images/backround-white.png';
        themedata = "dark";
        localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
    }
});
function changeTheme() {
    let themedata;
    if (css.href.match('styles/profile-white.css')) {
        css.href = 'styles/profile-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';
        backroundImg.src ='images/backround-white.png';
        themedata = "dark";
    } else {
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        backroundImg.src ='images/backround-dark.png'
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}



/**Логіка роботи лівої панелі**/
    window.addEventListener('resize', updateWindowSize);
    var windowWidth = window.innerWidth;
    function updateWindowSize() {
        windowWidth = window.innerWidth;
        if (window.innerWidth <= 500){
            $("#leftPanel").animate({left: '-300'}, 0);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
            console.log("1");
        }
        else if (windowWidth > 500 && windowWidth <= 1300){
            $("#leftPanel").animate({left: '-350'}, 0);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
            console.log("2");
        }
        else if(windowWidth > 1300){
            $("#leftPanel").animate({left: '-400'}, 0);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
            console.log("3");
        }
    }

    if (!btnCloser.classList.contains("hiden") && windowWidth <= 500){
        $("#leftPanel").animate({left: '0'}, 800);
        datatable.classList.add("blur");
        btnCloser.classList.remove("hiden");
        btnOpener.classList.add("hiden");
    }
    else if (!btnCloser.classList.contains("hiden") && windowWidth > 500 && windowWidth <= 1300){
        $("#leftPanel").animate({left: '0'}, 800);
        datatable.classList.add("blur");
        btnCloser.classList.remove("hiden");
        btnOpener.classList.add("hiden");
    }
    else if (!btnCloser.classList.contains("hiden") && windowWidth > 1300){
        $("#leftPanel").animate({left: '0'}, 800);
        datatable.classList.add("blur");
        btnCloser.classList.remove("hiden");
        btnOpener.classList.add("hiden");
    }
    function leftPanelActionClose(){
        windowWidth = window.innerWidth;
        if (!btnCloser.classList.contains("hiden") && windowWidth <= 500){
            $("#leftPanel").animate({left: '-300'}, 300);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
        }
        else if (!btnCloser.classList.contains("hiden") && windowWidth > 500 && windowWidth <= 1300){
            $("#leftPanel").animate({left: '-350'}, 300);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
        }
        else if (!btnCloser.classList.contains("hiden") && windowWidth > 1300){
            $("#leftPanel").animate({left: '-400'}, 300);
            datatable.classList.remove("blur");
            btnCloser.classList.add("hiden");
            btnOpener.classList.remove("hiden");
        }
    }
    function leftPanelActionOpen(){
        windowWidth = window.innerWidth;
        if (btnCloser.classList.contains("hiden")){
            $("#leftPanel").animate({left: '0'}, 300);
            datatable.classList.add("blur");
            btnCloser.classList.remove("hiden");
            btnOpener.classList.add("hiden");
        }
    }




    /** ІНФО ПАНЕЛЬ **/
    $(document).ready(function (){
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
    });
$(document).ready(function() {
    $('.select2').select2();
});

/** Запити на сервер **/

const nsm = document.querySelector('#nsm');
const gender = document.querySelector('#gender');
const dataB = document.querySelector('#dataB');
const status = document.querySelector('#status');
let token = localStorage.getItem('auth_token');
$.ajax({
    url: host + '/Profile',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        let shortName = data.name[0];
        let shortMiddleName = data.middleName[0];
        nsm.textContent = 'ПІБ: ' + data.surName + '.' + shortName + '.' + shortMiddleName;
        gender.textContent = 'Стать: ' + data.gender;
        dataB.textContent = 'Вік: ' + data.age + ' років';
    },
    error: function (error) {
        window.location = "main.html";
    }
});

document.getElementById('client').style.display = 'flex';
$.ajax({
    url: host + "/Profile/isDoctor",
    type: "GET",
    dataType: "json",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
    }
})
    .then(function(data) {
        if (data) {
            status.textContent = "Статус: Лікар";
            strStatus = 'Лікар';
            document.getElementById("docPanel").style.display = "flex";
        }
        console.log(data);

        return $.ajax({
            url: host + "/Profile/isAdminInHospital",
            type: "GET",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        });
    })
    .then(function(data) {
        if (data) {
            status.textContent = "Статус: Головний лікар";
            strStatus = 'Головний лікар';
            document.getElementById("headDocPanel").style.display = "flex";
            document.getElementById("docPanel").style.display = "none";
        }
        console.log(data);

        return $.ajax({
            url: host + "/Profile/isAdminInDepartament",
            type: "GET",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        });
    })
    .then(function(data) {
        if (data) {
            status.textContent = "Статус: Зав.Відділення";
            strStatus = 'Зав.Відділення';
            document.getElementById("headDocInDepPanel").style.display = "flex";
            document.getElementById("docPanel").style.display = "none";
            document.getElementById("headDocPanel").style.display = "none";
        }
        console.log(data);

        return $.ajax({
            url: host + "/Profile/isAdminInSystem",
            type: "GET",
            dataType: "json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        });
    })
    .then(function(data) {
        if (data) {
            status.textContent = "Статус: Адміністратор";
            strStatus = 'Адміністратор';
            document.getElementById("admPanel").style.display = "flex";
        }else {
            if (status.textContent === "Статус:"){
                status.textContent = 'Статус: Клієнт';
                strStatus = 'Клієнт';
            }
        }
        console.log(data);
    })
    .catch(function(error) {
        console.error(error);
    });





/** LOGOUT **/
const btnLogOut = document.getElementById('btnLogOut')
btnLogOut.addEventListener('click', function logOut() {
    localStorage.removeItem('auth_token')
    window.location.href = "main.html"
})



function appointmentRequestClient() {
    $.ajax({
        url: host + '/Profile/appoiments/patient',
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + [token]);
        },
        success: function (data) {
            console.log(data)
            dataTable.innerHTML = '';
            for (let lenghtOfCases = 0; lenghtOfCases < data.length; lenghtOfCases++){

                var $infoCase = $('<div>').addClass('infoCase').attr('data-id', data[lenghtOfCases].id).attr('id', 'goToAppointment')
                var $infoTitle = $('<div>').addClass('infoTitle');
                var $leftInfoTitle = $('<div>').addClass('leftInfoTitle');
                var $centerInfoTitle = $('<div>').addClass('centerInfoTitle');
                var $rightInfoTitle = $('<div>').addClass('rightInfoTitle');
                var $titleDate = $('<p>').text(data[lenghtOfCases].date);
                var $titleText = $('<p>').addClass('infoTitleText').text('Запис');
                var $specialty = $('<p>').text(data[lenghtOfCases].hospitalName);
                var $status = $('<p>').text('Офіс: ' + data[lenghtOfCases].officeName);
                var $expand = $('<p>').text(data[lenghtOfCases].time);

                $leftInfoTitle.append($titleDate);
                $centerInfoTitle.append($titleText, $specialty, $status);
                $rightInfoTitle.append($expand);
                $infoTitle.append($leftInfoTitle, $centerInfoTitle, $rightInfoTitle);
                $infoCase.append($infoTitle);
                $('.table').append($infoCase);
            }
            leftPanelActionClose();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function appointmentRequestDoctor(){
    $.ajax({
        url: host + '/Profile/appoiments/doctor',
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + [token]);
        },
        success: function (data) {
            console.log(data)
            dataTable.innerHTML = '';
            for (let lenghtOfCases = 0; lenghtOfCases < data.length; lenghtOfCases++){

                var $infoCase = $('<div>').addClass('infoCase').attr('data-id', data[lenghtOfCases].id).attr('id', 'goToAppointment')
                var $infoTitle = $('<div>').addClass('infoTitle');
                var $leftInfoTitle = $('<div>').addClass('leftInfoTitle');
                var $centerInfoTitle = $('<div>').addClass('centerInfoTitle');
                var $rightInfoTitle = $('<div>').addClass('rightInfoTitle');
                var $titleDate = $('<p>').text(data[lenghtOfCases].date);
                var $titleText = $('<p>').addClass('infoTitleText').text('Запис');
                var $specialty = $('<p>').text(data[lenghtOfCases].hospitalName);
                var $status = $('<p>').text('Офіс: ' + data[lenghtOfCases].officeName);
                var $expand = $('<p>').text(data[lenghtOfCases].time);

                $leftInfoTitle.append($titleDate);
                $centerInfoTitle.append($titleText, $specialty, $status);
                $rightInfoTitle.append($expand);
                $infoTitle.append($leftInfoTitle, $centerInfoTitle, $rightInfoTitle);
                $infoCase.append($infoTitle);
                $('.table').append($infoCase);
            }
            leftPanelActionClose();
        },
        error: function (error) {
        }
    });
}




$(document).on('click', '#goToAppointment', function() {
    event.preventDefault();
    console.log('2')
    let appointmentData = {
        id: $(this).data('id'),
        patientStatus: strStatus,
    };

    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    window.location.href = "appointment.html";
});