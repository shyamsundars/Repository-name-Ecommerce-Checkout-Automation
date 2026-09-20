export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  getItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  getItemQuantity(productName) {
    return this.getItem(productName).locator('.cart_quantity');
  }

  getItemPrice(productName) {
    return this.getItem(productName).locator('.inventory_item_price');
  }

  getItemCount() {
    return this.cartItems.count();
  }

  async removeProduct(productName) {
    const item = this.getItem(productName);

    await item
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}