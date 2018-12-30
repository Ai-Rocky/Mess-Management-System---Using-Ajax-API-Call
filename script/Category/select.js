$(document).ready(function() {
  $("#selectAlertBox").hide();

  var token = localStorage.getItem("token");
  var getCategory;

  $.ajax({
    url: "http://mess-api.herokuapp.com/api/v1/user/category/getCategory",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      console.log(data);
      getCategory = data.data;
      //localStorage.setItem("categoryList", JSON.stringify(getCategory));

      var btnEdit =
        "<button type='button' id='editButton' class='btn btn-warning'><i class='far fa-edit'></i></button>";
      var btnDelete =
        "<button type='button' id='deleteButton' class='btn btn-danger'><i class='fas fa-trash'></i></button>";
      var btnGroup =
        "<div class='btn-group' role='group'>" + btnEdit + btnDelete + "</div>";

      var table = $("#myTable").DataTable({
        data: getCategory,
        columnDefs: [
          {
            targets: -1,
            defaultContent: btnGroup
          },
          {
            targets: 1,
            render: function(data, type, row, meta) {
              if (row.isMeal == 1) {
                return "<span class='text-primary'>" + data + "</span>";
              } else {
                return data;
              }
            }
          },
          { visible: false, targets: [0] }
        ],
        columns: [{ data: "_id" }, { data: "name" }, { data: null }]
      });

      $("#myTable tbody").on("click", "#editButton", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#editCategory input[name='name']").val(data.name);
        $("#edit").modal("show");
        $("#catId").text(data._id);
      });

      $("#myTable tbody").on("click", "#deleteButton", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#delete").modal("show");
        $("#catId").text(data._id);
      });
    },
    error: function(e) {
      console.log(e);
      $("#selectAlertBox").show();
      $("#selectAlert").text(e.responseJSON.message);
    }
  });
});
