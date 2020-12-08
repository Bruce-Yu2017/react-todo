import { CHANGE_LANGUAGE } from "../constants/languageConstant";

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};
