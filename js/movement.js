// var avocadoMeterInner = document.getElementsByClassName('avocadoMeterInner');
// var avocadoMeterSize = 0;
//
// function myFunction() {
// setInterval(function() {
//   if(avocadoMeterSize <= 100) {
//       avocadoMeterInner.styles.width = avocadoMeterSize + '%';
//       avocadoMeterSize+=20;
//   }
// }, 100)
// }

var avocadoContainer;
document.addEventListener('DOMContentLoaded', function(){

  avocadoContainer = document.querySelector('.avocado');
  bitCoinContainer = document.querySelector('.bitCoin');
  houseContainer = document.querySelector('.house');
  updateMarketValue(50, avocadoContainer);
  updateMarketValue(60, bitCoinContainer);
  updateMarketValue(80, houseContainer);


});

function updateMarketValue(percentage, container) {
  var meter = container.querySelector('.meter');
  var img =container.querySelector('.img');
    meter.style.width = percentage + '%' ;
    img.style.left = 'calc(' + percentage + '% - 20px)';

}
