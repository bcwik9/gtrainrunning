MtaStatus = function(train_line) {
  var generate_msg_for_element = function(element) {
    msg = ""
    $.each(element[0].childNodes, function(i,v){
      //console.log("child " + i + ": " + v)
      cur = $(v)
      msg = msg + generate_msg_for_element(cur)
    })
    if(msg == ""){
      msg = element[0].textContent
        if(element[0].localName == "img"){ 
        msg = "[" + element[0].alt.split(" ")[0] + "]"
      } else if(element[0].localName == "br"){ 
        msg = "<br>"
      }
    }
    //console.log(element)
    //console.log(msg)
    return msg
  }

  var init = function() {
    mta_url = '/mta_data?subway=' + train_line
    status_message = "MTA says everything is running smoothly."
    title = "Good Service"
    $.ajax({
      url: mta_url,
      type: 'GET',
      success: function(data){
        html_data = $(data)
        train_status = html_data.find("#status_display")
        if(train_status.children().length){
          title = train_status.children()[0].textContent
          raw_text_status_message = $.trim(generate_msg_for_element(train_status))
          $.each(train_status.find("img"), function(index,img){
            img_text = img.alt.split(" ")[0] || "ADA"
            $(img).replaceWith("<span>[" + img_text + "]</span>")
          })
          status_message = train_status
        }
        $(".wsize2 h3").text(title)
        $(".wsize2 p").html(status_message)
      }
    })
  }

  init()
}
