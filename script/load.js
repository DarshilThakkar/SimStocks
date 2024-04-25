document.addEventListener("DOMContentLoaded", function () {
  // Retrieve data from session storage
  const userDataString = sessionStorage.getItem("UserCredential");
  console.log(userDataString);
  if (userDataString) {
    const header_template = document.getElementById("header_template");
    header_template.innerHTML = `
  <header id="header" class="header fixed-top d-flex align-items-center">
  <div class="d-flex align-items-center justify-content-between">
    <a href="index.html" class="logo d-flex align-items-center">
      <img src="assets/img/logo.png" alt="" />
      <span class="d-none d-lg-block">SimStocks</span>
    </a>
    <i class="bi bi-list toggle-sidebar-btn"></i>
  </div>

  <div class="custom_search-bar">
    <div class="search-container">
      <input
        type="text"
        placeholder="Search Stocks"
        title="Enter search keyword"
        id="stock_fetch"
        oninput="showSuggestions(this.value)"
      />
      <div id="productList" class="product-list"></div> <!-- Dropdown Product List -->
    </div>
    <button onclick="market_checker(),fetchStockProfile(),graph_loader('Live','1','1')">
      <i class="bi bi-search"></i>
    </button>
    
  </div>
  
  
  <div>
        <class id="Profile"></class>
  </div>
  <div class="nav-item dropdown pe-3">

    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
      <img src="assets/img/profile-img.png" alt="Profile" class="rounded-circle" style="width:35px;height:35px;">
      <span class="d-none d-md-block dropdown-toggle ps-2"><span class="Username"></span></span>
    </a><!-- End Profile Iamge Icon -->
    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
      <li class="dropdown-header">
        <h6><div class="Username"></div></h6>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li>
        <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
          <i class="bi bi-person"></i>
          <span>My Profile</span>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li>
        <a class="dropdown-item d-flex align-items-center" href="portfolio.html">
          <i class="bi bi-coin"></i>
          <span>My Portfolio</span>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li>
        <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
          <i class="bi bi-question-circle"></i>
          <span>Need Help?</span>
        </a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>

      <li>
        <a class="dropdown-item d-flex align-items-center" href="pages-login.html">
          <i class="bi bi-box-arrow-right"></i>
          <span>LogOut</span>
        </a>
      </li>

    </ul><!-- End Profile Dropdown Items -->
  </li>
</ul>
</header>
<!-- End Header -->
  `;
    // Parse the JSON string to get the JavaScript object
    const userData = JSON.parse(userDataString);

    // Display the user data on the page
    // console.log(userData);
    const userDataContainer1 = document.getElementsByClassName("Username");
    for (let i = 0; i < userDataContainer1.length; i++) {
      userDataContainer1[i].innerHTML = `${userData.username}`;
    }

    const userDataContainer2 = document.getElementsByClassName("Email");
    for (let i = 0; i < userDataContainer2.length; i++) {
      userDataContainer2[i].innerHTML = `${userData.email}`;
    }
  } else {
    window.location.replace("pages-login.html");
  }
});
