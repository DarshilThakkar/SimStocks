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
    </style>
    <button type="button" class="btn btn-success" onclick="openDialog()" style='width:18%'>Buy</button>
    <button type="button" class="btn btn-danger" style='width:18%'>Sell</button>
    <div id="dialog" class="dialog-container">
    <div class="dialog-box">
        <h2>Confirm Buy</h2>
        <ul id= "buy_list">
            <li><h2 id="calcprice"></h2></li>
        </ul>
        <div class="form-field">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" oninput="calculator()" name="quantity" min="1" required>
        </div>
        <button class="btn btn-success" id = "confirm_buy" onclick="confirmBuy()">Confirm Buy</button>
    </div>
    </div>`
}

function openDialog() {
    const dialog = document.getElementById('dialog');
    var currprice=document.getElementById("price").textContent;
    document.getElementById("quantity").value=1;
    console.log(currprice);
    document.getElementById("calcprice").textContent=currprice;
    dialog.style.display = 'flex';
    document.addEventListener('click', closeDialogOutside);
  }

  function closeDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none';
    document.removeEventListener('click', closeDialogOutside);
  }

  function closeDialogOutside(event) {
    const dialog = document.getElementById('dialog');
    if (event.target === dialog) {
      closeDialog();
    }
  }

  function calculator(){
    var finalprice=document.getElementById("price").textContent;
    finalprice=finalprice.substring(2,finalprice.length);
    console.log(finalprice);
    finalprice=parseFloat(finalprice);
    let quan=document.getElementById("quantity").value;
    quan=parseFloat(quan);
    calcprice=finalprice*quan;
    var amount_total = 0;
    if(isNaN(calcprice))
    {
        var ul = document.getElementById("buy_list");
        var itemCount = ul.childElementCount;
        if(itemCount==2)
        {
            var lastItem = ul.lastChild;
            ul.removeChild(lastItem);
        }
        document.getElementById("calcprice").textContent=`$ ${finalprice}`;
        amount_total = finalprice;
    }
    else
    {
        var ul = document.getElementById("buy_list");
        var itemCount = ul.childElementCount;
        if(itemCount==2)
        {
            var lastItem = ul.lastChild;
            ul.removeChild(lastItem);
        }
      calcprice = calcprice.toFixed(2);
      document.getElementById("calcprice").innerHTML=`$ ${calcprice}`;
      amount_total = calcprice;
    }
    var balance=document.getElementById("temp").textContent;
    console.log(balance);
    balance=parseFloat(balance);
    console.log(balance);
    if(amount_total > balance)
    {
        var ul = document.getElementById("buy_list");
        var itemCount = ul.childElementCount;
        if(itemCount==1)
        {
            var li=document.createElement('li');
            li.textContent = "Not sufficient Balance to Buy";
            document.getElementById("buy_list").appendChild(li);
        }
    }
  }

  function confirmBuy() {
    var ul = document.getElementById("buy_list");
    var itemCount = ul.childElementCount;
    if(itemCount==2)
    {
      
    }
    else
    {
      console.log(1);
      document.getElementById("balance_temp").click();
    }}
