var tools = new tool();
var params = {};
var kcbinfo;
function checkValidCode(){
    var flag = 0;
    var result = "";
    var validateCode = $.trim($("#txtValidateCode").val());
    var content = $.trim($("#txtMessageContent").val());
    if (content == null || content == "") {
        $(".validRs").html("留言不能为空");
        return false;
    }
    result = tools.checkValidateCode(validateCode, 500);
    if (result == "1") {
        $(".validRs").html("");
        return true;
    }
    else {
        $(".validRs").html(result);
        return false;
    }
}

function getCartInfo(){
    if ($("#phoneNum").is(":visible")) {
        $("#phoneNum").hide();
    }
    $("#OrderBody").empty();
    var FoodList = new Array();
    var kcbCarInFo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (!tools.IsEmpty(kcbCarInFo)) {
        FoodList = kcbCarInFo.FoodInfos;
    }
    if (FoodList.length == 0) {
        $("#OrderBody").html("<tr class='no_food'><td colspan='4'><span>您还没点餐呢~</span></td></tr>");
        $("#totalPrice").text("");
        $("#createOrder").hide();
        $("#OrderFoot").hide();
        $("#emptyOrder").hide();
        $("#ComfirmOrder").hide();
        $("#seeNum").hide();
        $("#no_send").hide();
        $.cookie("cartSupInfo", "");
        if ($("#attentionInfo .other").is(":visible")) {
            $("#attentionInfo .other").hide();
        }
    }
    else {
        var oneSupValue = new Array(), oneFoodInfo = new Array(), oneFoodValue = new Array();
        var sendPrice = kcbCarInFo.SendPrice;
        if (kcbCarInFo != undefined && kcbCarInFo != "") {
            switch (Number(kcbCarInFo.BusinessModel)) {
                case 1:
                    if (Number(kcbCarInFo.Businessstate) == 1) {
                        $("#createOrder").show();
                        $("#emptyOrder").show();
                        $("#seeNum").hide();
                        $("#ComfirmOrder").show();
                        $("#OrderFoot").show();
                    }
                    break;
                case 3:
                    $("#emptyOrder").show();
                    $("#seeNum").show();
                    $("#ComfirmOrder").hide();
                    $("#createOrder").show();
                    $("#OrderFoot").show();
                    break;
            }
        }
        var totalPrice = kcbCarInFo.totalPrice;
        for (var i = 0; i < FoodList.length; i++) {
            var foodName = FoodList[i].foodName.length > 10 ? FoodList[i].foodName.substring(0, 10) + '...' : FoodList[i].foodName;
            $("#left #liFood_" + FoodList[i].foodID + " .addToOrder").addClass("addMore");
            var foodStr = '<tr  food-id=' + FoodList[i].foodID + '><td><p class="food_name">' + foodName + '</p></td><td><div class="order_num">   <a class="minus">&nbsp;</a>   <span>' + FoodList[i].number + '</span><a class="add">&nbsp;</a> </div></td><td>' + FoodList[i].foodprice + '</td><td><a class="del">删除</a></td></tr>';
            $("#OrderBody").append(foodStr);
        }
        $("#totalPrice").html(totalPrice);
        $.cookie("totalPrice", totalPrice, {
            path: "/",
            expires: 43200
        });
        if (totalPrice >= sendPrice) {
            $("#no_send").hide();
        }
        $("#phoneNum").hide();
    }
}

function insertIntoCart(foodID, foodName, foodPrice, supName, supID, businessstate, businessmode, sendPrice, activityState){
    if (tools.IsEmpty($.cookie("KcbCarInfo"))) {
        kcbinfo = new KcbCarInfo();
        kcbinfo.SupID = supID;
        kcbinfo.SupName = supName;
        kcbinfo.Businessstate = businessstate;
        kcbinfo.BusinessModel = businessmode;
        kcbinfo.SendPrice = sendPrice;
        kcbinfo.FoodInfos = new Array();
        kcbinfo.RefreshCookie();
    }
    var food = new FoodInfo();
    food.foodID = foodID;
    food.foodName = foodName;
    food.number = 1;
    food.foodprice = foodPrice;
    food.activityState = activityState;
    ExistsFood(food);
}

function hideshade(){
    $("#shadeSup,.clear_cart").hide();
}

