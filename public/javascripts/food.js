$(document).ready(function(){
    var main_Top = $("#left").offset().top;
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $("#shopOverall").children("div").eq(1).height($("#shopOverall").height());
    $("#FoodTypeList li").click(function(){
        $("#keyword").val("");
        var foodtypeid = $(this).attr("id");
        if (foodtypeid == 0) {
            $(".foodList").show();
            $(".foodListItem").show();
        }
        else {
            $(".foodList").each(function(){
                if ($(this).find("h3").attr("FoodTypeID") == foodtypeid) {
                    $(".foodList").hide();
                    $(this).show()
                    $(this).find(".foodListItem").show();
                }
            });
        }
        $(this).parent().find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $("li .saleup").prev("span").remove();
});
