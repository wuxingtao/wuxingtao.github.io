var shopTotal = $(".shopping-total")
var state = $(".shoppingMain").attr("data-state")
var fullpay = false; //默认全选
window.load=favorNum();


//默认全不选中
if (fullpay == true) {
    $(".shopping-total").addClass("lump-selected")
    $("#icon-checkAll").addClass("icon-check")
    $(".lump-info").find(".proRadius").addClass("pro-selected")
};


function edit() {
    var checksg = $(".favorite-lists .lump-info .pro-selected").length;
    var checktt = $(".favorite-lists .lump-info .proRadius").length;
    var checksg1 = $(".favorite-store-lists .lump-info .pro-selected").length;
    var checktt1 = $(".favorite-store-lists .lump-info .proRadius").length;
    if (checksg < checktt) {
        $("#icon-checkAll").removeClass("icon-check");
    }else if (checksg == checktt) {
            $("#icon-checkAll").addClass("icon-check");
    }else if (checksg == 0) {
        $("#icon-del-checkAll").removeClass("icon-del-check")
        $("#icon-checkAll").removeClass("icon-check")
        
    }

    if(checksg1 < checktt1){
            $("#state2-icon-checkAll").removeClass("icon-check");
    }else if(checksg1 == checktt1){
            $("#state2-icon-checkAll").addClass("icon-check");
    }else if(checksg1==0){
        shopTotal.removeClass("lump-selected");
        $("#state2-icon-checkAll").removeClass("icon-check");
    }
   
     //
    if (checksg > 0) {
        shopTotal.addClass("lump-selected")
    } 


}

function favorNum(){
    var num=$(".favorite-lists .lump-info").length;
    $(".favorNum").html(num);
    var storeNum=$(".favorite-store-lists .lump-info").length;
    $(".favorStore").html(storeNum);
}


/*edit*/
    //商品编辑
$(".lump-stateEdit").on("click", function() {
        if ($(this).hasClass("editable")) {
            $(this).addClass("doneable").removeClass("editable").html("完成");
            $(".shoppingMain").attr("data-state", "1") //state2
                //标题显示
            $(".switch-wrapper").slideUp();
            $(".edit-heading").fadeIn();
            $(".favorite-lists .lumpBox .propd-rt").addClass("in");
            $(".favorite-lists .lumpBox .proRadius").show();
            $(".favorite-lists").addClass("state-out");    //分页radius显示

            $(".total-state2").hide();
            $(".total-state1").show();
            $(".shopping-total").fadeIn();



        } else if ($(this).hasClass("doneable")) {
            $(this).addClass("editable").removeClass("doneable").html("编辑");
            $(".lump-info").find(".delRadius").removeClass("delRadius ").addClass("proRadius");
            $(".shoppingMain").attr("data-state", "0") //state2

            $(".switch-wrapper").slideDown();
            $(".edit-heading").fadeOut();
            $(".favorite-lists .lumpBox .propd-rt").removeClass("in");
            $(".favorite-lists .lumpBox .proRadius").hide();
            $(".favorite-lists").removeClass("state-out");
            $(".shopping-total").fadeOut();
        }

    })
    //店铺编辑
    $(".lump-store-stateEdit").on("click", function() {
            if ($(this).hasClass("editable")) {
                $(this).addClass("doneable").removeClass("editable").html("完成");
                $(".shoppingMain").attr("data-state", "1") //state2-(编辑+完成状态)未用到
                    //标题显示
                $(".switch-wrapper").slideUp();
                $(".edit-heading").fadeIn();
                $(".favorite-store-lists .lumpBox .propd-rt").addClass("in"); 
                $(".favorite-store-lists .lumpBox .proRadius").show();    //勾选项
                $(".favorite-store-lists").addClass("state-out");    //分页radius显示

                $(".total-state1").hide();
                $(".total-state2").show();
                $(".shopping-total").fadeIn();



            } else if ($(this).hasClass("doneable")) {
                $(this).addClass("editable").removeClass("doneable").html("编辑");
                $(".lump-info").find(".delRadius").removeClass("delRadius ").addClass("proRadius");
                $(".shoppingMain").attr("data-state", "0") //state2

                $(".switch-wrapper").slideDown();
                $(".edit-heading").fadeOut();
                $(".favorite-store-lists .lumpBox .propd-rt").removeClass("in");
                $(".favorite-store-lists .lumpBox .proRadius").hide();
                $(".favorite-store-lists").removeClass("state-out"); 
                $(".shopping-total").fadeOut();
            }

        })

    //event
