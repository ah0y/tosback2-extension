
$(document).ready(function () {
  console.log('loaded');
  var test = "";
  var url =
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      test = test + tabs[0].url
      return tabs[0].url
    });
  $.ajax(url).done(function () {
    var px = test.split(/^(?:http(?:s)?:\/\/)?(?:www.)?/)[1]
    console.log(px)
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/tasks",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "body": "test",
        "Cache-Control": "no-cache",
        "Postman-Token": "bb724e1b-2b11-45b4-a27e-5441875aa9d6"
      },
      "data": {
        "name": px
      }
    }
    $.ajax(settings).done(function (response) {
      console.log(response)
      var add = response.commit 
      document.getElementById('here').href = document.getElementById('here').href + add
      // document.getElementsByClassName("response")[0].innerText = response.commit
      document.getElementsByClassName("modified")[0].innerText = response.filename
      console.log(add)
    })
  })
}
)

function goToCommit(){
  window.open(
    document.getElementById('here').href,
    '_blank' // <- This is what makes it open in a new window.
  );
}

$('#here').click(function(){ goToCommit(); return false; });

