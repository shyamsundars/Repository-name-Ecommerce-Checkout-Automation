import { test, expect } from '../fixtures/testFixture.js';
import { checkoutData } from '../data/testData.js';

test.describe('Cart management', () => {
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

    await productsPage.addProduct(
      checkoutData.products.backpack.name
    );

    await productsPage.addProduct(
      checkoutData.products.bikeLight.name
    );

    await productsPage.openCart();
  });

  test('User can add multiple products to cart', { tag: '@regression' }, async ({
    cartPage,
  }) => {
    await expect(
      cartPage.getItem(checkoutData.products.backpack.name)
    ).toBeVisible();

    await expect(
      cartPage.getItem(checkoutData.products.bikeLight.name)
    ).toBeVisible();

    await expect(
      cartPage.getItemQuantity(checkoutData.products.backpack.name)
    ).toHaveText('1');

    await expect(
      cartPage.getItemQuantity(checkoutData.products.bikeLight.name)
    ).toHaveText('1');

    await expect(
      cartPage.getItemPrice(checkoutData.products.backpack.name)
    ).toHaveText(checkoutData.products.backpack.price);

    await expect(
      cartPage.getItemPrice(checkoutData.products.bikeLight.name)
    ).toHaveText(checkoutData.products.bikeLight.price);

    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('User can remove a product from cart', { tag: '@regression' }, async ({
    cartPage,
  }) => {
    await cartPage.removeProduct(
      checkoutData.products.bikeLight.name
    );

    await expect(
      cartPage.getItem(checkoutData.products.bikeLight.name)
    ).toHaveCount(0);

    await expect(
      cartPage.getItem(checkoutData.products.backpack.name)
    ).toBeVisible();

    await expect(cartPage.cartItems).toHaveCount(1);
  });
});