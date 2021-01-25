const GetForm = document.getElementById('orderForm');


// Listen for Submit Event and Make Api Request to Server
GetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Submit Event");
    //Collect Form Data 
    const [firstName, LastName, Email, Address, Address2, Country, State, Zip, CardName, CreditCard, Expiration, CVV] = [
        GetForm.elements[0].value,
        GetForm.elements[1].value,
        GetForm.elements[2].value,
        GetForm.elements[3].value,
        GetForm.elements[4].value,
        GetForm.elements[5].value,
        GetForm.elements[6].value,
        GetForm.elements[7].value,
        GetForm.elements[8].value,
        GetForm.elements[9].value,
        GetForm.elements[10].value,
        GetForm.elements[11].value];
    //Get Product Id from url
    var url_string = window.location.href
    var url = new URL(url_string);
    var c = url.searchParams.get("product");
    console.log(c);


    axios.post('/PlaceOrder', {
        firstName: firstName,
        LastName: LastName,
        Email: Email, Address: Address,
        Address2: Address2,
        Country: Country,
        State: State,
        Zip: Zip,
        CardName: CardName,
        CreditCard: CreditCard,
        Expiration: Expiration,
        CVV: CVV,
        product: c
    })
     .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

});