
const Grid = document.querySelector('#ApiGrid');


// Get All Products for View on Page Load

document.addEventListener('DOMContentLoaded',()=>{
    axios.get('/GetAllProducts')
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
                  products += `<div class="col-lg-3 col-md-6 mb-4"">
                  <div class="card">
                    <div class="view overlay">
                      <img src="${row.product_image}" class="card-img-top"
                        alt="">
                        <a href="checkout-page.html?product=${row.id}">
                        <div class="mask rgba-white-slight"></div>
                      </a>
                    </div>
                    <div class="card-body text-center">
                      <a href="" class="grey-text">
                        <h5>${row.product_type}</h5>
                      </a>
                      <h5>
                        <strong>
                          <a href="" class="dark-grey-text"> ${row.product_name}
                          </a>
                        </strong>
                      </h5>
                      <h4 class="font-weight-bold blue-text">
                        <strong>Rs.${row.product_price}</strong>
                      </h4>
                    </div>
                  </div>
                </div>`
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
