/*
 * instaFeed v0.5
 * https://https://github.com/gabriel-castro
 */

var myWebsite = "";//ur website url without "https://"
// https://example.com -> urWebsite = "example.com";
var numberOfFotos = 6; //number of fotos you want download

function getInstaFeed(acc){
    function makeHttpObject() {
      try {return new XMLHttpRequest();}
      catch (error) {}
      try {return new ActiveXObject("Msxml2.XMLHTTP");}
      catch (error) {}
      try {return new ActiveXObject("Microsoft.XMLHTTP");}
      catch (error) {}
      throw new Error("Could not create HTTP request object.");
    }
    var request = makeHttpObject();
    request.open("GET", "https://www.instagram.com/"+acc+"/", true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.readyState == 4)
      var str = request.responseText;
      var index1 = 1;
      var cont = 0;
      while((index1!=-1) & cont<numberOfFotos){
        if(str===undefined) break;
        index1 = str.indexOf('"shortcode":"');
        if(index1==-1 ) break;
        cont++;
        var foto = str.substring(index1+13,index1+13+11);
        buildInstaFeedHTML(foto, cont);
        str = str.slice(index1+25);
      }
    };
}

function buildInstaFeedHTML(foto, cont){
  str='<iframe class="instagram-media instagram-media-rendered" id="instagram-embed-'+cont+'"\
    src="https://www.instagram.com/p/'+foto+'/embed/?cr=1&amp;v=12&amp;wp=540&amp;rd=http%3A%2F%2F"+myWebsite+"%3A3000&amp;rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A913.7850000115577%2C%22ls%22%3A667.4449999991339%2C%22le%22%3A670.0450000062119%7D"\
     allowtransparency="true" allowfullscreen="true" frameborder="0" height="746" data-instgrm-payload-id="instagram-media-payload-'+cont+'" scrolling="no"\
      style="background: white; max-width: 540px; width: calc(100% - 2px); border-radius: 3px; border: 1px solid rgb(219, 219, 219); box-shadow: none;\
        display: inline; margin: 0px 0px 12px; min-width: 326px; padding: 0px;"></iframe>'
  document.getElementById('html_instafeed').innerHTML += str;
}
