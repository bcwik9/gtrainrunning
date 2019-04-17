ShowHide = function(target_id) {
  target = $("#" + target_id)
  if(target.css("display") == "none"){
    target.css("display", "")
  } else {
    target.css("display", "none")
  }
}