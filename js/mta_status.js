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
    any_origin_sites = ['https://cors.io/?', 'https://api.allorigins.ml/get?url=', 'https://allorigins.me/get?url=']
    // any_origin_url = any_origin_sites[0] + encodeURIComponent(mta_url) + '&callback=?' // use if encoding required
    any_origin_url = any_origin_sites[0] + mta_url
    $.getJSON(any_origin_url, function(data){
        console.log(data)
        html_data = $(data.contents)
        console.log(html_data)
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
        console.log(title)
        $(".wsize2 h3").text(title)
        $(".wsize2 p").html(status_message)
    });
  }

  init()
}
