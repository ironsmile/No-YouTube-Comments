comments_shown = false;
show_responses = false;

chrome.extension.sendRequest({give: "vid_responses"}, function(response) {
    show_responses = response;
    hide_comments(response);
});

function hide(e) {
  e.old_style = e.style.display;
  e.style.display = "none";
}

function show(e) {
  e.style.display = (e.old_style) ? e.old_style : "";
}

function what_to_hide(vid_responses) {
    
    var to_hide = [];
    
    var c = document.getElementById("watch-comment-panel");

    if(!c){ // the new interface
        
        if(vid_responses == "true"){ // make sure the video responses are shown
        
            c = document.getElementsByClassName("comments-section");
            for(var i=0; i<c.length; i++){ // so we want to leave the Response button
            
                if( !c[i].innerHTML.match(/<h4>\s*Video Responses\s*<\/h4>/) ){
                    to_hide[to_hide.length] = c[i];
                }
            }
            
            to_hide[to_hide.length] = document.getElementById("comments-post"); // post comment button
            to_hide[to_hide.length] = document.getElementById("comments-actions"); // ... uh... stuff
            to_hide[to_hide.length] = document.getElementById("comments-loading"); // stuff 2
            
        } else { // hide everything
        
            to_hide[to_hide.length] = document.getElementById("watch-discussion");
        }   

    } else { // old youtube. Don't know if anyone still sees it but am keeping it just to be sure
        to_hide[to_hide.length] = c;
    }
    
    return to_hide;
    
}

function hide_comments(vid_responses){
  var to_hide = what_to_hide(vid_responses);
  for (var i=0; i<to_hide.length; i++) {
    hide(to_hide[i]);
  }
}

function show_comments(vid_responses){
  var to_show = what_to_hide(vid_responses);
  for (var i=0; i<to_show.length; i++) {
    show(to_show[i]);
  }
}

function toggle_comments() {
  console.log("toggle message received");
  
  if (comments_shown) {
    hide_comments(show_responses);
  } else {
    show_comments(show_responses);
  }
  
  comments_shown = !comments_shown;
}
