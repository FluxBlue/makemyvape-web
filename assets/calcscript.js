$('input[type="range"]').rangeslider();

var counter = 1;
var limit = 5;

$(document).ready(function(){
	var r = $("#calc-ratio").attr(value);
    var v = 100 - r;
	$("#calc-pg-percentage").text('30');
    $("#calc-vg-percentage").html(v);
});

function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of " + counter + " flavours");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}