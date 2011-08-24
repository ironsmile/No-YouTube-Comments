
options = ["vid_responses", "show_button"];

function restore_options(){
  for (var i = 0; i < options.length; i++) {
    document.getElementById(options[i]).checked = localStorage[options[i]] == "true";
  }
}

function save_options(){
  
  for (var i = 0; i < options.length; i++) {
    localStorage[options[i]] = document.getElementById(options[i]).checked;
  }

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}
