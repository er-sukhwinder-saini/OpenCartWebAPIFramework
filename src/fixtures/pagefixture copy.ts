import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfopage';
import { RegisterPage } from '../pages/RegisterPage';
import { BasePage } from '../pages/BasePage';



type pageFixture = {

    loginPage: LoginPage,
    homePage: HomePage


}

export let test = baseTest.extend<pageFixture>({

    //  async(page)

    loginPage: async ({page}, use) => {

       let loginPage = new LoginPage(page);

        await use(loginPage);


    }


  






})