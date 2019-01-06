$(document).ready(function() {
  $("#selectAlertBox").hide();

  var token = localStorage.getItem("token");
  var getSavings;
  var total;

  $.ajax({
    url: "http://mess-api.herokuapp.com/api/v1/user/balance/totalMessBalance",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      console.log(data);
      getSavings = data.data.data;
      total = data.data.total;

      var btnEdit =
        "<button type='button' id='editButton' class='btn btn-warning'><i class='far fa-edit'></i></button>";
      var btnDelete =
        "<button type='button' id='deleteButton' class='btn btn-danger'><i class='fas fa-trash'></i></button>";
      var btnGroup =
        "<div class='btn-group' role='group'>" + btnEdit + btnDelete + "</div>";

      var table = $("#savingsTable").DataTable({
        data: getSavings,
        columnDefs: [
          {
            targets: -1,
            defaultContent: btnGroup
          },
          {
            targets: 4,
            render: function(data, type, row, meta) {
              return dateFuntion(data);
            }
          },
          { visible: false, targets: [0] }
        ],
        columns: [
          { data: "_id" },
          { data: "username" },
          { data: "category" },
          { data: "amount" },
          { data: "date" },
          { data: null }
        ]
      });

      $("#totalSavings").html(
        "Total Savings - <span class='text-success'>" + total + " </span>Taka"
      );

      $("#savingsTable tbody").on("click", "#editButton", function() {
        var data = table.row($(this).parents("tr")).data();

        $(".memberList").val(data.userId);
        $(".categoryList").val(data.categoryId);
        $("#editSavings input[name='amount']").val(data.amount);

        //console.log(date);
        $("#editSavings input[name='date']").val(dateFuntion(data.date));

        $("#edit").modal("show");
        $("#savingsId").text(data._id);
      });

      $("#savingsTable tbody").on("click", "#deleteButton", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#delete").modal("show");
        $("#savingsId").text(data._id);
      });
    },
    error: function(e) {
      console.log(e);
      $("#selectAlertBox").show();
      $("#selectAlert").text(e.responseJSON.message);
    }
  });
});

function dateFuntion(d) {
  var dateTime = new Date(d);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = JSON.stringify(dateTime.getDate()).padStart(2, 0);
  var date = year + "-" + month + "-" + day;
  return date;
}
