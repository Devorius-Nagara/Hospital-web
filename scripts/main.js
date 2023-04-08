
const css = document.getElementById('cssTheme');
const emblem = document.getElementById('emblem');
const themeEmb = document.getElementById('themeEmb');
const profile = document.getElementById('profile');

document.addEventListener('DOMContentLoaded', function() {
    const themedataString = localStorage.getItem('themedata-main');
    const themedata = JSON.parse(themedataString);


    css.href = 'styles/' + themedata.theme;
    emblem.src = 'images/' + themedata.emblem;
    themeEmb.src = 'images/' + themedata.themeEmb;
    profile.src = 'images/' + themedata.profile;

});

function changeTheme() {
    var themedata = {
        theme: 0,
        emblem: 0,
        themeEmb: 0,
        profile: 0
    }
    if (css.href.match('styles/main-white.css')) {
        css.href = 'styles/main-dark.css';
        emblem.src = 'images/emb-white.png';
        themeEmb.src = 'images/moon.png';
        profile.src = 'images/profile.png';

        themedata.theme = 'main-dark.css';
        themedata.emblem = 'emb-white.png';
        themedata.themeEmb = 'moon.png';
        themedata.profile = 'profile.png';
    } else {
        css.href = 'styles/main-white.css';
        emblem.src = 'images/emb-black.png';
        themeEmb.src = 'images/sun.png';
        profile.src = 'images/profile black.png';

        themedata.theme ='main-white.css';
        themedata.emblem ='emb-black.png';
        themedata.themeEmb = 'sun.png';
        themedata.profile = 'profile black.png';
    }

    localStorage.setItem('themedata-main', JSON.stringify(themedata));

}

var btn = $('#btn');

// Додаємо обробник подій на кнопку
btn.on('click', function() {
    // Використовуємо метод load() для завантаження сторінки newpage.html
    // та оновлення вмісту контейнера з id content
    $('#pageContent').load('login-register.html');
});



