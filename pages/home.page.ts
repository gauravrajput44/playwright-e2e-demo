import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Locators for the page
    private get openContentBrowser() { return this.page.locator("#MiniBrowsePanelClosedFolder"); }
    private get closedContentBrowser() { return this.page.locator("#MiniBrowsePanelOpenFolder"); }
    private get askQSection() { return this.page.locator("#BrowsePanelAskQ"); }
    private get askQFinancialService() { return this.page.locator("#AskQ-Q-Financial-Services-Card-Payments"); }

    async openContentBrowserMenu() {
        await this.openContentBrowser.click();
    }

    async navigateToAskQFinancialServices() {
        await this.askQSection.click();
        await this.askQFinancialService.click();
        await this.closedContentBrowser.click();
    }
}