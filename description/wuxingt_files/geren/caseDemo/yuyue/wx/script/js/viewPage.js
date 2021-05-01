  var shopTotal = $(".shopping-total")
    var state = $(".shoppingMain").attr("data-state")
    var fullpay = false; //默认全选
    window.onload=singleRecord();
    function edit() {
        var checksg = $(".lump-info .pro-selected").length;
        var checktt = $(".lump-info .proRadius").length;
        var checkdt = $(".lump-info .delRadius").length

        if (checksg < checktt) {
            $("#icon-checkAll").removeClass("icon-check")

        } else if (checksg == checktt) {
            $("#icon-checkAll").addClass("icon-check")

        }
        if (checksg > 0) {
            shopTotal.addClass("lump-selected")
        } else if (checksg == 0) {
            shopTotal.removeClass("lump-selected")
            $("#icon-del-checkAll").removeClass("icon-del-check")
            $("#icon-checkAll").removeClass("icon-check")
        }
        //state2
        if (checksg < checkdt) {
            $("#icon-del-checkAll").removeClass("icon-del-check")
                // shopTotal.removeClass("lump-del-selected")
        } else if (checksg == checkdt) {
            $("#icon-del-checkAll").addClass("icon-del-check")
                // shopTotal.addClass("lump-del-selected")
        }
        if (checksg > 0) {
            shopTotal.addClass("lump-del-selected")
        } else if (checksg == 0) {
            shopTotal.removeClass("lump-del-selected")
        }
    }

//单店商品计数
    function singleRecord(){
        $(".view-lump .viewCount").each(function(){
            var sCount=$(this).parents(".view-lump:eq(0)").find(".view-item").length;
            $("em",this).html(sCount)
        })

    }
    /*edit*/
        //历史商品编辑
    $(".view-wrapper .lump-stateEdit").on("click", function() {
            if ($(this).hasClass("editable")) {
                $(this).addClass("doneable").removeClass("editable").html("完成");
                $(".shoppingMain").attr("data-state", "1") //state2
                    //标题显示
                $(".edit-heading").fadeIn();
                $(".offset-area").css("margin-top","88px");
                $(".offset-area .propd-rt").addClass("in");
                $(".offset-area .proRadius").show();        //可省略
                $(".offset-area").addClass("state-out");    //分页radius显示
                $(".total-state1").show();
                $(".shopping-total").fadeIn();



            } else if ($(this).hasClass("doneable")) {
                $(this).addClass("editable").removeClass("doneable").html("编辑");
                $(".lump-info").find(".delRadius").removeClass("delRadius ").addClass("proRadius");
                $(".shoppingMain").attr("data-state", "0") //state2

                $(".edit-heading").fadeOut();
                $(".offset-area").css("margin-top","42px")
                $(".offset-area  .propd-rt").removeClass("in");
                $(".offset-area  .proRadius").hide();
                $(".offset-area").removeClass("state-out");
                $(".shopping-total").fadeOut();
            }

        })

    //event
$(".view-item .proRadius").each(function() {
    $(this).on("touchstart", function() {
        $(this).toggleClass("pro-selected");
        edit();

    })

})

//总开关
$(".viewName-select #icon-checkAll").on("click", function() {
    $(this).toggleClass("icon-check");
    // $(".lump-info .proRadius").toggleClass("pro-selected")
    if ($(this).hasClass("icon-check")) {
        $(".offset-area .view-item .proRadius").addClass("pro-selected")
        shopTotal.addClass("lump-selected")
    } else {
        $(".offset-area .view-item .proRadius").removeClass("pro-selected")
        shopTotal.removeClass("lump-selected")
    }
})

//删除选中
$(".shopping-operation .delBtn").on("click", function() {
    //length 判断商城商品和店名
    $(".view-item .proRadius").each(function() {
        var $parents = $(this).parents(".view-day").find(".view-item").length;   //单店收藏总商品
        var $select =$(this).parents(".view-day").find(".pro-selected").length;  //单店选中

        if ($(this).hasClass("pro-selected")) {
            // $(this).parent().remove()
            $(this).parent().fadeOut();
            $(this).removeClass("pro-selected");
            // $(this).parents(".goods-take-off,.store-take-off").fadeOut();
            if ($select < $parents) {
                $(this).parent().fadeOut(500).remove()
            } else if ($select=$parents) {
                $(this).parents(".view-lump").fadeOut(500).remove();
            }
        }
        edit();
        window.onload=singleRecord();
        console.info($(".affset-area .view-item").length)
    })
})