//$(".lump-info .proRadius").each(function() {
//    $(this).on("click",".favorite-content", function() {
//        $(this).toggleClass("pro-selected");
//        edit();
//
//    })
//
//})

//购物车下架状态.goods-take-off .store-take-off
var offModel = '<div class="content-wrap"><div class="entry-title"><div class="p-condition"></div></div></div>'
var targetG = $(".shopping-confirm-wrapper .lump-info"),
    targetS = $(".shopping-confirm-wrapper .lumpBox")

if (targetG.find(".goods-take-off")) {
    $(".goods-take-off").append(offModel);
}
if (targetS.find(".store-take-off")) {
    $(".store-take-off").append(offModel);
}





//总开关
var controllCommon = (function(my){
    my.check = function(btn,lclass){
        var $lclass = lclass;
        btn.off().on("click", function() {
            $(this).toggleClass("icon-check");
            // $(".lump-info .proRadius").toggleClass("pro-selected")
            if ($(this).hasClass("icon-check")) {
                $lclass.addClass("pro-selected");
                shopTotal.addClass("lump-selected");
            } else {
                $lclass.removeClass("pro-selected");
                shopTotal.removeClass("lump-selected");
            }
        });
    },
    //删除选中  --修改删除按钮
    my.delete = function(btn,lclass){
        btn.off().on("click",".shopping-total", function() {
            //length 判断商城商品和店名
            lclass.each(function() {
                var $parents = $(this).parents(".lumpBox").find(".lump-info").length;   //单店收藏总商品
                var $select =$(this).parents(".lumpBox").find(".pro-selected").length;  //单店选中

                if ($(this).hasClass("pro-selected")) {
                    // $(this).parent().remove()
                    $(this).parent().fadeOut();
                    $(this).removeClass("pro-selected");
                    // $(this).parents(".goods-take-off,.store-take-off").fadeOut();
                    if ($select < $parents) {
                        $(this).parent().fadeOut(500).remove();
                    } else if ($select=$parents) {
                        $(this).parents(".lumpBox").fadeOut(500).remove();
                    }
                }
                edit();
                favorNum()
            })
        })
    }
    return my;
}(controllCommon || {}))

//全选
//var checkbtn1 = $("#icon-checkAll");
//var checkbtn2 = $("#state2-icon-checkAll");
//var checktab1 = $(".favorite-lists .proRadius")
//var checktab2 = $(".favorite-store-lists .proRadius");
//
//controllCommon.check(checkbtn1,checktab1);
//controllCommon.check(checkbtn2,checktab2);

//删除
var delbtn1 = $(".total-state1 .shopping-operation .delBtn");
var delbtn2 = $(".total-state2 .shopping-operation .delBtn");
var deltab1 = $("#fav-lists1 .lump-info .proRadius");
var deltab2 = $("#fav-lists2 .lump-info .proRadius")

controllCommon.delete(delbtn1,deltab1);
controllCommon.delete(delbtn2,deltab2)


//加入购物车
$(".cartBtn").on("click",function(){
    if($(".favorite-content").find(".pro-selected").length!=0){
        var addcart = '<div class="receive-used plt10"><img src="../script/images/member/point/check_layer.png" class="check-true"><span>商品已加入购物车</span><a class="btn btn-white">确定</a><div class="close-btn btn"><img src="../script/images/member/point/check-btn1.png"></div></div>'
    }else{
        var addcart='<div class="receive-used plt10"><img src="../script/images/member/point/check_warning.png" class="check-true"><span>请先选中商品</span><a class="btn btn-white">确定</a><div class="close-btn btn"><img src="../script/images/member/point/check-btn1.png"></div>'
    }

    var tip = layer.open({
        type:1,
        time:3,
        content:addcart,
        style:'width:80%;background-color:rgba(0,0,0,.8);border-radius:6px;',
        success: function() {
            $("body").addClass("model-open");
            $(".close-btn,.btn-white").click(function() {
                layer.close(tip);
                $("body").removeClass("model-open")
            })

        }
    })
})
