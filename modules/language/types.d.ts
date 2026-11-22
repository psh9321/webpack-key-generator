declare global {

    /** 현재 지원하는 언어 타입 */
    type LANGUAGE_TYPE = "ko" | "en"

    /** 언어 데이터 형식 */
    type LANGUAGE_DATA_OBJECT = Record<string, string>;
}

export {}