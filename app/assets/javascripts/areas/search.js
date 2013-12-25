var isSupplier = false;
function searchClick(){
    if (isSupplier == true) {
        return;
    }
    var keyword = $("#keyword").val();
    location.href = 'http://kaichiba.com/search/search.aspx?keyword=' + escape(keyword);
}

var lis = $('#searchRes li').has('a'), nowIndex = -1;
function enterIn(evt){
    evt = evt ? evt : (window.event ? window.event : null);
    if (evt.keyCode == 13) {
        if ($('#searchRes li.active').length != 0) {
            var thisA = $('#searchRes li.active').eq(0).find('a').eq(0);
            if (thisA.attr("food_id") != '') {
                $.cookie("searchFoodId", thisA.attr("food_id"), {
                    path: "/",
                    expires: 1
                });
            }
            location.href = thisA.attr('href');
        }
        else {
            searchClick();
        }
    }
    else 
        if (evt.keyCode == 38) {
            if (nowIndex > 0) {
                $(lis[nowIndex]).removeClass('active');
                nowIndex--;
                $(lis[nowIndex]).addClass('active');
            }
            else 
                if (nowIndex == 0) {
                    $(lis[nowIndex]).removeClass('active');
                    nowIndex = -1;
                }
                else {
                }
        }
        else 
            if (evt.keyCode == 40) {
                if (nowIndex < 0) {
                    nowIndex++;
                    $(lis[nowIndex]).addClass('active');
                }
                else 
                    if (nowIndex < lis.length - 1) {
                        $(lis[nowIndex]).removeClass('active');
                        nowIndex++;
                        $(lis[nowIndex]).addClass('active');
                    }
                    else {
                    }
            }
            else {
            }
}

$(document).ready(function(){
    $(".showAll").click(function(){
        $(this).parent().parent().find("ul").css("display", "block");
    });
    $(".resultFood").bind("click", function(){
        var $trigger = $(this), searchFoodId = $trigger.attr("href"), supId = $trigger.parent().parent().find("div .resultRst").find(".resultRst_title a").attr("href");
        var regexp = new RegExp("^[0-9]*$");
        if (regexp.test(searchFoodId)) {
            $.cookie("searchFoodId", searchFoodId, {
                path: "/",
                expires: 1
            });
        }
        $trigger.attr("href", supId);
    });
    var url = window.location.href;
    function serchFood(supplierid){
        if ($("#keyword").val() != "") {
            $.ajax({
                url: '/ajax/Food/SerchFoodByKey.ashx',
                data: {
                    "key": $("#keyword").val(),
                    "SupplierID": supplierid
                },
                success: function(data){
                    if (data != "") {
                        $(".foodList").hide();
                        $(".foodListItem").hide();
                        var SupplierIDList = data.split(",");
                        for (var i = 0; i < SupplierIDList.length; i++) {
                            ShowFindFood(SupplierIDList[i]);
                        }
                    }
                }
            });
        }
    }
    function ShowFindFood(foodid){
        $(".foodListItem").each(function(){
            if ($(this).attr("food-foodid") == foodid.toString()) {
                $(this).parent(".foodList").show();
                $(this).show();
            }
        });
    }
    var reg = new RegExp("(http://kaichiba.com/shop/)(\\d+)", "gmi");
    var reg1 = new RegExp("(http://kaichiba.com/shop/)(\\d+)#", "gmi");
    var SupplierID = url.replace(reg, "$2");
    var SupplierID1 = url.replace(reg1, "$2");
    SupplierID1 = SupplierID1.replace("#", "");
    var regexp = new RegExp("^[0-9]*$");
    if (regexp.test(SupplierID) || regexp.test(SupplierID1)) {
        $("#search .serch_btn_a").after("<span class='search_this_shop'>搜本店<em>×</em></span>");
        $('#keyword').addClass('this_shop');
        isSupplier = true;
    }
    else {
        isSupplier = false;
    }
    $("#keyword").live("input", function(){
        if ($(".search_this_shop").length > 0) {
            if ($("#keyword").val() == "") {
                $(".foodList").show();
                $(".foodListItem").show();
            }
            setTimeout(serchFood(SupplierID), 10);
        }
        else {
            SerchFoodAndSupplier();
        }
    });
    $('.search_this_shop em').click(function(){
        $('.search_this_shop').remove();
        $('#keyword').removeClass('this_shop');
    });
    $(document).live("click", function(e){
        if ($(".searchRes").length) {
            var HeightsearchRes = $(".searchRes").height();
            var WidthsearchRes = $(".searchRes").width();
            var OffsetleftsearchRes = $(".searchRes").offset().left;
            var OffsettopsearchRes = $(".searchRes").offset().top;
            var MouseX = e.clientX;
            var MouseY = e.clientY;
            if (MouseY > HeightsearchRes + OffsettopsearchRes || MouseY < 0 || MouseX < OffsetleftsearchRes || MouseX > WidthsearchRes + OffsetleftsearchRes) {
                $(".searchRes").hide();
            }
        }
    });
    $(".search_all").live("click", function(){
        searchClick();
    });
});
function SerchFoodAndSupplier(){
    if ($("#keyword").val() != "") {
        $.ajax({
            url: '/ajax/Food/SerchFoodAndSupplierByKey.ashx',
            data: {
                'key': $("#keyword").val()
            },
            success: function(data){
                if ($("#keyword").val() == "") {
                    $(".searchRes").hide();
                    return;
                }
                $(".searchRes").html("");
                $(".searchRes").html(data).show();
                lis = $('#searchRes li').has('a');
                nowIndex = -1;
                $(".searchRes .serch_fooid").click(function(){
                    var searchFoodId = $(this).attr("food_id");
                    $.cookie("searchFoodId", searchFoodId, {
                        path: "/",
                        expires: 1
                    });
                });
            }
        });
    }
    else {
        $(".searchRes").html("").hide();
    }
}
