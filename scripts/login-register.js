
const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');
const specialD = document.getElementById('specialD');
const checkD = document.getElementById('checkD');

function changeTheme() {
    if (css.href.match('styles/login-register-white.css')) {
        css.href = 'styles/login-register-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';

        localStorage.setItem('theme', 'login-register-dark');
        localStorage.setItem('emblem', 'emb-white');
        localStorage.setItem('themeEmb', 'moon');
        localStorage.setItem('profile', 'profile');
    } else {
        css.href = 'styles/login-register-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';

        localStorage.setItem('theme', 'login-register-white');
        localStorage.setItem('emblem', 'emb-black');
        localStorage.setItem('themeEmb', 'sun');
        localStorage.setItem('profile', 'profile black');
    }

    var themedata = {
        theme: localStorage.getItem('theme'),
        emblem: localStorage.getItem('emblem'),
        themeEmb: localStorage.getItem('themeEmb'),
        profile: localStorage.getItem('profile')
    }
    return themedata;
}

