//if 'start' is true - scripts will work
var start = false;

//step for next bids
//STEPS WILL NOT WORK WHEN BET HIGHER THAN 1k
var step = 10;

//Check which pages is open
if(start === true){
    var firstPage = $("#auctionData.col-sm-6").length;
    var secondPage = $("#selectShippingAddressType").length;
    if(firstPage === 1){
        console.log ("auction page is found");
        bidPage(step);
    }
    else if (secondPage === 1){
        console.log ("adress page is found");
        acceptBid();
    }
    else{
        console.log("it is not lot page for JaneLiquidation")
    }
}
else{
    console.log("JaneLiquidation is turn off")
}
//functions for find current bid, bid more and going to next page
function bidPage() {
    var parentDOM = document.getElementById("auctionData").getElementsByClassName('auctionview_upper')[1].innerText;
    var price = Number(parentDOM.slice(13,16)) + step;
    console.log(price);
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
    })
}
//function for pick adress and bid
function acceptBid() {
    $(".panel-default input").first().delay( 2000 ).click();
    $(".btn-warning").delay( 2000 ).click()
}



//
// var el = document.createElement('div');
// var domString =
//     '<div class="container" id="Anton" style="position: fixed;top: 70px;right: 0;height: 500px;width: 130px;background: #ffffff; border: solid 1px #efefef;">' +
//     '<input/></div>';
// el.innerHTML =  domString;
// document.body.appendChild(el.firstChild);