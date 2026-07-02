import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfopage';
import { RegisterPage } from '../pages/RegisterPage';
import { BasePage } from '../pages/BasePage';



//define type for page fixture
// Sukhi will learn this


type pageFixture = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultPage: SearchResultPage,
    productInfoPage: ProductInfoPage,
    registerPage: RegisterPage


};


//extend playwright base test

export let test = baseTest.extend<pageFixture>({

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage)

    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage)

    },


    searchResultPage: async ({ page }, use) => {
        let searchResultPage = new SearchResultPage(page);
        await use(searchResultPage)

    },




    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage)

    },



    registerPage: async ({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage)

    },


    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage)

    }



});


export { expect } from '@playwright/test';