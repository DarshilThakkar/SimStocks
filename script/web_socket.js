let check = false;
let stock_cords = [];
let stock_cords1 = [];
let live = "Live";
function market_checker() {
  stock_cords = [];
  const apiUrl = `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=cnh1pd1r01qhlslibh9gcnh1pd1r01qhlslibha0`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      check = data.isOpen;
      if (check) {
        socket();
      } else {
        lastprice();
      }
    })
    .catch((error) => {
      console.error("Error fetching stock profile:", error);
    });
}

function lastprice() {
  var stock_fetch1 = document.getElementById("stock_fetch").value;
  var stock_fetch2 = stock_fetch1;
  stock_fetch2.toUpperCase();
  for (let i = 0; i < products1.length; i++) {
    let companyName = Object.keys(products1[i])[0];
    if (stock_fetch2 === products1[i][companyName]) {
      stock_fetch1 = stock_fetch2;
      break;
    }
    if (stock_fetch1 === companyName) {
      stock_fetch1 = products1[i][companyName];
      break;
    }
  }
  const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${stock_fetch1}&token=cnh1pd1r01qhlslibh9gcnh1pd1r01qhlslibha0`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const show1 = document.getElementById("price");
      show1.innerHTML = `<h2><b>$&nbsp${data.c}</b></h2>`;
      stock_cords.push(`${data.c}`);
    })
    .catch((error) => {
      console.error("Error fetching stock profile:", error);
    });
}

function socket() {
  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=cnh1pd1r01qhlslibh9gcnh1pd1r01qhlslibha0"
  );
  var stock_fetch1 = document.getElementById("stock_fetch").value;
  var stock_fetch2 = stock_fetch1;
  stock_fetch2=stock_fetch2.toUpperCase();
  for (let i = 0; i < products1.length; i++) {
    let companyName = Object.keys(products1[i])[0];
    if (stock_fetch2 === products1[i][companyName]) {
      stock_fetch1 = stock_fetch2;
      break;
    }
    if (stock_fetch1 === companyName) {
      stock_fetch1 = products1[i][companyName];
      break;
    }
  }
  stock_fetch1=stock_fetch1.toUpperCase();
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol: stock_fetch1 }));
  });

  socket.addEventListener("message", function (event) {
    const message = JSON.parse(event.data);
    if (message.type === "trade") {
      const price = message.data[0].p.toFixed(2);
      document.getElementById(
        "price"
      ).innerHTML = `<h2><b>$&nbsp${price}</b></h2>`;

      document.getElementById(
        "calcprice"
      ).innerHTML = `<h2><b>$&nbsp${price}</b></h2>`;


      calculator();
      if (price != stock_cords[stock_cords.length - 1]) {
        stock_cords.push(`${price}`);
        if (live == "Live") {
          setInterval(renderGraph(stock_cords), 0);
        }
      }
    } else if (message.type === "ping") {
      socket.send(JSON.stringify({ type: "pong" }));
    }
  });
}

function graph_loader(type, start, end) {
  if (type === undefined) {
    type = "Live";
  }
  stock_cords1 = [];
  stock_cords = [];
  var stock_fetch1 = document.getElementById("stock_fetch").value;
  var stock_fetch2 = stock_fetch1;

  stock_fetch2 = stock_fetch2.toUpperCase();
  for (let i = 0; i < products1.length; i++) {
    let companyName = Object.keys(products1[i])[0];
    if (stock_fetch2 === products1[i][companyName]) {
      stock_fetch1 = stock_fetch2;
      break;
    }
    if (stock_fetch1 === companyName) {
      stock_fetch1 = products1[i][companyName];
      break;
    }
    if (type === "Live") {
      var end = new Date();
      var start = new Date(end);

      start.setMonth(start.getMonth() - 1);
      if (start.getMonth() > end.getMonth()) {
        start.setFullYear(start.getFullYear() - 1);
      }
      end = end.toISOString().substring(0, 10);
      start = start.toISOString().substring(0, 10);
    }
  }
  const graph_cords = `https://api.polygon.io/v2/aggs/ticker/${stock_fetch1}/range/1/day/${start}/${end}?adjusted=true&sort=asc&limit=120&apiKey=C_riuY9I1fwBFviI3A_COugyyy35OcZj`;

  if (type === "Live") {
    live = "Live";
    fetch(graph_cords)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          stock_cords.push(element.c);
          renderGraph(stock_cords,type);
        });
        renderGraph(stock_cords,type);
      })
      .catch((error) => {
        console.error("Error fetching stock profile:", error);
      });
  } else {
    live = "Not Live";
    //console.log(123);
    fetch(graph_cords)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          stock_cords1.push(element.c);
          renderGraph(stock_cords1,type);
        });
        renderGraph(stock_cords1,type);
      })
      .catch((error) => {
        console.error("Error fetching stock profile:", error);
      });
  }
  let x = document.getElementById(type);  
  x.style.backgroundColor = "blue";
  x.style.borderColor = "blue";
  x.style.color = "white";  
}

