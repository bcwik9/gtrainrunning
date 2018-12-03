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
    mta_url = 'http://www.mta.info/status/subway/' + train_line
    status_message = "MTA says everything is running smoothly."
    title = "Good Service"
    // need ability to request site data without being on the site
    any_origin_sites = ['https://allow-any-origin.appspot.com/', 'https://allorigins.me/get?url=', 'https://api.allorigins.ml/get?url=']
    any_origin_url = any_origin_sites[0] + encodeURIComponent(mta_url) + '&callback=?'
    $.getJSON(any_origin_url, function(data){
        html_data = $(data.contents)
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
    });
  }

  init()
}
