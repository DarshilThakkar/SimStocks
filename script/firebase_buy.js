

document.getElementById("confirm_buy").addEventListener("click", function(event) {
    event.preventDefault();
    console.log(1);
    // stock name : [price,quantity]
    var user = sessionStorage.getItem("username");
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
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users/" + user))
    .then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            email = userData[stock_fetch1];
        }
    })});

    // stock_quan
    // change balance