function renderGraph(stock_cords234,type) {
  document.getElementById("price");
  var x = document.getElementById("graph_id");
  x.innerHTML = `<div class="col-lg-9">
    <div class="card custom-card-width">
    <div class="card-body">
    <h5 class="card-title">Live Stock Chart</h5>
    <div id="areaChart"></div>
    <center><button id="Live" class="btn btn-outline-success blue" onclick="date('Live')">Live</button>&nbsp&nbsp<button id="1 Month" class="btn btn-outline-success blue" onclick="date('1 Month')">1 Month</button>&nbsp&nbsp<button id="6 Month" class="btn btn-outline-success blue" onclick="date('6 Month')">6 Month</button>&nbsp&nbsp<button id="1 Year" class="btn btn-outline-success blue" onclick="date('1 Year')">1 Year</button></center>
    </div>
    </div>
    </div>`;
  const xValues = Array.from({ length: stock_cords234.length }, (_, i) => i);
  // Create seriesData array by combining x and y values
  const seriesData = stock_cords234.map((y, index) => ({
    x: xValues[index],
    y,
  }));
  new ApexCharts(document.querySelector("#areaChart"), {
    series: [
      {
        name: `Stock ${document.getElementById("stock_fetch").value}`,
        data: seriesData,
      },
    ],
    chart: {
      type: "area",
      height: 280,
      animations: {
        enabled: false, // Disable all animations
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      row: {
        colors: ["#ffffff", "transparent"],
        opacity: 0,
      },
    },
    xaxis: {
      labels: {
        show: false, // Hide X-axis labels
      },
    },
    // options: {
    //     scales: {
    //         x: {
    //             display: false // Hide X-axis labels
    //         }
    //     }
    // },
    // xaxis: {
    //     dataLabels: {
    //         enabled:false
    //     },
    //     display: false,
    //     // categories: seriesData.map(point => point.x) // Assuming x-values need to be extracted
    // },
  }).render().then(()=>{
    let x = document.getElementById(type);  
    // x.style.backgroundColor = "blue";
    // x.style.borderColor = "blue";
    // x.style.color = "white";  
  });
}

function date(datetype) {
  //console.log(1);
  if (datetype === "Live") {
    graph_loader("Live", start, end);
  } else if (datetype === "1 Month") {
    var end = new Date();
    var start = new Date(end);

    start.setMonth(start.getMonth() - 1);
    if (start.getMonth() > end.getMonth()) {
      start.setFullYear(start.getFullYear() - 1);
    }
    end = end.toISOString().substring(0, 10);
    start = start.toISOString().substring(0, 10);
    graph_loader("1 Month", start, end);
  } else if (datetype === "6 Month") {
    var end = new Date();
    var start = new Date(end);
    start.setMonth(start.getMonth() - 6);
    if (start.getMonth() > end.getMonth()) {
      start.setFullYear(start.getFullYear() - 1);
    }
    end = end.toISOString().substring(0, 10);
    start = start.toISOString().substring(0, 10);

    graph_loader("6 Month", start,end);
  } else if (datetype === "1 Year") {
    var end = new Date().toISOString().substring(0, 10);
    var start = new Date(end);
    start.setFullYear(start.getFullYear() - 1);
    start = start.toISOString().substring(0, 10);
    graph_loader("1 Year", start, end);
  }
}

function change(but)
{
  
}