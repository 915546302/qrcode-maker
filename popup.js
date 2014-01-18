// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
// var QUERY = 'puppies';

// var kittenGenerator = {
//   /**
//    * Flickr URL that will give us lots and lots of whatever we're looking for.
//    *
//    * See http://www.flickr.com/services/api/flickr.photos.search.html for
//    * details about the construction of this URL.
//    *
//    * @type {string}
//    * @private
//    */
//   searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
//       'method=flickr.photos.search&' +
//       'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
//       'text=' + encodeURIComponent(QUERY) + '&' +
//       'safe_search=1&' +
//       'content_type=1&' +
//       'sort=interestingness-desc&' +
//       'per_page=20',

//   /**
//    * Sends an XHR GET request to grab photos of lots and lots of kittens. The
//    * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
//    *
//    * @public
//    */
//   requestKittens: function() {
//     var req = new XMLHttpRequest();
//     req.open("GET", this.searchOnFlickr_, true);
//     req.onload = this.showPhotos_.bind(this);
//     req.send(null);
//   },

//   *
//    * Handle the 'onload' event of our kitten XHR request, generated in
//    * 'requestKittens', by generating 'img' elements, and stuffing them into
//    * the document for display.
//    *
//    * @param {ProgressEvent} e The XHR ProgressEvent.
//    * @private
   
//   showPhotos_: function (e) {
//     var kittens = e.target.responseXML.querySelectorAll('photo');
//     for (var i = 0; i < kittens.length; i++) {
//       var img = document.createElement('img');
//       img.src = this.constructKittenURL_(kittens[i]);
//       img.setAttribute('alt', kittens[i].getAttribute('title'));
//       document.body.appendChild(img);
//     }
//   },

//   /**
//    * Given a photo, construct a URL using the method outlined at
//    * http://www.flickr.com/services/api/misc.urlKittenl
//    *
//    * @param {DOMElement} A kitten.
//    * @return {string} The kitten's URL.
//    * @private
//    */
//   constructKittenURL_: function (photo) {
//     return "http://farm" + photo.getAttribute("farm") +
//         ".static.flickr.com/" + photo.getAttribute("server") +
//         "/" + photo.getAttribute("id") +
//         "_" + photo.getAttribute("secret") +
//         "_s.jpg";
//   }
// };

var draw_qrcode = function(text, typeNumber, errorCorrectLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectLevel) );
};

var create_qrcode = function(text, typeNumber, errorCorrectLevel, table) {

  var qr = qrcode(typeNumber || 4, errorCorrectLevel || 'M');
  qr.addData(text);
  qr.make();

//  return qr.createTableTag();
  return qr.createImgTag();
};
var update_qrcode = function(t) {
  var text = t.value.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
  return create_qrcode(text);
};

var kittenGenerator = {
  requestKittens : function(){
    var settime=(new Date).getTime()-2*3600*1000;
    chrome.history.search({text:'',startTime:settime},
      function(historyItems){
        var title=document.getElementById("title");
        var h3=document.createElement('h3');
        h3.innerHTML="二维码maker";
        title.appendChild(h3);

        // var input=document.getElementById("divinput");   
        // input.value=historyItems[0].url;        

        var image = document.getElementById("image");
        image.innerHTML=update_qrcode(historyItems[0].url);
        
      }
    );
  }
}
// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
});
