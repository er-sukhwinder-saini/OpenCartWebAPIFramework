import { test, expect } from '../src/fixtures/pagefixture'

test.beforeEach(async ({ loginPage }) => {

    await loginPage.goToLoginPage();
    await loginPage.doLogin("3sukhwinder.it@gmail.com", "Admin@123");



});



test('verify_title_of_the_page', async ({homePage}) => {
    const pageTitle = await homePage.getPageTitle();
    console.log("Page Title Is" + pageTitle);

    expect(pageTitle).toBe('My Account');

});


test('log_out_link_exist', async ({homePage}) => {

    expect(await homePage.isLogoutLinkExist()).toBeTruthy();

});

test('header_exist', async ({homePage}) => {

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