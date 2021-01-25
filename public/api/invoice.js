const Grid = document.querySelector('#invoice');


// Get All Products for View on Page Load

document.addEventListener('DOMContentLoaded',()=>{
 var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("orderId");
console.log(c);

axios.get('/GetOrderById/'+c)
.then(function (response) {
      console.log(response.data);
      if(response.data.message == 'Data Not Found'){
        console.log("display empty error");
       let h1 = document.createElement('h5');
       h1.textContent = 'No Products Found...';
       Grid.appendChild(h1);
      }
      if(response.data != '' || typeof response.data != undefined || response.data != null){
          let order = '';
         
          response.data.forEach(function(row){
            var cDate = (new Date()).toString().split(' ').splice(1,3).join(' ');
            let Total = row.product_price + 145 + 100 ;
            order += `
            <div class="container-fluid" style="width:60%;">    
                   <div class="row white z-depth-1 mb-r">
                       <div class="col-md-6">
                           <h4 class="h4-responsive mt-3">Order Invoice</h4>
                       </div>
                       <div class="col-md-6 text-md-right">
                           <a href="#" title="${row.order_id}" class="btn btn-secondary Confirm">Confirm Order</a>
                           <a href="#" class="btn btn-primary" onClick="window.print()"><i class="fa fa-print left"></i> Print</a>
                       </div>
                   </div>
                   <section class="invoice row mb-r mt-5">
                       <div class="col-md-12">
                           <div class="row invoice-data">
                               <div class="col-6">
                                   <h4>From:</h4>
                                   <p><strong>Armax India</strong></p>
                                   <p>Peenya 2nd Stage</p>
                                   <p>Bangalore, India</p>
                                   <p><strong>Invoice date:</strong> ${cDate}</p>
                                   <h4 class="h4-responsive"><small>Order No.</small><br/><strong><span class="blue-text">${row.order_id}</span></strong></h4>
                               </div>
                               <div class="col-6 text-right">
                                  
                               <h4>To:</h4>
                                   <p><strong>${row.firstName}  ${row.LastName}</strong></p>
                                   <p>${row.Address2}</p>
                                   <p>${row.Address}</p>
                               </div>
                           </div>
                           <div class="row mt-2">
                               <div class="col-md-12">
                                   <div class="table-responsive">
                                       <table class="table">
                                           <thead>
                                               <tr>
                                                   <th>Item list</th>
                                                   <th>Quantity</th>
                                                   <th>Unit Price</th>
                                                   <th>Tax</th>
                                                   <th>Delivery Charges</th>
                                                   <th>Total price</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>${row.product_name}</td>
                                                   <td>1</td>
                                                   <td>${row.product_price}</td>
                                                   <td>145</td>
                                                   <td>100</td>
                                                   <td>${Total}</td>
                                               </tr>
                                              
           
                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                           </div>
                           <div class="row mt-2">
                               <div class="col-md-3 float-md-right ml-auto">
                                   <ul class="striped list-unstyled">
                                       <li><strong>Sub Total:</strong><span class="float-right">${row.product_price}</span></li>
                                       <li><strong>Tax:</strong><span class="float-right">145</span></li>
                                       <li><strong>Delivery</strong><span class="float-right">100</span></li><br>
                                       <li><strong>TOTAL:</strong><span class="float-right"><strong class="blue-text">${Total}</strong></span></li>
                                   </ul>
                               </div>
                           </div>
                       </div>
                   </section>
               </div>
           `
          })
          Grid.innerHTML = order;
          Confirm();
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


function Confirm(){
    document.querySelector('.Confirm').addEventListener('click', (e) => {
        console.log("Order Confirmed");
        const OrderID = e.target.title;
        axios.put('/ConfirmOrder',{
            orderID : OrderID,
            User : 'md@mail.com'
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.status === true){
                window.location.href = '/success.html';
            }else{
                window.location.href = '/failure.html';
            }
        })
        .catch(function (err){
            console.log(err);
          });
        
        
    });
}
