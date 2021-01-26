const AllUsers = document.querySelector('.User');
const table3 = document.querySelector('#table3');


AllUsers.addEventListener('click', (e) =>{


 axios.get('/GetAllUsers')
      .then(function (response) {
            console.log(response.data);
            if(response.data.message == 'Data Not Found'){
              console.log("display empty error");
             let h1 = document.createElement('h5');
             h1.textContent = 'No Users Yet...';
             table3.appendChild(h1);
            }
            if(response.data != '' || typeof response.data != undefined || response.data != null){
                let table1 = '';
                response.data.forEach(function(row){
                  
                table1 += `<tr>
                <td class="text-center text-muted"><img src="${row.photo_path}"class="img-circle" border=3 height=50 width=50></td>
                <td class="text-center text-muted">${row.first_name} ${row.last_name}</td>
                <td class="text-center text-muted">${row.created_date}</td>    
                </tr>`
                })
                  table3.innerHTML = table1;
               
                  
            }else{
                console.log("Empty data");  
                let Empty = 'No Orders Yet';
                table3.innerHTML = Empty;
            }
      })
      .catch(function (err){
        console.log(err);
      });
});