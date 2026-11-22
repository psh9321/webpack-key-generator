import korean from "./korean.json"
import english from "./english.json"

export class LanguageModel {

    /** 언어 타입 저장할 로컬 스토리지 키 */
    storageKey : string = "psh-key-generator-language-type";

    /** 현재 언어 데이터 */
    langs : LANGUAGE_DATA_OBJECT = korean;

    /** 변경할 언어 목록 활성화 여부 */
    isMenu : boolean = false

    constructor() { this.Init() };

    /** 언어 모델 초기 설정 */
    Init() {

        let currentType = this.GetLanguageType();

        if(!currentType) {
            this.SetLanguageType((navigator.language.split("-")[0] as LANGUAGE_TYPE)??"ko")
        }

        this.SetLanguage(this.GetLanguageType() as LANGUAGE_TYPE);
    }

    /** langs data 설정 */
    SetLanguage(type : LANGUAGE_TYPE) {
        switch (type) {
            case "ko": this.langs = korean; break;
            case "en": this.langs = english; break;
        
            default: this.langs = korean; break;
        }
    }

    /** langs type 설정 */
    SetLanguageType(type : LANGUAGE_TYPE) {
        localStorage.setItem(this.storageKey, type);
    }

    /** 현재 langs type 불러오기 */
    GetLanguageType() : LANGUAGE_TYPE | ""  {
        return localStorage.getItem(this.storageKey) as LANGUAGE_TYPE??""
    }
}