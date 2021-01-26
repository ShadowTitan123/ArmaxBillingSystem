const AllOrders = document.querySelector('.second');
const table2 = document.querySelector('#table2');


AllOrders.addEventListener('click', (e) =>{


 axios.get('/GetAllOrders')
      .then(function (response) {
            console.log(response.data);
            if(response.data.message == 'Data Not Found'){
              console.log("display empty error");
             let h1 = document.createElement('h5');
             h1.textContent = 'No Orders Yet...';
             table2.appendChild(h1);
            }
            if(response.data != '' || typeof response.data != undefined || response.data != null){
                let table1 = '';
                response.data.forEach(function(row){
                  
                table1 += `<tr>
                <td class="text-center text-muted">${row.order_id}</td>
                <td class="text-center text-muted">${row.product_name}</td>
                <td class="text-center text-muted">${row.product_price}</td>
                <td class="text-center text-muted">${row.session_user}</td>
                <td class="text-center text-muted">${row.Country}</td>
                <td class="text-center text-muted">${row.Zip}</td>
                <td class="text-center text-muted">${row.created_Date}</td>
                <td class="text-center text-muted"><a href="/invoice.html?orderId=${row.order_id}"><i class="fas fa-eye OrderDelete text-danger"></i></a></td>
                <td class="text-center text-muted"><i class="fas fa-trash OrderDelete text-danger" title="${row.id}"></i></td>
                
                </tr>`
                })
                  table2.innerHTML = table1;
                  LoadEditDeletes();
               
                  
            }else{
                console.log("Empty data");  
                let Empty = 'No Orders Yet';
                table2.innerHTML = Empty;
            }
      })
      .catch(function (err){
        console.log(err);
      });
});


LoadEditDeletes = () => {

  const alert_delete = document.querySelectorAll('.OrderDelete');

  // Delete Alerts 
  alert_delete.forEach(function (alertid, index) {  // Lopping because its a table 
    alertid.addEventListener('click', (e) => {
        console.log(e.target);
        const alertid = e.target.attributes.title.value; //Get Alert id
        console.log(alertid);
        axios.delete(`/DeleteOrder`, {
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

}