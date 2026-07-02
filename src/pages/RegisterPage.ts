
import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class RegisterPage extends BasePage {

    //Private locators
    // readonly for constant in TS read basics -->Sukhi

    private readonly userName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly phone: Locator;
    private readonly user_Password: Locator;
    private readonly confirmPassword: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueBttn: Locator;

    private readonly accCreatedMessage: Locator;





    // In order to initialize the above variable we have to use constructor to init the locator

    constructor(page: Page) {
        super(page);
        this.userName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.phone = page.getByRole('textbox', { name: 'Telephone' });
        this.user_Password = page.getByRole('textbox', { name: '* Password',exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: '* Password Confirm', exact: true });
        this.privacyPolicy = page.locator('[name="agree"]');
        this.continueBttn = page.getByRole('button', { name: 'Continue' });
        this.accCreatedMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });




    }



    //public  page actions




    async goToRegisterPage(): Promise<void> {

        await this.page.goto('/opencart/index.php?route=account/register');

    }



    //    async doLogin(username: string, password: string): Promise<void> {

    async addNewUser(firstName: string, lastName: string, email: string, telephone: string, password: string, confirmPassword: string): Promise<void> {

        await this.userName.fill(firstName);
        await this.lastName.fill(lastName);

        await this.email.fill(email);
        await this.phone.fill(telephone);
        await this.user_Password.fill(password),
        await this.confirmPassword.fill(confirmPassword),
        await this.privacyPolicy.click();
        await this.continueBttn.click();

    }

    async verifyUserCreated(): Promise<string> {

        const confirmation_message = this.accCreatedMessage.innerText();
        return confirmation_message;


    }








}