import { Page } from "playwright-core";

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Open a specific URL (or default to '/')
    async open(url: string = '/'): Promise<void> {
        await this.page.goto(url, { waitUntil: 'load' }); // Wait until page is loaded
    }
}