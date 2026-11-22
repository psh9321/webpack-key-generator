import { GenerateAES } from "./AES";
import { GenerateRSA } from "./RSA";


export class GeneratorModel {
    /** 대칭키 생성 모듈 */
    RSA =  new GenerateRSA();

    /** 비대칭키 생성 모듈 */
    AES = new GenerateAES();

    /** form 태그 input name */
    inputNames = {
        rsa : {
            bit : "rsa-bit",
        },

        aes : {
            bit : "aes-bit",
            format : "aes-format"
        }
    }

}