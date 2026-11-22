export class GeneratorView {
    /** 키 생성 form */
    form = {
        rsa : document.querySelector<HTMLFormElement>("[data-form=rsa]"),
        aes : document.querySelector<HTMLFormElement>("[data-form=aes]")
    }

    /** 생성한 키 복사 버튼 */
    btnCopy = {
        rsa : {
            /** RSA 개인키 복사 버튼 */
            rsaPrivate : document.querySelector<HTMLButtonElement>("[data-copy=rsa-private]"),

            /** RSA 공개키 복사 버튼 */
            rsaPublic : document.querySelector<HTMLButtonElement>("[data-copy=rsa-public]")
        },

        /** AES키 복사 버튼 */
        aes : document.querySelector<HTMLButtonElement>("[data-copy=aes]")
    }

    /** 생성한 키를 보여줄 textarea */
    textarea = {
        rsa : {
            /** RSA 개인키 textarea */
            rsaPrivate : document.querySelector<HTMLTextAreaElement>("[data-textarea=rsa-private]"),

            /** RSA 공개키 textarea */
            rsaPublic : document.querySelector<HTMLTextAreaElement>("[data-textarea=rsa-public]")
        },

        /** AES키 textarea */
        aes : document.querySelector<HTMLTextAreaElement>("[data-textarea=aes]")
    }
}
