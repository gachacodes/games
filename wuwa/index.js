
// DE/EN Translation

const translations = {
    de: {
        title: "Verfügbare Codes",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "EN",
        toastCopy: "kopiert!",
        permanent: "Dauerhaft Verfügbar",
        validUntil: "Gültig bis",
        countdownPrefix: "Noch",
        noCodes: "Derzeit sind keine Codes verfügbar. Schau später wieder vorbei!",
        daysAbbr: "T ",
        hoursAbbr: "Std ",
        minsAbbr: "Min ",
        secsAbbr: "Sek",
        gamesBtn: "Spiele"
    },
    en: {
        title: "Available Codes",
        themeDark: "Dark Mode",
        themeLight: "Light Mode",
        langBtn: "DE",
        toastCopy: "copied!",
        permanent: "Permanently Available",
        validUntil: "Valid until",
        countdownPrefix: "Remaining",
        noCodes: "No codes are currently available. Check back later!",
        daysAbbr: "d ",
        hoursAbbr: "h ",
        minsAbbr: "m ",
        secsAbbr: "s",
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
    document.getElementById('title-title').textContent = translations[currentLang].title;
    document.getElementById('games-page').textContent = translations[currentLang].gamesBtn;
    
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


// Kopieren in die Zwischenablage

function copyToClipboard(code) {
    navigator.clipboard.writeText(code).then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = `"${code}" ${translations[currentLang].toastCopy}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }).catch(err => console.error('Fehler beim Kopieren: ', err));
}


// Codes

const promoCodes = [
    { 
        code: "WUTHERINGGIFT", 
        rewards: [
            { type: "image", value: "../images/games/wuwa/astrite.png", textKey: "x50" },
            { type: "image", value: "../images/games/wuwa/premium_resonance_potion.png", textKey: "x2" },
            { type: "image", value: "../images/games/wuwa/medium_revival_inhaler.png", textKey: "x2" },
            { type: "image", value: "../images/games/wuwa/medium_energy_bag.png", textKey: "x2" },
            { type: "image", value: "../images/games/wuwa/shell_creds.png", textKey: "x2" }
        ],
        expires: null 
    },
    { 
        code: "WUWA4PC", 
        rewards: [
            { textKey: "PC EXCLUSIVE" },
            { textKey: "" },
            { textKey: "" },
            { type: "image", value: "../images/games/wuwa/astrite.png", textKey: "x50" }
        ],
        expires: null 
    }
];

const rewardTranslations = {
    test1: { de: "", en: "" },
    test2: { de: "", en: "" },
    test3: { de: "", en: "" },
    test4: { de: "", en: "" },
    test5: { de: "", en: "" },
    test6: { de: "", en: "" },
    test7: { de: "", en: "" },
    test8: { de: "", en: "" }
};


// DISPLAY LOGIC
function renderCodes() {
    applyLanguageUI();

    const container = document.getElementById('code-container');
    const currentUnixTime = Math.floor(Date.now() / 1000);

    const activeCodes = promoCodes.filter(item => item.expires === null || item.expires > currentUnixTime);

    if (activeCodes.length === 0) {
        container.innerHTML = `<div class="no-codes">${translations[currentLang].noCodes}</div>`;
        return;
    }

    container.innerHTML = activeCodes.map(item => {
        let expiryText;
        let cardClass = item.expires === null ? "code-card permanent-card" : "code-card";
        
        if (item.expires === null) {
            expiryText = `<span class='permanent-text'>${translations[currentLang].permanent}</span>`;
        } else {
            const timeLeft = item.expires - currentUnixTime;
            
            const days = Math.floor(timeLeft / 86400);
            const hours = Math.floor((timeLeft % 86400) / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            const localeStr = (currentLang === 'en') ? 'en-US' : 'de-DE';
            const dateStr = new Date(item.expires * 1000).toLocaleString(localeStr); 
            
            const countdownStr = `${days > 0 ? days + translations[currentLang].daysAbbr : ''}${hours}${translations[currentLang].hoursAbbr}${minutes}${translations[currentLang].minsAbbr}${seconds}${translations[currentLang].secsAbbr}`;

            expiryText = `
                <span>${translations[currentLang].validUntil}: ${dateStr}</span>
                <span class="countdown">${translations[currentLang].countdownPrefix}: ${countdownStr}</span>
            `;
        }

        let rewardsHTML = '';
        if (item.rewards && Array.isArray(item.rewards)) {
            rewardsHTML = item.rewards.map(reward => {
                let mediaElement = '';
                if (reward.type === 'image') {
                    mediaElement = `<img src="${reward.value}" alt="" class="reward-image">`;
                } else if (reward.type === 'icon') {
                    mediaElement = `<span class="reward-icon">${reward.value}</span>`;
                }

                const translatedText = rewardTranslations[reward.textKey] ? rewardTranslations[reward.textKey][currentLang] : reward.textKey;
                
                return `
                    <div class="reward-item">
                        ${mediaElement}
                        <span>${translatedText}</span>
                    </div>
                `;
            }).join('');
        }
        
        return `
            <div class="${cardClass}">
                <div class="code-text" onclick="copyToClipboard('${item.code}')" title="Klicken zum Kopieren">
                    ${item.code}
                </div>
                <div class="rewards-list">
                    ${rewardsHTML}
                </div>
                <div class="expires-text">${expiryText}</div>
            </div>
        `;
    }).join('');
};

//btn to pages

function gotoLink(link){
    location.href = link.value
};



renderCodes();
setInterval(renderCodes, 1000);