export class LanguageView {

    /** 암호화 키 생성기 */
    bannerTitle = document.querySelector<HTMLElement>("[data-lang=bannerTitle]");

    /** RSA(비대칭키)와 AES(대칭키) 키를 쉽고 빠르게 생성하세요. */
    bannerText = document.querySelector<HTMLElement>("[data-lang=bannerText]");

    /** RSA (비대칭키) */
    rsaHeadText = document.querySelector<HTMLElement>("[data-lang=rsaHeadText]");

    /** 공개키와 개인키 한 쌍을 생성합니다. */
    rsaCreateKeyText = document.querySelector<HTMLElement>("[data-lang=rsaCreateKeyText]");

    /** 개인 키 (Private Key) */
    rsaCreatePrivateKey = document.querySelector<HTMLElement>("[data-lang=rsaCreatePrivateKey]");

    /** 공개 키 (Public Key) */
    rsaCreatePublicKey = document.querySelector<HTMLElement>("[data-lang=rsaCreatePublicKey]");

    /** 언어 메뉴 버튼 */
    btnMenu = document.querySelector<HTMLElement>("[data-lang=btnMenu]");

    /** 언어 메뉴 배경 레이어 */
    backgroundLayer = document.querySelector<HTMLElement>("[data-lang=backgroundLayer]");

    /** 언어 목록 */
    langsList = document.querySelector<HTMLElement>("[data-lang=langsList]");

    /** 복사 */
    copy : NodeList = document.querySelectorAll("[data-lang=copy]");

    /** (권장) */
    recommend : NodeList = document.querySelectorAll("[data-lang=recommend]");

    /** 키 길이 */
    rsaKeyLength : NodeList = document.querySelectorAll("[data-lang=rsaKeyLength]");

    /** RSA 키 생성 */
    rsaCreateKeyTitle : NodeList = document.querySelectorAll("[data-lang=rsaCreateKeyTitle]");

    /** 언어 선택 버튼 */
    btnSet : NodeList = document.querySelectorAll("[data-lang=btnSet]");

    /** 현재 선택된 언어 */
    currentLanguage = document.querySelector<HTMLElement>("[data-lang=currentLanguage]");

    SetLangs(langs : LANGUAGE_DATA_OBJECT) {
        for(const key in langs) {

            if(key === "copy" || 
               key === "rsaCreateKeyTitle" ||
               key === "rsaKeyLength" ||
               key === "recommend" || 
               key === "submitResultKey" ||
               key === "aesCreateKeyTitle"
            ) {
                document.querySelectorAll(`[data-lang=${key}]`).forEach(el => el.textContent = langs[key])
            }
            else {

                const element = document.querySelector(`[data-lang=${key}]`);

                if(element) element.textContent = langs[key];
            }
        }
    }

    CreateBackgroundLayer() {
        const layer = document.createElement("div");

        layer.setAttribute("class","layer");

        return layer;
    }

    LayerClickCallback(e : UIEvent) {

        const self = e.currentTarget as HTMLElement;
        
        if(e.target !== self) return

 
        if(self.classList.contains("on")) self.classList.remove("on");
    }

    SetBtnMenu(type : LANGUAGE_TYPE) {
        this.btnSet.forEach(el => {
            const self = el as HTMLButtonElement;

            if(self.value === type) {
                if(!self.classList.contains("on")) {
                    self.classList.add("on")
                }
            }
            else {
                if(self.classList.contains("on")) {
                    self.classList.remove("on")
                }
            }
        })
    }

    SetBtnSetText(text : string) {
        if(this.currentLanguage) {
            this.currentLanguage.textContent = text
        }
    }
}
