import { Languages } from "../common/constants/Language"

export const getTranslation = (key, language) => {
    return Languages[language]?.[key] || key;
};