import type { LanguageModel } from "./model"
import type { LanguageView } from "./View"

export class LanguageController {
    constructor(
        view : LanguageView,
        model : LanguageModel
    ) {
        /** 언어 변경 목록 활성화 이벤트 */
        view.btnMenu?.addEventListener("click", () => {

            if(model.isMenu) {
                view.langsList?.classList.remove("on");
                view.backgroundLayer?.classList.remove("on");    
            }
            else {
                view.langsList?.classList.add("on");
                view.backgroundLayer?.classList.add("on");                
            }

            model.isMenu = !model.isMenu

        })

        /** 언어 변경 목록 활성화 후 백그라운드 레이어 이벤트 */
        view.backgroundLayer?.addEventListener("click", () => {

            if(model.isMenu) {
                view.langsList?.classList.remove("on");
                view.backgroundLayer?.classList.remove("on");    

                model.isMenu = false;
            }
        })

        /** 언어 변경 목록 버튼 이벤트 */
        view.btnSet?.forEach(el => {
            el.addEventListener("click", e => {
                const self = e.currentTarget as HTMLButtonElement;

                const type = self.value as LANGUAGE_TYPE;

                model.SetLanguageType(type);
                model.SetLanguage(type);
                view.SetLangs(model.langs)
                view.SetBtnMenu(type);
                view.SetBtnSetText(self.textContent.trim())
                
            })
        })
    }
}