define(function (require, exports, module) {
    var $ = require("jquery");
    $(document).ready(function () {
        loadCSS();  //按需加载mobile样式
        if ($("#header").hasClass('fixNav')) {
            var scrollTimer = null;
            $(window).on("scroll", function () {
                if (scrollTimer) clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                    fixNav();
                    return false;
                }, 100)
            })

        }

        //营业执照
        $("body").on("click", "#payZoom", function () {
            $(this).imgZoomIn();
        });


        //notice_new scroll
        var $noticeBox = $("#noticeList");
        $noticeBox.children().find("li").each(function () {
            var li = $(this),
                container = $("<div>");
            li.next().appendTo(container);
            li.prependTo(container);
            container.appendTo(ticker);
        })
        $noticeBox.css("overflow", "hidden");
        var noticetimer = null;
        function animator(currentItem) {
            var distance = currentItem.height();
            duration = 2000 || (distance + parseInt(currentItem.css("marginTop"))) / 0.009;
            currentItem.animate({ marginTop: -distance }, duration, 'linear', function () {
                currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
                noticetimer = setTimeout(function () {
                    animator(currentItem.parent().children(":first"));
                }, duration)
            });
        }

        setTimeout(function () {
            animator($noticeBox.children(":first"));
        }, 2000)
        var enterTimer = null;
        var leaveTimer = null;
        $noticeBox.mouseenter(function () {
            $noticeBox.children().stop();
            if (noticetimer) clearTimeout(noticetimer);
        });
        $noticeBox.mouseleave(function () {
            if (leaveTimer) {
                clearTimeout(leaveTimer);
                animator($noticeBox.children(":first"));
                return false;
            }
            leaveTimer = setTimeout(function () {
                animator($noticeBox.children(":first"));
            }, 500)
        });

        //go to top buttion
        var topDistance = 500;
        var showDistance = 200;
        var goTopBtn = $('<div id="goToTop"><a href="javascript:;"></a></div>');
        var thisTop = $(window).scrollTop() + topDistance;
        $("body").append(goTopBtn);

        // $("#goToTop").css('top', thisTop);
        if ($(window).scrollTop() < topDistance) {
            $("#goToTop").hide();
        }

        $(window).scroll(function () {
            // thisTop = $(this).scrollTop() + topDistance + 100;
            // $('#goToTop').css('top', thisTop);
            if ($(this).scrollTop() > showDistance) {
                $("#goToTop").fadeIn();
            } else {
                $("#goToTop").fadeOut();
            }
        });

        $('#goToTop a').click(function () {
            $('html ,body').animate({ scrollTop: 0 }, 300);
            return false;
        });

    })


    /* 底部图标切换 */
    $(".qwimgSwtich img").hover(function () {
        var nSrc = $(this).attr('data');
        var oSrc = $(this).attr('src');
        $(this).attr('src', nSrc);
        $(this).attr('data', oSrc);
    }, function () {
        var oSrc = $(this).attr('data');
        var nSrc = $(this).attr('src');
        $(this).attr('src', oSrc);
        $(this).attr('data', nSrc);
    });


    /* header 导航 */

    $("#header").find(".has-submenu").on("mouseenter", function () {
        $(this).addClass("active").siblings("dd").removeClass("active");
        $(this).find(".menu-popup").show();
    });

    $("#header").find(".has-submenu").on("mouseleave", function () {
        $(this).removeClass("active");
        $(this).find(".menu-popup").hide();
    })


    function simScrollTo(target, offset) {
        var offset = offset || 105;
        if (!/\/about.html/g.test(window.location.pathname)) {
            window.location.href = "about.html#" + target;
        } else {
            $('html, body').animate({
                scrollTop: $("#" + target).offset().top - offset
            }, 1500);
        }

    }


    function fixNav() {
        var d = document;
        jQuery(d).height() >= window.screen.availHeight * 1.3 && jQuery(d).scrollTop() >= 200 ? $("#header").addClass("topFixed") : $("#header").removeClass("topFixed");
    }

    /* 加载 */
    function loadScript(url, callback, id) {
        var script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) { //IE  
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback) callback();

                }
            };
        }
        else { //Others  
            script.onload = function () {
                if (callback) callback();
            };
        }
        script.src = url;
        if (!id) {
            document.getElementsByTagName("head")[0].appendChild(script);
        } {
            document.getElementById(id).appendChild(script);
        }

    }

    /* mobile load css */
    function loadCSS() {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
            if (/\/index.html|^\/$/ig.test(window.location.pathname)) {
                window.location.href = window.location.origin + "/mindex.html";
                return false;
            }
            $("body").addClass("jl-mobile");
            $("#header").remove();
            $(".jl_ft .qwimgSwtich").remove();
            var head = document.getElementsByTagName('HEAD').item(0);
            var style = document.createElement('link');
            style.href = 'public/css/mobile.css';
            style.rel = 'stylesheet';
            head.appendChild(style);


            setUpMobileNavs();  //mobile siderbar
        } else {
            if (/\/mindex.html/ig.test(window.location.pathname)) {
                window.location.href = window.location.origin + "/index.html";
            }
            $("body").addClass("jl-pc");
            //工商网监电子标识
            loadScript("https://szcert.ebs.org.cn/govicons.js?id=ed0b0b18-1d38-4393-886d-741bc5dda204&amp;width=75&amp;height=105&amp;type=1", null, "gsElec");
            loadScript("//seal.globalsign.com/SiteSeal/gmogs_image_90-35_en_dblue.js", null, "getssl");

        }
    }

    /* mobile navbar */
    function setUpMobileNavs() {
        var $navtoggle = $('<div class="m-nav-menu navbar-toggle"><img src="public/images/total/icon-menu.png"></div>');
        $navtoggle.insertBefore('.jlpPage');
        $(".navbar-toggle").click(function (e) {
            var targetMenu = $(".jl_ft").find("ul.linkMap-box");
            var newMenu = targetMenu.clone();
            var navbarft = '<div class="qr-link"><img src="public/images/banner/cus-page-qr_03.png" alt=""><span>关注嘉联公众号</span></div>';
            newMenu.find(".qr-link").remove();
            //about.html
            newMenu.find("li:first dl").remove();
            newMenu.find("li.jl-recruit").remove();
            newMenu.find("li:first").before('<li><a href="mindex.html" class="link-first">首页</a></li>')
            /*         newMenu.find("li:first a[href='javascript:;']").each(function () {
                        var link = $(this).attr("onClick");
                        if (link) {
                            var currentAboutlink = /\'(.*)\'/.exec(link);
                            $(this).removeAttr("onclick").attr("href", "about.html#" + currentAboutlink[1] + "");
                        }
            
                    }) */
            e.stopPropagation();
            if (!$(this).hasClass('selected-nav')) {
                $(this).addClass('selected-nav');
                if ($('.xt-navbar-mask').length <= 0) {
                    $("body").append('<div class="xt-navbar-mask"></div>');
                }
                newMenu.insertBefore('.jlpPage').wrap('<div class="xt-navbar-menu"><xtnav class="xt-siderbar nav-special"></div>');
                $("xtnav").prepend('<a href="xt-navbar-close animated fadeIn"><div class="close-icon"></div></a>');
                $("xtnav").append(navbarft);
                setTimeout(function () {
                    $(".xt-navbar-menu xtnav").addClass("open");
                    $(".xt-navbar-mask").addClass("on");
                    $("body").addClass("lock-scroll")
                }, 10)
            } else {  //close menu
                $(".xt-navbar-menu xtnav").removeClass("open");
                $('.selected-nav').removeClass('selected-nav');
                setTimeout(function () {
                    $(".xt-navbar-menu").remove();
                    $("body").removeClass("lock-scroll");
                    $('.selected-nav').removeClass('selected-nav');
                }, 300)
            }
        });

        $("body").on("mousedown touchstart", ".xt-navbar-mask, .xt-navbar-close", function (e) {
            $(".xt-navbar-mask").removeClass("on");
            $(".selected-nav").click();
            // setTimeout(function(){
            //     $(".xt-navbar-mask").remove();
            // },10)
        })
        $("body").on("click touchstart", ".xt-siderbar li .link-first", function (e) {
            var $this = $(this);
            var $li = $(this).parent();
            e.preventDefault();
            $li.addClass("expand-second").siblings().removeClass("expand-second");
            if ($li.find("dl").length == 0) {
                window.location.href = $li.find("a:first").attr("href");
            }
        }).on("click touchstart", ".xt-siderbar li:first .link-second", function (e) {
            setTimeout(function () {
                $(".xt-navbar-mask").removeClass("on");
                $(".selected-nav").click();
            }, 100)
        })

    }


    (function ($) {
        /**
         * simble picture view
         */
        $.fn.imgZoomIn = function () {
            return this.each(function () {

                var previewSrc = $(this).attr("data-url") || $(this).attr('src');
                bgBody = '<div id="ImgZoomInBG" style="background:#000000;opacity:0.9;position:fixed;top:0;bottom:0;left:0;right:0;z-index: 1000;"></div>'
                imgStr = '<img id="ImgZoomInImage" src="' + previewSrc + '"  style="cursor:pointer;display:none;position:fixed;top:0;bottom:0;left:0;right:0;width:auto;max-width:60%;margin: auto;z-index:10001;"/>';
                closeBtn = '<div id="imgZoomInClose" style="background:url(public/images/total/close.png) no-repeat center center;position: fixed;width: 40px;height: 40px;right: 10%;top: 50px;z-index: 1000; cursor: pointer;"></div>'
                wrapper = '<div style="position:absolute;left:0;top:0;width:100%;" id="ImgZoomInwrapper" class="enableScrollWrap">'
                wrapper += bgBody + closeBtn + imgStr;
                // if ($('#ImgZoomInBG').length < 1) {
                //     $('body').append(bgBody)
                // }
                // if ($('#ImgZoomInImage').length < 1) {
                //     $('body').append(imgStr)
                // } else {
                //     $('#ImgZoomInImage').attr('src', $(this).attr('src'));
                // }
                if ($('#ImgZoomInwrapper').length < 1) {
                    $('body').append(wrapper);
                } else {
                    $("#ImgZoomInImage").attr("src", previewSrc)
                }


                // $('#ImgZoomInImage').css('left', $(window).scrollLeft() + ($(window).width() - $('#ImgZoomInImage').width()) / 2);
                // $('#ImgZoomInImage').css('top', $(window).scrollTop() + ($(window).height() - $('#ImgZoomInImage').height()) / 2);
                $('#ImgZoomInwrapper').fadeIn('fast');
                $('#ImgZoomInImage').fadeIn("fast");
                $("html").addClass("overflow");
                disableScroll();

                $("#imgZoomInClose,#ImgZoomInBG").on("click", function () {
                    $("#ImgZoomInwrapper").fadeOut("fast");
                    // $('#ImgZoomInImage').fadeOut("fast"); 
                    // $('#ImgZoomInBG').fadeOut("fast"); 
                    // $("#imgZoomInClose").fadeOut("fast"); 
                    $('html').removeClass('overflow'); enableScroll();
                })

            })
        }


    })(jQuery)

    function imgZoomClose() {
        $('#ImgZoomInImage').fadeOut("fast");
        $('#ImgZoomInBG').fadeOut("fast");
        $('html').removeClass('overflow'); enableScroll();
    }

    /**
     * 滚动事件禁用
     * @param {*} e 
     */
    function preventDefault(e) {
        e = e || window.event;
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
    }

    function stopPropagation(e) {
        e = e || window.event;
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble = false;
    }

    function innerScroll(e) {
        // 阻止冒泡到document
        // document上已经preventDefault
        stopPropagation(e);

        var delta = e.wheelDelta || e.detail || 0;
        var box = $(this).get(0);

        if ($(box).height() + box.scrollTop >= box.scrollHeight) {
            if (delta < 0) {
                preventDefault(e);
                return false;
            }
        }
        if (box.scrollTop === 0) {
            if (delta > 0) {
                preventDefault(e);
                return false;
            }
        }
        // 会阻止原生滚动
        // return false;
    }

    var disableScroll = function () {
        $(document).on('mousewheel', preventDefault);
        $(document).on('touchmove', preventDefault);
    };

    var enableScroll = function () {
        $(document).off('mousewheel', preventDefault);
        $(document).off('touchmove', preventDefault);
    };

    function isFirefox() {
        return /Firefox/.test(window.navigator.userAgent);
    }

    module.exports = {
        isFirefox: isFirefox
    }
})