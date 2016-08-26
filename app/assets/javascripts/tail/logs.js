$(function () {
  window.scrollTo(0, document.body.scrollHeight);
  $('input#grep').change(function () {
    getGrep(this.value);
  });
});

function getGrep(text) {
  var sign;
  if (location.search == "") sign = "?"; else sign = "&";
  var search = sign + 'query=' + text;
  var query = location.pathname + 'grep' + location.search + search;
  sendRequest(query, true);
}

function sendRequest(url, isGoToBottom) {
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {
      }
    }
  }
  if (!httpRequest) {
    return false;
  }
  httpRequest.open("GET", url);
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState != 4 || httpRequest.status != 200) return;
    document.getElementById('main').innerHTML = httpRequest.responseText;
    if (isGoToBottom) {
        window.scrollTo(0, document.body.scrollHeight);
    }
  };
  httpRequest.send();
  return true;
}
