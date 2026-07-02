
import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class ProductInfoPage extends BasePage {

    //Private locators
    // readonly for constant in TS read basics -->Sukhi

    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | number>;

    private readonly productCodeObj: Locator;
    private readonly productAvailabilityObj: Locator;






    // In order to initialize the above variable we have to use constructor to init the locator

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div #content .thumbnail');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string>;


        //sukhi Practise


        this.productCodeObj = page.locator('div#content ul.list-unstyled:nth-of-type(1) li:nth-of-type(2)');
        this.productAvailabilityObj = page.locator('div#content ul.list-unstyled:nth-of-type(1) li:nth-of-type(4)');




    }



    //actions

    async getProductHeader(): Promise<string> {

        return await this.header.innerText();

    }
    // Sukhi >>> Please note with count method, test can becoem flaky hence we have to add wait condition as added below
    async getProductImagesCount(): Promise<number> {

        await this.productImages.first().waitFor({ state: "visible" });

        return await this.productImages.count();

    }

    async getProductInfo(): Promise<Map<string, string | number>> {

        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());


        await this.getProductMetaData();
        await this.getProductPricing();
        return this.map;



    }


    private async getProductMetaData(): Promise<void> {

        let metaData: string[] = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey, metaValue);
        }


    }

    private async getProductPricing(): Promise<void> {

        let priceData: string[] = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('Product Price', productPrice);
        this.map.set('tax Price', exTaxPrice)




    }




    async OBJ_For_productMetaData (){

        let rawTextProdCode = await this.productCodeObj.textContent();
        let productCode = rawTextProdCode
            ? rawTextProdCode.split(':')[1]?.trim()
            : null;


        let rawTextAvail = await this.productAvailabilityObj.textContent();
        const avaibility = rawTextAvail?.split(':')[1].trim();

        console.log("@@@@@@@@@@@@@@" + productCode);
        console.log("@@@@@@@@@@@@@@" + avaibility);


        return {
            "Product_Code": productCode,
            "Availability": avaibility

        }


    }


        async sukhiMaP_For_productMetaData (){

        const metaData = new Map<string, string|null>();

        let rawdata = await this.productCodeObj.textContent();
        const productCode = rawdata?.split(':')[1]?.trim() ?? null;

        metaData.set("Product Code", productCode);

        let rawTextAvail = await this.productAvailabilityObj.textContent();
        const avaibility = rawTextAvail?.split(':')[1]?.trim()?? null;
        
        
        metaData.set("Availability", avaibility);

            console.log(metaData);
        return metaData;



        









        }



    



}