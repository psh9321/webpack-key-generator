import assert from 'node:assert/strict';
import { createPrivateKey, createPublicKey } from 'node:crypto';
import { test } from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { openApp } from './setup.mjs';

function selectRadio(form, name, value) {
    const input = form.querySelector(`input[name="${name}"][value="${value}"]`);
    assert.ok(input, `선택할 키 길이 또는 형식 옵션이 없습니다 ${name}=${value}`);
    input.checked = true;
}

async function waitFor(check, message) {
    const deadline = Date.now() + 10_000;
    while (!check()) {
        assert.ok(Date.now() < deadline, message);
        await delay(10);
    }
}

for (const bits of [2048, 3072, 4096]) {
    test(`RSA ${bits} 비트 공개키와 개인키가 출력란에 표시되며 한 쌍을 이룬다`, async t => {
        const { document, clipboard } = openApp(t);
        const form = document.querySelector('[data-form="rsa"]');
        const publicOutput = document.querySelector('[data-textarea="rsa-public"]');
        const privateOutput = document.querySelector('[data-textarea="rsa-private"]');
        selectRadio(form, 'rsa-bit', bits);
        form.requestSubmit();
        await waitFor(() => publicOutput.value && privateOutput.value, 'RSA 키 출력란이 비어 있습니다');

        const publicDer = Buffer.from(publicOutput.value, 'base64');
        const publicKey = createPublicKey({ key: publicDer, format: 'der', type: 'spki' });
        const privateKey = createPrivateKey({
            key: Buffer.from(privateOutput.value, 'base64'), format: 'der', type: 'pkcs8',
        });
        assert.equal(publicKey.asymmetricKeyDetails.modulusLength, bits);
        assert.deepEqual(createPublicKey(privateKey).export({ format: 'der', type: 'spki' }), publicDer);

        if (bits !== 2048) return;
        for (const [type, output] of [['rsa-public', publicOutput], ['rsa-private', privateOutput]]) {
            document.querySelector(`[data-copy="${type}"]`).click();
            assert.equal(clipboard.at(-1), output.value);
            await waitFor(() => document.getElementById('toast'), '복사 완료 알림이 표시되지 않았습니다');
            document.getElementById('toast').remove();
        }
        assert.equal(clipboard.length, 2);
    });
}

for (const bits of [128, 192, 256]) {
    for (const format of ['base64', 'hex']) {
        test(`AES ${bits} 비트 키를 ${format} 형식으로 출력하고 복사한다`, async t => {
            const { document, alerts, clipboard } = openApp(t);
            const form = document.querySelector('[data-form="aes"]');
            const output = document.querySelector('[data-textarea="aes"]');
            selectRadio(form, 'aes-bit', bits);
            selectRadio(form, 'aes-format', format);
            form.requestSubmit();
            await waitFor(() => output.value, 'AES 키 출력란이 비어 있습니다');

            const bytes = Buffer.from(output.value, format);
            assert.equal(bytes.length * 8, bits);
            assert.equal(bytes.toString(format), output.value);
            assert.deepEqual(alerts, []);
            document.querySelector('[data-copy="aes"]').click();
            assert.deepEqual(clipboard, [output.value]);
        });
    }
}

for (const [browser, userAgent] of [
    ['Chrome', 'Mozilla/5.0 Chrome/140.0.0.0 Safari/537.36'],
    ['Edge', 'Mozilla/5.0 Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0'],
]) {
    test(`AES 192 비트 선택 시 ${browser}에서 경고가 표시된다`, t => {
        const { document, alerts } = openApp(t, { userAgent });
        const form = document.querySelector('[data-form="aes"]');
        selectRadio(form, 'aes-bit', 192);
        form.requestSubmit();
        assert.deepEqual(alerts, ['크롬/엣지 브라우저에서 192Bit를 지원하지않습니다.']);
        assert.equal(document.querySelector('[data-textarea="aes"]').value, '');
    });
}
