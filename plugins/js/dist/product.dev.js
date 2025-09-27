"use strict";

var $menuContainer = $(".cls-components");
var productContainer = document.getElementById("product-container");
var showMoreButton = document.getElementById("show-more");
var currentPage = 1;
var productsPerPage = 9;
var selectedProduct = [];

function fetchData() {
  var response, data;
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
          return _context.abrupt("return", data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching JSON:', _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function generateMenuHTML(menuItems) {
  return menuItems.map(function (item) {
    return "\n".concat(item.heading ? "<span class=\"cls-navheading\">".concat(item.heading, "</span>") : "", "\n<li>\n<a href=\"").concat(item.href || "javascript:;", "\" \n   title=\"go to ").concat(item.title, " page\" \n   class=\"menu-item ").concat(item.submenu ? "has-submenu" : "", "\">\n  <i class=\"").concat(item.icon, "\"></i> <span>").concat(item.title, "</span>\n</a>\n").concat(item.submenu ? "<ul class=\"submenu\">\n  ".concat(item.submenu.map(function (sub) {
      return "\n    <li>\n      <a href=\"".concat(sub.href, "\" \n         title=\"go to ").concat(sub.title, " page\" \n         class=\"menu-item ").concat(sub.type ? "sidebar-type" : "", "\" \n         ").concat(sub.type ? "data-type=\"".concat(sub.type, "\"") : "", ">\n        ").concat(sub.title, "\n      </a>\n    </li>");
    }).join(""), "\n  </ul>") : "", "\n</li>");
  }).join("");
}

function createProductCard(product) {
  var card = document.createElement("div");
  card.className = "cls-product-card";
  card.innerHTML = "\n        <div class=\"cls-product-image\">\n            <img src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n            ").concat(product.discount ? "<span class=\"cls-discount-badge\">-".concat(product.discount, "%</span>") : "", "\n            <span class=\"cls-favorite-icon\"><i class=\"fa-solid fa-heart\"></i></span>\n        </div>\n        <div class=\"cls-product-info\">\n            <h3 class=\"cls-product-name\">").concat(product.name, "</h3>\n            <div class=\"cls-product-priceand-rating\">\n            <div class=\"cls-product-price\">\n                <span class=\"cls-current-price\">$").concat(product.price.toFixed(2), "</span>\n                <span class=\"cls-original-price\">$").concat(product.originalPrice.toFixed(2), "</span>\n            </div>\n            <div class=\"cls-product-rating\">\n                <span class=\"cls-stars\"><i class=\"fa-solid fa-star\"></i></span>\n                <span>").concat(product.rating, "/5</span>\n            </div>\n            </div>\n            <div class=\"cls-add-to-cartandeye\">\n            <button class=\"cls-add-to-cart-eye\">\n            <i class=\"fa-regular fa-eye\"></i>\n            </button>\n            <button class=\"cls-add-to-cart\">\n                Add to cart\n            </button>\n            </div>\n        </div>\n    ");
  return card;
}

function displayProducts(products, page) {
  productContainer.innerHTML = '';
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
  var data, productSearch, menuItems, products, menuHtml;
  return regeneratorRuntime.async(function init$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchData());

        case 2:
          data = _context2.sent;

          if (data) {
            productSearch = function productSearch() {
              var searchTerm = document.getElementById('p-searchInput').value.toLowerCase();
              sortedProduct = products.filter(function (product) {
                return Object.values(product).some(function (value) {
                  return value.toString().toLowerCase().includes(searchTerm);
                });
              });
              currentPage = 1;
              displayProducts(sortedProduct, currentPage);
            };

            menuItems = data.menuItems;
            products = data.products; // Render menu items

            menuHtml = generateMenuHTML(menuItems);
            $menuContainer.html(menuHtml); // sidebar collapse functionality

            document.getElementById("sidebarCollapse").addEventListener("click", function () {
              document.getElementById("sidebar").classList.toggle("collapsed");
              document.querySelector(".cls-sidebarCollapse").classList.toggle("cls-collapsed");
            }); // active class toggling and submenu showing

            $(".cls-components .menu-item").on("click", function (e) {
              $(".menu-item.active").removeClass("active");
              $(this).addClass("active");
              $(this).hasClass("has-submenu") && $(this).siblings(".submenu").toggleClass("show");
            }); //  sidebar switching

            document.querySelector('.sidebar-type[data-type="horizontal"]').onclick = function () {
              return document.querySelector('.cls-wrapper').classList.add('horizontal');
            };

            document.querySelector('.sidebar-type[data-type="vertical"]').onclick = function () {
              return document.querySelector('.cls-wrapper').classList.remove('horizontal');
            };

            document.getElementById('p-searchInput').addEventListener('input', productSearch); // Display initial products

            displayProducts(products, currentPage); // Load more products when show more button click

            showMoreButton.addEventListener("click", function () {
              currentPage++;
              displayProducts(products, currentPage);
            });
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
} // Initialize the page


init();