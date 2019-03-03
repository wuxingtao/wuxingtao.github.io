define(function (require, exports, module) {
    var $ = require('jquery');
    require("fullpage")($); //jquery plugin module use
    // var css = require("../css/index.css");
    // var fullpagecss = require("../plugins/page/jquery.fullpage.min.css");
    var common = require("newCommon");
    $(function () {
        if ($("body").hasClass("jl-pc")) {
            var status = false;
            var animateStatu = false;
            $("#jl_home_container").fullpage({
                'navigation': true,
                'slideSelector': '.slide',
                'continuousHorizontal': true,
                afterLoad: function (anchorLink, index) {
                    var current = index - 1;
                    $("#jl_home_container").find(".section:eq(" + current + ")").addClass("animation-pageIn");
                    // if (index > 1) {
                    //     $("#header").addClass("topFixed")
                    // } else {
                    //     $("#header").removeClass("topFixed")
                    // }
                    //按钮重定向
                    if (index == 1 && status == true) {
                        var animateAfterStyle = common.isFirefox() ? { top: "45%" } : { top: "45%", left: "0" };
                        $("#coopGroupStart").animate(animateAfterStyle, 'normal', function () {
                            if (status) {
                                status = false;
                                animateStatu = false;
                                $.fn.fullpage.moveSectionUp();
                            }
                        })
                    }
                },
                onLeave: function (index, nextIndex, direction) {

                    if (index == 1 && !status) {
                        if (!status) {

                            // $("#coopGroupStart").css({ "position": "fixed", left: "0", right: "0" });
                            if (animateStatu) {
                                return false;
                            } else {
                                var animateStartStyle = common.isFirefox() ? { top: 0 } : { top: 0, left: "-200" };
                                $("#coopGroupStart").animate(animateStartStyle, 'normal',
                                    function () {
                                        animateStatu = true;
                                        if (!status) {
                                            // $("#coopGroupEnd").show();
                                            status = true;
                                            $.fn.fullpage.moveTo(nextIndex);
                                        }

                                    });
                            }
                            animateStatu = true;
                            return false;
                        } else {
                            return true;
                        }

                    }

                },
                afterRender: function () {
                    $("#jl_home_container").addClass("pagerendered")
                }
            });

            setInterval(function () {
                $.fn.fullpage.moveSlideRight();
            }, 5000);

        } else {
            $("#jl_home_container").find(".section0").remove();
            $("#jl_home_container").fullpage({
                'navigation': true,
                'slideSelector': '.slide',
                'continuousHorizontal': true
            })
        }
    })

})