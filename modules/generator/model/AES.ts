export class GenerateAES {
    /** AES 대칭키 생성 */
    async GenerateAESKey(bit : number) : Promise<CryptoKey> {
        const key = await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: bit,
            },
            true,
            ["encrypt", "decrypt"]
        );

        return key;
    }

    /** AES 키를 ArrayBuffer로 변환 */
    async KeyToArrayBuffer(key : CryptoKey) : Promise<ArrayBuffer> {
        return crypto.subtle.exportKey("raw", key);
    }

    /** ArrayBuffer를 Base64 문자열로 변환 */
    ArrayBufferToBase64(buffer : ArrayBuffer) : string {
        const bytes = new Uint8Array(buffer);

        const binary = Array.from(
            bytes,
            byte => String.fromCharCode(byte)
        ).join("");

        return btoa(binary);
    }

    /** ArrayBuffer를 HEX 문자열로 변환 */
    ArrayBufferToHex(buffer : ArrayBuffer) : string {
        const bytes = new Uint8Array(buffer);

        return Array.from(
            bytes,
            byte => byte.toString(16).padStart(2, "0")
        ).join("");
    }
}