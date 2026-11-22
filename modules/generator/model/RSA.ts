export class GenerateRSA {
    /** 공개키, 개인키 생성 */
    async GenerateRSAKey(bit : number) : Promise<{publicKey : CryptoKey
privateKey : CryptoKey}> {
        const { publicKey, privateKey } = await crypto.subtle.generateKey(
            {
            name: "RSA-OAEP",
            modulusLength : bit,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        )

        return { publicKey, privateKey };
    }

    /** 생성키를 array buffer로 변환 */
    async KeyToArrayBuffer(type : "public" | "private", key : CryptoKey) : Promise<ArrayBuffer> {
        switch (type) {
            case "public":
                return await crypto.subtle.exportKey("spki", key);                
            case "private":
                return await crypto.subtle.exportKey("pkcs8", key);  
            default:
                throw console.log("KeyToArrayBuffer type error",type)
        }
        
    }

    /** ArrayBuffer를 PEM 형식의 문자열로 변환 */
    ArrayBufferToPEM(buffer : ArrayBuffer) : string {
        const bytes = new Uint8Array(buffer);

        const binary = Array.from(bytes, (byte) =>
            String.fromCharCode(byte)
        ).join("");

        const base64 = btoa(binary);

        const formatted = base64.match(/.{1,64}/g)?.join("\n");

        return formatted??"";
    }
}