const menuContainer = document.querySelector(".cls-components");
let displayMenu = () => {
  let menuHtml = "";
  menuItems.forEach((item) => {
    menuHtml += `
      ${item.heading ? `<span class="cls-navheading">${item.heading}</span>` : ""}
      <li>
        <a href="${item.href || "javascript:;"}" onClick="${item.onclick}" title="go to ${item.title} page" 
          class="menu-item ${item.submenu ? "has-submenu" : ""}">
          <i class="${item.icon}"></i> <span>${item.title}</span>
          ${item.submenu ? `<i class="fa-solid fa-chevron-down" style="margin-left: 70px; font-size: 0.7rem;"></i>` : ""}
        </a>
        ${item.submenu ? `<ul class="submenu">` : ""}
    `;

    if (item.submenu) {
      item.submenu.forEach((sub) => {
        menuHtml += `
          <li><a href="${sub.href}" title="go to ${sub.title} page" class="cls-submenushow menu-item ${sub.type ? "sidebar-type" : ""}" 
            ${sub.type ? `data-type="${sub.type}"` : ""}>
            ${sub.title}</a></li>`;
      });
      menuHtml += `</ul>`;
    }
    menuHtml += `</li>`;
  });

  menuContainer.innerHTML = menuHtml;

  document.getElementById("sidebarCollapse").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
    document.querySelector(".cls-sidebarCollapse").classList.toggle("cls-collapsed");
  });

  $(".cls-components .menu-item").on("click", function (e) {
    !$(this).hasClass("cls-submenushow") &&($(".menu-item.active").removeClass("active"),$(this).addClass("active"));
    $(this).hasClass("has-submenu") &&$(this).siblings(".submenu").toggleClass("show");
  });
  // document.querySelector('.sidebar-type[data-type="horizontal"]').onclick = () => document.querySelector(".cls-wrapper").classList.add("horizontal");
  // document.querySelector('.sidebar-type[data-type="vertical"]').onclick = () => document.querySelector(".cls-wrapper").classList.remove("horizontal");
  const sidebarType = document.querySelectorAll(".sidebar-type");
  sidebarType.forEach((types) =>(types.onclick = () =>document.querySelector(".cls-wrapper").classList.toggle("horizontal", types.dataset.type === "horizontal")) );
}

