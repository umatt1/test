// Internationalization translations
const translations = {
    en: {
        title: "The Best Calculator Ever",
        footer: "Made with ❤️ using GitHub Actions"
    },
    es: {
        title: "La Mejor Calculadora del Mundo",
        footer: "Hecho con ❤️ usando GitHub Actions"
    },
    fr: {
        title: "La Meilleure Calculatrice du Monde",
        footer: "Fait avec ❤️ en utilisant GitHub Actions"
    },
    de: {
        title: "Der Beste Taschenrechner Aller Zeiten",
        footer: "Mit ❤️ gemacht mit GitHub Actions"
    },
    it: {
        title: "La Migliore Calcolatrice di Sempre",
        footer: "Fatto con ❤️ usando GitHub Actions"
    },
    pt: {
        title: "A Melhor Calculadora de Sempre",
        footer: "Feito com ❤️ usando GitHub Actions"
    },
    ja: {
        title: "史上最高の電卓",
        footer: "GitHub Actionsで❤️を込めて作成"
    },
    zh: {
        title: "史上最好的计算器",
        footer: "使用 GitHub Actions 用❤️制作"
    },
    ar: {
        title: "أفضل آلة حاسبة على الإطلاق",
        footer: "صُنع بـ ❤️ باستخدام GitHub Actions"
    },
    ru: {
        title: "Лучший Калькулятор в Мире",
        footer: "Сделано с ❤️ используя GitHub Actions"
    }
};

// Current language
let currentLanguage = localStorage.getItem('calculatorLanguage') || 'en';

// Initialize i18n
function initI18n() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = currentLanguage;
    
    // Set RTL for Arabic
    if (currentLanguage === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    updateLanguage(currentLanguage);
    
    languageSelect.addEventListener('change', (e) => {
        const newLanguage = e.target.value;
        localStorage.setItem('calculatorLanguage', newLanguage);
        currentLanguage = newLanguage;
        
        // Set RTL for Arabic
        if (newLanguage === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
        
        updateLanguage(newLanguage);
    });
}

// Update all translatable elements
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
            // Update title tag as well
            if (element.tagName === 'TITLE') {
                document.title = translations[lang][key];
            }
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}
