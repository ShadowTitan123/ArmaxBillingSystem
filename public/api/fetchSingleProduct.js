const Grid = document.querySelector('#ApiGrid');


// Get All Products for View on Page Load

document.addEventListener('DOMContentLoaded',()=>{
 var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("product");
console.log(c);
    axios.get('/GetProduct/'+c)
      .then(function (response) {
            console.log(response.data);
            if(response.data.message == 'Data Not Found'){
              console.log("display empty error");
             let h1 = document.createElement('h5');
             h1.textContent = 'No Products Found...';
             Grid.appendChild(h1);
            }
            if(response.data != '' || typeof response.data != undefined || response.data != null){
                let products = '';
                response.data.forEach(function(row){
                    let total = row.product_price + 200;
                  products += `<h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-muted">Your Selected Product</span>
                </h4>
                <ul class="list-group mb-3 z-depth-1">
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">${row.product_name}</h6>
                      <small class="text-muted">${row.product_type}</small>
                    </div>
                    <span class="text-muted">${row.product_price}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">Delivery Charges</h6>
                      <small class="text-muted">By Seller</small>
                    </div>
                    <span class="text-muted">200</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span> Total - </span>
                    <strong>${total} </strong>
                  </li>
                </ul>`
                })
                Grid.innerHTML = products;
            }else{
                console.log("Empty data");  
                let Empty = 'No Products Found';
                Grid.innerHTML = Empty;

            }
      })
      .catch(function (err){
        console.log(err);
      });
});
