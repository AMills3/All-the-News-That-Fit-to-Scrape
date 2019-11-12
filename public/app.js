$(document).on("click", "submit", function() {
    
    $.getJSON("/scrape", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      }
    });
  });

// On click event
$(document).on("click", "p", function() {
    $("#notes").empty();
    let thisId = $(this).attr("data-id");

// Making the Ajax call
$.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

// Adding note info
.then(function(data) {
console.log(data);
    $("#notes").append("<h1>" + data.title + "</h1>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

// Adding more info to the note
if (data.note) {
    $("#titleinput").val(data.note.title);
    $("#bodyinput").val(data.note.body);
        }
    });
});

// On click event for the article
$(document).on("click", "#savenote", function() {
    let thisId = $(this).attr("data-id");
  
// How to change the note
$.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
    title: $("#titleinput").val(),
    body: $("#bodyinput").val()
      }
    })
// Emptying the note section
.then(function(data) {
    $("#notes").empty();
    });
  
// Entering data for the note
    $("#titleinput").val("");
    $("#bodyinput").val("");
});