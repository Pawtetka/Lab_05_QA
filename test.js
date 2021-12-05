class MainPage {
  constructor(page){
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.demoblaze.com/');
  }

  async signUp() {
    // Click a:has-text("Sign up")
    await this.page.click('a:has-text("Sign up")');

    // Click text=Username: Password: >> input[type="text"]
    await this.page.click('text=Username: Password: >> input[type="text"]');

    // Fill text=Username: Password: >> input[type="text"]
    await this.page.fill('text=Username: Password: >> input[type="text"]', 'Pawtetka');

    // Click input[type="password"]
    await this.page.click('input[type="password"]');

    // Fill input[type="password"]
    await this.page.fill('input[type="password"]', '42Ubupam');

    // Click button:has-text("Sign up")
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.click('button:has-text("Sign up")');
  }

  async login() {
    // Click a:has-text("Log in")
    await this.page.click('a:has-text("Log in")');

    // Click text=Log in × Username: Password: Close Log in >> input[type="text"]
    await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="text"]');

    // Fill text=Log in × Username: Password: Close Log in >> input[type="text"]
    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="text"]', 'Pawtetka');

    // Click text=Log in × Username: Password: Close Log in >> input[type="password"]
    await this.page.click('text=Log in × Username: Password: Close Log in >> input[type="password"]');

    // Fill text=Log in × Username: Password: Close Log in >> input[type="password"]
    await this.page.fill('text=Log in × Username: Password: Close Log in >> input[type="password"]', '42Ubupam');

    // Click button:has-text("Log in")
    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/' }*/),
      this.page.click('button:has-text("Log in")')
    ]);
  }

  async logOut(){
    // Click text=Log out
    await this.page.click('text=Log out');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html');
  }
}

class BuyLaptopPage {
  constructor(page){
    this.page = page;
  }

  async navigate() {
    await this.page.click('text=Laptops');
    // await expect(this.page).toHaveURL('https://www.demoblaze.com/#');
  }

  async addLaptop() {
    // Click text=Sony vaio i7
    await this.page.click('text=Sony vaio i7');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=9');

    // Click text=Add to cart
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.click('text=Add to cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=9#');
  }

  async deleteLaptop() {
    // Click text=Cart
    await this.page.click('text=Cart');
    await expect(this.page).toHaveURL('https://www.demoblaze.com/wrong.html');

    // Click button:has-text("Place Order")
    await this.page.click('button:has-text("Place Order")');

    // Click #orderModal >> text=Close
    await this.page.click('#orderModal >> text=Close');

    // Click text=Delete
    await Promise.all([
      this.page.waitForNavigation(/*{ url: 'https://www.demoblaze.com/cart.html#' }*/),
      this.page.click('text=Delete')
    ]);
  }
}

const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  const mainPage = new MainPage(page);
  const buyLaptopPage = new BuyLaptopPage(page);

  await mainPage.navigate();
  await mainPage.login();
  
  await buyLaptopPage.navigate();
  await buyLaptopPage.addLaptop();
  await buyLaptopPage.deleteLaptop();

  await mainPage.logOut();
});