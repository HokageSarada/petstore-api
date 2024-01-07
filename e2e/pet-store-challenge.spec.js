// @ts-check
const { test, expect } = require("@playwright/test");
const petData = require("../Data/pet.json");
const petStoreOrder = require("../Data/petStore.json");

test("adding a pet", async ({ request }) => {
  const response = await request.post(`pet`, {
    data: petData,
  });
  expect(response.status()).toBe(200);
});

test("check that pet was added", async ({ request }) => {
  const response = await request.get(`pet/${petData.id}`);
  let json = await response.json();
  let petName = json.name;
  expect(petName).toBe(petData.name);
});

// test("updating a pet", async ({ request }) => {
//   const response = await request.put(`pet`, {
//     data: petUpdate,
//   });
//   expect(response.status()).toBe(200)
// });

// test('check that pet was updated', async ({ request }) => {
//     const response = await request.get(`pet/${petUpdate.id}`)
//     let json = await response.json();
//     let petName = json.name
//     expect(petName).toBe(petUpdate.name)
// })

test("adding a store order", async ({ request }) => {
  const response = await request.post(`store/order`, {
    data: petStoreOrder,
  });
  console.log(`POST Pet Store Order Number: ${petStoreOrder.id}`);
  expect(response.status()).toBe(200);
});

test("check that pet order added", async ({ request }) => {
  const response = await request.get(`store/order/${petStoreOrder.id}`);
  let json = await response.json();
  let orderId = json.id;
  console.log(`GET Pet Store Order Number: ${orderId}`);
  expect(orderId).toBe(petStoreOrder.id);
});

test("delete an order", async ({ request }) => {
  const response = await request.delete(`store/order/${petStoreOrder.id}`);
  expect(response.status()).toBe(200);
});

test("check that pet was deleted", async ({ request }) => {
  const response = await request.get(`store/order/${petStoreOrder.id}`);
  expect(response.status()).toBe(404);
});