function showshade(){
    $("#shadeSup,.clear_cart").show();
}

function checkIsTheSameSup(supID){
    var kcbCarInFo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (kcbCarInFo == null) {
        return 1;
    }
    FoodList = kcbCarInFo.FoodInfos;
    if (FoodList.length > 0) {
        var oldSupID = kcbCarInFo.SupID;
        if (Number(oldSupID) == Number(supID)) {
            return 1;
        }
        return 0;
    }
    return 1;
}

function updateQantity(j, foodID){
    var FoodList = new Array();
    var kcbCarInFo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (!tools.IsEmpty(kcbCarInFo)) {
        FoodList = kcbCarInFo.FoodInfos;
    }
    var food = new FoodInfo();
    food.foodID = foodID;
    if (j == 1) {
        subFood(food);
    }
    else {
        addFood(food);
    }
    $("#liFood_" + foodID + " .addToOrder").removeClass().addClass("addToOrder");
    getCartInfo();
}

function removeFood(foodID){
    var food = new FoodInfo();
    food.foodID = foodID;
    DelFood(food);
    getCartInfo();
}

function nRemoveFood(){
    $.cookie("KcbCarInfo", null, {
        path: "/",
        expires: 43200
    });
}

var flyFlag = 0;
function selectFood($obj){
    var $select = $obj.parents(".foodListItem");
    var foodID = $select.attr("food-foodid"), foodName = $select.attr("food-foodname"), foodPrice = $select.attr("food-price"), supName = $select.attr("food-supname"), supID = $select.attr("food-supid"), businessstate = $select.attr("food-businessState"), activityState = $select.attr("food-activityState"), sendPrice = $select.attr("food-supSendPrice"), businessmode = $select.attr("food-businessmode");
    if (flyFlag != 0) {
        return;
    }
    flyFlag = 1;
    var kcbCarInFo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (kcbCarInFo != null && kcbCarInFo != "") {
        if (checkIsTheSameSup(supID) == 0) {
            if ($(".tf").length > 0) {
            }
            else {
                hideshade();
                $(".clear_cart .cart_food_from").html("美食筐中包含来自[<em>" + kcbCarInFo.SupName + "</em>]餐厅的美食");
            }
            flyFlag = 0;
            return;
        };
            }
    if (Number(businessstate) == 1 || Number(businessmode) == 3) {
        if (Number(businessmode) == 2) {
            $(".attentiono.call").show();
        }
        if (Number($select.attr("food-foodstate")) == 1) {
            $.XYTipsWindow({
                ___title: "饭点提示",
                ___drag: "___boxTitle",
                ___width: "300px",
                ___height: "100px",
                ___content: "text:<p style=\"color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;\">真遗憾，" + foodName + "刚卖完</p>",
                ___showbg: true,
                ___time: 1800
            });
            flyFlag = 0;
            return;
        }
        var areaID;
        if ($.cookie("areaID") != null && $.cookie("areaID") != "") {
            areaID = $.cookie("areaID");
        }
        else {
            scroll(0, 0);
            $(".attention.location").show();
            flyFlag = 0;
            return;
        }
        $.ajax({
            type: "POST",
            url: "/areas/check_shop",
            data: {
                supID: supID,
                areaID: areaID
            },
            success: function(data){
                if (data == "1") {
                    var b = $obj.offset(), g = $("#onlineOrder").offset();
                    g.top += $("#onlineOrder").height() / 2;
                    var flyEffectTxt = $('<div class="flyEffect">' + foodName + "</div>");
                    flyEffectTxt.offset(b);
                    flyEffectTxt.appendTo("body").animate({
                        left: g.left + 20 + "px",
                        top: g.top + 20 + "px",
                        opacity: 1
                    }, function(){
                        $(this).animate({
                            opacity: 0
                        }, function(){
                            $(this).remove();
                            insertIntoCart(foodID, foodName, foodPrice, supName, supID, businessstate, businessmode, sendPrice, activityState);
                            $("#liFood_" + foodID + " .addToOrder").addClass("addMore");
                            getCartInfo();
                            flyFlag = 0;
                        })
                    });
                }
                else {
                    scroll(0, 0);
                    $(".attention.warn").show();
                    flyFlag = 0;
                    return;
                }
            }
        });
    }
    else {
        switch (Number(businessstate)) {
            case 0:
                scroll(0, 0);
                $(".attention.rest").slideDown(1000);
                flyFlag = 0;
                break;
            case 3:
                scroll(0, 0);
                $("#attentionInfo .busy").show();
                flyFlag = 0;
                break;
            case 4:
                scroll(0, 0);
                $("#attentionInfo .vacation").show();
                flyFlag = 0;
                break;
        }
        if (flyFlag == 0) {
            hideshade();
        }
    }
}

