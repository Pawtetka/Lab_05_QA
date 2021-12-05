// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    retries: 2,
    use: {
        headless: false,
        viewport: { width: 1200, height: 720 },
	video: 'on-first-retry',
	trace: 'retain-on-failure'
    },
};

module.exports = config;