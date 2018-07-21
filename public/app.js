$("#scrapeButton").on("click", function() {
  $.ajax({
      method: "GET",
      url: "/scrape",
  }).done(function(data) {
      console.log(data)
      window.location = "/"
  })
  location.reload();
});

$.getJSON("/articles", function(data) {

  for (var i = 0; i < data.length; i++) {

    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p>");
    $("#articles").append("<h5 data_id= '" + data[i]._id + "'><a href = " + data[i].link + ">" +  data[i].description + "<a/></h5><br>");
  }
});

$(document).on("click", "p", function() {
  console.log("click");
  
  $("#notes").empty();

  

  var thisId = $(this).attr("data-id");


  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

    .then(function(data) {
      console.log(data);

      var noteFile = `<form>
      <div class="form-group">
      <label = "titleInput"><h2>` + data.title + `</h2></label>
      <input type="text" class="form-control" id="titleInput" placeholder="Title">
      </div>
      <div class="form-group">
      <textarea class="form-control" id="commentInputArea" placeholder ="Write Comments Here" rows="3"></textarea>
      </div>
      </form>
      <button type="button" data-id="` + data._id + `" id = "savenote" class="btn btn-primary">Save Note</button>
      <button type="button" id = "closeNote" class="btn btn-danger">Close</button>`

      $('#notes').append(noteFile);

      if (data.note) {

        $("#titleInput").val(data.note.title);

        $("#commentInputArea").val(data.note.body);
      }
    });
});


$(document).on("click", "#savenote", function() {

  var thisId = $(this).attr("data-id");


  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {

      title: $("#titleInput").val(),

      body: $("#commentInputArea").val()
    }
  })

    .then(function(data) {

      console.log(data);

      $("#notes").empty();
    });


  $("#titleInput").val("");
  $("#commentInputArea").val("");
});

$(document).on("click", "#closeNote", function(){
  $("#notes").empty();
});