async function fetchDatas() {
  try {
    const response = await fetch("plugins/js/data1.json");
    const data = await response.json();
    menuItems = data.menuItems;
    displayMenu();
    dashBoard();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

let  switchPage = (page) => {
  switch (page) {
    case "dashboard":
      dashBoard();
      break;
    case "product":
      product();
      break;
    case "userList":
      userList();
      break;
    case "error":
      errorpage();
      break;
    default:
      console.error("Page not found");
  }
}

let dashBoard = () => {
  document.querySelector(".cls-wrapper").classList.remove("cls-error-toggle");
//   document.getElementById("cls-breadscrum-current").innerHTML = "Home";
//   document.getElementById("cls-page-current").innerHTML = "Home";
document.getElementById("cls-breadscrum-current").innerHTML = document.getElementById("cls-page-current").innerHTML = "Home";

  async function fetchData() {
    try {
      const response = await fetch("plugins/js/data1.json");
      const data = await response.json();
      renderContent(data);
    } catch (error) {
      console.error("Error fetching the JSON data:", error);
    }
  }

  let renderContent =({ salesData, statsData, ratingData, usersData }) => {
    const totalContent = document.getElementById("totalContent");
    const contentHtml = `
            <section><div class="row mt-3"><div id="salesCards" class="cls-date-sales"></div></div></section>
            <section><div class="cls-map-grap" id="cls-map-grap"></div></section>
            <section><div class="row"><div class="cls-social-likes d-flex" id="statsCards"></div></div></section>
            <section><div class="row"><div class="cls-recentUsersCards d-flex" id="recentUsersCards"></div></div></section>
        `;
    totalContent.innerHTML = contentHtml;
    renderCards("salesCards", salesData, createSalesCard);
    renderMap();
    renderCards("statsCards", statsData, createStatsCard);
    renderRatingCard(ratingData);
    renderUsersCard(usersData);
  }

  let renderMap = () =>  {
    const htmlContent = `
            <div class="row mt-2">
                <div class="col-7">
                    <div class="cls-card">
                        <span class="cls-border-bottom">Users From United States</span>
                        <div class="cls-image-container">
                            <div class="cls-zoomicon mt-4" id="zoom-in">+</div>
                            <div class="cls-zoomicon" id="zoom-out">-</div>
                            <img src="./assets/assets-404/map.png" alt="map image" class="cls-mapimg" id="map-image">
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="cls-card">
                        <div class="row cls-border-bottom">
                            <div class="cls-span d-flex justify-content-between">
                                <span>Users From United Status</span>
                                <span class="fa-solid fa-ellipsis-vertical"></span>
                            </div>
                        </div>
                        <div class="row cls-burnupchart mt-3 d-flex align-items-center">
                            <div class="col-1">
                                <span class="fa-solid fa-money-bill cls-icon-bgandcolor"></span>
                            </div>
                            <div class="col-4 cls-earnings">
                                <p class="text-muted">Total Earnings</p>
                                <p>$249.95</p>
                            </div>
                        </div>
                        <div class="row cls-burnupchart cls-imgearn">
                            <img src="./assets/assets-404/earngrap.png" alt="grap image">
                        </div>
                    </div>
                    <div class="cls-card cls-total-ideas">
                        <div class="row">
                            <div class="col-6 cls-earnings d-flex align-items-center">
                                <div>
                                    <span class="fa-solid fa-bolt cls-icon-bgandcolor"></span>
                                </div>
                                <div class="mx-2">
                                    <span>Total ideas</span>
                                    <span class="cls-totalIdeaAndLoc">235</span>
                                </div>
                            </div>
                            <div class="col-6 cls-earnings d-flex align-items-center">
                                <div>
                                    <span class="fa-solid fa-location-dot cls-icon-bgandcolors"></span>
                                </div>
                                <div class="mx-2">
                                    <span>Total location</span>
                                    <span class="cls-totalIdeaAndLoc">26</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    document.getElementById("cls-map-grap").innerHTML = htmlContent;

    let scale = 1;
    const mapImage = document.getElementById("map-image");

    function zoom(factor) {
      scale = scale + factor;
      mapImage.style.transform = `scale(${scale})`;
    }
    document.getElementById("zoom-in").onclick = () => zoom(0.1);
    document.getElementById("zoom-out").onclick = () => zoom(-0.1);
  }

  let renderCards = (containerId, data, cardFunction) => {
    const container = document.getElementById(containerId);
    data.forEach((item, index) => {
      container.innerHTML += cardFunction(item, index);
    });
  }

  let createSalesCard = (data, index) => {
    const cardColor = index === 2 ? "cls-bg-gradients-dark text-white" : "cls-bg-gradients";
    const textColor = index === 2 && "text-white";
    const increaseHtml = data.increase && `<span class="badge cls-salesbadge">${data.increase}%</span>`;
    return `
            <div class="col-md-4">
                <div class="cls-card ${cardColor}">
                    <div class="cls-card-body" style="background-image: url(${ data.img});">
                        <h5 class="cls-card-title">${data.title}</h5>
                        <div class="d-flex align-items-center mt-4">
                            <span class="cls-sales-amount me-2">$${data.amount.toFixed(2)}</span>${increaseHtml}
                        </div>
                        <p class="cls-card-text mt-3 ${textColor}">You made an extra ${data.extra.toLocaleString()} this ${data.period}</p>
                        <div class="progress mt-1">
                            <div class="progress-bar ${cardColor}" role="progressbar" style="width: ${
      data.increase
    }%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  let createStatsCard = (data) => {
    return `
            <div class="col-md-4">
                <div class="cls-card">
                    <div class="cls-card-body" style="background-image: url(${
                      data.img
                    });">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${
                              data.icon
                            }" class="cls-social-icon" alt="social icons">
                            <div class="px-2">
                                <div class="text-muted">Total Likes</div>
                                <div class="d-flex align-items-center">
                                    <span class="cls-likes-count">${data.likes.toLocaleString()}</span>
                                    <span class="badge ms-2 cls-likes-increase">+${
                                      data.increase
                                    }%</span>
                                </div>
                            </div>
                        </div>
                        <div class="row cls-stats-row">
                            <div class="col-6 text-center cls-borderleft">
                                <div class="cls-stats-label">Target</div>
                                <div class="cls-stats-value">${data.target.toLocaleString()}</div>
                            </div>
                            <div class="col-6 text-center">
                                <div class="cls-stats-label">Duration</div>
                                <div class="cls-stats-value">${data.duration.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  let renderRatingCard = (data) => {
    const stars =
      '<i class="fa-solid fa-star"></i>'.repeat(
        Math.floor(data.averageRating)
      ) +
      '<i class="fa-regular fa-star-half-stroke"></i>'.repeat(
        5 - Math.floor(data.averageRating)
      );
    let ratingBars = "";
    for (let i = data.totalRatings; i > 0; i--) {
      const percentage =
        (data.ratingCounts[data.totalRatings - i] /
          Math.max(...data.ratingCounts)) *
        100;
      ratingBars += `
                <div class="d-flex align-items-center mb-2 cls-star-ratings">
                    <span class="me-2 ">${i} <span class="cls-star-rating"><i class="fa-solid fa-star"></i></span></span>
                    <div class="progress flex-grow-1 cls-rating-bar">
                        <div class="progress-bar cls-bg-gradients" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="ms-2">${
                      data.ratingCounts[data.totalRatings - i]
                    }</span>
                </div>`;
    }
    document.getElementById("recentUsersCards").innerHTML += `
            <div class="col-md-4">
                <div class="cls-card">
                    <div class="cls-card-header d-flex justify-content-between align-items-center">
                        <span class="mb-0">Recent Users</span>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="cls-card-body">
                        <div class="d-flex align-items-center justify-content-between mb-4 mt-3">
                            <div>
                                <span class="cls-rating-number">${data.averageRating}</span>
                                <span class="text-muted mt-2">/ ${data.totalRatings}</span>
                            </div>
                            <div>
                                <span class="cls-star-rating">${stars}</span>
                            </div>
                        </div>
                        ${ratingBars}
                    </div>
                </div>
            </div>
        `;
  }

  let renderUsersCard = (users) => {
    let usersList = "";
    let i = 1;
    users.forEach((user) => {
      usersList += `
                <div class="d-flex justify-content-between align-items-center my-3">
                    <div class="d-flex align-items-center">
                        <img src="${user.avatar}" alt="${user.name}" class="cls-user-avatar me-3">
                        <div class="cls-user-info">
                            <div class="cls-user-name">${user.name}</div>
                            <div class="cls-user-role">${user.role}</div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="cls-user-time-circle${i} cls-user-time-circle"></div>
                        <span class="cls-user-time me-3">${user.time}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="cls-action-icons">
                            <i class="fas fa-times cls-text-dangers"></i>
                            <i class="fas fa-check cls-text-success"></i>
                        </div>
                    </div>
                </div>
            `;
      i++;
    });
    document.getElementById("recentUsersCards").innerHTML += `
            <div class="col-md-8 mb-4">
                <div class="cls-card">
                    <div class="cls-card-header d-flex justify-content-between align-items-center">
                        <span class="mb-0">Recent Users</span>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="cls-card-body">
                        ${usersList}
                    </div>
                </div>
            </div>
        `;
  }
  fetchData();
}

let product = () => {
  const totalContent = document.getElementById("totalContent");
  document.getElementById("cls-breadscrum-current").innerHTML = "Products";
  document.getElementById("cls-page-current").innerHTML = "Products";
  const htmlContent = `
        <section class="mt-5">
            <div class="cls-productprice-filter">
                    <div class="row cls-content-header">
                    <div class="col-4 d-flex align-items-center">
                        <div class="cls-searchbar">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="p-searchInput" placeholder="Search Products">
                        </div>
                    </div>
                    <div class="col-4"> </div>
                    <div class="col-4 d-flex align-items-center justify-content-evenly">
                    
                        <div class="cls-pricefiler">
                            <select class="form-select cls-pricefiler-select" aria-label="Default select example">
                                <option selected>Sort</option>
                                <option value="1">Price: High to Low</option>
                                <option value="2">Price: Low to High</option>
                            </select>
                            <!-- <span>Price: High To Low <i class="fa-solid fa-angle-down"></i></span> -->
                        </div>
                        <div class="cls-productfilter">
                            <i class="fa-solid fa-filter"></i>
                            <span>Filter</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="mt-4">
            <div id="product-container" class="cls-product-container"></div>
            <button id="show-more" class="cls-show-more" style="display: none;">Show More</button>
        </section>
    `;

  totalContent.innerHTML = htmlContent;
  const productContainer = document.getElementById("product-container");
  const showMoreButton = document.getElementById("show-more");
  let currentPage = 1;
  const productsPerPage = 9;

  async function fetchData() {
    try {
      const response = await fetch("plugins/js/data1.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  let createProductCard = (product) => {
    const card = document.createElement("div");
    card.className = "cls-product-card";
    card.innerHTML = `
            <div class="cls-product-image">
                <img src="${product.image}" alt="${product.name}">
                ${
                  product.discount
                    ? `<span class="cls-discount-badge">-${product.discount}%</span>`
                    : ""
                }
                <span class="cls-favorite-icon"><i class="fa-solid fa-heart"></i></span>
            </div>
            <div class="cls-product-info">
                <h3 class="cls-product-name">${product.name}</h3>
                <div class="cls-product-priceand-rating">
                    <div class="cls-product-price">
                        <span class="cls-current-price">$${product.price.toFixed(
                          2
                        )}</span>
                        <span class="cls-original-price">$${product.originalPrice.toFixed(
                          2
                        )}</span>
                    </div>
                    <div class="cls-product-rating">
                        <span class="cls-stars"><i class="fa-solid fa-star"></i></span>
                        <span>${product.rating}</span>
                        <span class="cls-productratingbarsub">/5</span>
                    </div>
                </div>
                <div class="cls-add-to-cartandeye">
                    <button class="cls-add-to-cart-eye">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button class="cls-add-to-cart">
                        Add to cart
                    </button>
                </div>
            </div>
        `;
    return card;
  }
  let noRecord = 1;
  let displayProducts = (products, page, noRecord) => {
    if (noRecord === 0) {
      productContainer.innerHTML = `  <img src="./assets/assets-404/no-found.png" alt="noFound" style="margin-left: 40%;">`;
    } else {
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsToDisplay = products.slice(startIndex, endIndex);

      productsToDisplay.forEach((product) => {
        productContainer.appendChild(createProductCard(product));
      });

      if (endIndex >= products.length) {
        showMoreButton.style.display = "none";
      } else {
        showMoreButton.style.display = "block";
      }
    }
  }

  async function init() {
    const data = await fetchData();
    if (data) {
      const { products } = data;
      function productSearch() {
        const searchTerm = document
          .getElementById("p-searchInput")
          .value.toLowerCase();
        sortedProduct = products.filter((product) =>
          Object.values(product).some((value) =>
            value.toString().toLowerCase().includes(searchTerm)
          )
        );
        currentPage = 1;
        productContainer.innerHTML = "";
        if (Object.keys(sortedProduct).length === 0) {
          displayProducts(sortedProduct, currentPage, (noRecord = 0));
        } else {
          displayProducts(sortedProduct, currentPage, noRecord);
        }
      }
      document
        .getElementById("p-searchInput")
        .addEventListener("input", productSearch);

      displayProducts(products, currentPage, noRecord);

      showMoreButton.addEventListener("click", () => {
        currentPage++;
        displayProducts(products, currentPage, noRecord);
      });
    }
  }
  init();
}

let userList = () => {
  document.getElementById("cls-breadscrum-current").innerHTML = "user list";
  document.getElementById("cls-page-current").style.display = "none";
  const userListData = "userListData";
  let users = [];
  let filteredUsers = [];
  let currentPage = 1;
  let entriesPerPage = 5;
  const userModal = new bootstrap.Modal(document.getElementById("userModal"));

  document.getElementById("totalContent").innerHTML = `
        <div class="mt-2 cls-home-title">
            <h2>User List</h2>
            <span id="addUserBtn">Add User</span>
        </div>
        <section class="cls-userlists">
            <div class="">
                <div class="cls-e-pageandsearch mb-4 mt-4">
                    <div class="cls-e-entriestext">
                        <div class="cls-e-pageset">
                            <select id="entriesPerPage" class="form-select cls-pricefiler-select">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="cls-e-pageSetText">entries per page</div>
                    </div>
                    <div class="cls-pageSetSearch">
                        <input type="text" id="searchInput" class="form-control cls-pricefiler-select" placeholder="Search...">
                    </div>
                </div>
                <table id="userTable" class="cls-u-table">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>POSITION</th>
                            <th>OFFICE</th>
                            <th>AGE</th>
                            <th>START DATE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="cls-pagination">
                    <span id="showingpage"></span>
                    <div id="pagination" class="d-flex justify-content-center"></div>
                </div>
            </div>
        </section>
    `;

  async function fetchData() {
    try {
      const localData = localStorage.getItem(userListData);
      if (localData) {
        users = JSON.parse(localData);
      } else {
        const response = await fetch("plugins/js/data1.json");
        const data = await response.json();
        users = data.users || [];
        localStorage.setItem(userListData, JSON.stringify(users));
      }
      filteredUsers = [...users];
      displayUsers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  let displayUsers = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginationContent = document.getElementById("showingpage");
    paginationContent.innerHTML = `Showing ${startIndex + 1} to ${
      endIndex < filteredUsers.length ? endIndex : filteredUsers.length
    } of ${filteredUsers.length} entries`;
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    for (let i = startIndex; i < endIndex && i < filteredUsers.length; i++) {
      const user = filteredUsers[i];
      const randomNumber = Math.floor(Math.random() * 4) + 1;
      const row = `
                <tr>
                    <td>
                        <div class="cls-u-imgAndRole">
                            <img src="./assets/assets-userlist/avatar-${randomNumber}.jpg" alt="${
        user.name
      }" class="cls-user-avatar me-3">
                            <div class="cls-u-Role">
                                <span>${user.name}</span>
                                <span class="cls-u-developer">Android developer</span>
                            </div>
                        </div>
                    </td>
                    <td>${user.position}</td>
                    <td>${user.office}</td>
                    <td>${user.age}</td>
                    <td>${user.startDate}</td>
                    <td><span class="badge ${
                      user.status === "Active"
                        ? "cls-badge-sucess"
                        : "cls-badge-danger"
                    }">${user.status}</span></td>
                    <td>
                        <button class="btn btn-sm btn-primary edit-btn" data-id="${
                          user.id
                        }">Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-id="${
                          user.id
                        }">Delete</button>
                    </td>
                </tr>
            `;
      tableBody.innerHTML += row;
    }

    updatePagination();
    addEventListeners();
  }

  let updatePagination = () => {
    const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    const paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";
    let paginationHTML = "";
    const range = 2;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + range - 1);

    if (endPage - startPage + 1 < range && startPage > 1) {
      startPage = endPage - range + 1;
    }

    if (currentPage > 1) {
      paginationHTML += `<button class="btn btn-outline-secondary fa-solid fa-angle-left " data-page="${
        currentPage - 1
      }"></button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `<button class=" btn ${
        currentPage === i ? "btn-secondary" : "btn-outline-secondary"
      }" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
      paginationHTML += `<button class=" btn btn-outline-secondary fa-solid fa-angle-right"  data-page="${
        currentPage + 1
      }"></button>`;
    }

    paginationElement.innerHTML = paginationHTML;
    document.querySelectorAll("#pagination button").forEach((button) => {
      button.addEventListener("click", (e) => {
        currentPage = parseInt(e.target.getAttribute("data-page"));
        displayUsers();
      });
    });
  }

  let addEventListeners = () => {
    document
      .getElementById("entriesPerPage")
      .addEventListener("change", (e) => {
        entriesPerPage = parseInt(e.target.value);
        displayUsers();
      });

    document.getElementById("searchInput").addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      );
      currentPage = 1;
      displayUsers();
      //   let userTable = document.getElementById("userTable");
      //   if (Object.keys(filteredUsers).length === 0) {
      //     userTable.innerHTML = `<img src="./assets/assets-404/noUser.png" alt="noFound" style="margin-left: 32%;">`;
      //   } else {
      //     displayUsers();
      //   }
    });

    document.getElementById("addUserBtn").addEventListener("click", () => {
      document.getElementById("userForm").reset();
      document.getElementById("userId").value = "";
      userModal.show();
    });

    document.getElementById("saveUserBtn").addEventListener("click", saveUser);

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const userId = e.target.getAttribute("data-id");
        const user = users.find((user) => user.id == userId);
        if (user) {
          document.getElementById("userId").value = user.id;
          document.getElementById("name").value = user.name;
          document.getElementById("position").value = user.position;
          document.getElementById("office").value = user.office;
          document.getElementById("age").value = user.age;
          document.getElementById("startDate").value = user.startDate;
          document.getElementById("status").value = user.status;
          userModal.show();
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const userId = e.target.getAttribute("data-id");
        users = users.filter((user) => user.id != userId);
        filteredUsers = [...users];
        displayUsers();
      });
    });
  }

  let saveUser = () => {
    const id = document.getElementById("userId").value;
    const newUser = {
      id: id ? parseInt(id) : Date.now(),
      name: document.getElementById("name").value,
      position: document.getElementById("position").value,
      office: document.getElementById("office").value,
      age: parseInt(document.getElementById("age").value),
      startDate: document.getElementById("startDate").value,
      status: document.getElementById("status").value,
    };

    if (id) {
      users = users.map((user) => (user.id == id ? newUser : user));
    } else {
      users.push(newUser);
    }

    filteredUsers = [...users];
    localStorage.setItem(userListData, JSON.stringify(users)); 
    displayUsers();
    userModal.hide();
  }
  fetchData();
}

