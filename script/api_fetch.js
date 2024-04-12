document.getElementById("stock_fetch").addEventListener('keydown',function(event){
    if(event.key=="Enter")
    {
        fetchStockProfile();
        market_checker();
        graph_loader();
    }
});

function fetchStockProfile() {
    document.getElementById('show1').innerHTML = ``;
    document.getElementById('price').innerHTML = ``;
    document.getElementById('show2').innerHTML = ``;
    var stock_fetch1 = document.getElementById("stock_fetch").value;
    console.log(stock_fetch1);
    var stock_fetch2=stock_fetch1;
    stock_fetch2=stock_fetch2.toUpperCase();
    console.log(stock_fetch2);
    for (let i = 0; i < products1.length; i++) {
        let companyName = Object.keys(products1[i])[0];
        if (stock_fetch2 === products1[i][companyName]) {
            stock_fetch1=stock_fetch2;
            break;
        }
        if (stock_fetch1 === companyName) {
            stock_fetch1 = products1[i][companyName];
            break;
        }
    }

  const apiUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${stock_fetch1}&token=cnh1pd1r01qhlslibh9gcnh1pd1r01qhlslibha0`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          displayStockProfile(data);
      })
      .catch(error => {
          console.error('Error fetching stock profile:', error);
      });
}
function displayStockProfile(data) {
  const stockProfileDiv = document.getElementById('show1');
  stockProfileDiv.innerHTML = `
      <p><strong></strong><img src=${data.logo} width=60px></img></p>
      <h2><b>${data.name} (${data.ticker})</b></h2>
  `;
  const stockProfileDiv2 = document.getElementById('show2');
  stockProfileDiv2.innerHTML = `
      <p><strong>Industry:</strong> ${data.finnhubIndustry}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Exchange:</strong> ${data.exchange}</p>
      <p><strong>Market Capitalization:</strong> ${data.marketCapitalization}</p>
      <p><strong>Web URL:</strong> <a href = "${data.weburl}" target="_blank">${data.weburl}</a></p>
      <button type="button" class="btn btn-success" onclick="openDialog()" style='width:18%'>Buy</button>
    <button type="button" class="btn btn-danger" style='width:18%'>Sell</button>
    <div id="dialog" class="dialog-container">
    <div class="dialog-box">
        <h2>Confirm Buy</h2>
        <h2 id="calcprice">Current price: </h2>
        <div class="form-field">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" onchange="calculator()" name="quantity" min="1" required>
        </div>
        <button class="btn btn-success" onclick="confirmBuy()">Confirm Buy</button>
    </div>
    </div>
  `;
}


  // function openDialog() {
  //   const dialog = document.getElementById('dialog');
  //   var currprice=document.getElementById("price").textContent;
  //   console.log(currprice);
  //   document.getElementById("calcprice").textContent=currprice;
  //   dialog.style.display = 'flex';
  //   document.addEventListener('click', closeDialogOutside);
  // }

  // function closeDialog() {
  //   const dialog = document.getElementById('dialog');
  //   dialog.style.display = 'none';
  //   document.removeEventListener('click', closeDialogOutside);
  // }

  // function closeDialogOutside(event) {
  //   const dialog = document.getElementById('dialog');
  //   if (event.target === dialog) {
  //     closeDialog();
  //   }
  // }

  // function calculator(){
  //   var finalprice=document.getElementById("price").textContent;
  //   finalprice=
  //   var quan=document.getElementById("quantity").textContent;
  //   calcprice=finalprice*quan;
  //   console.log(calcprice);
  //   document.getElementById("calcprice").textContent=calcprice;
  // }

  // function confirmBuy() {
  //   const dialog = document.getElementById('dialog');
  //   var quantity = document.getElementById('quantity').value;
  //   // You can perform further actions here, such as sending the buy request to the server
  //   console.log('Buying ' + quantity + ' stocks.');
  //   closeDialog();
  // }

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from session storage
    const userDataString = sessionStorage.getItem('UserCredential');
    
    if (userDataString) {
        // Parse the JSON string to get the JavaScript object
        const userData = JSON.parse(userDataString);
        
        // Display the user data on the page
        // console.log(userData);
        const userDataContainer1 = document.getElementsByClassName('Username');
        for (let i = 0; i < userDataContainer1.length; i++)
        {
            userDataContainer1[i].innerHTML = `${userData.username}`;
        }
        
        const userDataContainer2 = document.getElementsByClassName('Email');
        for (let i = 0; i < userDataContainer2.length; i++)
        {
            userDataContainer2[i].innerHTML = `${userData.email}`;
        }

    } else {
        window.location.replace("pages-login.html");
    }
});