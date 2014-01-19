//2014-1-19
//connect: 915546302@163.com
function qrcode_make(){
  var divimage = document.getElementById("divimage");
  document.getElementById("qrcode").remove();
  var qrcode1=document.createElement('div');
  qrcode1.setAttribute('id','qrcode');
  divimage.appendChild(qrcode1);
  var textv = document.getElementById("divinput").value;
  new QRCode(document.getElementById("qrcode"), {
          text: textv,
          width: 170,
          height: 170,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
  });
}
var Generator = {
  request : function(){

    chrome.tabs.getSelected(null,function(tab){
        var title=document.getElementById("title");
        var h3=document.createElement("h3");
        h3.innerHTML="二维码maker";
        title.appendChild(h3);

        var inputtext=document.getElementById("divinput");   
        inputtext.value=tab.url;
        new QRCode(document.getElementById("qrcode"), {
          text: tab.url,
          width: 170,
          height: 170,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        });
    });
        
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Generator.request();
  document.querySelector('#makebutton').addEventListener('click',function(){
    qrcode_make();
  });
});
