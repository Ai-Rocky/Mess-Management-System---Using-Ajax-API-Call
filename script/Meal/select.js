$(document).ready(function() {
  $("#selectAlertBox").hide();

  var token = localStorage.getItem("token");
  var getMeals;
  var total;

  $.ajax({
    url: "http://mess-api.herokuapp.com/api/v1/user/meal/totalMealInMonth",
    type: "get",
    dataType: "json",
    headers: { "x-auth-token": JSON.parse(token) },
    success: function(data) {
      console.log(data.data.data);
      getMeals = data.data.data;
      total = data.data.meals;

      var btnEdit =
        "<button type='button' id='editButton' class='btn btn-warning'><i class='far fa-edit'></i></button>";
      var btnDelete =
        "<button type='button' id='deleteButton' class='btn btn-danger'><i class='fas fa-trash'></i></button>";
      var btnGroup =
        "<div class='btn-group' role='group'>" + btnEdit + btnDelete + "</div>";

      var table = $("#mealTable").DataTable({
        data: getMeals,
        columnDefs: [
          {
            targets: -1,
            defaultContent: btnGroup
          },
          {
            targets: 3,
            render: function(data, type, row, meta) {
              return dateFuntion(data);
            }
          },
          { visible: false, targets: [0] }
        ],
        columns: [
          { data: "_id" },
          { data: "username" },
          { data: "numberOfMeal" },
          { data: "date" },
          { data: null }
        ]
      });

      $("#totalMeal").html(
        "Total Meal - <span class='text-success'>" + total + " </span>Ta"
      );

      $("#mealTable tbody").on("click", "#editButton", function() {
        var data = table.row($(this).parents("tr")).data();

        $(".memberList").val(data.userId);
        $("#editMeal input[name='numberOfMeal']").val(data.numberOfMeal);
        $("#editMeal input[name='date']").val(dateFuntion(data.date));

        $("#edit").modal("show");
        $("#mealId").text(data._id);
      });

      $("#mealTable tbody").on("click", "#deleteButton", function() {
        var data = table.row($(this).parents("tr")).data();
        $("#delete").modal("show");
        $("#mealId").text(data._id);
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
