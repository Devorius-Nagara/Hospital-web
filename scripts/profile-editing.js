/**Логіка зміни теми**/
const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');

document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('themedata-prof');
    const themedata = JSON.parse(themedataString);


    css.href = 'styles/' + themedata.theme;
    emblem.src = 'images/' + themedata.emblem;
    themeEmb.src = 'images/' + themedata.themeEmb;
    profile.src = 'images/' + themedata.profile;
    profileIco.src = 'images/' + themedata.profileIco;

});

function changeTheme() {
    var themedata = {
        theme: 0,
        emblem: 0,
        themeEmb: 0,
        profile: 0,
        profileIco: 0,
    }
    if (css.href.match('styles/profile-white.css')) {
        css.href = 'styles/profile-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';

        themedata.theme = 'profile-dark.css';
        themedata.emblem ='emb-white.png';
        themedata.themeEmb = 'moon.png';
        themedata.profile = 'profile.png';
        themedata.profileIco = 'profile.png';
    } else {
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';

        themedata.theme = 'profile-white.css';
        themedata.emblem = 'emb-black.png';
        themedata.themeEmb = 'sun.png';
        themedata.profile = 'profile black.png';
        themedata.profileIco = 'profile black.png';
    }

    localStorage.setItem('themedata-prof', JSON.stringify(themedata));
}



/**Логіка роботи лівої панелі**/
    const btnCloser = document.getElementById('btnCloser');
    const btnOpener = document.getElementById('btnOpener');
    const datatable = document.getElementById('datatable');
    window.addEventListener('resize', updateWindowSize);
    var windowWidth = window.innerWidth;
    function updateWindowSize() {
        windowWidth = window.innerWidth;
        if (!btnCloser.classList.contains("hiden") && window.innerWidth <= 500){
            $("#leftPanel").animate({left: '-300'}, 0);
            datatable.classList.remove("blur");
        }
        else if (!btnCloser.classList.contains("hiden") && windowWidth > 500 && windowWidth <= 1300){
            $("#leftPanel").animate({left: '-350'}, 0);
            datatable.classList.remove("blur");
        }
        else if(!btnCloser.classList.contains("hiden") && windowWidth > 1300){
            $("#leftPanel").animate({left: '-400'}, 0);
            datatable.classList.remove("blur");
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