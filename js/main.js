//if 'start' is true - scripts will work
var start = false;
//MVP Menu
var el = document.createElement('div');
var domString =
    '<div class="container" style="position: fixed;top: 70px;right: 0;height: 500px;width: 130px;background: #ffffff; border: solid 1px #efefef;">' +
    '<input/><button id="Anton">On/Off</button></div>';
el.innerHTML =  domString;
document.body.appendChild(el.firstChild);
//Check menu events
$('#Anton').click(function(){
   if(start === false){
       start = true;
       console.log("JaneLiquidation is turn ON");
   }
   else{
       start = false;
       console.log("JaneLiquidation is turn OFF");
   }
});

//'Timer for bid in minutes
var minutesTimer = 1/3;
//STEPS WILL NOT WORK WHEN BET HIGHER THAN 1k
var bid = 0;

//Check which pages is open
if(start === true){
    var firstPage = $("#auctionData.col-sm-6").length;
    var secondPage = $("#selectShippingAddressType").length;
    if(firstPage === 1){
        console.log ("auction page is found");
        //Timer
        var lotTime = minutesTimer * 60 * 1000;
        var timeYet = lotTime;
        var timer = new Timer(1000);
        timer.bind(lotTime, function () {
            bidPage(bid);
        });
        timer.start();
        var timerCheck =  new Timer(1000);
        timerCheck.bind(3000, function(){
            timeYet = timeYet - 3000;
            if(timeYet >= 0){
                console.log(timeYet/1000 + " seconds")
            }
            else{
                console.log('done');
                timerCheck.stop();
                timer.stop();
            }
        });
        timerCheck.start();
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
    //var parentDOM = document.getElementById("auctionData").getElementsByClassName('auctionview_upper')[1].innerText;
    //var price = Number(parentDOM.slice(13,16)) + step;
    var price = bid;
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
//function for pick address and bid
function acceptBid() {
    var addressRadio = $(".panel-default input")[1];
    addressRadio.click();
    setTimeout(bidAfterDelay, 30000);
    function bidAfterDelay(){
        $(".btn-warning").click()
    }
}

