import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer 54fd1dff05e718064c9afc7b00969b5604408724c055e7e165a78e079a3c94dd' };

test('get_user_test', async ({ request }) => {


    let response = await request.get('https://gorest.co.in/public/v2/users',
        {
            headers: AUTH_TOKEN




        });

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

});

test('create_user_test', async ({ request }) => {

//JS Object
    let userData = {
        name :  'sukhwinder',
        email :`sukhi_${Date.now()}@test.com`,
        gender: 'male', 
        status : 'active'

    };

    //JS Object to JSON :Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users',
        {
            headers: AUTH_TOKEN,
            data: userData

        });

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});




test('update_test_user', async ({ request }) => {

//JS Object
    let userData = {
        name :  'QAsukhwinder',
        email :`sukhi_${Date.now()}@test.com`,
        gender: 'male', 
        status : 'inactive'

    };

    //JS Object to JSON :Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8506478',
        {
            headers: AUTH_TOKEN,
            data: userData

        });

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

});



test('delete_test_user', async ({ request }) => {


    //JS Object to JSON :Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8506393',
        {
            headers: AUTH_TOKEN,

        });

    console.log(response.status());
    console.log(response.statusText());

});
