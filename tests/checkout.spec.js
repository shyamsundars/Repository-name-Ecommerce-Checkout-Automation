import { test, expect } from '../fixtures/testFixture.js';
import { checkoutData } from '../data/testData.js';

test('User can complete checkout successfully', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  confirmationPage,
}) => {
  await loginPage.goto();

  await loginPage.login(
    checkoutData.validUser.username,
    checkoutData.validUser.password
  );

  await productsPage.addProduct(checkoutData.product.name);
  await productsPage.openCart();

  await expect(
    cartPage.getItem(checkoutData.product.name)
  ).toBeVisible();

  await cartPage.checkout();

  await checkoutPage.enterCustomerInformation(
    checkoutData.customer.firstName,
    checkoutData.customer.lastName,
    checkoutData.customer.postalCode
  );

  await checkoutPage.continueToOverview();
  await checkoutPage.finishOrder();

  await expect(
    confirmationPage.confirmationMessage
  ).toBeVisible();
});