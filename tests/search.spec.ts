import { test, expect } from '../src/fixtures/pagefixture'
import { CsvHelper } from '../src/utils/CSVHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


test.beforeEach(async ({ loginPage }) => {

    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);



});


const productData = CsvHelper.readCsv('src/data/product.csv');

for (const row of productData){
test(`verify_search_with_product'_${row.searchkey}_${row.productname}`, async ({ homePage, searchResultPage }) => {

    await homePage.doSearch(row.searchkey);
    expect(await searchResultPage.getProductSearchResultCount()).toBe(Number(row.resultcount));


})};

for (const row of productData){
test(`'verify_user_lands_on_product_page'_${row.searchkey}_${row.productname}`, async ({ homePage, searchResultPage, page }) => {

    await homePage.doSearch(row.searchkey);
    await searchResultPage.selectTheProduct(row.productname);
    expect(await page.title()).toBe(row.productname);



})};

