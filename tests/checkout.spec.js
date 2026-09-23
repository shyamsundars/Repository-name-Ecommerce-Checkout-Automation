import { test, expect } from '../fixtures/testFixture.js';
import { checkoutData } from '../data/testData.js';
import { extractPdfText } from '../utils/pdfUtils.js';

//test('User can complete checkout successfully', async ({
//test('@smoke User can complete checkout successfully', async ({
test('User can complete checkout successfully', { tag: '@smoke' }, async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  confirmationPage,
}, testInfo) => {
  await loginPage.goto();

  await loginPage.login(
    checkoutData.validUser.username,
    checkoutData.validUser.password
  );

  await productsPage.addProduct(checkoutData.products.backpack.name);
  await productsPage.openCart();

  const cartItem = cartPage.getItem(checkoutData.products.backpack.name);

  await expect(cartItem).toBeVisible();

  await expect(
    cartPage.getItemQuantity(checkoutData.products.backpack.name)
  ).toHaveText('1');

  await expect(
    cartPage.getItemPrice(checkoutData.products.backpack.name)
  ).toHaveText(checkoutData.products.backpack.price);

  await cartPage.checkout();

  await checkoutPage.enterCustomerInformation(
    checkoutData.customer.firstName,
    checkoutData.customer.lastName,
    checkoutData.customer.postalCode
  );

  await checkoutPage.continueToOverview();
  await expect(checkoutPage.subtotal).toContainText('Item total:');
  await expect(checkoutPage.tax).toContainText('Tax:');
  await expect(checkoutPage.total).toContainText('Total:');

  const subtotal = await checkoutPage.getPriceValue(
    checkoutPage.subtotal
  );

  const tax = await checkoutPage.getPriceValue(
    checkoutPage.tax
  );

  const total = await checkoutPage.getPriceValue(
    checkoutPage.total
  );

  expect(total).toBeCloseTo(subtotal + tax, 2);
  await checkoutPage.finishOrder();

  await expect(
    confirmationPage.confirmationMessage
  ).toBeVisible();

  const pdfPath = testInfo.outputPath('order-confirmation.pdf');

  await confirmationPage.generatePdf(pdfPath);

  const pdfText = await extractPdfText(pdfPath);

  expect(pdfText).toContain('Thank you for your order!');
});

//test('User can complete checkout successfully', { tag: '@smoke' }, async ({ 
//test('@regression User can complete checkout with multiple products', async ({
//test('User can complete checkout with multiple products', { tag: '@regression' }, async ({ ... }) => {
test('User can complete checkout with multiple products', { tag: '@regression' }, async ({
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

    await productsPage.addProduct(
      checkoutData.products.backpack.name
    );

    await productsPage.addProduct(
      checkoutData.products.bikeLight.name
    );

    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.checkout();

    await checkoutPage.enterCustomerInformation(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode
    );

    await checkoutPage.continueToOverview();

    const subtotal = await checkoutPage.getPriceValue(
      checkoutPage.subtotal
    );

    const tax = await checkoutPage.getPriceValue(
      checkoutPage.tax
    );

    const total = await checkoutPage.getPriceValue(
      checkoutPage.total
    );

    expect(subtotal).toBe(
      checkoutData.pricing.twoProductSubtotal
    );

    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutPage.finishOrder();

    await expect(
      confirmationPage.confirmationMessage
    ).toBeVisible();
  });