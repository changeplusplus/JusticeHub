import * as RNLocalize from "react-native-localize";
import Il8n from "il8n-js";

import arabic from "../Utils/locales/arabic";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
    Il8n.locale = locales[0].languageTag;
}

Il8n.fallback = true;
Il8n.translations = {
  arabic,
};

export default Il8n;