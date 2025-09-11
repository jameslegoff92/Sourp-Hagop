import { test, expect } from '@playwright/test'
 
test('should navigate to the login portal page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('https://localhost:3000/')
  // Find an element with the text 'Portail' and click on it
  await page.click("#historyid")
  // The new URL should be "/about" (baseURL is used there)
  await expect(page).toHaveURL('https://localhost:3000/historique')
})