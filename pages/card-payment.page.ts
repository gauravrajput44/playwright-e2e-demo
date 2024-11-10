import fs from 'fs'
import { BasePage } from './base.page'
import { Locator, Page } from '@playwright/test'

export class CardPayment extends BasePage {
  private readonly iframeSelector =
    '#DashboardEmbedDiv .quicksight-embedding-iframe'
  private readonly downloadPath = 'download/'

  constructor(page: Page) {
    super(page)
  }

  private get frame() {
    return this.page.frameLocator(this.iframeSelector)
  }
  // Locators for the page
  private get customerTab() {
    return this.frame.locator("[data-automation-id='sheetTabsBar_sheetTab']")
  }
  private get controlPanel() {
    return this.frame.locator('#sheet_control_panel_header')
  }
  private get startDateField() {
    return this.frame.getByTitle('Start Date')
  }
  private get endDateField() {
    return this.frame.getByTitle('End Date')
  }
  private get customerListTable() {
    return this.frame.locator("[data-automation-id='analysis_visual_subtitle']")
  }
  private get contextMenuButton() {
    return this.frame.locator(
      "[data-automation-id='analysis_visual_dropdown_menu_button']",
    )
  }
  private get exportCsvButton() {
    return this.frame.locator(
      "[data-automation-id='dashboard_visual_dropdown_export']",
    )
  }
  private get creditCardMenuButton() {
    return this.frame.locator("[data-automation-id='sheet_control_value']")
  }
  private get selectAllOption() {
    return this.frame.locator(
      "[data-automation-id='dropdown_select_all_search_result_entry']",
    )
  }
  private get masterCardOption() {
    return this.frame.locator(
      "[data-automation-id='param_value_as_entry'][data-automation-context='MasterCard']",
    )
  }

  async switchToCustomerTab() {
    await this.customerTab.click()
    await this.controlPanel.waitFor()
  }

  async selectDate(date: string, delay = 500) {
    await this.controlPanel.click()
    await this.fillDateField(this.startDateField, date, delay)
    await this.fillDateField(this.endDateField, date, delay)
  }

  private async fillDateField(field: Locator, date: string, delay: number) {
    await field.dblclick({ delay })
    await field.clear()
    await field.fill(date)
  }

  async filterByMasterCreditCardType() {
    await this.creditCardMenuButton.click()
    await this.selectAllOption.click()
    await this.masterCardOption.click()
    await this.page.keyboard.press('Escape') // Close the dropdown menu
  }

  async getDownloadedCsv(): Promise<string> {
    await this.customerListTable.click()
    await this.contextMenuButton.click()

    const downloadPromise = this.page.waitForEvent('download')
    await this.exportCsvButton.click()

    const download = await downloadPromise
    const filePath = `${this.downloadPath}${download.suggestedFilename()}`
    await download.saveAs(filePath)
    return fs.readFileSync(filePath, 'utf-8')
  }
}
