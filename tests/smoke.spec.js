import { test, expect } from '../fixtures/testFixture.js';

test('Application is accessible', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Swag Labs/);
});