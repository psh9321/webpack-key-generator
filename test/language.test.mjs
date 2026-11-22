import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { openApp } from './setup.mjs';

const translations = Object.fromEntries(
    Object.entries({ ko: 'korean', en: 'english' }).map(([locale, file]) => [
        locale,
        JSON.parse(readFileSync(new URL(`../modules/language/model/${file}.json`, import.meta.url))),
    ]),
);
const storageKey = 'psh-key-generator-language-type';

function assertLanguage(document, locale) {
    for (const [key, expected] of Object.entries(translations[locale])) {
        const elements = document.querySelectorAll(`[data-lang="${key}"]`);
        assert.ok(elements.length, `번역을 적용할 요소가 없습니다 ${key}`);
        for (const element of elements) assert.equal(element.textContent, expected, key);
    }
    assert.equal(document.querySelector('[data-lang="currentLanguage"]').textContent,
        locale === 'ko' ? '한국어' : 'English');
    assert.deepEqual(
        [...document.querySelectorAll('[data-lang="btnSet"].on')].map(button => button.value),
        [locale],
    );
}

test('한국어와 영어를 전환하고 저장한 언어를 다시 적용한다', t => {
    const { document, storage } = openApp(t);
    assertLanguage(document, 'ko');
    document.querySelector('[data-lang="btnMenu"]').click();
    assert.ok(document.querySelector('[data-lang="langsList"]').classList.contains('on'));

    for (const locale of ['en', 'ko', 'en']) {
        document.querySelector(`[data-lang="btnSet"][value="${locale}"]`).click();
        assertLanguage(document, locale);
        assert.equal(storage.getItem(storageKey), locale);
    }

    const reopened = openApp(t, { savedStorage: { [storageKey]: storage.getItem(storageKey) } });
    assertLanguage(reopened.document, 'en');
});
