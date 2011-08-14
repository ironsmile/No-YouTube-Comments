
function restore_options(){
  document.getElementById("vid_responses").checked = localStorage["vid_responses"];
}

function save_options(){
  var vr = document.getElementById("vid_responses");
  localStorage["vid_responses"] = vr.checked;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}
