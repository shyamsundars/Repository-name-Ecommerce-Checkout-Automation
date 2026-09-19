export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByText('Products', { exact: true });
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProduct(productName) {
    const product = this.page.locator('.inventory_item', {
      hasText: productName,
    });

    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
