$(document).ready(function() {
  var token = localStorage.getItem("token");
  var getUsers;

  $("#selectAlertBox").hide();

  $.ajax({
    url: "http://mess-api.herokuapp.com/api/v1/user/getUsers",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      console.log(data);
      getUsers = data.data;
      //localStorage.setItem("userList", JSON.stringify(getUsers));

      var btnDelete =
        "<button type='button' id='deleteButton' class='btn btn-danger'><i class='fas fa-trash'></i></button>";

      var table = $("#myTable").DataTable({
        data: getUsers,
        columnDefs: [
          {
            targets: -1,
            defaultContent: btnDelete
          },
          { visible: false, targets: [0] }
        ],
        columns: [
          { data: "_id" },
          { data: "username" },
          { data: "email" },
          { data: "phone" },
          { data: null }
        ]
      });
      $("#myTable tbody").on("click", "#deleteButton", function() {
        var data = table.row($(this).parents("tr")).data();

        $("#delete").modal("show");
        $("#memberId").text(data._id);
      });
    },
    error: function(e) {
      console.log(e);
      $("#selectAlertBox").show();
      $("#selectAlert").text(e.responseJSON.message);
    }
  });
});
