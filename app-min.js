function getBitCoinInfo(e,t){var n;jQuery.get("/bitcoin",function(o,s){var i=JSON.parse(body);console.log("JSON: "+body),console.log("bitcoinInfo: "+i);var p=Math.round(i[0].value);console.log("from server: "+p),n=p,t(e/n)})}const path=require("path"),request=require("request"),express=require("express"),app=express();app.use(express.static(path.join(__dirname,"/static/css"))),app.get("/",function(e,t){t.sendFile(path.resolve("./templates/index.html"))}),app.get("/bitcoin",function(e,t){request("https://nzbcx.com/api/market/BTCNZD/LTP",function(e,n,o){t.send(o)})}),app.listen(3e3,function(){console.log("Example app listening on port 3000!")});