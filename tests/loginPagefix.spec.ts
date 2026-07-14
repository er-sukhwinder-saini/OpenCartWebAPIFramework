
import { test, expect } from '../src/fixtures/pagefixture'

// import { test as dataset } from '../src/fixtures/sukhitestdata.fixture';
import { CsvHelper } from '../src/utils/CSVHelper';
import { JsonHelper } from '../src/utils/JsonHelper';



test.beforeEach(async ({ loginPage }) => {

    await loginPage.goToLoginPage();

});

test('login-page-title-test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});


test('forgot_pwd_link_exist_test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});



//reading username and password from .envQA file

test('user_is_able_to_login_succesfully', async ({ loginPage, homePage }) => {

    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);

    // await loginPage.doLogin("3sukhwinder.it@gmail.com", "1Admin@123");

    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');


});



//read the csv data directlty without test data fixture and loop the test method row wise....


let testData = CsvHelper.readCsv('src/data/loginData.csv');

for (let row of testData) {
    test(`test_invalid_login_test_${row.username} - ${row.password}`, async ({ loginPage }) => {

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrDisplayed()).toBeTruthy();

    });

    
    //npx playwright test loginPagefix.spec.ts -g "test_invalid_login_test_"


}




//read the csv data directlty without test data fixture and loop the test method row wise....



const loginJSONData = JsonHelper.readJson("src/data/loginData.json");
for (let row of loginJSONData) {
    test(`invalid login test with JSON data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });




// dataset(`login-page-title_agai`, async ({ mytestData }) => {
//         console.log(mytestData.age);



// });







};
