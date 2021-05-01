$(function(){
    $(document).on("click", ".payamount li a", function(e) {
        e.preventDefault();
        var $this = $(this);
        if (!$this.parent().hasClass("active")) {
            $this.parent().addClass("current").siblings(".current").removeClass("current");
        }
        return false;
})

//样式切换
//
//
/*   $(function(){
        var $li=$("#skin li")
        $li.click(function(){
            switchSkin(this.id)
        })
        var cookie_skin=$.cookie("cssSkin");
        if(cookie_skin){
            switchSkin(cookie_skin);
        }
})
    function switchSkin(skinName){
        $("#"+skinName).addClass("selected");
        $("#cssfile").attr("href","../css/"+skinName+".css");
        $.cookie("cssSkin",skinName,{path:'/',expires:10});
    }*/



    //皮肤切换
    $("#skin_0").click(function(){
        $('.footer h3 img').attr("src","../images/mycard/explain_icon.png")
        $('#cardfrond-paybtn').attr("src","../images/mycard/click.png")
        $("#cardback-paybtn").attr("src","../images/mycard/clickf.png")
        $(".UnbindSuccess img").attr("src","../images/mycard/unbs.png")
    });

    $("#skin_1").click(function(){
        $('.footer h3 img').attr("src","../images/blue/explain_blue_icon.png")
        $("#cardfrond-paybtn").attr("src","../images/blue/click_blue.png")
        $("#cardback-paybtn").attr("src","../images/blue/clickf_blue.png")
        $(".UnbindSuccess img").attr("src","../images/blue/unbs_blue_01.png")        
    })
    $("#skin_2").click(function(){
        $('.footer h3 img').attr("src","../images/green/explain_green_icon.png")
        $("#cardfrond-paybtn").attr("src","../images/green/click_green.png")
        $("#cardback-paybtn").attr("src","../images/green/clickf_green.png")
        $(".UnbindSuccess img").attr("src","../images/green/unbs_green_01.png")
    })    

})

//有数值，下一步按钮高亮
var formBox = (function(my){
    //sele-选择器  nextbtn- 显示底部按钮  $num 多少个input
    my.notnull = function(sele,nextbtn,closecont){
        var $sele=sele ,$btnshow = nextbtn;
        var clearhtml = '<em class="clear-icon general-iconfont">&#xe65c;</em>';
        closecont==null||""?closecont = clearhtml:"";
        var $num = $sele.length;
        var myArr = [];
        myArr.length = $num;
        for(var fi = 0;fi<$num;fi++){
            myArr[fi] = "";
        }
        $sele.each(function(index){
            $(this).children("input").on('input propertychange',function(){
                myArr[index] = $(this).val();

                for(var x in myArr){
                    //var xval = myArr[x]
                }
                if (myArr[x] !== "") {
                    $btnshow.css("opacity", "1");
                } else {
                    $btnshow.css("opacity", ".6");
                }

                if($(this).val() !== ""){
                    $(this).nextAll("em").show();
                }else{
                    $(this).nextAll("em").hide();
                }
            })
        })

        //添加close
        $sele.append(closecont);
    }
    //清除input
    my.clear = function(sele,event){
        var $sele = sele;
        $sele.on(event,function(){
            $(this).prevAll("input").val("");
            $("#next_step").css("opacity", ".6");
            $(this).hide();
        })
    }
    return my;
})(formBox || {})

//字符串验证
 String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
}
