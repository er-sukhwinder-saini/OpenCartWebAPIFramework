
import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {

    //Private locators
    // readonly for constant in TS read basics -->Sukhi

    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgettenPasswordLink: Locator;
    private readonly loginERRMsg: Locator;
    private readonly loginErrorMessage: Locator;



    // In order to initialize the above variable we have to use constructor to init the locator

    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgettenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginERRMsg = page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true });
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');

    }



    //public  page actions

    //Sukhi, why return has Promise<Void>  Sukhiiiiiii???

    async goToLoginPage(): Promise<void> {

        await this.page.goto('/opencart/index.php?route=account/login');

    }

    async getLoginPageTitle(): Promise<string> {

        return await this.page.title();
    }

    async isForgotPwdLinkExist(): Promise<boolean> {

        return await this.forgettenPasswordLink.isVisible();

    }
    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user creds: ${username} : ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();

        //expect pending
    }



    async isInvalidLoginErrDisplayed(): Promise<boolean> {

        return await this.loginERRMsg.isVisible();

    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
    }




}