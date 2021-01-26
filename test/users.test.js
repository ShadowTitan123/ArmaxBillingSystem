const {GetAllUsers} = require('../models/users.js');


test('The Asyncronous Response Returned Should Not Return Empty Values', async ()=>{
    await expect(GetAllUsers()).resolves.not.toBeNull();
});


test('The Asyncronous Response Returned Should an Empty Array', async ()=>{
    await expect(GetAllUsers()).resolves.not.toEqual([]);
});




