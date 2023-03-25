/**Логіка зміни теми**/
const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const profileIco = document.getElementById('profileIco');
function changeTheme() {
    if (css.href.match('styles/choosing-white.css')) {
        css.href = 'styles/choosing-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';

        localStorage.setItem('theme', 'choosing-dark');
        localStorage.setItem('emblem', 'emb-white');
        localStorage.setItem('themeEmb', 'moon');
        localStorage.setItem('profile', 'profile');
        localStorage.setItem('profileIco', 'profile');
    } else {
        css.href = 'styles/choosing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';

        localStorage.setItem('theme', 'choosing-white');
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