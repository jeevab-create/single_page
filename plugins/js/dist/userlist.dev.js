"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var USERS_STORAGE_KEY = 'userListData';
var menuItems = [];
var users = [];
var filteredUsers = [];
var currentPage = 1;
var entriesPerPage = 5;
var $menuContainer = $(".cls-components");
var userModal = new bootstrap.Modal(document.getElementById("userModal")); // Fetch data from JSON file

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
          menuItems = data.menuItems;
          users = data.users;
          filteredUsers = _toConsumableArray(users);
          displayMenu();
          displayUsers();
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching data:', _context.t0);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

function displayMenu() {
  var menuHtml = menuItems.map(function (item) {
    return "\n      ".concat(item.heading ? "<span class=\"cls-navheading\">".concat(item.heading, "</span>") : "", "\n      <li>\n        <a href=\"").concat(item.href || "javascript:;", "\" \n           title=\"go to ").concat(item.title, " page\" \n           class=\"menu-item ").concat(item.submenu ? "has-submenu" : "", "\">\n          <i class=\"").concat(item.icon, "\"></i> <span>").concat(item.title, "</span>\n        </a>\n        ").concat(item.submenu ? "<ul class=\"submenu\">\n            ".concat(item.submenu.map(function (sub) {
      return "\n              <li>\n                <a href=\"".concat(sub.href, "\" \n                   title=\"go to ").concat(sub.title, " page\" \n                   class=\"menu-item ").concat(sub.type ? "sidebar-type" : "", "\" \n                   ").concat(sub.type ? "data-type=\"".concat(sub.type, "\"") : "", ">\n                  ").concat(sub.title, "\n                </a>\n              </li>");
    }).join(""), "\n            </ul>") : "", "\n      </li>\n    ");
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

function displayUsers() {
  var startIndex = (currentPage - 1) * entriesPerPage;
  var endIndex = startIndex + entriesPerPage;
  var paginationContent = document.getElementById("showingpage");
  paginationContent.innerHTML = "Showing ".concat(startIndex + 1, " to ").concat(endIndex < filteredUsers.length ? endIndex : filteredUsers.length, " of ").concat(filteredUsers.length, " entries");
  var tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  for (var i = startIndex; i < endIndex && i < filteredUsers.length; i++) {
    var user = filteredUsers[i];
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    var row = "\n      <tr>\n        <td>\n          <div class=\"cls-u-imgAndRole\">\n            <img src=\"./assets/assets-userlist/avatar-".concat(randomNumber, ".jpg\" alt=\"").concat(user.name, "\" class=\"cls-user-avatar me-2\">\n            <div class=\"cls-u-Role\">\n              <span>").concat(user.name, "</span>\n              <span class=\"cls-u-developer\">Android developer</span>\n            </div>\n          </div>\n        </td>\n        <td>").concat(user.position, "</td>\n        <td>").concat(user.office, "</td>\n        <td>").concat(user.age, "</td>\n        <td>").concat(user.startDate, "</td>\n        <td><span class=\"badge ").concat(user.status === "Active" ? "cls-badge-sucess" : "cls-badge-danger", "\">").concat(user.status, "</span></td>\n        <td>\n          <button class=\"btn btn-sm btn-primary edit-btn\" data-id=\"").concat(user.id, "\">Edit</button>\n          <button class=\"btn btn-sm btn-danger delete-btn\" data-id=\"").concat(user.id, "\">Delete</button>\n        </td>\n      </tr>\n    ");
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
  var range = 2;
  var startPage = Math.max(1, currentPage - 1);
  var endPage = Math.min(totalPages, startPage + range - 1);

  if (endPage - startPage + 1 < range && startPage > 1) {
    startPage = endPage - range + 1;
  }

  if (currentPage > 1) {
    paginationHTML += "\n      <button class=\"btn btn-sm btn-outline-secondary mx-1\" data-page=\"".concat(currentPage - 1, "\">\n        <i class=\"fa-solid fa-angle-left\"></i>\n      </button>");
  }

  for (var i = startPage; i <= endPage; i++) {
    paginationHTML += "\n      <button class=\"btn btn-sm mx-1 ".concat(currentPage === i ? 'btn-secondary' : 'btn-outline-secondary', "\"\n              data-page=\"").concat(i, "\">\n        ").concat(i, "\n      </button>");
  }

  if (endPage < totalPages) {
    paginationHTML += "\n      <button class=\"btn btn-sm btn-outline-secondary mx-1\" data-page=\"".concat(currentPage + 1, "\">\n        <i class=\"fa-solid fa-angle-right\"></i>\n      </button>");
  }

  paginationElement.innerHTML = paginationHTML;
  document.querySelectorAll("#pagination button").forEach(function (button) {
    button.addEventListener("click", function () {
      var page = parseInt(this.getAttribute("data-page"));
      currentPage = page;
      displayUsers();
    });
  });
}

function searchUsers() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  filteredUsers = users.filter(function (user) {
    return Object.values(user).some(function (value) {
      return value.toString().toLowerCase().includes(searchTerm);
    });
  });
  currentPage = 1;
  displayUsers();
}

function addEventListeners() {
  document.querySelectorAll(".edit-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      return editUser(e.target.dataset.id);
    });
  });
  document.querySelectorAll(".delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      return deleteUser(e.target.dataset.id);
    });
  });
}

function editUser(id) {
  var user = users.find(function (u) {
    return u.id == id;
  });

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
}

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter(function (u) {
      return u.id != id;
    });
    filteredUsers = filteredUsers.filter(function (u) {
      return u.id != id;
    });
    saveUsersToLocalStorage();
    displayUsers();
  }
}

function saveUser() {
  var userId = document.getElementById("userId").value;
  var user = {
    id: userId ? parseInt(userId) : Date.now(),
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    office: document.getElementById("office").value,
    age: parseInt(document.getElementById("age").value),
    startDate: document.getElementById("startDate").value,
    status: document.getElementById("status").value
  };

  if (userId) {
    var index = users.findIndex(function (u) {
      return u.id == userId;
    });
    users[index] = user;
  } else {
    users.push(user);
  }

  saveUsersToLocalStorage();
  filteredUsers = _toConsumableArray(users);
  displayUsers();
  userModal.hide();
  document.getElementById("userForm").reset();
} // Save users to local storage


function saveUsersToLocalStorage() {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
} // search


document.getElementById("searchInput").addEventListener("input", searchUsers);
document.getElementById("entriesPerPage").addEventListener("change", function (e) {
  entriesPerPage = parseInt(e.target.value);
  currentPage = 1;
  displayUsers();
});
document.getElementById("addUserBtn").addEventListener("click", function () {
  document.getElementById("userId").value = "";
  document.getElementById("userForm").reset();
  userModal.show();
});
document.getElementById("saveUserBtn").addEventListener("click", saveUser);
fetchData();