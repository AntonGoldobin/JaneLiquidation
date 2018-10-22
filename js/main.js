'use strict';

var script=document.createElement('script');
script.type='text/javascript';
script.src=chrome.extension.getURL("main.js");

function click(e) {
    chrome.tabs.executeScript(null,
        {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
    window.close();
}
document.addEventListener('DOMContentLoaded', function () {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', click);
    }
});
console.log("scripts");

function partA() {
    var parentDOM = document.getElementById("auctionData").getElementsByClassName('auctionview_upper')[1].innerText;
    var price = Number(parentDOM.slice(13,16)) + step;
    binding(price);
}
function binding(price) {
    document.getElementById('bidAmount').value = price;
    setTimeout(function() {
        document.getElementsByClassName("standardAuctionUpdate")[0].click();
    }, 1000);
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() { document.getElementsByClassName("btn-warning")[0].click();
        });
    })}



//
// var el = document.createElement('div');
// var domString =
//     '<div class="container" id="Anton" style="position: fixed;top: 70px;right: 0;height: 500px;width: 130px;background: #ffffff; border: solid 1px #efefef;">' +
//     '<input/></div>';
// el.innerHTML =  domString;
// document.body.appendChild(el.firstChild);