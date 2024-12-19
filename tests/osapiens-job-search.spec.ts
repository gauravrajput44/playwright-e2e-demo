import { test, expect } from '@playwright/test';


// IMPROVEMENT: Instead of using a page object, use browser context to create a new page 
test('check Osapiens job search page', async ({ page }) => {

  //Improvement: Use the URL from the config file
  await page.goto('https://osapiens.jobs.personio.com/');
  await page.waitForLoadState('domcontentloaded');
  
  //Improvement: Use the locator from the page object, Use more reliable role-based selectors
  //Improvement: Find the API response for the job count and use it to validate the count
  const jobCount = await page
    .locator('span.job-summary-desc-info-jobs')
    .innerText();

  // IMPROVEMENT: Extract job count parsing to a utility function
  // IMPROVEMENT: Add error handling for invalid number formats
  const numberOfJobs = parseInt(jobCount);
  
  // IMPROVEMENT: Log test data to external reporting system instead of console log
  console.log(`Total number of jobs: ${numberOfJobs}`);
  
  // Check if any job title contains "Quality"
  //Improvement: Use the locator from the page object and use more reliable role-based selectors as per playwright documentation
  const qualityEngineerJob = page.locator('[data-job-position-name="Quality Engineer (m/w/d)"]').nth(0);

  // To check if it exists:
  await expect(qualityEngineerJob, {message: 'Quality Engineer position should be visible on the page'}).toBeVisible();
});