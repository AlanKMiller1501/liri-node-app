console.log('this is loaded');


var searchOMDB = function(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + fb8ec145;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      createRow(response);
    });
  };