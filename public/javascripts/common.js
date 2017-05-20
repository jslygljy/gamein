/**
 * 显示“处理中”效果
 */
function showLoading(){
  jQuery(".mask_div").show();
  jQuery("#loading").show();
}

/**
 * 关闭“处理中”效果
 */
function closeLoading(){
  jQuery(".mask_div").hide();
  jQuery("#loading").hide();
}

$(document).ready(function(){
  $("#cash_way1").click(function(){
    $(".zhifubao_div").hide();
    $(".zhifubao_div input").removeAttr("checked");
    $(".tab_banks").show();
    $("#cash_way2").removeClass("choose");
    $(this).addClass("choose");
  });
  $("#cash_way2").click(function(){
    $(".tab_banks").hide();
    $(".zhifubao_div").show();
    $(".zhifubao_div input").prop("checked","checked");
    $("#cash_way1").removeClass("choose");
    $(this).addClass("choose");
  });
  $("#more_li").click(function(){
    $(".all_banks").css("overflow-y","scroll");
    $('.all_banks').animate({scrollTop:108},500);
    $(".more_li").css("display","none");
  });
});
/*         js模拟selcet              */

$(window).load(function(){
	$(".select_box").click(function(event){
	event.stopPropagation();
	$(this).find(".option").toggle();
	$(this).parent().siblings().find(".option").hide();
	});
	$(document).click(function(event){
	var eo=$(event.target);
	if($(".select_box").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length)
	$('.option').hide();
});
/*赋值给文本框*/
$(".option a").click(function(){
var value=$(this).text();
$(this).parent().siblings(".select_txt").html(value);
page_way();
});


/*               我的账户角色效果             */
  $(".account_rolelist .rsp").hide();
  
  $(".account_rolelist").hover(function(){
    $(this).find(".rsp").stop().fadeTo(500,0.5)
    $(this).find(".text").stop().animate({left:'0'}, {duration: 500})
  },function(){
    $(this).find(".rsp").stop().fadeTo(500,0)
    $(this).find(".text").stop().animate({left:'100'}, {duration: "fast"})
    $(this).find(".text").animate({left:'-100'}, {duration: 0})
  });
});


 /*            选项卡             */
function zvTab(){
  var timeoutid;
  $(".tab ul li").each(function(index){
    $(this).mouseover(function(){
      var t = $(this);
      timeoutid = setTimeout(function(){
        $(".tab ul li.current").removeClass("current");
        t.addClass("current");
        $(".tab div.current").removeClass("current");
        $(".tab .num_div").eq(index).addClass("current");
      },300);
    }).mouseout(function(){
      clearTimeout(timeoutid);
    });
  });
};

 /*          check和radio的美化           */
var d = document;
var safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
var gebtn = function(parEl,child) { return parEl.getElementsByTagName(child); };
onload = function() {
    
    var body = gebtn(d,'body')[0];
    body.className = body.className && body.className != '' ? body.className + ' has-js' : 'has-js';
    
    if (!d.getElementById || !d.createTextNode) return;
    var ls = gebtn(d,'label');
    for (var i = 0; i < ls.length; i++) {
        var l = ls[i];
        if (l.className.indexOf('label_') == -1) continue;
        var inp = gebtn(l,'input')[0];
        if (l.className == 'label_check') {
            l.className = (safari && inp.checked == true || inp.checked) ? 'label_check c_on' : 'label_check c_off';
            l.onclick = check_it;
        };
        if (l.className == 'label_radio') {
            l.className = (safari && inp.checked == true || inp.checked) ? 'label_radio r_on' : 'label_radio r_off';
            l.onclick = turn_radio;
        };
    };
};

var check_it = function() {
    var inp = gebtn(this,'input')[0];
    if (this.className == 'label_check c_off' || (!safari && inp.checked)) {
        this.className = 'label_check c_on';
        $(this).siblings('label').attr('class','label_check c_off');
        if (safari) inp.click();
    } else {
        this.className = 'label_check c_off';
        if (safari) inp.click();
    };
};
var turn_radio = function() {
    $("#all_banks").find("label").removeClass("r_on");

    var inp = gebtn(this,'input')[0];
    if (this.className == 'label_radio r_off' || inp.checked) {
       this.className = 'label_radio r_on';
       
        if (safari) inp.click();
    } else {
        this.className = 'label_radio r_off';
        if (safari) inp.click();
    };
};

$.fn.iVaryVal=function(iSet,CallBack){
  /*
   * Minus:点击元素--减小
   * Add:点击元素--增加
   * Input:表单元素
   * Min:表单的最小值，非负整数
   * Max:表单的最大值，正整数
   */
  iSet=$.extend({Minus:$('.J_minus'),Add:$('.J_add'),Input:$('.J_input'),Min:0,Max:20},iSet);
  var C=null,O=null;
  //插件返回值
  var $CB={};
  //增加
  iSet.Add.each(function(i){
    $(this).click(function(){
      O=parseInt(iSet.Input.eq(i).val());
      (O+1<=iSet.Max) || (iSet.Max==null) ? iSet.Input.eq(i).val(O+1) : iSet.Input.eq(i).val(iSet.Max);
      //输出当前改变后的值
      $CB.val=iSet.Input.eq(i).val();
      $CB.index=i;
      //回调函数
      if (typeof CallBack == 'function') {
                CallBack($CB.val,$CB.index);
            }
    });
  });
  //减少
  iSet.Minus.each(function(i){
    $(this).click(function(){
      O=parseInt(iSet.Input.eq(i).val());
      O-1<iSet.Min ? iSet.Input.eq(i).val(iSet.Min) : iSet.Input.eq(i).val(O-1);
      $CB.val=iSet.Input.eq(i).val();
      $CB.index=i;
      //回调函数
      if (typeof CallBack == 'function') {
        CallBack($CB.val,$CB.index);
        }
    });
  });
  //手动
  iSet.Input.bind({
    'click':function(){
      O=parseInt($(this).val());
      $(this).select();
    },
    'keyup':function(e){
      if($(this).val()!=''){
        C=parseInt($(this).val());
        //非负整数判断
        if(/^[1-9]\d*|0$/.test(C)){
          $(this).val(C);
          O=C;
        }else{
          $(this).val(O);
        }
      }
      //键盘控制：上右--加，下左--减
      if(e.keyCode==38 || e.keyCode==39){
        iSet.Add.eq(iSet.Input.index(this)).click();
      }
      if(e.keyCode==37 || e.keyCode==40){
        iSet.Minus.eq(iSet.Input.index(this)).click();
      }
      //输出当前改变后的值
      $CB.val=$(this).val();
      $CB.index=iSet.Input.index(this);
      //回调函数
      if (typeof CallBack == 'function') {
                CallBack($CB.val,$CB.index);
            }
    },
    'blur':function(){
      $(this).trigger('keyup');
      if($(this).val()==''){
        $(this).val(O);
      }
      //判断输入值是否超出最大最小值
      if(iSet.Max){
        if(O>iSet.Max){
          $(this).val(iSet.Max);
        }
      }
      if(O<iSet.Min){
        $(this).val(iSet.Min);
      }
      //输出当前改变后的值
      $CB.val=$(this).val();
      $CB.index=iSet.Input.index(this);
      //回调函数
      if (typeof CallBack == 'function') {
                CallBack($CB.val,$CB.index);
            }
    }
  });
}
//调用