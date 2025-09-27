"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function fetchData() {
  var response, data, menuItems, salesData, statsData, ratingData, usersData;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('plugins/js/data.json'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;
          menuItems = data.menuItems;
          salesData = data.salesData;
          statsData = data.statsData;
          ratingData = data.ratingData;
          usersData = data.usersData;
          renderMenu(menuItems);
          renderSalesCards(salesData);
          renderStatsCards(statsData);
          renderRatingCard(ratingData);
          renderUsersCard(usersData);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching the JSON data:', _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

function renderMenu(menuItems) {
  var $menuContainer = $(".cls-components");
  var menuHtml = menuItems.map(function (item) {
    return "\n      ".concat(item.heading ? "<span class=\"cls-navheading\">".concat(item.heading, "</span>") : "", "\n      <li>\n        <a href=\"").concat(item.href || "javascript:;", "\" \n           title=\"go to ").concat(item.title, " page\" \n           class=\"menu-item ").concat(item.submenu ? "has-submenu" : "", "\">\n          <i class=\"").concat(item.icon, "\"></i> <span>").concat(item.title, "</span>\n        </a>\n        ").concat(item.submenu ? "<ul class=\"submenu\">\n          ".concat(item.submenu.map(function (sub) {
      return "\n            <li>\n              <a href=\"".concat(sub.href, "\" \n                 title=\"go to ").concat(sub.title, " page\" \n                 class=\"menu-item ").concat(sub.type ? "sidebar-type" : "", "\" \n                 ").concat(sub.type ? "data-type=\"".concat(sub.type, "\"") : "", ">\n                ").concat(sub.title, "\n              </a>\n            </li>");
    }).join(""), "\n          </ul>") : "", "\n      </li>\n    ");
  }).join("");
  $menuContainer.html(menuHtml);
  document.getElementById("sidebarCollapse").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
    document.querySelector(".cls-sidebarColla4pse").classList.toggle("cls-collapsed");
  });
  $(".cls-components .menu-item").on("click", function (e) {
    $(".menu-item.active").removeClass("active");
    $(this).addClass("active");
    $(this).hasClass("has-submenu") && $(this).siblings(".submenu").toggleClass("show");
  });

  document.querySelector('.sidebar-type[data-type="horizontal"]').onclick = function () {
    return document.querySelector(".cls-wrapper").classList.add("horizontal");
  };

  document.querySelector('.sidebar-type[data-type="vertical"]').onclick = function () {
    return document.querySelector(".cls-wrapper").classList.remove("horizontal");
  };
} // Render Sales Cards


function renderSalesCards(salesData) {
  var salesCardsContainer = document.getElementById("salesCards");
  salesData.forEach(function (data, index) {
    salesCardsContainer.innerHTML += createSalesCard(data, index);
  });
} // Render Stats Cards


function renderStatsCards(statsData) {
  var statsCardsContainer = document.getElementById("statsCards");
  statsData.forEach(function (data) {
    statsCardsContainer.innerHTML += createStatsCard(data);
  });
} // Render Rating Card


function renderRatingCard(ratingData) {
  var ratingCardContainer = document.getElementById("recentUsersCards");
  ratingCardContainer.innerHTML += createRatingCard(ratingData);
} // Render Users Card


function renderUsersCard(usersData) {
  var usersCardsContainer = document.getElementById("recentUsersCards");
  usersCardsContainer.innerHTML += createUsersCard(usersData);
}

function createSalesCard(data, index) {
  var cardColor = index === 2 && "cls-bg-gradients text-white";
  var increaseHtml = data.increase ? "<span class=\"badge cls-salesbadge \">".concat(data.increase, "%</span>") : "";
  return "\n      <div class=\"col-md-4\">\n          <div class=\"cls-card ".concat(cardColor, "\" >\n              <div class=\"cls-card-body\" style=\"background-image: url(").concat(data.img, ");\">\n                  <h5 class=\"cls-card-title\">").concat(data.title, "</h5>\n                  <div class=\"d-flex align-items-center mt-4\">\n                      <span class=\"cls-sales-amount me-2\">$").concat(data.amount.toFixed(2), "</span>\n                      ").concat(increaseHtml, "\n                  </div>\n                  <p class=\"cls-card-text mt-3 ").concat(textColor, "\">You made an extra ").concat(data.extra.toLocaleString(), " this ").concat(data.period, "</p>\n                  <div class=\"progress mt-1\">\n                  <div class=\"progress-bar cls-bg-gradients\" role=\"progressbar\" style=\"width: ").concat(data.increase, "%;\"></div>\n                  </div>\n              </div>\n          </div>\n      </div>\n  ");
}

