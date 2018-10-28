//if 'start' is true - scripts will work
var start = true;

//Starting script when find second adress page and check what its work only once
secondPageCheck();
function secondPageCheck(){
    if (getCookie("AuctionSecondPage") === "true"){
        console.log("Cookie is found");
        acceptBid();
        setCookie("AuctionSecondPage", "false");
    }
}
//MVP Menu
var el = document.createElement('div');
var domString =
    '<div class="container" id="janeMVP">' +
    '<span class="title">JaneLiquidation</span>' +
    '<input type="checkbox" class="checkboxJane" checked="checked" id="onoff"/>On/Off</br>' +
    '<input id="minuteTimer" type="number" placeholder="minutes to bid"/>' +
    '<input id="bid" type="number" placeholder="your bid"/>' +
    '<button id="start">Start</button>' +
    '<button id="remove">remove cookie</button></div>';
el.innerHTML =  domString;
document.body.appendChild(el.firstChild);
//Remove cookie
$('#remove').click(function(){
    document.cookie = "AuctionSecondPage=;"
});
//STEPS WILL NOT WORK WHEN BET HIGHER THAN 1k
var bid = $("#bid").val();
//Start bot
$('#start').click(function(){
    botStart();
});
//Check menu events
$('#onoff').click(function(){
   if(start === false){
       start = true;
       console.log("JaneLiquidation is turn ON");
   }
   else{
       start = false;
       console.log("JaneLiquidation is turn OFF");
   }
});

//Check which pages is open
function botStart(){
    if(start === true){
        var minutesTimer =$("#minuteTimer").val();
        console.log(minutesTimer);
        var firstPage = $("#auctionData.col-sm-6").length;
        var secondPage = $("#selectShippingAddressType").length;
        if(firstPage === 1){
            console.log ("auction page is found");
            //Timer
            var lotTime = minutesTimer * 60 * 1000;
            var timeYet = lotTime;
            var timer = new Timer(1000);
            timer.bind(lotTime, function () {
                setCookie("AuctionSecondPage", "true");
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
            console.log ("address page is found");
        }
        else{
            console.log("it is not a lot page for JaneLiquidation")
        }
    }
    else{
        console.log("JaneLiquidation is turn off")
    }
}
//functions for find current bid
function bidPage() {
    //var parentDOM = document.getElementById("auctionData").getElementsByClassName('auctionview_upper')[1].innerText;
    //var price = Number(parentDOM.slice(13,16)) + step;
    var price = bid;
    console.log(price);
    binding(price);
}
//for bid more and going to next page
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
    setTimeout(bidAfterDelay, 6000);
    function bidAfterDelay(){
        $(".btn-warning").click()
    }
}

// SetCookie
function setCookie(cname, prop) {
    document.cookie = cname + "=" + prop + ";";
}

// GetCookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
