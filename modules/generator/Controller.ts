import type { GeneratorModel } from "./model";
import type { GeneratorView } from "./View";

import { Toast } from "../../util/Toast";
import { LoadingView } from "../../util/LoadingView";

export class GeneratorController {
    constructor(
        View : GeneratorView,
        Model : GeneratorModel,
    ) {
        /** RSA Form 이벤트 */
        View.form.rsa?.addEventListener("submit", async e => {
            e.preventDefault();

            const self = e.currentTarget as HTMLFormElement;
    
            const loadingView = new LoadingView(self.parentElement as HTMLElement);

            try {

                const selectedBit = new FormData(self).get(Model.inputNames.rsa.bit);

                if(!selectedBit) return console.log(`selectedBit undefined ${selectedBit}`)

                loadingView.Render();

                const { publicKey ,privateKey } = await Model.RSA.GenerateRSAKey(Number(selectedBit));

                const publicKeyBuffer = await Model.RSA.KeyToArrayBuffer("public", publicKey);
                const privateKeyBuffer = await Model.RSA.KeyToArrayBuffer("private", privateKey);

                if(View.textarea.rsa.rsaPublic) {
                    View.textarea.rsa.rsaPublic.textContent = Model.RSA.ArrayBufferToPEM(publicKeyBuffer);
                }
                else {
                    console.log("RSA Public Key TextArea undefined", View.textarea.rsa.rsaPublic)
                }

                if(View.textarea.rsa.rsaPrivate) {
                    View.textarea.rsa.rsaPrivate.textContent = Model.RSA.ArrayBufferToPEM(privateKeyBuffer);
                }
                else {
                    console.log("RSA Public Key TextArea undefined", View.textarea.rsa.rsaPublic)
                }
            }
            catch(err) {
                console.error(err);
            }
            finally {
                loadingView.Remove();
            }
        })

        /** AES Form 이벤트 */
        View.form.aes?.addEventListener("submit", async e => {
            e.preventDefault();

            const self = e.currentTarget as HTMLFormElement;

            const loadingView = new LoadingView(self.parentElement as HTMLElement);
            try {

                const formData = new FormData(self);

                const selectedBit = formData.get(Model.inputNames.aes.bit);

                const selectedFormat = formData.get(Model.inputNames.aes.format);

                if(!selectedBit || !selectedFormat) return console.log(`undefined Required value bit=${selectedBit} \n format=${selectedFormat}`,);

                if(selectedBit === "192" && navigator.userAgent.toLowerCase().includes("chrome")) return alert("크롬/엣지 브라우저에서 192Bit를 지원하지않습니다.");

                loadingView.Render();
   
                const key = await Model.AES.GenerateAESKey(Number(selectedBit));

                const buffer = await Model.AES.KeyToArrayBuffer(key);

                if(View.textarea.aes) {
                    switch (selectedFormat) {
                        case "base64":
                            View.textarea.aes.textContent = Model.AES.ArrayBufferToBase64(buffer);
                        break;
                        case "hex": 
                            View.textarea.aes.textContent = Model.AES.ArrayBufferToHex(buffer);
                        break;
                    
                        default:
                            throw console.log("format error", selectedFormat)
                    }
                }
                else {
                    console.log("AES Key TextArea undefined", View.textarea.aes)
                }
            }
            catch(err) {
                console.error(err);
            }
            finally {
                loadingView.Remove();
            }
        })

        /** 생성한 키 복사 버튼 */
        const btns = [...Object.values(View.btnCopy.rsa), View.btnCopy.aes];               
        btns.forEach(el => {
            el?.addEventListener("click", e => {

                if(document.getElementById("toast")) return

                if (!navigator.clipboard.writeText) return new Toast(`복사를 지원하지 않는 환경 입니다.`);

                const self = e.currentTarget as HTMLButtonElement;

                const target = self.dataset.copy;

                let contents = "";
                let toastContents = "";

                switch (target) {
                    case "rsa-private":
                        toastContents = "RSA 비공개키";
                        contents = View.textarea.rsa.rsaPrivate?.value as string
                    break;

                    case "rsa-public":
                        toastContents = "RSA 공개키"
                        contents = View.textarea.rsa.rsaPublic?.value as string
                    break;

                    case "aes":
                        toastContents = "AES키"
                        contents = View.textarea.aes?.value as string
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