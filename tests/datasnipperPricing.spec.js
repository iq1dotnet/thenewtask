const { test, expect } = require('@playwright/test');

//Maybe im wrong, but I was not able to find the Monthly/Annually subscripction model on the web
//Thats why I created a small test that can be run to check the UI.
//And here we have the usage of the .env for the base url :D 

test.beforeEach(async ({ page }) => {
  const baseUrl = process.env.BASE_URL;
  await page.goto(baseUrl);
});

test('Validate booking a demo on DataSnipper pricing page', async ({ page }) => {
  const pricingTab = page.locator('div.navigation-right.gap.nav >> text=Pricing');
  await expect(pricingTab).toBeVisible();

  await pricingTab.click();

  await expect(page.url()).toContain('https://www.datasnipper.com/pricing');

  const bookDemoButton = page.locator('#other-countries-annual > a');
  await bookDemoButton.click(); 

  await expect(page.url()).toContain('https://www.datasnipper.com/book-demo-professional');

  // No booking demo for to avoid spam :)
});