let errorpage = () => {
  document.querySelector(".cls-wrapper").classList.add("cls-error-toggle");
  const totalContent = document.getElementById("totalContent");
  const contentHtml = `<section>
    <div class="cls-errorpage">
        <div class="cls-errorimg">
            <img src="./assets/assets-404/img-error-404.png" alt="404-error-img">
        </div>
        <div class="cls-errorcontent">
            <h1>Oops! Something Went Wrong</h1>
            <span>We counldn't find the page you were looking for. Why not try <br>
            back to the Homepage.</span>
            <div class="cls-error-moveback-btn">
                <a href ="javascript:;" onclick = "dashBoard()">
                    <button>
                        <i class="fa-solid fa-house"></i>
                        <span>Back to Home</span>
                    </button></a>
            </div>
        </div>
        <div class="row">
            <div class="cls-error-logo-border">
            <div class="cls-error-logo">
            <img src="./assets/assets-404/logo-dark.svg" alt="logo.img">
        </div>
        </div>
    </div>

    </div>
</section>
<footer style="margin-top: 0px;"> 
  <div class="cls-error-footer">
                            <div class="row">
                                <div class="col-4"><span>Made by massJeeva</span></div>
                                <div class="col-4 offset"></div>
                                <div class="col-4 d-flex justify-content-evenly">
                                    <span>Home</span>
                                    <span class="cls-e-LeftLine">Documentation</span>
                                    <span>Support</span>
                                </div>
                            </div>
                        </div>
                        </footer>`;
  totalContent.innerHTML = contentHtml;
}
fetchDatas();
