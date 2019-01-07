$(document).ready(function() {
  var token = localStorage.getItem("token");
  var decodeToken = parseJwt(token);

  if (!token) {
    location.href = "../Auth/index.html";
  }

  $("#title").html("<i class='fas fa-hotel'></i> " + decodeToken.messusername);
  $("#user").text(decodeToken.username);

  if (decodeToken.role == "user") {
    $(".nav")
      .parent()
      .hide();

    $(".nav")
      .parent()
      .siblings()
      .addClass("m-auto");

    var currentPage = location.pathname.match(/[^\/]+$/)[0];
    if (currentPage != "index.html" && currentPage != "profile.html") {
      location.href = "index.html";
    }
  }

  $("#logout").click(function() {
    localStorage.clear();
  });

  getUsers(token);
  getCategories(token);
});

function getUsers(token) {
  $.ajax({
    async: false,
    url: "http://mess-api.herokuapp.com/api/v1/user/getUsers",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      allUsers = data.data;
      console.log(allUsers);

      $.each(allUsers, function(i, v) {
        $(".memberList").append(
          "<option value='" + v._id + "'>" + v.username + "</option>"
        );
      });
    },
    error: function(e) {
      console.log(e);
      alert(e.responseJSON.message);
    }
  });
}

function getCategories(token) {
  $.ajax({
    async: false,
    url: "http://mess-api.herokuapp.com/api/v1/user/category/getCategory",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      allCategories = data.data;

      $.each(allCategories, function(i, v) {
        $(".categoryList").append(
          "<option value='" + v._id + "'>" + v.name + "</option>"
        );
      });
    },
    error: function(e) {
      console.log(e);
      console.log(e.responseJSON.message);
      //alert();
    }
  });
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
