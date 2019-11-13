$(document).on("click", "submit", function() {
    
    $.getJSON("/scrape", function(data) {
      for (var i = 0; i < data.length; i++) {
        $("#theArticle").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      }
    });
  });

// On click event
$(document).on("click", "p", function() {
    $("#theNote").empty();
    let thisId = $(this).attr("data-id");

// Making the Ajax call
$.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

// Adding note info
.then(function(data) {
console.log(data);
    $("#theNote").append("<h1>" + data.title + "</h1>");
    $("#theNote").append("<input id='titletext' name='title' >");
    $("#theNote").append("<textarea id='bodytext' name='body'></textarea>");
    $("#theNote").append("<button data-id='" + data._id + "' id='notesave'>Save Note</button>");

// Adding more info to the note
if (data.note) {
    $("#titletext").val(data.note.title);
    $("#bodytext").val(data.note.body);
        }
    });
});

// On click event for the article
$(document).on("click", "#notesave", function() {
    let thisId = $(this).attr("data-id");
  
// How to change the note
$.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
    title: $("#titletext").val(),
    body: $("#bodytext").val()
      }
    })
// Emptying the note section
.then(function(data) {
    $("#theNote").empty();
    });
  
// Entering data for the note
    $("#titletext").val("");
    $("#bodytext").val("");
});