function emptyOrder(){
    if ($("#phoneNum").is(":visible")) 
        getCartInfo();
    if ($.cookie("KcbCarInfo") == null || $.cookie("KcbCarInfo") == "") {
        return;
    }
    $.cookie("KcbCarInfo", null, {
        path: "/",
        expires: 43200
    });
    $(".foodListItem .addToOrder").removeClass().addClass("addToOrder");
    $("#no_send").hide();
    $(".attention,.trat_arrow").hide();
    getCartInfo();
}

function lessNum($obj){
    var foodID = $obj.parent().attr("food-foodid");
    updateQantity(1, foodID);
}

function floatAdd(arg1, arg2){
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } 
    catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } 
    catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

function floatMul(arg1, arg2){
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } 
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } 
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function fixOrder(order){
    var shopIntroHeight = $("#shopOverall").height();
    var istotopshow = 0;
    var isfoodcartshow = 0;
    var isfoodMenuShow = 0;
    var istipsNumbersShow = 0;
    var topScroll = "", toTop_Top = "";
    var tipsNumbers = 0;
    $(window).scroll(function(){
        topScroll = $(window).scrollTop();
        if (istipsNumbersShow == 0) {
            tipsNumbers = $(".attention:visible").length;
            istipsNumbersShow = 1;
        }
        if (topScroll > (150 + shopIntroHeight + tipsNumbers * 42)) {
            if (isfoodcartshow == 1) {
            }
            else {
                $("#onlineOrder").css({
                    "position": "fixed",
                    "top": "0px",
                    "margin-top": "0px",
                    "left": order.offset().left + "px"
                });
                isfoodcartshow = 1;
            }
        }
        else 
            if (isfoodcartshow == 1) {
                $("#onlineOrder").css({
                    "position": "relative",
                    "margin-top": "0",
                    "top": "",
                    "left": ""
                });
                isfoodcartshow = 0;
            }
        if ($("#menuCategory").length > 0) {
            if (isfoodMenuShow == 0 && topScroll > (215 + shopIntroHeight + tipsNumbers * 42)) {
                $("#menuCategory").css({
                    "position": "fixed",
                    "top": "0px",
                    "margin-top": "0",
                    "border-bottom": "1px solid #ddd",
                    "z-index": "11"
                });
                isfoodMenuShow = 1;
            }
            else 
                if (isfoodMenuShow == 1 && topScroll <= (215 + shopIntroHeight + tipsNumbers * 42)) {
                    $("#menuCategory").css({
                        "position": "static",
                        "top": "",
                        "left": "",
                        "margin-top": "10px",
                        "border-bottom": "none"
                    });
                    isfoodMenuShow = 0;
                }
        }
        if ($(".to-top").length > 0) {
            if (istotopshow == 0 && topScroll > 150) {
                $(".to-top").css("display", "block");
                istotopshow = 1;
            }
            else 
                if (istotopshow == 1 && topScroll <= 150) {
                    $(".to-top").css("display", "none");
                    istotopshow = 0;
                }
        }
    });
}

