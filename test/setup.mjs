import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { webcrypto } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before } from 'node:test';
import { JSDOM, VirtualConsole } from 'jsdom';

let output;
let html;
let script;

before(() => {
    output = mkdtempSync(join(tmpdir(), 'key-generator-test-'));
    execFileSync(process.execPath, [
        'node_modules/webpack/bin/webpack.js', '--mode', 'production',
        '--config', 'webpack.config.ts', '--output-path', output,
    ], { cwd: new URL('../', import.meta.url) });
    html = readFileSync(join(output, 'index.html'), 'utf8');
    script = readFileSync(join(output, 'app.js'), 'utf8');
});

after(() => {
    if (output) rmSync(output, { recursive: true, force: true });
});

export function openApp(t, { userAgent = 'Firefox/140.0', language = 'ko-KR', savedStorage = {} } = {}) {
    const alerts = [];
    const clipboard = [];
    const errors = [];
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('error', error => errors.push(error));
    virtualConsole.on('jsdomError', error => errors.push(error));
    const { window } = new JSDOM(html, {
        url: 'https://key-generator.test/',
        runScripts: 'outside-only',
        pretendToBeVisual: true,
        virtualConsole,
    });
    t.after(() => {
        window.close();
        assert.deepEqual(errors, []);
    });
    Object.defineProperty(window, 'crypto', { value: webcrypto });
    Object.defineProperties(window.navigator, {
        userAgent: { value: userAgent },
        language: { value: language },
        clipboard: { value: { async writeText(value) { clipboard.push(value); } } },
    });
    window.alert = message => alerts.push(message);
    for (const [key, value] of Object.entries(savedStorage)) window.localStorage.setItem(key, value);
    window.eval(script);
    return { document: window.document, storage: window.localStorage, alerts, clipboard };
}
