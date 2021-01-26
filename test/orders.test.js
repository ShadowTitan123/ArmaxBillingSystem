const { CreateOrder , GetOrderById , ConfirmOrder , GetAllOrder , DeleteOrder} = require('../models/orders.js');


test('The Asyncronous Response Returned Should Not Return Empty Values', async ()=>{
    await expect(GetAllOrder()).resolves.not.toBeNull();
});


test('The Asyncronous Response Returned Should an Empty Array', async ()=>{
    await expect(GetAllOrder()).resolves.not.toEqual([]);
});


test('Update the Order Status - Should Return status True On Updation', async ()=>{
    const orderid = '6189';
    await expect(ConfirmOrder(orderid)).resolves.toStrictEqual({"status": true});
});




