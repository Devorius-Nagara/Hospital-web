const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');

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
    if (css.href.match('styles/profile-white.css')) {
        css.href = 'styles/profile-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';
        themedata = "dark";
    } else {
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';
        themedata = "white";
    }
    localStorage.removeItem('MyDoctorThemeData');
    localStorage.setItem('MyDoctorThemeData', JSON.stringify(themedata));
}



/**Логіка роботи лівої панелі**/
    const btnCloser = document.getElementById('btnCloser');
    const btnOpener = document.getElementById('btnOpener');
    const datatable = document.getElementById('datatable');
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



/** Запити на сервер **/

const nsm = document.querySelector('#nsm');
const gender = document.querySelector('#gender');
const dataB = document.querySelector('#dataB');
const status = document.querySelector('#status');
let token = localStorage.getItem('auth_token');
$.ajax({
    url: 'https://localhost:44391/Profile',
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
$.ajax({
    url: 'https://localhost:44391/Profile/isDoctor',
    type: 'GET',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + [token]);
    },
    success: function (data) {
        if (data){
            status.textContent = 'Статус: Лікар'
        }else{
            status.textContent = 'Статус: Клієнт'
        }
    },
    error: function (error) {
        console.error(error);
    }
});

/** LOGOUT **/
const btnLogOut = document.getElementById('btnLogOut')
btnLogOut.addEventListener('click', function logOut() {
    localStorage.removeItem('auth_token')
    window.location.href = "main.html"
})