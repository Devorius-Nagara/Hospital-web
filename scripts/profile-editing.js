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
    if (css.href.match('styles/profile-editing-white.css')) {
        css.href = 'styles/profile-editing-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';
        profileIco.src = 'images/profile.png';

        themedata.theme = 'profile-editing-dark.css';
        themedata.emblem ='emb-white.png';
        themedata.themeEmb = 'moon.png';
        themedata.profile = 'profile.png';
        themedata.profileIco = 'profile.png';
    } else {
        css.href = 'styles/profile-editing-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';
        profileIco.src = 'images/profile black.png';

        themedata.theme = 'profile-editing-white.css';
        themedata.emblem = 'emb-black.png';
        themedata.themeEmb = 'sun.png';
        themedata.profile = 'profile black.png';
        themedata.profileIco = 'profile black.png';
    }

    localStorage.setItem('themedata-prof', JSON.stringify(themedata));
}