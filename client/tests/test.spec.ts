import { test, expect } from '@playwright/test';

test('Auto login and check invoices', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.fill('#email', 'alice@example.com');
  await page.fill('#password', 'password123');

  await page.click('#login-button');

  await page.waitForNavigation();

  await page.click('#invoices-link');

  await page.waitForTimeout(3000);

  const invoices = await page.locator('#invoices-list');
  const invoiceCount = await invoices.count();

  expect(invoiceCount).toBeGreaterThan(0);
});
