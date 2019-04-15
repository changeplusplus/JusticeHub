// import all locales
import ara from './ara.json';
import eng from './eng.json';
import esp from './esp.json';

class I18n {
    static languages = {
        'Ara': ara,
        'Eng': eng,
        'Esp': esp
    };

    static curLang = I18n.languages.Eng;

    static changeLang = (lang) => {
        if (lang === 'Ara')
            I18n.curLang = I18n.languages.Ara;
        else if (lang === 'Eng')
            I18n.curLang = I18n.languages.Eng;
        else if (lang === 'Esp')
            I18n.curLang = I18n.languages.Esp;
        else
            I18n.curLang = I18n.languages.Eng;
    };

    static getLangKey = () => {
        if (I18n.curLang === I18n.languages.Ara)
            return 'Ara';
        else if (I18n.curLang === I18n.languages.Eng)
            return 'Eng';
        else if (I18n.curLang === I18n.languages.Esp)
            return 'Esp';
    };
}

export default I18n;