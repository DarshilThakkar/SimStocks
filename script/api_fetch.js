document.getElementById("stock_fetch").addEventListener('keydown',function(event){
    if(event.key=="Enter")
    {
        fetchStockProfile();
        market_checker();
        graph_loader();
    }
});

function fetchStockProfile() {
    
    document.getElementById('babu').innerHTML = ``;
    document.getElementById('MainContent').innerHTML = ``;
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
  document.getElementById("stock_company").textContent=`${data.name}`;
  const stockProfileDiv2 = document.getElementById('show2');
  stockProfileDiv2.innerHTML = `
      <p><strong>Industry:</strong> ${data.finnhubIndustry}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Exchange:</strong> ${data.exchange}</p>
      <p><strong>Market Capitalization:</strong> ${data.marketCapitalization}</p>
      <p><strong>Web URL:</strong> <a href = "${data.weburl}" target="_blank">${data.weburl}</a></p>
      <div id="buy_stock"></div>`
      buy();
}