// @ts-check
const { test, expect } = require('@playwright/test');
const petData = require('../Data/pet.json')

// Learning Query Parameters, GET 
// test('available pets', async ({ request }) => {
//     const response = await request.get('pet/findByStatus',{
//         params:{
//             'status': 'available'
//         }
//     })
//     console.log(await response.url());
//     expect(response.status()).toBe(200)
// })

// Post and Put Request
test('Adding a new available pet', async ({ request }) => {
    const response = await request.post('pet',{
        data: petData
            
    })
    console.log(await response.url());
    expect(response.status()).toBe(200)
    
})

test('Checking that pet added is successful', async ({ request }) => {
    const response = await request.get(`pet/${petData.id}`)
    let json = await response.json()
    let petName = petData.category.name
    let petNameJson = json.category.name
    console.log(`POST Name is ${petName}`);
    console.log(`GET Name is ${petNameJson}`);
    expect(petName).toBe(petNameJson)
})