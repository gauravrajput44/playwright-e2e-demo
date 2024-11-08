import { BrowserContext, expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { CardPayment } from "../pages/card-payment.page";
import { getTotalRevenuefromCsv } from "../utils/csv.util";

test.describe("Customer Payment report for credit card", () => {
    let homePage: HomePage;
    let cardPaymentPage: CardPayment;
    const date = "2023/11/23 00:00:00";
    const expectedSumOfRevenue = 13915.15;
    let context: BrowserContext;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        const page = await context.newPage();
        homePage = new HomePage(page);
        cardPaymentPage = new CardPayment(page);

        await homePage.open();
        await homePage.openContentBrowserMenu();
        await homePage.navigateToAskQFinancialServices();
        await cardPaymentPage.switchToCustomerTab();
    });

    test.afterEach(async () => {
        await context.close();
    });

    test("Verify that Master credit card customer data can be exported and that the sum of relevant values matches expected results.", async () => {
        await cardPaymentPage.selectDate(date);
        await cardPaymentPage.filterByMasterCreditCardType();
        const revenue = await (getTotalRevenuefromCsv(await cardPaymentPage.getDownloadedCsv()));
        expect(revenue).toEqual(expectedSumOfRevenue);
    });

    // Below test is written to validate that when we don't select master credit type, test gets failed
    // We can unskip it and run it if needed to demo screenshot capture
    test.skip("Verify that customer data for the default selected options can be exported and that the sum of relevant values does not match the expected results.", async () => {
        await cardPaymentPage.selectDate(date);
        const revenue = await (getTotalRevenuefromCsv(await cardPaymentPage.getDownloadedCsv()));
        expect(revenue).toEqual(expectedSumOfRevenue);
    });
});