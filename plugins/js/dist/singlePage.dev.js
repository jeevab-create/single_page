"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var $menuContainer = $(".cls-components");

function displayMenu() {
  var menuHtml = menuItems.map(function (item) {
    return "\n        ".concat(item.heading ? "<span class=\"cls-navheading\">".concat(item.heading, "</span>") : "", "\n        <li>\n          <a href=\"").concat(item.href || "javascript:;", "\" onClick = \"").concat(item.onclick, "\"\n             title=\"go to ").concat(item.title, " page\" \n             class=\"menu-item ").concat(item.submenu ? "has-submenu" : "", "\">\n            <i class=\"").concat(item.icon, "\"></i> <span>").concat(item.title, "</span>\n          </a>\n          ").concat(item.submenu ? "<ul class=\"submenu\">\n              ".concat(item.submenu.map(function (sub) {
      return "\n                <li>\n                  <a href=\"".concat(sub.href, "\" \n                     title=\"go to ").concat(sub.title, " page\" \n                     class=\"menu-item ").concat(sub.type ? "sidebar-type" : "", "\" \n                     ").concat(sub.type ? "data-type=\"".concat(sub.type, "\"") : "", ">\n                    ").concat(sub.title, "\n                  </a>\n                </li>");
    }).join(""), "\n              </ul>") : "", "\n        </li>\n      ");
  }).join("");
  $menuContainer.html(menuHtml);
  document.getElementById("sidebarCollapse").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
    document.querySelector(".cls-sidebarCollapse").classList.toggle("cls-collapsed");
  });
  $(".cls-components .menu-item").on("click", function (e) {
    $(".menu-item.active").removeClass("active");
    $(this).addClass("active");
    $(this).hasClass("has-submenu") && $(this).siblings(".submenu").toggleClass("show");
  });

  document.querySelector('.sidebar-type[data-type="horizontal"]').onclick = function () {
    return document.querySelector('.cls-wrapper').classList.add('horizontal');
  };

  document.querySelector('.sidebar-type[data-type="vertical"]').onclick = function () {
    return document.querySelector('.cls-wrapper').classList.remove('horizontal');
  };
}

