//flexBoxHeight
(function($) {
    var flexBoxWrap = $(".bespred")
    var winH = $(window).height();

    flexBoxWrap.height(winH);
})(jQuery)

$(function() {


    //right-directory

   //if ($("body").attr("data-rt") != "" && $("body").hasClass("rtnav")) {
   //     //rdnav();
   //     //$("#rt-sider").on("click", function() {
   //     //    $(this).toggleClass("hub-btn-show");
   //     //    $(this).parent().toggleClass("aside_more")
   //     //
   //     //})
   //     var sl = '<div id="scrollTop"><img src="../script/images/icon-gray/scrollTop.png"></div>'
   //     var h = $(".rtnav");
   //     h.append(sl);
   // }


    /*scroll*/
    var d = document;
    var scrollTimer;
    window.onscroll = function() {

        if (jQuery(d).scrollTop() >= 100) {
            $('#scrollTop').stop().animate({
                opacity: 1
            }, 300);
        } else {
            $('#scrollTop').stop().animate({
                opacity: 0
            }, 300);
        }


        /*category*/
        if ($('body').find('.fixNav')) {
            fixNav();
            return false;
        }

        function fixNav() {

            var old = $(".fixNav");
            if (old.length) {
                var oldPn = $(".fixNav").parent().offset().top;
            }
            if (jQuery(d).scrollTop() >= oldPn) {
                $(".fixNav").addClass("fix-statu")
            } else if (jQuery(d).scrollTop() < oldPn) {
                $(".fixNav").removeClass("fix-statu")
            }
        }

    }

    $("#scrollTop").on("click",function() {
        $("html,body").animate({
            scrollTop: 0
        }, 400);

    })



/*    //collect
    if ($("body").find(".heart_collect")) {
        heartfill();
    }*/

    // procontent
    /*    $(".heart_collect").on('click', function() {
                $(".icon-heart").toggleClass("icon-heart-down");
                if ($(".icon-heart").hasClass("icon-heart-down")) {
                    $(this).find("span").css("color", "#ffae00")
                } else {
                    $(this).find("span").css("color", "inherit")
                }
            })*/

    //swipe banner

    // $('.banners-container').each(function() {
    //     $(this).swiper({
    //         slidesPerView: 'auto',
    //         offsetPxBefore: 5,
    //         offsetPxAfter: -300,
    //     })
    // })


    function idan(o) {
        $(".hub-order-list").each(function() {
            $(this).swiper({
                slidesPerView: 'auto',
                offsetPxBefore: 5,
                offsetPxAfter: 15,
            })
        })
    }

    if ($(".hubCenter").attr('data-idan') == 1) {
        idan();
    }

    var hor = $(".swiper-container .swiper-slide")
    hor.on("click", function() {
        $(this).addClass("swiper-current").siblings().removeClass("swiper-current")

    })


    //data-swipe
    var r = $(".wei-banner").attr("data-swipe")
    if (1 == r) {
        $("body").append("<script>" + '    var mySwiper=new Swiper(".wei-banner",{direction:"vertical",lazyLoading:!0,mousewheelControl:!0,watchSlidesProgress:!0,onInit:function(a){a.myactive=0},onProgress:function(a){for(var c=0;c<a.slides.length;c++){var b=a.slides[c],d=b.progress,e;e=d*a.height*.8;scale=1-Math.min(Math.abs(.2*d),1);boxShadowOpacity=0;b.style.boxShadow="0px 0px 10px rgba(0,0,0,"+boxShadowOpacity+")";c==a.myactive?(es=b.style,es.webkitTransform=es.MsTransform=es.msTransform=es.MozTransform=es.OTransform=es.transform="translate3d(0,"+e+"px,0) scale("+scale+")",es.zIndex=0):(es=b.style,es.webkitTransform=es.MsTransform=es.msTransform=es.MozTransform=es.OTransform=es.transform="",es.zIndex=1)}},onTransitionEnd:function(a,c){for(var b=0;b<a.slides.length;b++);a.myactive=a.activeIndex},onSetTransition:function(a,c){for(var b=0;b<a.slides.length;b++)es=a.slides[b].style,es.webkitTransitionDuration=es.MsTransitionDuration=es.msTransitionDuration=es.MozTransitionDuration=es.OTransitionDuration=es.transitionDuration=c+"ms"}});' + "</script>")
            // $.getScript("../js/customize.js")
    } else if (0 == r) {
        $("body").append("<script>" + 'var swiper=new Swiper(".wei-banner",{pagination:".pagination",paginationClickable:true,spaceBetween:0,centeredSlides:true,autoplay:2500,autoplayDisableOnInteraction:false});' + "</script>")
    }



    //     //载入
    // function firstload() {
    //     var wp = $(".cjBox");
    //     wp.addClass("slideLeft");
    //     wp.on('webkitAnimationEnd', function() {
    //         wp.off('webkitAnimationEnd')
    //     })
    // }
    // //
    // function footerCome() {
    //     var c = $(".nav-footer");
    //     c.addClass("footerCome");
    //     c.on('webkitAnimationEnd', function() {
    //         c.removeClass("footerCome")
    //         c.off("webkitAnimationEnd")
    //     })
    // }


    // window.onload = function() {
    //     footerCome();
    //     firstload()
    // }


})

/*
 * common
 */


function scrollTop(){
    var sl = '<div id="scrollTop"><img src="../script/images/icon-gray/scrollTop.png"></div>'
    var h = $("body");
    h.append(sl);

    $("#scrollTop").click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 400);
    })
}

//collect

//interval
function interval() {
    var it = '<div id="interval-part"><img src="../script/images/yuyuemall/logo_03.png" alt=""><div>中国创新支付集团 技术支持</div></div>';
    // var it = '<div id="interval-part"><img src="../script/images/yuyuemall/logo_02.png" alt=""><div></div>';
    var area = $(".interval-area");
    var $sa = $(".scroll-area")
    if ($("body").find(".scrollMain")) {
        $("main").append(it)
    } else {
        $("main").after(it)
    }

}
if ($('body').hasClass("interval-area")) {
    interval();
}




//share
function sharelog() {
    $("#share").show()
}

function closeshare() {
    $("#share").hide();
}
