const GetForm = document.getElementById('alertForm');


// Listen for Submit Event and Make Api Request to Server
GetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Submit Event");
    //Collect Form Data 
    const [ptitle, type, price] = [
        GetForm.elements[0].value,
        GetForm.elements[1].value,
        GetForm.elements[2].value];

    axios.post('/AddProduct', {
        ptitle: ptitle,
        type: type,
        price: price
    })
     .then(function (response) {
            if(response.data.status === true) {
               console.log(response.data)
               alert("Product Added");
               location.reload();

            }else{
                alert("Failed to Add Product");
            }
        })
        .catch(function (error) {
            console.log(error);
        });

});