markdown
# 🛒 Ecommerce Checkout Automation (Playwright)

## 📌 Project Overview
This project automates the **end-to-end checkout flow** of an ecommerce application using **Playwright**.  
It validates product selection, cart operations, checkout, payment, and order confirmation with robust test coverage.  
The framework is designed for scalability, CI/CD integration, and advanced QA practices including **PDF validation** and **GenAI-assisted test generation**.

---

## ⚙️ Tech Stack
- **Playwright** (JavaScript/TypeScript) – browser automation
- **Node.js** – runtime environment
- **Allure / HTML Reporter** – test reporting
- **GitHub Actions / Azure DevOps** – CI/CD pipelines
- **GenAI (Ollama + Qwen3)** – assisted test authoring
- **PDFKit / pdf-parse** – PDF validation utilities

---

## 📂 Project Structure
Ecommerce-Checkout-Automation/
│── tests/                # Test cases (smoke, regression)
│── pages/                # Page Object Model (POM) classes
│── data/                 # Test data (JSON/CSV)
│── utils/                # Helpers (PDF validation, API mocks)
│── reports/              # Test execution reports
│── playwright.config.ts  # Playwright configuration
│── package.json          # Dependencies & scripts
│── README.md             # Documentation

Code

---

## ✅ Prerequisites
- Node.js (>= 18.x)
- npm / yarn
- Playwright (`npm install -D @playwright/test`)
- Git installed
- Browser binaries (Playwright will auto-install)

---

## 📥 Installation
```bash
git clone https://github.com/your-repo/Ecommerce-Checkout-Automation.git
cd Ecommerce-Checkout-Automation
npm install
npx playwright install
🧪 Test Commands
Run all tests

bash
npx playwright test
Run smoke tests

bash
npx playwright test --grep @smoke
Run regression tests

bash
npx playwright test --grep @regression
📊 Test Coverage
Product selection

Cart operations

Checkout workflow

Payment gateway validation

Order confirmation

PDF invoice validation

Negative scenarios (invalid card, empty cart)

🏗️ POM Architecture
BasePage → common methods (navigate, wait, screenshot)

ProductPage → product selection

CartPage → cart operations

CheckoutPage → address & payment

OrderPage → confirmation & PDF validation

📑 Test Data
Stored in data/ as JSON/CSV

Supports parameterized tests

Example:

json
{
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "payment": {
    "cardNumber": "4111111111111111",
    "expiry": "12/26",
    "cvv": "123"
  }
}
📄 PDF Validation
Uses pdf-parse to validate invoice content

Ensures:

Correct order ID

Product details

Billing/shipping info

Total amount

📈 Reporting
Allure Reports (npx allure generate ./allure-results)

HTML Reporter (default Playwright)

Screenshots & video on failure

🔄 CI/CD
GitHub Actions / Azure DevOps pipeline

Steps:

Install dependencies

Run Playwright tests

Generate reports

Upload artifacts

Supports parallel execution across browsers

⚡ Parallel Execution
Playwright runs tests in parallel by default

Configurable via playwright.config.ts

Example:

ts
workers: 4,
retries: 2,
🤖 GenAI Contributions
Ollama + Qwen3 integrated with VS Code

AI-assisted:

Test case generation

Locator suggestions

Regression suite expansion

Helps accelerate authoring & reduce human error

🚀 Next Steps
Add API-level validations

Expand regression suite

Integrate with Docker for containerized runs

Code

---

This README is **ready-to-use** and tailored for a QA automation portfolio project. It highlights **professional practices** (POM, CI/CD, reporting, PDF validation) while also showcasing **GenAI integration** for modern workflows.  
