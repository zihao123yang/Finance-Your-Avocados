  const path = require('path')
  const request = require('request')
  const express = require('express')
  const app = express()

  var cache={timestamp: 0, value: -1};


  app.use(express.static(path.resolve('./')));

  app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
  });

  app.get('/result', function (req, res) {
    res.sendFile(path.resolve('./results.html'));
    });

    app.get('/bitcoin', function(req, res){
      var timeStamp = Date.now();
      console.log("time difference: " + ((timeStamp - cache.timestamp)/1000));
      if (((timeStamp - cache.timestamp)/1000)> 60) {
        request('https://nzbcx.com/api/market/BTCNZD/LTP', function (error, response, body) {

          var bitcoinInfo = JSON.parse(body);
          var roundedBitCoinValue = Math.round(bitcoinInfo[0].value);

          var time = Date.now();
          cache = {timestamp : time, value: roundedBitCoinValue};
          console.log("from server");
          res.send(JSON.stringify(roundedBitCoinValue));
       });
      } else {
        console.log("from cache: " + cache.value);
        var bitcoinValue = cache.value;
        res.send(JSON.stringify(bitcoinValue));
    }
    });



  app.use(logErrors);

  app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
  });

  function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
  }
