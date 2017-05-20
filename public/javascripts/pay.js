$(document).ready(function(){
  var balance = 90;
  var order_price = $("#order_price").text();

  if(parseInt(balance) > 0){
    if(parseInt(balance) >= parseInt(order_price)){
      $("#balance").attr("type","radio");
      $("#balance_label").attr("class","label_radio");
    }
  }else{
    $("#balance_label").hide();
  };
});




