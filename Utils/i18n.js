import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

// import all locales
import ara from './ara.json';
import eng from './eng.json';
import esp from './esp.json';

// Fallback to English if user locale does not exist
I18n.fallbacks = true;

// Define supported languages
I18n.translations = {
    ara,
    eng,
    esp
};

const currentLocale = I18n.currentLocale();

// Is RTL (Right to Left)?
export const isRTL = currentLocale.indexOf('ara') === 0;

// Allow RTL alignment
ReactNative.I18nManager.allowRTL(isRTL);

export function strings(name, params = {}) {
    return I18n.t(name, params);
}

export default I18n;

