
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';



let loginPage: LoginPage;
let homePage: HomePage;



test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();

    homePage = new HomePage(page);


});

test('login-page-title-test', async () => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});


test('forgot_pwd_link_exist_test', async () => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});


test('user_is_able_to_login_succesfully', async () => {


    await loginPage.doLogin("3sukhwinder.it@gmail.com", "Admin@123");

    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');


});
