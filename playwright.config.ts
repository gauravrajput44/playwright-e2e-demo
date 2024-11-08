import {  defineConfig } from '@playwright/test';
export default defineConfig({
    testDir: 'tests',
    timeout: 30000,

    reporter: 'html',
    use: {
        baseURL: 'https://democentral.learnquicksight.online',
        screenshot: 'only-on-failure', // Options: 'on', 'only-on-failure', 'off'
    },

    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
    ],
})