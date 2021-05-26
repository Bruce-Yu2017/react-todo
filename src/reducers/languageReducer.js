import { CHANGE_LANGUAGE } from "../constants/languageConstant";

import { english, simplifiedChinese, spanish } from "../assets/language";

export const languageReducer = (state = english, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      if (action.payload === "english") {
        return english;
      } else if (action.payload === "simplifiedChinese") {
        return simplifiedChinese;
      } else if (action.payload === "spanish") {
        return spanish;
      }
      break;
    default:
      return state;
  }
};
