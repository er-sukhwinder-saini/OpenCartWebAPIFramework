
import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class SearchResultPage extends BasePage {

    //Private locators
    // readonly for constant in TS read basics -->Sukhi

    private readonly searchResult: Locator;


    // In order to initialize the above variable we have to use constructor to init the locator

    constructor(page: Page) {
        super(page);
        this.searchResult = page.locator('div.product-layout');

    }



    //action

    async getProductSearchResultCount(): Promise<Number> {
        return await this.searchResult.count();


    }


    async selectTheProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();

    }


}