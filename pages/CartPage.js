export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

    getItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}