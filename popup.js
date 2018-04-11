
$(document).ready(function () {
  console.log('loaded');
  var tabHost = "";
  var tab =
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      tabHost = tabHost + tabs[0].url
      return tabs[0].url
    });
  $.ajax(tab).done(function () {
    var activeTab = tabHost.split(/^(?:http(?:s)?:\/\/)?(?:www.)?/)[1].split('/')[0]
    console.log(activeTab)
    var request = {
      "async": true,
      "crossDomain": true,
      "url": "https://a6700be0.ngrok.io/tasks",
      "method": "POST",
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "body": "test",
        "Cache-Control": "no-cache",
        "Postman-Token": "bb724e1b-2b11-45b4-a27e-5441875aa9d6"
      },
      "data": {
        "name": activeTab
      }
    }
    $.ajax(request).done(function (response) {
      console.log(response)
      var resource = response.commit 
      document.getElementById('here').href = document.getElementById('here').href + resource
      // document.getElementsByClassName("response")[0].innerText = response.commit
      document.getElementsByClassName("modified")[0].innerText = response.commitDate
      console.log(resource)
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

