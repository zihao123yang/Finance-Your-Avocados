
var house_price = 1044303;
var cache = {timestamp : 0, value : -1};

function money_avo(money){
	var avo_perkg = 12.95;
	var kg = money/avo_perkg;
	var no_avos = Math.floor(kg/0.17);

	return no_avos;
}

function money_house(){
	var regex = /searchbar=(.+)&/;
	var url = window.location.href;
	var amount = parseInt(url.match(regex)[1]);
	house_percent = (amount*100)/1044303;
	house_percent = house_percent.toFixed(1);
	return (house_percent);
}

<!--display bar value functions-->
function money_house_bar(){
	var regex = /searchbar=(.+)&/;
	var url = window.location.href;
	var amount = parseInt(url.match(regex)[1]);
	house_percent = (amount*100)/1044303;
	house_percent = house_percent.toFixed(1);
	if (house_percent > 100) {
		house_percent = 100;
	}
	return (house_percent);
}

function bitcoin_bar(bit_amount){
	bit_amount = bit_amount * 100
	if (bit_amount > 100) {
		bit_amount = 100;
		console.log(bit_amount, "bit amount bar 100")
	}
	console.log(bit_amount, "bit amount bar < 100")
	return bit_amount;
}
<!--end bar value functions-->


function avo_money(no_avos){
	money = (no_avos*0.17)*12.95;
	money = Math.round(money);

	return money;
}


function house_money(house_percent){

	money = (house_percent/100)*house_price;
	return Math.round(money);
}

function money_input(){
	var money = 1000;
	no_avos = money_avo(money);
	house_percent = money_house(money);

	return [no_avos, house_percent];
}

function avo_input(){
	var no_avos = 100000;
	money = avo_money(no_avos);
	house_percent = money_house(money);

	return [money,house_percent];
}

function house_input(){

	var house_percent = 30;
	money = house_money(house_percent);
	no_avos = money_avo(money);

	return [money, no_avos];
}

console.log(house_input());

function conversion() {
	var httpRequest;
	httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	httpRequest.onreadystatechange = display;
	httpRequest.open('GET', 'https://nzbcx.com/api/market/BTCNZD/LTP');
	httpRequest.send();
}

function display(numBitcoins) {
	$( "#bitcoin" ).text(numBitcoins + " Bitcoins" );
	console.log("bitcoins displaying correctly ")
}

function displayAvo(noAvo) {
	$( "#avo" ).text(noAvo + " Avocados" );
	console.log("avocados displaying correctly ")
}

function displayHouse(house) {
	$( "#house" ).text(house + "% of a house" );
	console.log("house displaying correctly ")
}

function displayAmount(useramount) {
	$( "#useramount" ).text("With $" + useramount + " you can buy..." );
	console.log("user amount displaying correctly ")
}

function getInput() {
	var regex = /searchbar=(.+)&/;
	var url = window.location.href;
	var amount = parseInt(url.match(regex)[1]);

	console.log("getinput done");
	console.log(amount, "getInput amount")
	displayAmount(amount)
	getBitCoinInfo(amount)
	var no_avo = money_avo(amount)
	displayAvo(no_avo)
	var house = money_house(amount)
	displayHouse(house)
}

function conversion(money_in) {
	var convertedAvo = money_avo(money_in);
	var convertedHouse = money_house(money_in);
	var results = [money_in, convertedAvo, convertedHouse];
	return results;
}

function getBitCoinInfo(amountToBeConverted) {

		var bitcoinValue;
		jQuery.getJSON('/bitcoin', function (data) {
				console.log("JSON: " + data);
				var roundedBitCoinValue = data;

				console.log("from server: " + roundedBitCoinValue);
				//bitcoinValue = roundedBitCoinValue;
				bitcoinValue = parseInt(roundedBitCoinValue);
				var numBitcoins = (amountToBeConverted/bitcoinValue);
				console.log(typeof(amountToBeConverted))
				console.log(bitcoinValue)
				display(numBitcoins.toPrecision(5));
				bitcoin_bar(numBitcoins.toPrecision(5));
		});

}

$(document).ready(function(){
	getInput();
});
