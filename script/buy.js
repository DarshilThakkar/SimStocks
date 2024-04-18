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
        <div class="dialog-box">
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
        <div class="dialog-box">
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
  const sellDialog = document.getElementById('sell_dialog');
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
  if(quan == "")
  {
    quan = 0;
  }
  quan = parseFloat(quan);
  calcprice = finalprice * quan;
  calcprice = calcprice.toFixed(2);
  document.getElementById("buy_calcprice").innerHTML = `$ ${calcprice}`;
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
  document.getElementById("sell_calcprice").innerHTML = `$ ${calcprice}`;
}

function confirmBuy() {
  var quantity = parseFloat(document.getElementById("buy_quantity").value);
  var pricePerUnit = parseFloat(document.getElementById("price").textContent.substring(2));
  var totalCost = quantity * pricePerUnit;

  document.getElementById("firebase_balance_check").click(); // Trigger balance check

  var balanceCheckInterval = setInterval(function() {
      var balance = parseFloat(document.getElementById("balance_temp").textContent);
      if (!isNaN(balance)) {
          clearInterval(balanceCheckInterval);
          if (totalCost > balance) {
              console.log("Insufficient balance to buy");
              return;
          }
          document.getElementById("balance_temp").click();
          console.log("Buy confirmed");
          console.log("Quantity:", quantity);
          console.log("Total cost:", totalCost);

          balance -= totalCost;
          updateBalance(balance);

          closeDialog();
      }
  }, 100);
}

function confirmSell() {
  var quantity = parseFloat(document.getElementById("sell_quantity").value);
  var pricePerUnit = parseFloat(document.getElementById("price").textContent.substring(2));
  var totalGain = quantity * pricePerUnit;

  document.getElementById("firebase_balance_check").click();

  var balanceCheckInterval = setInterval(function() {
      var balance = parseFloat(document.getElementById("balance_temp").textContent);
      if (!isNaN(balance)) {
          clearInterval(balanceCheckInterval);

          console.log("Sell confirmed");
          console.log("Quantity:", quantity);
          console.log("Total gain:", totalGain);

          balance += totalGain;
          updateBalance(balance);
          closeDialog();
      }
  }, 100);
}

function updateBalance(newBalance) {
  document.getElementById("balance_temp").click();
}