function fetchDatas() {
  var response, data;
  return regeneratorRuntime.async(function fetchDatas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('plugins/js/data1.json'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          menuItems = data.menuItems;
          displayMenu();
          dashBoard();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching data:', _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

fetchDatas();

function switchPage(page) {
  switch (page) {
    case 'dashboard':
      dashBoard();
      break;

    case 'product':
      product();
      break;

    case 'userList':
      window.onload = userList;
      userList();
      break;

    default:
      console.error('Page not found');
  }
}

function dashBoard() {
  function fetchData() {
    var response, data, _menuItems, salesData, statsData, ratingData, usersData;

    return regeneratorRuntime.async(function fetchData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(fetch('plugins/js/data1.json'));

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            data = _context2.sent;
            _menuItems = data.menuItems;
            salesData = data.salesData;
            statsData = data.statsData;
            ratingData = data.ratingData;
            usersData = data.usersData;
            renderContent(_menuItems, salesData, statsData, ratingData, usersData);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.error('Error fetching the JSON data:', _context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 15]]);
  }

  function renderContent(menuItems, salesData, statsData, ratingData, usersData) {
    var totalContent = document.getElementById('totalContent');
    var contentHtml = "\n            <section>\n                <div class=\"row mt-3\">\n                    <div id=\"salesCards\" class=\"cls-date-sales\"></div>\n                </div>\n            </section>\n            <section>\n                <div class=\"cls-map-grap\" id=\"cls-map-grap\"></div>\n            </section>\n            <section>\n                <div class=\"row\">\n                    <div class=\"cls-social-likes d-flex\" id=\"statsCards\"></div>\n                </div>\n            </section>\n            <section>\n                <div class=\"row\">\n                    <div class=\"cls-social-likes d-flex\" id=\"recentUsersCards\"></div>\n                </div>\n            </section>\n        ";
    totalContent.innerHTML = contentHtml;
    renderSalesCards(salesData);
    renderMap();
    renderStatsCards(statsData);
    renderRatingCard(ratingData);
    renderUsersCard(usersData);
  }

  function renderMap() {
    var htmlContent = "\n            <div class=\"row mt-2\">\n                <div class=\"col-7\">\n                    <div class=\"cls-card\">\n                        <span class=\"cls-border-bottom\">Users From United States</span>\n                        <div class=\"cls-image-container\">\n                            <div class=\"cls-zoomicon mt-4\" id=\"zoom-in\">+</div>\n                            <div class=\"cls-zoomicon\" id=\"zoom-out\">-</div>\n                            <img src=\"./assets/assets-404/map.png\" alt=\"map image\" class=\"cls-mapimg\" id=\"map-image\">\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-5\">\n                    <div class=\"cls-card\">\n                        <div class=\"row cls-border-bottom\">\n                            <div class=\"cls-span d-flex justify-content-between\">\n                                <span>Users From United Status</span>\n                                <span class=\"fa-solid fa-ellipsis-vertical\"></span>\n                            </div>\n                        </div>\n                        <div class=\"row cls-burnupchart mt-3 d-flex align-items-center\">\n                            <div class=\"col-1\">\n                                <span class=\"fa-solid fa-money-bill cls-icon-bgandcolor\"></span>\n                            </div>\n                            <div class=\"col-4 cls-earnings\">\n                                <p class=\"text-muted\">Total Earnings</p>\n                                <p>$249.95</p>\n                            </div>\n                        </div>\n                        <div class=\"row cls-burnupchart cls-imgearn\">\n                            <img src=\"./assets/assets-404/earngrap.png\" alt=\"grap image\">\n                        </div>\n                    </div>\n                    <div class=\"cls-card cls-total-ideas\">\n                        <div class=\"row\">\n                            <div class=\"col-6 cls-earnings d-flex align-items-center\">\n                                <div>\n                                    <span class=\"fa-solid fa-bolt cls-icon-bgandcolor\"></span>\n                                </div>\n                                <div class=\"mx-2\">\n                                    <span>Total ideas</span>\n                                    <span class=\"cls-totalIdeaAndLoc\">235</span>\n                                </div>\n                            </div>\n                            <div class=\"col-6 cls-earnings d-flex align-items-center\">\n                                <div>\n                                    <span class=\"fa-solid fa-location-dot cls-icon-bgandcolors\"></span>\n                                </div>\n                                <div class=\"mx-2\">\n                                    <span>Total location</span>\n                                    <span class=\"cls-totalIdeaAndLoc\">26</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
    document.getElementById('cls-map-grap').innerHTML = htmlContent;
  }

  function renderSalesCards(salesData) {
    var salesCardsContainer = document.getElementById("salesCards");
    salesData.forEach(function (data, index) {
      salesCardsContainer.innerHTML += createSalesCard(data, index);
    });
  }

  function renderStatsCards(statsData) {
    var statsCardsContainer = document.getElementById("statsCards");
    statsData.forEach(function (data) {
      statsCardsContainer.innerHTML += createStatsCard(data);
    });
  }

  function renderRatingCard(ratingData) {
    var ratingCardContainer = document.getElementById("recentUsersCards");
    ratingCardContainer.innerHTML += createRatingCard(ratingData);
  }

  function renderUsersCard(usersData) {
    var usersCardsContainer = document.getElementById("recentUsersCards");
    usersCardsContainer.innerHTML += createUsersCard(usersData);
  }

  function createSalesCard(data, index) {
    var cardColor = index === 2 ? "cls-bg-gradients text-white" : "";
    var textColor = index === 2 ? "text-white" : "";
    var increaseHtml = data.increase ? "<span class=\"badge cls-salesbadge \">".concat(data.increase, "%</span>") : "";
    return "\n            <div class=\"col-md-4\">\n                <div class=\"cls-card ".concat(cardColor, "\" >\n                    <div class=\"cls-card-body\" style=\"background-image: url(").concat(data.img, ");\">\n                        <h5 class=\"cls-card-title\">").concat(data.title, "</h5>\n                        <div class=\"d-flex align-items-center mt-4\">\n                            <span class=\"cls-sales-amount me-2\">$").concat(data.amount.toFixed(2), "</span>\n                            ").concat(increaseHtml, "\n                        </div>\n                        <p class=\"cls-card-text mt-3 ").concat(textColor, "\">You made an extra ").concat(data.extra.toLocaleString(), " this ").concat(data.period, "</p>\n                        <div class=\"progress mt-1\">\n                        <div class=\"progress-bar cls-bg-gradients\" role=\"progressbar\" style=\"width: ").concat(data.increase, "%;\"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
  }

  function createStatsCard(data) {
    return "\n            <div class=\"col-md-4\">\n                <div class=\"cls-card\">\n                    <div class=\"cls-card-body\" style=\"background-image: url(".concat(data.img, ");\">\n                        <div class=\"d-flex align-items-center mb-3\">\n                            <img src=\"").concat(data.icon, "\" class=\"cls-social-icon\" alt=\"social icons\">\n                            <div class=\"px-2\">\n                                <div class=\"text-muted\">Total Likes</div>\n                                <div class=\"d-flex align-items-center\">\n                                    <span class=\"cls-likes-count\">").concat(data.likes.toLocaleString(), "</span>\n                                    <span class=\"badge ms-2 cls-likes-increase\">+").concat(data.increase, "%</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row cls-stats-row\">\n                            <div class=\"col-6 text-center cls-borderleft\">\n                                <div class=\"cls-stats-label\">Target</div>\n                                <div class=\"cls-stats-value\">").concat(data.target.toLocaleString(), "</div>\n                            </div>\n                            <div class=\"col-6 text-center\">\n                                <div class=\"cls-stats-label\">Duration</div>\n                                <div class=\"cls-stats-value\">").concat(data.duration.toLocaleString(), "</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");
  }

  function createRatingCard(data) {
    var stars = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(data.averageRating)) + '<i class="fa-regular fa-star-half-stroke"></i>'.repeat(5 - Math.floor(data.averageRating));
    var ratingBars = "";

    for (var i = data.totalRatings; i > 0; i--) {
      var percentage = data.ratingCounts[data.totalRatings - i] / Math.max.apply(Math, _toConsumableArray(data.ratingCounts)) * 100;
      ratingBars += "\n                <div class=\"d-flex align-items-center mb-2 cls-star-ratings\">\n                    <span class=\"me-2 \">".concat(i, " <span class=\"cls-star-rating\"><i class=\"fa-solid fa-star\"></i></span></span>\n                    <div class=\"progress flex-grow-1 cls-rating-bar\">\n                        <div class=\"progress-bar cls-bg-gradients\" role=\"progressbar\" style=\"width: ").concat(percentage, "%;\" aria-valuenow=\"").concat(percentage, "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n                    </div>\n                    <span class=\"ms-2\">").concat(data.ratingCounts[data.totalRatings - i], "</span>\n                </div>");
    }

    return "\n            <div class=\"col-md-4\">\n                <div class=\"cls-card\">\n                    <div class=\"cls-card-header d-flex justify-content-between align-items-center\">\n                        <span class=\"mb-0\">Recent Users</span>\n                        <i class=\"fas fa-ellipsis-v\"></i>\n                    </div>\n                    <div class=\"cls-card-body\">\n                        <div class=\"d-flex align-items-center justify-content-between mb-4 mt-3\">\n                            <div>\n                                <span class=\"cls-rating-number \">".concat(data.averageRating, "</span>\n                                <span class=\"text-muted mt-2\">/ ").concat(data.totalRatings, "</span>\n                            </div>\n                            <div>\n                                <span class=\"cls-star-rating \">").concat(stars, "</span>\n                            </div>\n                        </div>\n                        ").concat(ratingBars, "\n                    </div>\n                </div>\n            </div>\n        ");
  }

  function createUsersCard(users) {
    var usersList = "";
    var i = 1;
    users.forEach(function (user) {
      usersList += "\n                <div class=\"d-flex justify-content-between align-items-center my-3\">\n                    <div class=\"d-flex align-items-center\">\n                        <img src=\"".concat(user.avatar, "\" alt=\"").concat(user.name, "\" class=\"cls-user-avatar me-3\">\n                        <div class=\"cls-user-info\">\n                            <div class=\"cls-user-name\">").concat(user.name, "</div>\n                            <div class=\"cls-user-role\">").concat(user.role, "</div>\n                        </div>\n                    </div>\n                    <div class=\"d-flex align-items-center\">\n                        <div class=\"cls-user-time-circle").concat(i, " cls-user-time-circle\"></div>\n                        <span class=\"cls-user-time me-3\">").concat(user.time, "</span>\n                    </div>\n                    <div class=\"d-flex align-items-center\">\n                        <div class=\"cls-action-icons\">\n                            <i class=\"fas fa-times cls-text-dangers\"></i>\n                            <i class=\"fas fa-check cls-text-success\"></i>\n                        </div>\n                    </div>\n                </div>\n            ");
      i++;
    });
    return "\n            <div class=\"col-md-8 mb-4\">\n                <div class=\"cls-card\">\n                    <div class=\"cls-card-header d-flex justify-content-between align-items-center\">\n                        <span class=\"mb-0\">Recent Users</span>\n                        <i class=\"fas fa-ellipsis-v\"></i>\n                    </div>\n                    <div class=\"cls-card-body\">\n                        ".concat(usersList, "\n                    </div>\n                </div>\n            </div>\n        ");
  }

  fetchData();
}

function product() {
  var totalContent = document.getElementById("totalContent");
  var htmlContent = "\n        <section class=\"mt-5\">\n            <div class=\"cls-productprice-filter\">\n                <div class=\"row cls-content-header\">\n                    <div class=\"col-4 d-flex align-items-center\">\n                        <div class=\"cls-searchbar\">\n                            <i class=\"fa-solid fa-magnifying-glass\"></i>\n                            <input type=\"search\" placeholder=\"Search products\">\n                        </div>\n                    </div>\n                    <div class=\"col-4\"> </div>\n                    <div class=\"col-4 d-flex align-items-center justify-content-evenly\">\n                        <div class=\"cls-pricefiler\">\n                            <span>Price: High To Low <i class=\"fa-solid fa-angle-down\"></i></span>\n                        </div>\n                        <div class=\"cls-productfilter\">\n                            <i class=\"fa-solid fa-filter\"></i>\n                            <span>Filter</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n        <section class=\"mt-4\">\n            <div id=\"product-container\" class=\"cls-product-container\"></div>\n            <button id=\"show-more\" class=\"cls-show-more\" style=\"display: none;\">Show More</button>\n        </section>\n    ";
  totalContent.innerHTML = htmlContent;
  var $menuContainer = $(".cls-components");
  var productContainer = document.getElementById("product-container");
  var showMoreButton = document.getElementById("show-more");
  var currentPage = 1;
  var productsPerPage = 9;

  function fetchData() {
    var response, data;
    return regeneratorRuntime.async(function fetchData$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(fetch('plugins/js/data1.json'));

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            data = _context3.sent;
            return _context3.abrupt("return", data);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.error('Error fetching JSON:', _context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  }

  function generateMenuHTML(menuItems) {
    return menuItems.map(function (item) {
      return "\n                ".concat(item.heading ? "<span class=\"cls-navheading\">".concat(item.heading, "</span>") : "", "\n                <li>\n                    <a href=\"").concat(item.href || "javascript:;", "\" onClick = \"").concat(item.onclick, "\"\n                       title=\"go to ").concat(item.title, " page\" \n                       class=\"menu-item ").concat(item.submenu ? "has-submenu" : "", "\">\n                    <i class=\"").concat(item.icon, "\"></i> <span>").concat(item.title, "</span>\n                    </a>\n                    ").concat(item.submenu ? "<ul class=\"submenu\">\n                        ".concat(item.submenu.map(function (sub) {
        return "\n                            <li>\n                                <a href=\"".concat(sub.href, "\" \n                                   title=\"go to ").concat(sub.title, " page\" \n                                   class=\"menu-item ").concat(sub.type ? "sidebar-type" : "", "\" \n                                   ").concat(sub.type ? "data-type=\"".concat(sub.type, "\"") : "", ">\n                                    ").concat(sub.title, "\n                                </a>\n                            </li>");
      }).join(""), "\n                        </ul>") : "", "\n                </li>");
    }).join("");
  }

  function createProductCard(product) {
    var card = document.createElement("div");
    card.className = "cls-product-card";
    card.innerHTML = "\n            <div class=\"cls-product-image\">\n                <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n                ").concat(product.discount ? "<span class=\"cls-discount-badge\">-".concat(product.discount, "%</span>") : "", "\n                <span class=\"cls-favorite-icon\"><i class=\"fa-solid fa-heart\"></i></span>\n            </div>\n            <div class=\"cls-product-info\">\n                <h3 class=\"cls-product-name\">").concat(product.name, "</h3>\n                <div class=\"cls-product-priceand-rating\">\n                    <div class=\"cls-product-price\">\n                        <span class=\"cls-current-price\">$").concat(product.price.toFixed(2), "</span>\n                        <span class=\"cls-original-price\">$").concat(product.originalPrice.toFixed(2), "</span>\n                    </div>\n                    <div class=\"cls-product-rating\">\n                        <span class=\"cls-stars\"><i class=\"fa-solid fa-star\"></i></span>\n                        <span>").concat(product.rating, "/5</span>\n                    </div>\n                </div>\n                <div class=\"cls-add-to-cartandeye\">\n                    <button class=\"cls-add-to-cart-eye\">\n                        <i class=\"fa-regular fa-eye\"></i>\n                    </button>\n                    <button class=\"cls-add-to-cart\">\n                        Add to cart\n                    </button>\n                </div>\n            </div>\n        ");
    return card;
  }

  function displayProducts(products, page) {
    var startIndex = (page - 1) * productsPerPage;
    var endIndex = startIndex + productsPerPage;
    var productsToDisplay = products.slice(startIndex, endIndex);
    productsToDisplay.forEach(function (product) {
      productContainer.appendChild(createProductCard(product));
    });

    if (endIndex >= products.length) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.style.display = "block";
    }
  }

  function init() {
    var data, _menuItems2, products, menuHtml;

    return regeneratorRuntime.async(function init$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(fetchData());

          case 2:
            data = _context4.sent;

            if (data) {
              _menuItems2 = data.menuItems, products = data.products;
              menuHtml = generateMenuHTML(_menuItems2);
              $menuContainer.html(menuHtml);
              document.getElementById("sidebarCollapse").addEventListener("click", function () {
                document.getElementById("sidebar").classList.toggle("collapsed");
                document.querySelector(".cls-sidebarCollapse").classList.toggle("cls-collapsed");
              });
              $(".cls-components .menu-item").on("click", function (e) {
                $(".menu-item.active").removeClass("active");
                $(this).addClass("active");
                $(this).hasClass("has-submenu") && $(this).siblings(".submenu").toggleClass("show");
              });

              document.querySelector('.sidebar-type[data-type="horizontal"]').onclick = function () {
                return document.querySelector('.cls-wrapper').classList.add('horizontal');
              };

              document.querySelector('.sidebar-type[data-type="vertical"]').onclick = function () {
                return document.querySelector('.cls-wrapper').classList.remove('horizontal');
              };

              displayProducts(products, currentPage);
              showMoreButton.addEventListener("click", function () {
                currentPage++;
                displayProducts(products, currentPage);
              });
            }

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  init();
}

function userList() {
  var USERS_STORAGE_KEY = 'userListData';
  var menuItems = [];
  var users = [];
  var filteredUsers = [];
  var currentPage = 1;
  var entriesPerPage = 5;
  var userModal = new bootstrap.Modal(document.getElementById("userModal"));
  document.getElementById('totalContent').innerHTML = "\n        <div class=\"mt-2 cls-home-title\">\n            <h2>User List</h2>\n            <button id=\"addUserBtn\" class=\"btn btn-primary\">Add User</button>\n        </div>\n        <section class=\"cls-userlists\">\n            <div class=\"\">\n                <div class=\"cls-e-pageandsearch mb-4 mt-4\">\n                    <div class=\"cls-e-entriestext\">\n                        <div class=\"cls-e-pageset\">\n                            <select id=\"entriesPerPage\" class=\"form-select\">\n                                <option value=\"5\">5</option>\n                                <option value=\"10\">10</option>\n                                <option value=\"15\">15</option>\n                                <option value=\"20\">20</option>\n                            </select>\n                        </div>\n                        <div class=\"cls-e-pageSetText\">entries per page</div>\n                    </div>\n                    <div class=\"\">\n                        <input type=\"text\" id=\"searchInput\" class=\"form-control\" placeholder=\"Search...\">\n                    </div>\n                </div>\n                <table id=\"userTable\" class=\"table table-bordered\">\n                    <thead>\n                        <tr>\n                            <th>NAME</th>\n                            <th>POSITION</th>\n                            <th>OFFICE</th>\n                            <th>AGE</th>\n                            <th>START DATE</th>\n                            <th>STATUS</th>\n                            <th>ACTIONS</th>\n                        </tr>\n                    </thead>\n                    <tbody></tbody>\n                </table>\n                <div class=\"cls-pagination\">\n                    <span id=\"showingpage\"></span>\n                    <div id=\"pagination\" class=\"d-flex justify-content-center\"></div>\n                </div>\n            </div>\n        </section>\n    ";

  function fetchData() {
    var response, data;
    return regeneratorRuntime.async(function fetchData$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(fetch('plugins/js/data1.json'));

          case 3:
            response = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(response.json());

          case 6:
            data = _context5.sent;
            menuItems = data.menuItems || [];
            users = data.users || [];
            filteredUsers = _toConsumableArray(users);
            displayUsers();
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            console.error('Error fetching data:', _context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 13]]);
  }

  function displayUsers() {
    var startIndex = (currentPage - 1) * entriesPerPage;
    var endIndex = startIndex + entriesPerPage;
    var tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    for (var i = startIndex; i < endIndex && i < filteredUsers.length; i++) {
      var user = filteredUsers[i];
      var randomNumber = Math.floor(Math.random() * 4) + 1;
      var row = "\n                <tr>\n                    <td>\n                        <div class=\"d-flex align-items-center\">\n                            <img src=\"./assets/assets-userlist/avatar-".concat(randomNumber, ".jpg\" alt=\"").concat(user.name, "\" class=\"cls-user-avatar me-2\">\n                            <div>\n                                <span>").concat(user.name, "</span>\n                                <span class=\"small text-muted\">Android developer</span>\n                            </div>\n                        </div>\n                    </td>\n                    <td>").concat(user.position, "</td>\n                    <td>").concat(user.office, "</td>\n                    <td>").concat(user.age, "</td>\n                    <td>").concat(user.startDate, "</td>\n                    <td><span class=\"badge ").concat(user.status === "Active" ? "cls-badge-sucess" : "cls-badge-danger", "\">").concat(user.status, "</span></td>\n                    <td>\n                        <button class=\"btn btn-sm btn-primary edit-btn\" data-id=\"").concat(user.id, "\">Edit</button>\n                        <button class=\"btn btn-sm btn-danger delete-btn\" data-id=\"").concat(user.id, "\">Delete</button>\n                    </td>\n                </tr>\n            ");
      tableBody.innerHTML += row;
    }

    updatePagination();
    addEventListeners();
  }

  function updatePagination() {
    var totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";
    var paginationHTML = "";

    if (currentPage > 1) {
      paginationHTML += "<button class=\"btn btn-outline-secondary\" data-page=\"".concat(currentPage - 1, "\">Previous</button>");
    }

    for (var i = 1; i <= totalPages; i++) {
      paginationHTML += "<button class=\"btn ".concat(currentPage === i ? 'btn-secondary' : 'btn-outline-secondary', "\" data-page=\"").concat(i, "\">").concat(i, "</button>");
    }

    if (currentPage < totalPages) {
      paginationHTML += "<button class=\"btn btn-outline-secondary\" data-page=\"".concat(currentPage + 1, "\">Next</button>");
    }

    paginationElement.innerHTML = paginationHTML;
    document.querySelectorAll("#pagination button").forEach(function (button) {
      button.addEventListener("click", function (e) {
        currentPage = parseInt(e.target.getAttribute("data-page"));
        displayUsers();
      });
    });
  }

  function addEventListeners() {
    document.getElementById('entriesPerPage').addEventListener('change', function (e) {
      entriesPerPage = parseInt(e.target.value);
      displayUsers();
    });
    document.getElementById('searchInput').addEventListener('input', function (e) {
      var searchTerm = e.target.value.toLowerCase();
      filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchTerm);
      });
      currentPage = 1;
      displayUsers();
    });
    document.getElementById('addUserBtn').addEventListener('click', function () {
      document.getElementById('userForm').reset();
      document.getElementById('userId').value = '';
      userModal.show();
    });
    document.getElementById('saveUserBtn').addEventListener('click', saveUser);
    document.querySelectorAll('.edit-btn').forEach(function (button) {
      button.addEventListener('click', function (e) {
        var userId = e.target.getAttribute('data-id');
        var user = users.find(function (user) {
          return user.id == userId;
        });

        if (user) {
          document.getElementById('userId').value = user.id;
          document.getElementById('name').value = user.name;
          document.getElementById('position').value = user.position;
          document.getElementById('office').value = user.office;
          document.getElementById('age').value = user.age;
          document.getElementById('startDate').value = user.startDate;
          document.getElementById('status').value = user.status;
          userModal.show();
        }
      });
    });
    document.querySelectorAll('.delete-btn').forEach(function (button) {
      button.addEventListener('click', function (e) {
        var userId = e.target.getAttribute('data-id');
        users = users.filter(function (user) {
          return user.id != userId;
        });
        filteredUsers = _toConsumableArray(users);
        displayUsers();
      });
    });
  }

  function saveUser() {
    var id = document.getElementById('userId').value;
    var newUser = {
      id: id ? parseInt(id) : Date.now(),
      name: document.getElementById('name').value,
      position: document.getElementById('position').value,
      office: document.getElementById('office').value,
      age: parseInt(document.getElementById('age').value),
      startDate: document.getElementById('startDate').value,
      status: document.getElementById('status').value
    };

    if (id) {
      users = users.map(function (user) {
        return user.id == id ? newUser : user;
      });
    } else {
      users.push(newUser);
    }

    filteredUsers = _toConsumableArray(users);
    displayUsers();
    userModal.hide();
  }

  fetchData();
} // window.onload = userList;