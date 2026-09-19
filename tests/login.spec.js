import { test, expect } from '../fixtures/testFixture.js';
import { checkoutData } from '../data/testData.js';

test.describe('Login validation', () => {
  test('User cannot login with invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.goto();

    await loginPage.login(
      checkoutData.invalidUser.username,
      checkoutData.invalidUser.password
    );

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );
  });

  test('User cannot login without username', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login('', checkoutData.validUser.password);

    await expect(loginPage.errorMessage).toContainText(
      'Username is required'
    );
  });

  test('User cannot login without password', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login(
      checkoutData.validUser.username,
      ''
    );

    await expect(loginPage.errorMessage).toContainText(
      'Password is required'
    );
  });
});