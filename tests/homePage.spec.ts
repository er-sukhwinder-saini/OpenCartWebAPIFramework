
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin("3sukhwinder.it@gmail.com", "Admin@123");
    homePage = new HomePage(page);


});



test('verify_title_of_the_page', async () => {
    const pageTitle = await homePage.getHomePageTitle();
    console.log("Page Title Is" + pageTitle);

    expect(pageTitle).toBe('My Account');

});


test('log_out_link_exist', async () => {

    expect(await homePage.isLogoutLinkExist()).toBeTruthy();

});

test('header_exist', async () => {

    let pageHeader = await homePage.getHomePageHeaders();
    console.log("Page Header is" + pageHeader);

    expect(pageHeader).toHaveLength(4);
    expect(pageHeader).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'

    ])



});