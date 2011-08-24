
comments_shown = false;
show_responses = false;
show_comments_button = false;

/**
 *
 *  Main:
 *
 */

chrome.extension.sendRequest({give: "vid_responses"}, function(response) {
    show_responses = response;
    hide_comments(response);
});

chrome.extension.sendRequest({give: "show_button"}, function(response) {
    if (response == "true") {
        document.getElementById('watch-actions').innerHTML += ' \
        <button id="comments-toggle" class="yt-uix-button yt-uix-tooltip">Comments</button>';
        
        document.getElementById('comments-toggle').onclick = function (e) {
            toggle_comments();
        }
    }
});


/**
 *
 *  Functions:
 *
 */


function hide(e) {
  e.old_style = e.style.display;
  e.style.display = "none";
}

function show(e) {
  e.style.display = (e.old_style) ? e.old_style : "";
}

function what_to_hide(vid_responses) {
    
    var to_hide = [];
    
    var really_old = document.getElementById("watch-comment-panel");
    var cosmic = document.getElementById('watch-comments');
    
    if(really_old){ // REALLY REALLY old youtube. Noone should see it.
        
        to_hide[to_hide.length] = really_old;

    } else if (cosmic) { // Cosmic panda youtube
      
      to_hide = select_to_hide(
            vid_responses,
            ["comments-loading"],
            'watch-comments'
        );
        
    } else { // Current youtube
        
        to_hide = select_to_hide(
            vid_responses,
            ["comments-post", "comments-actions", "comments-loading"],
            'watch-discussion'
        );
        
    }
    
    return to_hide;
    
}

function select_to_hide (vid_responses, what_if_responses, what_if_no_responses) {
    
    var to_hide = [];

    if(vid_responses == "true"){ // make sure the video responses are shown
    
        var c = document.getElementsByClassName("comments-section");
        for(var i=0; i<c.length; i++){ // so we want to leave the Response button
        
            if( !c[i].innerHTML.match(/<h4>\s*Video Responses\s*<\/h4>/) ){
                to_hide[to_hide.length] = c[i];
            }
        }
        
        for (var i=0; i < what_if_responses.length; i++) {
            to_hide[to_hide.length] = document.getElementById(what_if_responses[i]);
        }
        
    } else { // hide everything
    
        to_hide[to_hide.length] = document.getElementById(what_if_no_responses);
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
  
  if (comments_shown) {
    hide_comments(show_responses);
  } else {
    show_comments(show_responses);
  }
  
  comments_shown = !comments_shown;
}
