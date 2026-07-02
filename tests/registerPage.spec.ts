import { test, expect } from '../src/fixtures/pagefixture'
import { CsvHelper } from '../src/utils/CSVHelper';



let testData = CsvHelper.readCsv('src/data/registerData.csv');

for (let row of testData) {
    test(`create_newUser_successfully_${row.FirstName}_${row.LastName}`, async ({ registerPage }) => {

        await registerPage.goToRegisterPage();

        // FirstName,LastName,E-Mail,Telephone,Password,ConfirmPassword

        const uniqueEmail = row.email.replace('@', `+${Date.now()}@`);
        await registerPage.addNewUser(row.FirstName, row.LastName, uniqueEmail, row.Telephone, row.Password, row.ConfirmPassword);

        expect(await registerPage.verifyUserCreated()).toBe('Your Account Has Been Created!');


    });



}