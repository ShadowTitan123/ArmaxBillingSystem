const { GetAllProducts , GetSingleProduct , AddProduct , UpdateProduct , DeleteProduct } = require('../models/products.js');


test('The Asyncronous Response Returned Should Not Return Empty Values', async ()=>{
    await expect(GetAllProducts()).resolves.not.toBeNull();
});


test('The Asyncronous Response Returned Should an Empty Array', async ()=>{
    await expect(GetAllProducts()).resolves.not.toEqual([]);
});

test('Create a Sample Product - Should Return status True On Creation', async ()=>{
    const [title,type,price] = ['test title','test type','2000'];
    await expect(AddProduct(title,type,price)).resolves.toStrictEqual({"status": true});
});


/*
 * Uncomment This to Test
 * (Note: This Test Will Delete a Product)
 */


// test('Delete a Existing Product Given By ID - Should Return status True On Deletion', async ()=>{
//     await expect(DeleteProduct(2)).resolves.toStrictEqual({"status": true});
// });



