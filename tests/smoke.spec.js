import { test, expect } from '../fixtures/testFixture.js';

test('User can add a product to cart', { tag: '@smoke' }, async ({
  loginPage,
  productsPage,
  page,
  cartPage,
}) => {
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);

  await productsPage.addProduct('Sauce Labs Backpack');

  await productsPage.openCart();

  await expect(page).toHaveURL(/cart/);

  await expect(
    await cartPage.getItem('Sauce Labs Backpack')
  ).toBeVisible();
});