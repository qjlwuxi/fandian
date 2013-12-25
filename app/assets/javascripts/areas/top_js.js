$(function(){
    if ($(".layer_top_Message").height() > 550) {
        $(".layer_top_Message").css({
            "overflow": "auto",
            "height": "550px"
        });
    }
    $(".notification").find("b,#top_num").click(function(){
        if ($(".layer_top_Message").is(":hidden")) {
            $(".layer_top_Message").css("display", "block")
            $(".layer_topInfo").hide();
        }
        else {
            $(".layer_top_Message").css("display", "none")
        }
    });
    $(document).bind("click", function(e){
        var HeightMessage = $(".layer_top_Message").height();
        var WidthMessage = $(".layer_top_Message").width();
        var OffsetleftMessage = $(".layer_top_Message").offset().left;
        var OffsettopMessage = $(".layer_top_Message").offset().top;
        var MouseX = e.clientX;
        var MouseY = e.clientY;
        if (MouseY > HeightMessage + OffsettopMessage || MouseY < 0 || MouseX < OffsetleftMessage || MouseX > WidthMessage + OffsetleftMessage) {
            $(".layer_top_Message").hide();
        }
        if ($(".UserNickName").html() == null) {
            return;
        }
        var OffsetleftUser = $(".layer_topInfo").offset().left;
        var OffsettopUser = $(".layer_topInfo").offset().top;
        var HeightUser = $(".layer_topInfo").height();
        var WidthUser = $(".layer_topInfo").width();
        if (MouseY > HeightUser + OffsettopUser || MouseY < 0 || MouseX < OffsetleftUser || MouseX > WidthUser + OffsetleftUser) {
            $(".layer_topInfo").hide();
        }
    });
    var HideAccount;
    $(".login_regist").hover(function(){
        clearTimeout(HideAccount);
        $(".login-type").show();
    }, function(){
        HideAccount = setTimeout(function(){
            $(".login-type").hide();
        }, 100)
    });
    $("#closewarm,.upgrade").live("click", function(){
        $(".upgrade").hide();
    });
});
