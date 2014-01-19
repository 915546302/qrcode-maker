//2014-1-19
//connect: 915546302@163.com
var draw_qrcode = function(text, typeNumber, errorCorrectLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectLevel) );
};

var create_qrcode = function(text, typeNumber, errorCorrectLevel, table) {

  var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
  qr.addData(text);
  qr.make();
  return qr.createImgTag();
};
var update_qrcode = function(t) {
  var text = t.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
  return create_qrcode(text);
};
var update_qrcode_no = function() {
  var text = document.getElementById("divinput").value.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
  return create_qrcode(text);

};
var Generator = {
  request : function(){
    var settime=(new Date).getTime()-2*3600*1000;
    chrome.history.search({text:'',startTime:settime},
      function(historyItems){
        var title=document.getElementById("title");
        var h3=document.createElement("h3");
        h3.innerHTML="二维码maker";
        title.appendChild(h3);

        var inputtext=document.getElementById("divinput");   
        inputtext.value=historyItems[0].url;        

        var divimage = document.getElementById("divimage");
        var div=document.createElement('div');
        div.setAttribute('id','imgsrc');
        div.innerHTML=update_qrcode(historyItems[0].url);
        divimage.appendChild(div);
      }
    );
  },
  makebutton:  function(){
    var imgsrc= document.getElementById("imgsrc");
    var divimage = document.getElementById("divimage");
    divimage.removeChild(imgsrc);
    var div=document.createElement('div');
    div.setAttribute('id','imgsrc');
    div.innerHTML=update_qrcode_no();
    divimage.appendChild(div);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  Generator.request();
});
document.addEventListener('click',function(){
  Generator.makebutton();
});