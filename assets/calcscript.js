//todo: fix diluent, take nicotine away from  total

var sliding = false;
var counter = 1;
var limit = 7;

$("#calc-ratio").mousedown(function(){
	sliding = true;
	ratio();
});

$("#calc-ratio").mouseup(function(){
	sliding = false;
});

$("#calc-button").click(function(){
	getResults();
});

$("#calc-addflavour").click(function(){
	addInput();
});

function addInput(){
	if (counter == limit){
		$("#calc-warn").html("Thanks for adding so many cool flavours, but 7 is the limit!");
	}	

	else{
		counter++;
		$("#calc-flavour-div").append('<p class="calc-flavour">Flavour '+counter+'</p> <input id="calc-flavour-'+counter+'" min="0" max="100" type="number" placeholder="0%"></input>');
		$("#calc-r-flavour-div").append('<label class="calc-r-label" for="calc-r-flavour">Flavour '+counter+':</label> <p><span id="calc-r-flavour-'+counter+'">0</span> ml</p> <p>Drops: <span id="calc-r-flavour-'+counter+'-drops">0</span></p>')
	}
}

function ratio(){
	if (!sliding) {return;}
	var r = $("#calc-ratio").val();
    var v = 100 - r;
	$("#calc-pg-percentage").html(r);
    $("#calc-vg-percentage").html(v);

    if (sliding) {
    	setInterval(ratio, 100);
    }
}

function getResults(){
	var total = $("#calc-amount").val();
	var rawPG = $("#calc-ratio").val();
	var rawVG = 100 - rawPG;
	var rawNic = [$("#calc-nic-strength").val(),$("#calc-nic-base").val(),$("#calc-desired-strength").val()];
	var rawDiluent = $("#calc-diluent").val();

	var nic = 0;

	if(rawNic[0].length > 0 || rawNic[2].length > 0){
		nic = nicCalc(rawNic[0], total, rawNic[2]);
	}

	var flav = [];

	for(var i = 1; i <= counter; i++){
		var p = $("#calc-flavour-"+i).val()

		if (p == false){
			flav.push(0)
		}else{
			d = total / 100;
			p *= d
			flav.push(p);
		}
	}

	var flavTotal = 0;

	for (var i = 1; i <= counter; i++){
		flavTotal += flav[i-1];
	}

	var diluent = 0;

	if(isNaN(rawDiluent) == false){
		diluent = dCalc(rawDiluent, total);
	}

	var pg = pgCalc(rawPG, total);
	var vg = vgCalc(rawVG, total);

	if(diluent > 0){
		vg -= (diluent/2);
		pg -= (diluent/2);
	}

	var nicbase = $("#calc-nic-base").val();
	if( nicbase == "nic-pg"){
		pg -= nic;
	}

	if(nicbase == "nic-vg"){
		vg -= nic;
	}

	pg -= flavTotal;
	pg = +pg.toFixed(1);
	vg = +vg.toFixed(1);

	showResults(pg,vg,nic,flav,diluent);
}

function showResults(pgr, vgr, nicr, flavr, diluentr){
	$("#calc-pg-values").css("color", "#444444")
	$("#calc-vg-values").css("color", "#444444")

	if (pgr < 0){
		alert("Cannot use negative numbers (highlighted red), please recalculate. Try adding more PG or changing your nicotine base.")
		$("#calc-pg-values").css("color", "red")
	}

	if (vgr < 0){
		alert("Cannot use negative numbers (highlighted red), please recalculate. Try adding more VG or changing your nicotine base.")
		$("#calc-vg-values").css("color", "red")
	}

	$("#calc-r-pg").html(pgr);
	$("#calc-r-vg").html(vgr);
	$("#calc-r-nicotine").html(nicr);

	for (var i = 1; i <= counter; i++){
		$("#calc-r-flavour-"+i).html(flavr[i-1]);
	}

	$("#calc-r-diluent").html(diluentr);
    $("#calc-r-pg-drops").html(drops(pgr));
	$("#calc-r-vg-drops").html(drops(vgr));
	$("#calc-r-nicotine-drops").html(drops(nicr));

	for (var i = 1; i <= counter; i++){
		$("#calc-r-flavour-"+i+"-drops").html(drops(flavr[i-1]));
	}

	$("#calc-r-diluent-drops").html(drops(diluentr));
}

function drops(i){
    var d = i * 20;
    d = +d.toFixed(1);
    return d;
}

function pgCalc(p, t){
	var d = p / 100;
	d = d * t;
	d = +d.toFixed(1);
	return d;
}

function vgCalc(p, t){
	var d = p / 100;
	d = d * t;
	d = +d.toFixed(1);
	return d;
}

function nicCalc(str, total, dstr){
	var volume = 100 / str;
	var nicotine = ((dstr * volume) / 100) * total;
	nicotine = +nicotine.toFixed(1);
	return nicotine;
}

function dCalc(p, t){
	var d = p / 100;
	d = d * t;
	d = +d.toFixed(1);
	return d;
}