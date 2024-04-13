function showSuggestions(value, maxSuggestions = 8) {
  const productList = document.getElementById("productList");
  product = [];
  products1 = [];
  // Clear previous suggestions
  productList.innerHTML = "";

  // Mock product suggestions (you can replace this with actual data)
  fetch("script/stock_data.json")
    .then((response) => response.json())
    .then((data) => {
      products1 = data;
      // Convert data to a flat array of products
      products = data.flatMap((item) => Object.keys(item));

      // Filter products based on input value
      const filteredProducts = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );

      // Limit the number of suggestions to display
      const limitedSuggestions = filteredProducts.slice(0, maxSuggestions);

      // Populate the dropdown list with filtered products
      limitedSuggestions.forEach((product) => {
        const option = document.createElement("div");
        option.textContent = product;
        option.classList.add("product-option");

        // Set click event listener to fill the input field with the selected product
        option.addEventListener("click", () => {
          document.getElementById("stock_fetch").value = product;
          productList.innerHTML = ""; // Clear the dropdown list after selection
        });

        productList.appendChild(option);
      });

      // Show the dropdown list
      productList.style.display = limitedSuggestions.length ? "block" : "none";
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Close the dropdown list when clicking outside of it
document.addEventListener("click", function (event) {
  const productList = document.getElementById("productList");
  if (event.target !== productList && !productList.contains(event.target)) {
    productList.style.display = "none";
  }
});
