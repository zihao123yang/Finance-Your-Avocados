		var money = 1000;
		var house_price = 1044303;
		var cache = {timestamp : 0, value : -1};

		function money_avo(money){
			var avo_perkg = 12.95;
			var kg = money/avo_perkg;
			var no_avos = Math.floor(kg/0.17);

			return no_avos;
		}

		function money_house(money){
			house_percent = (money*100)/1044303;
			house_percent = house_percent.toFixed(1);

			return house_percent;
		}

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


		function money_bitcoin(amountToBeConverted, display) {

				var bitcoinValue;

				console.log("1");
				$.ajax({
					url:'/bitcoin',
					type: 'GET',
					success: function (data, textstatus) {
					console.log("2");
						var bitcoinInfo = JSON.parse(body);
						console.log("JSON: " + body);
						console.log("bitcoinInfo: " + bitcoinInfo);
						var roundedBitCoinValue = Math.round(bitcoinInfo[0].value);

						console.log("from server: " + roundedBitCoinValue);
						//bitcoinValue = roundedBitCoinValue;
						bitcoinValue = roundedBitCoinValue;
						var numBitcoins = amountToBeConverted/bitcoinValue;
						display(numBitcoins);
					}
				});



		}

	function display(numBitcoins) {
		jQuery( "#bitcoinInput" ).text(numBitcoins);
		console.log("displaying correctly ")
	}


	function getInput() {
		console.log("get input test");
		var money_in = jQuery("#moneyIn").val();
		var userResults = conversion(money_in);
		getBitCoinInfo(money_in);
		console.log(money_in);
		return userResults;
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
					var bitcoinInfo = data;
					console.log("bitcoinInfo: " + bitcoinInfo);
					var roundedBitCoinValue = Math.round(bitcoinInfo[0].value);

					console.log("from server: " + roundedBitCoinValue);
					//bitcoinValue = roundedBitCoinValue;
					bitcoinValue = roundedBitCoinValue;
					var numBitcoins = amountToBeConverted/bitcoinValue;
					display(numBitcoins);
			});

	}

	function bitcoinRequest() {
		var httpRequest;
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert('Giving up ?? Cannot create an XMLHTTP instance');
			return false;
		}
		httpRequest.onreadystatechange = display;
		httpRequest.open('GET', 'https://nzbcx.com/api/market/BTCNZD/LTP');
		httpRequest.send();
	}

	var userResults = ["stuff", "12341"]
	var div = jQuery( "div" )[ 0 ];
	jQuery( "#userInput" ).text(userResults[0]);
	jQuery( "#avocadoInput" ).text(userResults[1]);
