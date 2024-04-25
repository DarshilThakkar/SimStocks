function buy()
{
    document.getElementById('buy_stock').innerHTML=
    `
    <style>
    #buy_list {
        list-style-type: none; 
        padding: 0;
        margin: 0; 
    }
    #sell_list {
      list-style-type: none; 
      padding: 0;
      margin: 0; 
  }
    </style>
    <button type="button" class="btn btn-success" onclick="openBuyDialog()" style='width:18%'>Buy</button>
    <button type="button" class="btn btn-danger" onclick="openSellDialog()" style='width:18%'>Sell</button>\

    <div id="buy_dialog" class="dialog-container">
        <div class="dialog-box" id="buy_box">
            <h2>Confirm Buy</h2>
            <ul id= "buy_list">
                <li><h2 id="buy_calcprice"></h2></li>
            </ul>
            <div class="form-field">
                <label for="buy_quantity">Quantity:</label>
                <input type="number" id="buy_quantity" oninput="buyCalculator()" name="quantity" min="1" required>
            </div>
            <button class="btn btn-success" id="confirm_buy" onclick="confirmBuy()">Confirm Buy</button>
        </div>
    </div>

    <div id="sell_dialog" class="dialog-container">
        <div class="dialog-box" id="sell_box">
            <h2>Confirm Sell</h2>
            <ul id= "sell_list">
                <li><h2 id="sell_calcprice"></h2></li>
            </ul>
            <div class="form-field">
                <label for="sell_quantity">Quantity:</label>
                <input type="number" id="sell_quantity" oninput="sellCalculator()" name="quantity" min="1" required>
            </div>
            <button class="btn btn-danger" id="confirm_sell" onclick="confirmSell()">Confirm Sell</button>
        </div>
    </div>
    `
}

function openBuyDialog() {
  const dialog = document.getElementById('buy_dialog');
  var currprice = document.getElementById("price").textContent;
  // document.getElementById("buy_quantity").value = 1;
  document.getElementById("buy_calcprice").textContent = currprice;
  dialog.style.display = 'flex';
  document.addEventListener('click', closeDialogOutside);
}

function openSellDialog() {
  const dialog = document.getElementById('sell_dialog');
  var currprice = document.getElementById("price").textContent;
  // document.getElementById("sell_quantity").value = 1;
  document.getElementById("sell_calcprice").textContent = currprice;
  dialog.style.display = 'flex';
  document.addEventListener('click', closeDialogOutside);
}

function closeDialog() {
  const buyDialog = document.getElementById('buy_dialog');
  buyDialog.value=0;
  const sellDialog = document.getElementById('sell_dialog');
  sellDialog.value=0;
  buyDialog.style.display = 'none';
  sellDialog.style.display = 'none';
  document.removeEventListener('click', closeDialogOutside);
}

function closeDialogOutside(event) {
  const buyDialog = document.getElementById('buy_dialog');
  const sellDialog = document.getElementById('sell_dialog');
  if (event.target === buyDialog || event.target === sellDialog) {
      closeDialog();
  }
}

function buyCalculator() {
  var finalprice = document.getElementById("price").textContent;
  finalprice = finalprice.substring(2, finalprice.length);
  finalprice = parseFloat(finalprice);
  let quan = document.getElementById("buy_quantity").value;
  //
  //
  var balance = parseFloat(document.getElementById("balance_temp").textContent);
  if(quan == "")
  {
    quan = 0;
  }
  quan = parseFloat(quan);
  calcprice = finalprice * quan;
  calcprice = calcprice.toFixed(2);
  balance = parseFloat(balance);
  console.log(balance);
  var balanceCheckInterval = setInterval(function() {
    document.getElementById("firebase_balance_check").click();
    var balance = parseFloat(document.getElementById("balance_temp").textContent);
    if (!isNaN(balance)) {
        clearInterval(balanceCheckInterval);
        if (calcprice > balance) {
          if(document.getElementById('buy_list').getElementsByTagName('li').length==1)
          {
            var li=document.createElement('li');
            li.textContent="Not Sufficient Balance";
            document.getElementById('buy_list').appendChild(li);
          }
        }
        else
        {
          if(document.getElementById('buy_list').getElementsByTagName('li').length==2)
          {
            var list=document.getElementById('buy_list');
            list.removeChild(list.lastChild);
          }
        }
        document.getElementById("buy_calcprice").innerHTML = `$ ${calcprice}`;
    }
  }, 100);
  // if(balance<calcprice)
  // {
  //   var li=document.createElement('li');
  //   li.textContent="Not Sufficient Balance";
  //   document.getElementById('buy_list').appendChild(li);
  // }
}

