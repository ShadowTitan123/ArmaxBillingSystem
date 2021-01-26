
const Grid = document.querySelector('#ApiGrid');
const Grid2 = document.querySelector('#table1');

// Get All Products for View on Page Load

document.addEventListener('DOMContentLoaded', () => {
  axios.get('/GetAllProducts')
    .then(function (response) {
      console.log(response.data);
      if (response.data.message == 'Data Not Found') {
        console.log("display empty error");
        let h1 = document.createElement('h5');
        h1.textContent = 'No Products Found...';
        Grid.appendChild(h1);
      }
      if (response.data != '' || typeof response.data != undefined || response.data != null) {
        let products = '';
        let table1 = '';
        response.data.forEach(function (row) {
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
                </div>`;


          table1 += `<tr>
                <td class="text-center text-muted">${row.id}</td>
                <td class="text-center text-muted">${row.product_name}</td>
                <td class="text-center text-muted">${row.product_type}</td>
                <td class="text-center text-muted">Rs.${row.product_price}</td>
                <td class="text-center text-muted"><img src="${row.product_image}"class="img-circle" border=3 height=80 width=100></td>
                <td class="text-center text-muted">${row.created_date}</td>
                <td class="text-center text-muted">  <a type="button" title ="${row.id}" class="btn btn-outline-primary btn-sm AlertEdit" data-toggle="modal" data-target="#editAlerts">Edit</a></td>
                <td class="text-center text-muted"><i class="fas fa-trash AlertDelete text-danger" title ="${row.id}"></i></td>
                
                </tr>`
        })
        if (Grid) {
          Grid.innerHTML = products;
        } else {
          Grid2.innerHTML = table1;
          LoadEditDelete();
        }


      } else {
        console.log("Empty data");
        let Empty = 'No Products Found';
        Grid.innerHTML = Empty;

      }
    })
    .catch(function (err) {
      console.log(err);
    });
  LoadEditDelete();
  UpdateProduct();
});

LoadEditDelete = () => {

  const alert_delete = document.querySelectorAll('.AlertDelete');
  const alert_edit = document.querySelectorAll('.AlertEdit');

  // Delete Alerts 
  alert_delete.forEach(function (alertid, index) {  // Lopping because its a table 
    alertid.addEventListener('click', (e) => {
        console.log(e.target);
        const alertid = e.target.attributes.title.value; //Get Alert id
        console.log(alertid);
        axios.delete(`/DeleteProduct`, {
            data: {
                alertId: alertid
            }
        })
            .then((res) => {
                console.log(res.data);
                if(res.data.status === true) {
                  alert("Deleted Successfully");
                  location.reload();
                }else{
                  alert("Error Deleting Product");
                }
            })
            .catch((err) => {
                console.log(err);
            });

    })

})

  //Get Data For Edit 

  alert_edit.forEach(function (alertid, index) {  // Lopping because its a table 
    alertid.addEventListener('click', (e) => {
      const alertid = e.target.attributes.title.value; //Get Alert id
      console.log(alertid);

      document.getElementById('validationCustom03E').value = '';
      document.getElementById('validationCustom04E').value = '';
      document.getElementById('validationCustom05E').value = '';
      axios.get('/GetProduct/' + alertid)
        .then(function (response) {
          console.log(response.data);
          if (response.data != '' || typeof response.data != undefined || response.data != null) {
            document.getElementById('GetAlertID').value = response.data[0].id;
            document.getElementById('validationCustom03E').value = response.data[0].product_name;
            document.getElementById('validationCustom04E').value = response.data[0].product_type;
            document.getElementById('validationCustom05E').value = response.data[0].product_price;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    })
  });
}



UpdateProduct = () => {

  const UpdateAlertForm = document.querySelector('#alertFormEdit');
  UpdateAlertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var Name = document.getElementById("alertFormEdit").elements[0].value;
    var Type = document.getElementById("alertFormEdit").elements[1].value;
    var Price = document.getElementById("alertFormEdit").elements[2].value;
    var AlertID = document.getElementById("alertFormEdit").elements[3].value;  // Getting alertid from hidden field

    if (Name != "" && Type != "" && Price != "") {
      axios.put(`/UpdateProduct`, {
        Name: Name,
        Type: Type,
        Price: Price,
        AlertID: AlertID
      })
        .then((res) => {
          console.log(res.data);
          if(res.data.status === true) {
            alert("Updated");
            location.reload();
          }else{
            alert("Error Updating");
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

  })


}