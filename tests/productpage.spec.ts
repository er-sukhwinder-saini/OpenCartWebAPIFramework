import { test, expect } from '../src/fixtures/pagefixture'
import { CsvHelper } from '../src/utils/CSVHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);


});



test('Verify_prod_images_count', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectTheProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProductImagesCount();
    expect(imgCount).toBe(4);

});



test('Verify_prod_Infor_with_Map', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectTheProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('actual product infor#############');
    console.log(actualProductInfoMap);

    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('tax Price')).toBe('$2,000.00');



});




test('Verify_prod_Infor-with_mY_Object', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectTheProduct('MacBook Pro');

    const prodObj = await productInfoPage.OBJ_For_productMetaData();


    expect.soft(prodObj.Product_Code).toBe('Product 18');
    expect(prodObj.Availability).toBe('Out Of Stock');



});




test('Verify_prod_Infor-with_my_Map', async ({ homePage, searchResultPage, productInfoPage }) => {

    await homePage.doSearch('macbook');
    await searchResultPage.selectTheProduct('MacBook Pro');

    const prodMap = await   productInfoPage.sukhiMaP_For_productMetaData();;
    expect.soft(prodMap.get('Product Code')).toBe('Product 18');
    expect(prodMap.get('Availability')).toBe('Out Of Stock');

 

});




//common test
test('Company_logo', async ({ basePage }) => {

    expect(await basePage.isLogoVisible()).toBeTruthy();


});


test('footer_exist_on_page', async ({ basePage }) => {

    expect(await basePage.getPageFootersCount).toBe(16);


});