function createStatsCard(data) {
  return "\n      <div class=\"col-md-4\">\n          <div class=\"cls-card\">\n              <div class=\"cls-card-body\" style=\"background-image: url(".concat(data.img, ");\">\n                  <div class=\"d-flex align-items-center mb-3\">\n                      <img src=\"").concat(data.icon, "\" class=\"cls-social-icon\" alt=\"social icons\">\n                      <div class=\"px-2\">\n                          <div class=\"text-muted\">Total Likes</div>\n                          <div class=\"d-flex align-items-center\">\n                              <span class=\"cls-likes-count\">").concat(data.likes.toLocaleString(), "</span>\n                              <span class=\"badge ms-2 cls-likes-increase\">+").concat(data.increase, "%</span>\n                          </div>\n                      </div>\n                  </div>\n                  <div class=\"row cls-stats-row\">\n                      <div class=\"col-6 text-center cls-borderleft\">\n                          <div class=\"cls-stats-label\">Target</div>\n                          <div class=\"cls-stats-value\">").concat(data.target.toLocaleString(), "</div>\n                      </div>\n                      <div class=\"col-6 text-center\">\n                          <div class=\"cls-stats-label\">Duration</div>\n                          <div class=\"cls-stats-value\">").concat(data.duration.toLocaleString(), "</div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>\n  ");
}

function createRatingCard(data) {
  var stars = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(data.averageRating)) + '<i class="fa-regular fa-star-half-stroke"></i>'.repeat(5 - Math.floor(data.averageRating));
  var ratingBars = "";

  for (var i = data.totalRatings; i > 0; i--) {
    var percentage = data.ratingCounts[data.totalRatings - i] / Math.max.apply(Math, _toConsumableArray(data.ratingCounts)) * 100;
    ratingBars += "\n      <div class=\"d-flex align-items-center mb-2 cls-star-ratings\">\n          <span class=\"me-2 \">".concat(i, " <span class=\"cls-star-rating\"><i class=\"fa-solid fa-star\"></i></span></span>\n          <div class=\"progress flex-grow-1 cls-rating-bar\">\n              <div class=\"progress-bar cls-bg-gradients\" role=\"progressbar\" style=\"width: ").concat(percentage, "%;\" aria-valuenow=\"").concat(percentage, "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <span class=\"ms-2\">").concat(data.ratingCounts[data.totalRatings - i], "</span>\n      </div>");
  }

  return "\n      <div class=\"col-md-4\">\n          <div class=\"cls-card\">\n              <div class=\"cls-card-header d-flex justify-content-between align-items-center\">\n                  <span class=\"mb-0\">Recent Users</span>\n                  <i class=\"fas fa-ellipsis-v\"></i>\n              </div>\n              <div class=\"cls-card-body\">\n                  <div class=\"d-flex align-items-center justify-content-between mb-4 mt-3\">\n                      <div>\n                          <span class=\"cls-rating-number \">".concat(data.averageRating, "</span>\n                          <span class=\"text-muted mt-2\">/ ").concat(data.totalRatings, "</span>\n                      </div>\n                      <div>\n                          <span class=\"cls-star-rating \">").concat(stars, "</span>\n                      </div>\n                  </div>\n                  ").concat(ratingBars, "\n              </div>\n          </div>\n      </div>\n  ");
}

function createUsersCard(users) {
  var usersList = "";
  var i = 1;
  users.forEach(function (user) {
    usersList += "\n      <div class=\"d-flex justify-content-between align-items-center my-3\">\n          <div class=\"d-flex align-items-center\">\n              <img src=\"".concat(user.avatar, "\" alt=\"").concat(user.name, "\" class=\"cls-user-avatar me-3\">\n              <div class=\"cls-user-info\">\n                  <div class=\"cls-user-name\">").concat(user.name, "</div>\n                  <div class=\"cls-user-role\">").concat(user.role, "</div>\n              </div>\n          </div>\n          <div class=\"d-flex align-items-center\">\n              <div class=\"cls-user-time-circle").concat(i, " cls-user-time-circle\"></div>\n              <span class=\"cls-user-time me-3\">").concat(user.time, "</span>\n          </div>\n          <div class=\"d-flex align-items-center\">\n              <div class=\"cls-action-icons\">\n                  <i class=\"fas fa-times cls-text-dangers\"></i>\n                  <i class=\"fas fa-check cls-text-success\"></i>\n              </div>\n          </div>\n      </div>\n    ");
    i++;
  });
  return "\n    <div class=\"col-md-8 mb-4\">\n        <div class=\"cls-card\">\n            <div class=\"cls-card-header d-flex justify-content-between align-items-center\">\n                <span class=\"mb-0\">Recent Users</span>\n                <i class=\"fas fa-ellipsis-v\"></i>\n            </div>\n            <div class=\"cls-card-body\">\n                ".concat(usersList, "\n            </div>\n        </div>\n    </div>\n  ");
}

fetchData();