$(document).ready(function(){
    if ($("#onlineOrder").length > 0) {
        fixOrder($("#onlineOrder"));
    }
    var searchFoodId = $.cookie("searchFoodId");
    try {
        if (searchFoodId != null && searchFoodId != "") {
            $.cookie("KcbCarInfo", null, {
                path: "/",
                expires: -1
            });
            var _this = $("#liFood_" + searchFoodId + " .addToOrder"), browserHeight = document.body.clientHeight, currentLiTop = $("#liFood_" + searchFoodId).offset().top;
            scroll(0, currentLiTop - browserHeight / 2);
            if (!$("#liFood_" + searchFoodId + " .price_outer").next().hasClass("saleup")) {
                setTimeout(function(){
                    selectFood(_this);
                }, 1000);
            }
        }
    } 
    catch (e) {
    }
    $.cookie("searchFoodId", "", {
        path: "/",
        expires: 1
    });
    var supDetail = "";
    var uniName = $.cookie("uniName");
    if (uniName != null && uniName != "") {
        $("#uniName").html(uniName + "&nbsp/&nbsp");
    }
    $("#uniName").css("cursor", "pointer").bind("click", function(){
        if ($.cookie("areaID") == null) {
            window.location.href = "/home";
            return;
        }
        window.location = "/areas/" + $.cookie("areaID");
    });
    $("#detail").click(function(){
        $(this).hide();
        $(".satis").css("float", "left");
        $("#detail_table").slideDown("fast");
    });
    $("#hide_detail").click(function(){
        $("#detail_table").slideUp("fast");
        $("#detail").show();
    });
    $("#supIntrodetail").live('click', function(){
        $(this).parent().hide();
        $("#supIntroDetail").show();
    });
    $("#hide_supIntrodetail").live('click', function(){
        $("#supIntroDetail").hide();
        $(".send_price").next("p").show();
    });
    $("#.make_msg .chk_code span").click(function(){
        $("#authenticationCode_foodCorrect").click();
    });
    var businessState = Number($("#businessState").val()), businessMode = Number($("#businessMode").val()), supID = Number($("#supID").val()), uniName = $.cookie("uniName");
    var kcbCarInFo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (kcbCarInFo != null && kcbCarInFo != "") {
        if ($("#supID").val() != kcbCarInFo.SupID) {
            showshade();
            $(".clear_cart .cart_food_from").html("美食筐中包含来自[<em>" + kcbCarInFo.SupName + "</em>]餐厅的美食");
        }
    }
    if (businessMode == 3) {
        var areaID;
        if ($.cookie("areaID") != null && $.cookie("areaID") != "") {
            areaID = $.cookie("areaID");
            $.ajax({
                type: "POST",
                url: "/areas/check_shop",
                data: {
                    supID: supID,
                    areaID: areaID
                },
                success: function(data){
                    if (data != "1") {
                        scroll(0, 0);
                        $(".warn").show();
                    }
                    else {
                        $(".call").show();
                    }
                }
            });
        }
        else {
            scroll(0, 0);
            $(".location").show();
        }
    }
    else {
        switch (businessState) {
            case 0:
                $(".rest").animate(300, function(){
                    $(this).slideDown();
                });
                hideshade()
                break;
            case 1:
                var areaID;
                if ($.cookie("areaID") != null && $.cookie("areaID") != "") {
                    areaID = $.cookie("areaID");
                    $.ajax({
                        type: "POST",
                        url: "/areas/check_shop",
                        data: {
                            supID: supID,
                            areaID: areaID
                        },
                        success: function(data){
                            if (data != "1") {
                                scroll(0, 0);
                                $(".warn").show();
                            }
                        }
                    });
                }
                else {
                    scroll(0, 0);
                    $(".location").show();
                }
                break;
            case 3:
                $(".busy").show();
                hideshade();
                break;
            case 4:
                $(".vacation").show();
                hideshade();
                break;
        }
    }
    getCartInfo();
    $("#shopOverall .tips").hover(function(){
        $(".arrow_top,.intro").css("display", "block");
        $(".arrow_top").css({
            "left": $(this).position().left + "px"
        });
        $(".intro").css({
            "left": $(this).position().left - 110 + "px"
        });
    }, function(){
        $(".arrow_top,.intro").css("display", "none");
    });
    $('.order_num .add').live('click', function(){
        var foodID = $(this).parent().parent().parent().attr("food-id");
        updateQantity(0, foodID);
    });
    $('.order_num .minus').live('click', function(){
        var foodID = $(this).parent().parent().parent().attr("food-id");
        updateQantity(1, foodID);
    });
    $(".del").live('click', function(){
        var foodID = $(this).parent().parent().attr("food-id");
        removeFood(foodID);
        $("#liFood_" + foodID + " .addToOrder").removeClass().addClass("addToOrder");
    });
    $("li.saleup").css("width", "73px");
    $('li.saleup a').remove();
    $("li.saleup").removeClass("saleup").append("<span class='saleup'>已售完</span>");
    $("#left").click(function(e){
        var $triggerFood = $(e.target);
        for (k = 0; k < 10; $triggerFood = $triggerFood.parent()) {
            if ($triggerFood.hasClass("addToOrder")) {
//				alert($triggerFood.parents(".foodListItem").attr("food-foodname"));
                selectFood($triggerFood);
                break;
            }
            else {
                break;
            }
            if ($triggerFood.hasClass("main")) {
                break;
            }
        }
    });
    var FoodList = new Array();
    var KcbcarInfo = eval('(' + $.cookie("KcbCarInfo") + ')');
    if (KcbcarInfo == null) {
        getCartInfo();
        KcbcarInfo = new KcbCarInfo();
    }
    else {
        FoodList = KcbcarInfo.FoodInfos;
    }
    $("#createOrder #ComfirmOrder").click(function(){
        KcbcarInfo = eval('(' + $.cookie("KcbCarInfo") + ')');
        if (KcbcarInfo == null) {
            getCartInfo();
            KcbcarInfo = new KcbCarInfo();
        }
        else {
            FoodList = KcbcarInfo.FoodInfos;
        }
        var userID = $.trim($.cookie("userID")), orderPrice = $(".order_price").html(), kcb = $.cookie("kcb"), sendPrice = KcbcarInfo.SendPrice;
        supID = KcbcarInfo.SupID;
        supName = KcbcarInfo.SupName;
        sWidth = $(".sendPrice").width(), $noSend = $("#no_send_inner"), noSendInfo = $.trim($noSend.html());
        if ((sendPrice - orderPrice) > 0) {
            $("#no_send").css("display", "block");
            if (noSendInfo == null || noSendInfo == "") {
                $($noSend).append("<div><p>抱歉，未达到<a href='" + supID + "' style='color:blue'>" + supName + "</a>起送价</p></div>");
            }
            return;
        }
        else {
            $("#no_send").hide();
        }
        location.href = "/order/checkout";
    });
    $("#seeNum").click(function(){
        var $context = $(this);
        $.ajax({
            type: "POST",
            url: "/ajax/Order/SeeNum.ashx",
            beforeSend: function(){
                $context.val("载入中..");
            },
            success: function(data){
                $context.val("查看电话");
                if (data == "0") {
                    $.XYTipsWindow({
                        ___title: "开吃吧提示",
                        ___drag: "___boxTitle",
                        ___width: "300px",
                        ___height: "100px",
                        ___content: "text:<p style=\"color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;\">还没点餐呢</p>",
                        ___showbg: true,
                        ___time: 1800
                    });
                    return false;
                }
                else 
                    if (data == "1") {
                        $.cookie('seenum', '1', {
                            expires: 7
                        });
                        $(".minLoginBg,.minLogReg").css("display", "block");
                        return false;
                    }
                    else 
                        if (data == "3") {
                            $.XYTipsWindow({
                                ___title: "开吃吧提示",
                                ___drag: "___boxTitle",
                                ___width: "300px",
                                ___height: "100px",
                                ___content: "text:<p style=\"color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;\">菜品信息非法，请重新点餐</p>",
                                ___showbg: true,
                                ___time: 1800
                            });
                            return false;
                        }
                        else {
                            if (data != undefined) {
                                data = $.parseJSON(data);
                                $("#phoneNum").show();
                                $("#phoneNum .phone_num").html(data.ReservationCall);
                                $("#phoneNum .alternate_phone").html(data.AlternateCall);
                                $("#phoneNum .thrid_phone").html(data.ThirdCall);
                            }
                            $("#phoneNum").slideDown();
                            $("#seeNum").css("display", "none");
                            $("#emptyOrder").css("display", "none");
                            $(".addToOrder").removeClass("addMore");
                        }
                nRemoveFood();
                $(".order_num .add,.order_num .minus").remove();
                $.cookie("cartFoodInfo", "");
                $.cookie("cartSupInfo", "");
                $(".del").remove();
            }
        });
        return false;
    });
    $("#emptyOrder").click(function(){
        emptyOrder();
    });
    $(".do_clear").live("click", function(){
        emptyOrder();
        hideshade();
    });
    $(".do_not_clear").live("click", function(){
        $('.clear_cart,.shade').hide();
    });
    $("#menuCorrection").bind("click", function(){
        $("#authenticationCode_foodCorrect").click();
        var supName = $("#supplierName_H .name").text();
        $("#corTextarea textarea").val("如：价格有误、地址不准确或该店已关闭等等").css("color", "#bbb");
        $("#userMail input").val("请输入您的邮箱，以便我们能够联系上您").css("color", "#bbb");
        $(".corrValiDateCode").val("");
        $(".validRs").html("");
        $("#corTextarea textarea").blur(function(){
            var content = $.trim($(this).val());
            if (content == null || content == "") {
                $("#corTextarea textarea").val("如：价格有误、地址不准确或该店已关闭等等").css("color", "#bbb");
            }
        });
        $("#userMail input").blur(function(){
            var mail = $.trim($(this).val()), regExp = new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
            if (mail == null || mail == "") {
                $(".validRs").html("");
                $(this).val("请输入您的邮箱，以便我们能够联系上您").css("color", "#bbb");
            }
            else 
                if (!regExp.exec(mail)) {
                    $(".validRs").html("邮箱格式错误");
                }
                else {
                    $(".validRs").html("");
                }
        });
        $.XYTipsWindow({
            ___title: supName + " (" + uniName + ") -纠错",
            ___drag: "___boxTitle",
            ___width: "500px",
            ___height: "240px",
            ___content: "id:correctHide",
            ___showbg: true
        });
    });
    $("#chgValidCode").click(function(){
        $("#authenticationCode_foodCorrect").click();
    });
    $(".correctBtn").click(function(){
        var msgContent = $.trim($("#corTextarea textarea").val()), mail = $.trim($("#userMail input").val()), validateCode = $.trim($(".corrValiDateCode").val()), result = "", regExp = new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
        if (msgContent == "如：价格有误、地址不准确或该店已关闭等等") {
            msgContent = "";
        }
        if (msgContent == null || msgContent == "") {
            $(".validRs").html("内容不能为空");
            $("#correctCont").next().focus();
            return;
        }
        result = tools.checkValidateCode(validateCode, 500);
        if (result != "1") {
            $(".validRs").html(result);
            return;
        }
        if (mail != null && mail != "" && mail != "请输入您的邮箱，以便我们能够联系上您") {
            if (!regExp.exec(mail)) {
                $(".validRs").html("邮箱格式错误");
                return;
            }
        }
        $.ajax({
            type: "POST",
            url: "../ajax/Food/MenuCorrection.ashx",
            data: {
                content: msgContent,
                supID: supID,
                mail: mail
            },
            success: function(data){
                if (data == "1") {
                    parent.$.XYTipsWindow.removeBox();
                    $.XYTipsWindow({
                        ___title: "开吃吧提示",
                        ___drag: "___boxTitle",
                        ___width: "300px",
                        ___height: "120px",
                        ___content: "text:<p style=\"color:#555;margin:30px 20px 0;font-size:16px;font-weight:bold;\">菜单纠错提交成功，感谢您对开吃吧菜单信息的监督</p>",
                        ___showbg: true,
                        ___time: 1800
                    });
                }
                else 
                    if (data == "-13") {
                        $(".validRs").html("验证码错误");
                        $("#authenticationCode_foodCorrect").click();
                    }
                    else {
                        $.XYTipsWindow({
                            ___title: "开吃吧提示",
                            ___drag: "___boxTitle",
                            ___width: "300px",
                            ___height: "100px",
                            ___content: "text:<p style=\"color:#555;margin:30px 20px 0;font-size:16px;font-weight:bold;\">由于系统繁忙，您的纠错信息提交失败，请重新提交</p>",
                            ___showbg: true,
                            ___time: 1800
                        });
                    }
            }
        });
    });
    $(".corCancelBt").click(function(){
        parent.$.XYTipsWindow.removeBox();
    });
    $(".sm_reply").click(function(){
        var replyID = $(this).attr("id");
        $("#txtMessageContent").focus();
        $("#txtMessageContent").val("#" + replyID + "#  ");
        return false;
    });
    $("#commentLayer .close").click(function(){
        $("#commentLayer").css("display", "none");
        $("#layer").css("display", "none");
    })
});
