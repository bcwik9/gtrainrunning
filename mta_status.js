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
        msg = "\n"
      }
    }
    //console.log(element)
    //console.log(msg)
    return msg
  }

  var init = function() {
    mta_url = 'http://alert.mta.info/status/subway/' + train_line
    status_message = "MTA says everything is running smoothly."
    title = "Good Service"
    // need ability to request site data without being on the site
    any_origin_url = 'https://allorigins.me/get?url=' + encodeURIComponent(mta_url) + '&callback=?'
    $.getJSON(any_origin_url, function(data){
        html_data = $(data.contents)
        train_status = html_data.find("#status_display")
        if(train_status.children().length){
          title = train_status.children()[0].textContent
          status_message = $.trim(generate_msg_for_element(train_status))
        }
        status_data = {title: title, message: status_message}
        console.log(status_data)
    });
  }

  init()
}