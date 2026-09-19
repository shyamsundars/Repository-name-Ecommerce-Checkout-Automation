import { test, expect } from '../fixtures/testFixture.js';
import { checkoutData } from '../data/testData.js';

test.describe('Checkout validation', () => {
  test.beforeEach(async ({
    loginPage,
    productsPage,
    cartPage,
  }) => {
    await loginPage.goto();

    await loginPage.login(
      checkoutData.validUser.username,
      checkoutData.validUser.password
    );

    await productsPage.addProduct(checkoutData.product.name);
    await productsPage.openCart();
    await cartPage.checkout();
  });

  test('Checkout requires first name', async ({ checkoutPage }) => {
    await checkoutPage.enterCustomerInformation(
      '',
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText(
      'First Name is required'
    );
  });

  test('Checkout requires last name', async ({ checkoutPage }) => {
    await checkoutPage.enterCustomerInformation(
      checkoutData.customer.firstName,
      '',
      checkoutData.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText(
      'Last Name is required'
    );
  });

  test('Checkout requires postal code', async ({ checkoutPage }) => {
    await checkoutPage.enterCustomerInformation(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      ''
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toContainText(
      'Postal Code is required'
    );
  });
});