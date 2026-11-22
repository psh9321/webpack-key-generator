import { LanguageController } from "./Controller";
import { LanguageModel } from "./model";
import { LanguageView } from "./View";

export class LanguageModule {
    constructor() {
        const model = new LanguageModel();
        const view = new LanguageView();

        view.SetLangs(model.langs);

        const currentLanguage = model.GetLanguageType() as LANGUAGE_TYPE;

        switch (currentLanguage) {
            case "ko": view.SetBtnSetText("한국어"); break;
            case "en" : view.SetBtnSetText("English"); break;
            default: view.SetBtnSetText("한국어"); break;
        }

        view.SetBtnMenu(currentLanguage);

        new LanguageController(view, model);
    }
}