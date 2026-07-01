
// DE/EN Translation

const translations = {
    de: {
        title: "Spiele",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "EN",
        gamesBtn: "Spiele"
    },
    en: {
        title: "Games",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "DE",
        gamesBtn: "Games"
    }
};


// Spracherkennung vom Browser

function getAutoLanguage() {
    const manualLang = localStorage.getItem('lang');
    if (manualLang) {
        return manualLang;
    }

    const browserLang = navigator.language || navigator.userLanguage || 'de';
    return browserLang.startsWith('de') ? 'de' : 'en';
}

let currentLang = getAutoLanguage();


// DARK MODE LOGIK

const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = 'Light Mode';
}

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
    
    applyLanguageUI();
});


// DE/EN Button

const langToggleBtn = document.getElementById('lang-toggle');

function applyLanguageUI() {
    langToggleBtn.textContent = translations[currentLang].langBtn;
    document.getElementById('main-title').textContent = translations[currentLang].title;
    document.getElementById('games-page').textContent = translations[currentLang].gamesBtn;
    document.getElementById('title-title').textContent = translations[currentLang].title;
    
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        themeToggleBtn.textContent = translations[currentLang].themeLight;
    } else {
        themeToggleBtn.textContent = translations[currentLang].themeDark;
    }
}

langToggleBtn.addEventListener('click', () => {
    currentLang = (currentLang === 'de') ? 'en' : 'de';
    localStorage.setItem('lang', currentLang); 
    applyLanguageUI();
    renderCodes(); 
});

//btn to pages

function gotoLink(link){
    location.href = link.value
};
