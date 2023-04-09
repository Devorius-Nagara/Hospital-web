/**Логіка зміни теми**/
const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');
function changeTheme() {
    if (css.href.match('styles/profile-white.css')) {
        css.href = 'styles/profile-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';

        localStorage.setItem('theme', 'profile-dark');
        localStorage.setItem('emblem', 'emb-white');
        localStorage.setItem('themeEmb', 'moon');
        localStorage.setItem('profile', 'profile');
        localStorage.setItem('profileIco', 'profile');
    } else {
        css.href = 'styles/profile-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';

        localStorage.setItem('theme', 'profile-white');
        localStorage.setItem('emblem', 'emb-black');
        localStorage.setItem('themeEmb', 'sun');
        localStorage.setItem('profile', 'profile black');
        localStorage.setItem('profileIco', 'profile black');
    }

    var themedata = {
        theme: localStorage.getItem('theme'),
        emblem: localStorage.getItem('emblem'),
        themeEmb: localStorage.getItem('themeEmb'),
        profile: localStorage.getItem('profile'),
        profileIco: localStorage.getItem('profileIco')
    }
    return themedata;
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