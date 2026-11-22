import type { GeneratorModel } from "./model";
import type { GeneratorView } from "./View";

import { Toast } from "../../util/Toast";

export class GeneratorController {
    constructor(
        view : GeneratorView,
        model : GeneratorModel,
    ) {

        
        /** RSA Form 이벤트 */
        view.form.rsa?.addEventListener("submit", async e => {
            e.preventDefault();
    
            try {
                const self = e.currentTarget as HTMLFormElement;

                const selectedBit = new FormData(self).get(model.inputNames.rsa.bit);

                if(!selectedBit) return console.log(`selectedBit undefined ${selectedBit}`)

                // rsaLoadingView.style.visibility = "visible";

                const { publicKey ,privateKey } = await model.RSA.GenerateRSAKey(Number(selectedBit));

                const publicKeyBuffer = await model.RSA.KeyToArrayBuffer("public", publicKey);
                const privateKeyBuffer = await model.RSA.KeyToArrayBuffer("private", privateKey);

                if(view.textarea.rsa.rsaPublic) {
                    view.textarea.rsa.rsaPublic.textContent = model.RSA.ArrayBufferToPEM(publicKeyBuffer);
                }
                else {
                    console.log("RSA Public Key TextArea undefined", view.textarea.rsa.rsaPublic)
                }

                if(view.textarea.rsa.rsaPrivate) {
                    view.textarea.rsa.rsaPrivate.textContent = model.RSA.ArrayBufferToPEM(privateKeyBuffer);
                }
                else {
                    console.log("RSA Public Key TextArea undefined", view.textarea.rsa.rsaPublic)
                }

                // rsaLoadingView.style.visibility = "hidden";
            }
            catch(err) {
                console.error(err);
            }
        })

        /** AES Form 이벤트 */
        view.form.aes?.addEventListener("submit", async e => {
            e.preventDefault();
            try {
                const self = e.currentTarget as HTMLFormElement;

                const formData = new FormData(self);

                const selectedBit = formData.get(model.inputNames.aes.bit);

                const selectedFormat = formData.get(model.inputNames.aes.format);

                if(!selectedBit || !selectedFormat) return console.log(`undefined Required value bit=${selectedBit} \n format=${selectedFormat}`,);

                if(selectedBit === "192" && navigator.userAgent.toLowerCase().includes("chrome")) return alert("크롬/엣지 브라우저에서 192Bit를 지원하지않습니다.");

                const key = await model.AES.GenerateAESKey(Number(selectedBit));

                const buffer = await model.AES.KeyToArrayBuffer(key);

                if(view.textarea.aes) {
                    switch (selectedFormat) {
                        case "base64":
                            view.textarea.aes.textContent = model.AES.ArrayBufferToBase64(buffer);
                        break;
                        case "hex": 
                            view.textarea.aes.textContent = model.AES.ArrayBufferToHex(buffer);
                        break;
                    
                        default:
                            throw console.log("format error", selectedFormat)
                    }
                }
                else {
                    console.log("AES Key TextArea undefined", view.textarea.aes)
                }
            }
            catch(err) {
                console.error(err);
            }
        })

        /** 생성한 키 복사 버튼 */
        const btns = [...Object.values(view.btnCopy.rsa), view.btnCopy.aes];               
        btns.forEach(el => {
            el?.addEventListener("click", e => {

                if(document.getElementById("toast")) return

                if (!navigator.clipboard?.writeText) return new Toast(`복사를 지원하지 않는 환경 입니다.`);

                const self = e.currentTarget as HTMLButtonElement;

                const target = self.dataset.copy;

                let contents = "";
                let toastContents = "";

                switch (target) {
                    case "rsa-private":
                        toastContents = "RSA 비공개키";
                        contents = view.textarea.rsa.rsaPrivate?.value as string
                    break;

                    case "rsa-public":
                        toastContents = "RSA 공개키"
                        contents = view.textarea.rsa.rsaPublic?.value as string
                    break;

                    case "aes":
                        toastContents = "AES키"
                        contents = view.textarea.aes?.value as string
                    break;
                
                    default:
                        console.error("dataset error", target)
                        break;
                }

                if(!contents) return alert("생성된 키가 없습니다.");

                navigator.clipboard.writeText(contents)
                .then(() => {
                    new Toast(`${toastContents}가 복사 되었습니다.`);
                })
                .catch(() => {
                    new Toast(`복사에 실패 했습니다.`);
                })

                    // alert("복사에 실패했습니다.\n잠시후 다시 시도해주세요.")
                
            })
        })
    }
}