function sellCalculator() {
  var finalprice = document.getElementById("price").textContent;
  finalprice = finalprice.substring(2, finalprice.length);
  finalprice = parseFloat(finalprice);
  let quan = document.getElementById("sell_quantity").value;
  if(quan == "")
  {
    quan = 0;
  }
  quan = parseFloat(quan);
  calcprice = finalprice * quan;
  calcprice = calcprice.toFixed(2);
  var quantityCheckInterval = setInterval(function() {
    document.getElementById("firebase_quantity_check").click();
    var quantity = parseFloat(document.getElementById("firebase_quantity_check").textContent);
    if (!isNaN(quantity)) {
        clearInterval(quantityCheckInterval);
        if (quan > quantity) {
          if(document.getElementById('sell_list').getElementsByTagName('li').length==1)
          {
            var li=document.createElement('li');
            li.textContent="Not Sufficient Balance";
            document.getElementById('sell_list').appendChild(li);
          }
        }
        else
        {
          if(document.getElementById('sell_list').getElementsByTagName('li').length==2)
          {
            var list=document.getElementById('sell_list');
            list.removeChild(list.lastChild);
          }
        }
        document.getElementById("sell_calcprice").innerHTML = `$ ${calcprice}`;
    }
  }, 100);
}

function confirmBuy() {
  var quantity = parseFloat(document.getElementById("buy_quantity").value);
  var pricePerUnit = parseFloat(document.getElementById("price").textContent.substring(2));
  var totalCost = quantity * pricePerUnit;
 // Trigger balance check

  var balanceCheckInterval = setInterval(function() {
      document.getElementById("firebase_balance_check").click();
      var balance = parseFloat(document.getElementById("balance_temp").textContent);
      if (!isNaN(balance)) {
          clearInterval(balanceCheckInterval);
          if (totalCost > balance) {
              console.log("Insufficient balance to buy");
              return;
          }
          document.getElementById("balance_temp").click();
          document.getElementById("buy_quantity").value=0;
          document.getElementById('buy_box').innerHTML = "Stock Bought Succesfully!!";
            setTimeout(function() {
                closeDialog();
            }, 2000);
      }
  }, 100);
}

function confirmSell() {
  var quantity = parseFloat(document.getElementById("sell_quantity").value);
  var pricePerUnit = parseFloat(document.getElementById("price").textContent.substring(2));
  var totalGain = quantity * pricePerUnit;
  let quan = document.getElementById("sell_quantity").value;
  document.getElementById("firebase_balance_check").click();

  // var balanceCheckInterval = setInterval(function() {
  //     var balance = parseFloat(document.getElementById("balance_temp").textContent);
  //     if (!isNaN(balance)) {
  //         clearInterval(balanceCheckInterval);

  //         console.log("Sell confirmed");
  //         console.log("Quantity:", quantity);
  //         console.log("Total gain:", totalGain);

  //         balance += totalGain;
  //         updateBalance(balance);
  //         closeDialog();
  //     }
  // }, 100);

  var quantityCheckInterval = setInterval(function() {
    document.getElementById("firebase_quantity_check").click();
    var quantity = parseFloat(document.getElementById("firebase_quantity_check").textContent);
    if (!isNaN(quantity)) {
        clearInterval(quantityCheckInterval);
        if (quan > quantity) {
          console.log("Insufficient quantity to sell");
          return;
        }

        document.getElementById("sell_temp").click();
        document.getElementById("sell_quantity").value=0;
        document.getElementById('sell_box').innerHTML = "Stock Sold Succesfully!!";
        setTimeout(function() {
            closeDialog();
        }, 2000);
    }
  }, 100);
}