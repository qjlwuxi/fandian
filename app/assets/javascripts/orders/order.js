var tools = new tool();
var params = {};
var orderInfo = {
    userID: 0,
    kcbcartInfo: "",
    address: "",
    phone: "",
    altPhone: "",
    notes: "",
    areaID: 0,
    isSendMessage: 0,
    kcbPointCount: "0",
    TicketID: "",
    PreferentialType: 0,
    VoucherPrice: 0
};
var contectInfo = {
    userContactInfoID: 0,
    userID: 0,
    address: "",
    phone: "",
    altPhone: "",
    isDefault: 0
};
var registInfo = {
    Mail: "",
    NickName: "",
    PassWord: "",
    uniID: 0,
    regIP: ""
};
function anonymous(phone, addr){
	var b = phone;
    var c = tools.checkUserExist(phone, addr);
    if (!tools.IsEmpty(c) && parseInt(c) > 0) {
        $.cookie("userID", c, {
            path: "/",
            expires: 365
        });
        return c
    }
//	alert("123");
//    registInfo.Mail = b;
//    registInfo.NickName = tools.getRandom(3, 1) + a.substring(6, 11);
//    registInfo.areaID = $.cookie("areaID");
//    registInfo.regIP = $.cookie("regIP");
//    registInfo.PassWord = tools.getRandom(10, 3);
//    params.type = "POST";
//    params.async = false;
//    params.url = "../ajax/Login_Register/userRegist.ashx";
//    params.data = registInfo;
//    params.success = function(d){
//        c = d.userID.toString();
//        if (parseInt(c) > 0) {
//            $.cookie("kcb", "", {
//                expires: -1
//            })
//        }
//        else {
//            c = "-1"
//        }
//    };
//    tools.ajax(params);
    return c
}

function EnterKeyClickLogin(a){
    if (event.keyCode == 13) {
        event.returnValue = false;
        event.cancel = true;
        if (a == "sendOrder") {
            $("#sendOrder").click()
        }
    }
}

function isUpdateAddr(){
    $trigger = $(".a_c").children();
    if ($.trim($trigger.children(".address").html()) != $.trim($("#o_addr").val())) {
        return true
    }
    else {
        if ($.trim($trigger.children(".phone").html()) != $.trim($("#o_phone").val())) {
            return true
        }
        else {
            if ($.trim($trigger.children(".altphone").html()) != $.trim($("#o_altphone").val())) {
                return true
            }
            else {
                return false
            }
        }
    }
}

function tipFadeOut(){
    $("#saveTip").fadeOut("slow")
}

$(document).ready(function(){
    var shade = $("#shade");
    setTimeout(tipFadeOut, 8000);
    $("#saveTip span").click(function(){
        $("#saveTip").fadeOut("fast")
    });
    var leaveMessageBox = $("#leave_message_box");
    leaveMessageBox.focus(function(){
        if (leaveMessageBox.val() == "给餐厅留言") {
            leaveMessageBox.val("")
        }
        $("#leave_message").show()
    });
    $("#leave_message").find("a").click(function(){
        stopProcess($(this));
        if (!$(this).hasClass("activeed")) {
            $(this).addClass("activeed");
            leaveMessageBox.val(leaveMessageBox.val() + $(this).find("span").text() + " ")
        }
    });
    $(document).bind("click", function(e){
        var leaveMessage = $("#leave_message"), leaveMessageBox = $("#leave_message_box"), mouseX = e.pageX, mouseY = e.pageY;
        if (!(mouseX > leaveMessage.offset().left && mouseX < leaveMessage.offset().left + leaveMessage.width() && mouseY > leaveMessage.offset().top && mouseY < leaveMessage.offset().top + leaveMessage.height() || mouseX > leaveMessageBox.offset().left && mouseX < leaveMessageBox.offset().left + leaveMessageBox.width() + 37 && mouseY > leaveMessageBox.offset().top - 3 && mouseY < leaveMessageBox.offset().top + leaveMessageBox.height() + 6)) {
            if (leaveMessageBox.val() == "") {
                leaveMessageBox.val("给餐厅留言")
            }
            $("#leave_message").hide()
        }
        var timeDropdown = $("#time_dropdown");
        if (!(mouseX > timeDropdown.offset().left && mouseX < timeDropdown.offset().left + timeDropdown.width() && mouseY > timeDropdown.offset().top && mouseY < timeDropdown.offset().top + timeDropdown.height())) {
            $("#time_list").hide()
        }
    });
    var payType = 0;
    var orderPrice = parseFloat($(".realTotalPrice").html());
    var tradePrice = 0;
    var borderDashed = $("#border_dashed");
    var tradeSuccess = $("#trade_success");
    var lastMustPay = $("#last_must_pay");
    function cancelPrivilege(){
        payType = 0;
        tradePrice = 0;
        $(".active_btn").removeClass("active_btn");
        $(".disable").removeClass("disable");
        clearTradeSuccess()
    }
    function initPrivilege(){
        $(".active_btn").removeClass("active_btn");
        $(".disable").removeClass("disable");
        clearTradeSuccess()
    }
    function showTradeSuccess(num, obj){
        borderDashed.show();
        tradeSuccess.show().find("em").text(num);
        lastMustPay.show().find("em").text("￥" + orderPrice + "-" + num + "=" + (orderPrice - num));
        $(".active_btn").removeClass("active_btn");
        $(".shelter_span a.btn").addClass("disable");
        obj.removeClass("disable");
        obj.addClass("active_btn")
    }
    function clearTradeSuccess(){
        borderDashed.hide();
        tradeSuccess.hide().find("em").text(" ");
        lastMustPay.hide().find("em").text(" ")
    }
    $("#availableCoupon").click(function(){
        if (payType == 3) {
            cancelPrivilege();
            oldVoucherCode = " ";
            VoucherPrice = "0"
        }
        else {
            shade.show();
            $(".promotion_code").show()
        }
    });
    $("#promotion_cancel").click(function(){
        $(".promotion_code").hide();
        shade.hide()
    });
    var VoucherCode;
    var VoucherPrice = "0";
    var recommendSup = $.cookie("recommendSup");
    var supplierID = $("#Supplier_id").attr("SupID");
    var areaID = $.cookie("areaID");

	//时间下拉框
    $(".ui_dropdown_toggle").click(function(){
        $("#time_list").show()
    });
    $("#time_list li").click(function(){
        $(".ui_dropdown_toggle span").text($(this).find("span").text());
        $("#time_list").hide()
    });
    var IsNewAddress = 0;
    function checkAdd(address, phone){
        var regPhone = /^([0-9]{11})?$/;
        var returnNum1 = 0;
        var returnNum2 = 0;
        if ($.trim(address) == "外卖送到的地址" || $.trim(address) == "地址输入错误" || $.trim(address) == "") {
            returnNum1 = 1
        }
        if (!regPhone.test($.trim(phone))) {
            returnNum2 = 2
        }
        return (returnNum1 + returnNum2)
    }
    var canAddNowAddress = true;
    if ($("#select_address p.add_address").length > 0) {
        var firstAddredd = $(" input[type=radio][checked=checked]").parent();
        $(".address_phone").html("<em>" + firstAddredd.find(".u_address").first().text() + "</em><em>" + firstAddredd.find(".u_phone").first().text() + "</em><em>" + firstAddredd.find(".u_altphone").first().text() + "</em>");
        $(".change_address").html("[修改]")
    }
    else {
        canAddNowAddress = false;
        $("#select_address h2").after('<p class="add_address new_input"><a href="javascript:;" class="cancel_save">×</a><input type="radio" name="address" checked="checked"/><input type="text" id="o_addr" value="外卖送到的地址"/><input type="text" id="o_phone" value="联系电话"/><input type="text" id="o_altphone" value="备选电话(选填)"/></></p>')
    }
    $("#add_new_address").click(function(){
        if (canAddNowAddress) {
            $("#select_address p.add_address").find('input[type="text"]').parent().find(".cancel_save").click();
            $("#select_address p.add_address").find('input[type="radio"]').removeAttr("checked");
            $("#select_address h2").after('<p class="add_address new_input" style="display:none"><a href="javascript:;" class="cancel_save">×</a><input type="radio" name="address" checked="checked"/><input type="text" id="o_addr" value="外卖送到的地址"/><input type="text" id="o_phone" value="联系电话"/><input type="text" id="o_altphone" value="备选电话(选填)"/></p>');
            canAddNowAddress = false;
            $("#select_address p.add_address").first().slideDown(300)
        }
    });
    $(".add_address").click(function(){
        $(this).find(" input[type=radio]").attr("checked", "checked");
        if (!$(this).hasClass("new_input")) {
            if ($("p.new_input").length != 0) {
                $("p.new_input").slideUp();
                setTimeout(function(){
                    $("p.new_input").remove()
                }, 300)
            }
            canAddNowAddress = true;
            if ($(this).find("input[type=text]").length == 0 && $(".add_address input[type=text]").length - $(".new_input input[type=text]").length != 0) {
                $(".add_address input[type=text]").last().parent().find(".cancel_save").click()
            }
        }
    });
    $(".edit").click(function(){
        var thisPar = $(this).parent();
        $("#select_address p.add_address").find('input[type="text"]').parent().find(".cancel_save").click();
        thisPar.find("a").hide();
        thisPar.find(" span").hide();
        thisPar.prepend('<a href="javascript:;" class="cancel_save">取消</a><a href="javascript:;" class="do_save">保存</a>');
        thisPar.append('<input type="text" id="o_addr" value="' + thisPar.find(" span").eq(0).text() + '"/><input type="text" id="o_phone" value="' + thisPar.find(" span").eq(1).text() + '"/><input type="text" id="o_altphone" value="' + thisPar.find(" span").eq(2).text() + '"/>')
    });
    $(".delete").click(function(){
        stopProcess($(this));
        var thisPar = $(this).parent();
        thisPar.slideUp();
        setTimeout(function(){
            thisPar.remove()
        }, 300);
        if ($(".add_address").length <= 0) {
            $("#select_address h2").after('<p class="add_address new_input"><a href="javascript:;" class="cancel_save">×</a><input type="radio" name="address" checked="checked"/><input type="text" id="o_addr" value="外卖送到的地址"/><input type="text" id="o_phone" value="联系电话"/><input type="text" id="o_altphone" value="备选电话(选填)"/></></p>');
            canAddNowAddress = false
        }
        if ($(".add_address input[type=radio]:checked").length <= 0) {
            $(".add_address:eq(0)").click()
        }
        var userContactInfoID = $(this).parent().attr("addressid");
        $.ajax({
            type: "POST",
            url: "../ajax/ContactInfo/DeleteContactInfoByID.ashx",
            data: {
                userContactInfoID: userContactInfoID
            },
            success: function(data){
            }
        })
    });
    $(".cancel_save").live("click", function(){
        var thisPar = $(this).parent();
        if (!thisPar.hasClass("new_input")) {
            thisPar.find("a.cancel_save,a.do_save").remove();
            thisPar.find(" input[type=text]").remove();
            thisPar.find("a").css("display", "");
            thisPar.find(" span").show()
        }
        else {
            $(".add_address:eq(1)").click()
        }
    });
    $(".do_save").live("click", function(){
        var thisPar = $(this).parent(), address = thisPar.find("input#o_addr").val(), phone = thisPar.find("input#o_phone").val(), altphone = thisPar.find("input#o_altphone").val();
        if (altphone == "备选电话(选填)") {
            $("input#o_altphone").val("").css("color", "#999")
        }
        if (altphone != "" && altphone != "备选电话(选填)") {
            var result = tools.checkMobile(altphone);
            if (result.isCorrect == false) {
                thisPar.find("input#o_altphone").val("电话有误");
                thisPar.find("input#o_altphone").focus();
                return
            }
            if (altphone.length > 11) {
                thisPar.find("input#o_altphone").val("电话有误");
                thisPar.find("input#o_altphone").focus();
                return
            }
        }
        var checkNum = checkAdd(address, phone);
        switch (checkNum) {
            case 0:
                thisPar.find(" span").eq(0).text(address);
                thisPar.find(" span").eq(1).text(phone);
                thisPar.find(" span").eq(2).text(altphone);
                thisPar.find("a.cancel_save").click();
                break;
            case 1:
                thisPar.find("#o_addr").addClass("c_red").val("地址输入错误");
                return;                break;
            case 2:
                thisPar.find("#o_phone").addClass("c_red").val("电话输入错误");
                return;                break;
            case 3:
                thisPar.find("#o_addr").addClass("c_red").val("地址输入错误");
                thisPar.find("#o_phone").addClass("c_red").val("电话输入错误");
                return;                break
        }
        PostChangeAddress($(this).parent().attr("addressID"), address, phone, altphone)
    });
    function PostChangeAddress(userContactInfoID, address, phone, altphone){
        contectInfo.userContactInfoID = userContactInfoID;
        contectInfo.userID = $.cookie("userID");
        contectInfo.address = address;
        contectInfo.phone = phone;
        contectInfo.altPhone = altphone;
        contectInfo.isDefault = 1;
        params.url = "/ajax/ContactInfo/ChangeContactInfo.ashx";
        params.type = "POST";
        params.data = contectInfo;
        params.success = function(){
        };
        tools.ajax(params)
    }
    $("#o_phone,#o_altphone").live("input", function(){
        var phone = $(this).val();
        if (phone.length > 11) {
            $(this).val(phone.substring(0, 11))
        }
    });
    $(".order_p_address, .order_p_address a").click(function(){
        shade.show();
        $("#select_address").show()
    });
    $("#address_cancel").click(function(){
        $("#select_address").hide();
        shade.hide();
        $(".cancel_save").each(function(){
            $(this).click()
        })
    });
    $("#use_address").click(function(){
        if ($("input#o_altphone").length > 0) {
            var altphone = $("input#o_altphone").val();
            if (altphone == "备选电话(选填)") {
                $("input#o_altphone").val("").css("color", "#999")
            }
            if (altphone != "" && altphone != "备选电话(选填)") {
                var result = tools.checkMobile(altphone);
                if (result.isCorrect == false) {
                    $("input#o_altphone").val("电话有误").css("color", "red");
                    $("input#o_altphone").live("focus", function(){
                        $(this).val("").css("color", "#999")
                    });
                    return
                }
            }
        }
        var thisAdd = $('input[name="address"]:checked').parent();
        if (thisAdd.hasClass("new_input")) {
            var address = thisAdd.find("#o_addr").val(), phone = thisAdd.find("#o_phone").val(), altphone = thisAdd.find("#o_altphone").val();
            if ($.trim(altphone) == "备选电话(选填)") {
                altphone = ""
            }
            var checkNum = checkAdd(address, phone);
            if (checkNum == 0) {
                $(".address_phone").html("<em>" + address + "</em><em>" + phone + "</em><em>" + altphone + "</em>");
                thisAdd.find(".do_save").click()
            }
            else {
                if (checkNum == 1) {
                    thisAdd.find("#o_addr").addClass("c_red").val("地址输入错误");
                    return
                }
                else {
                    if (checkNum == 2) {
                        thisAdd.find("#o_phone").addClass("c_red").val("电话输入错误");
                        return
                    }
                    else {
                        if (checkNum == 3) {
                            thisAdd.find("#o_addr").addClass("c_red").val("地址输入错误");
                            thisAdd.find("#o_phone").addClass("c_red").val("电话输入错误");
                            return
                        }
                    }
                }
            }
            IsNewAddress = 1;
            $("#address_cancel").click()
        }
        else {
            thisAdd.find(".do_save").click();
            if (thisAdd.find("input.c_red").length < 1) {
                $(".address_phone").html("<em>" + thisAdd.find(".u_address").first().text() + "</em><em>" + thisAdd.find(".u_phone").first().text() + "</em><em>" + thisAdd.find(".u_altphone").first().text() + "</em>");
                $("#address_cancel").click()
            }
            var userContactInfoID = $(thisAdd).attr("addressid");
            PostChangeAddress(userContactInfoID, thisAdd.find(".u_address").first().text(), thisAdd.find(".u_phone").first().text(), thisAdd.find(".u_altphone").first().text());
            IsNewAddress = 0
        }
    });
    $("#o_addr,#o_phone,#o_altphone").live("click", function(){
        var thisObj = $(this);
        stopProcess(thisObj);
        window.focus();
        this.focus()
    });
    $("#o_addr,#o_phone,#o_altphone").live("focus", function(){
        var thisObj = $(this);
        stopProcess(thisObj);
        switch (thisObj.attr("id")) {
            case "o_addr":
                if (thisObj.val() == "外卖送到的地址") {
                    thisObj.val("")
                }
                else {
                    if (thisObj.val() == "地址输入错误") {
                        thisObj.val("");
                        thisObj.removeClass("c_red")
                    }
                }
                break;
            case "o_phone":
                if (thisObj.val() == "联系电话") {
                    thisObj.val("")
                }
                else {
                    if (thisObj.val() == "电话输入错误") {
                        thisObj.val("");
                        thisObj.removeClass("c_red")
                    }
                }
                break;
            case "o_altphone":
                if (thisObj.val() == "备选电话(选填)") {
                    thisObj.val("").css("color", "#999")
                }
                break
        }
    });
    $("#o_addr,#o_phone,#o_altphone").live("blur", function(){
        var thisObj = $(this);
        switch (thisObj.attr("id")) {
            case "o_addr":
                if (thisObj.val() == "") {
                    thisObj.val("外卖送到的地址")
                }
                break;
            case "o_phone":
                if (thisObj.val() == "") {
                    thisObj.val("联系电话")
                }
                break;
            case "o_altphone":
                if (thisObj.val() == "") {
                    thisObj.val("")
                }
                break
        }
    });
    $("#sendOrder").bind("click", function(){
        var $trigger = $(this);
        if ($(".address_phone em").html() == "" || $(".address_phone em").html() == "请填写地址") {
            $(".change_address").click();
            return
        }
        var FoodList = new Array();
        var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
        if (!tools.IsEmpty(kcbCarInFo)) {
            FoodList = kcbCarInFo.FoodInfos
        }
        if (FoodList.length == 0) {
            return
        }
        orderInfo.userID = $.cookie("userID"), orderInfo.address = $.trim($(".address_phone em").eq(0).html()), orderInfo.phone = $.trim($(".address_phone em").eq(1).html()), orderInfo.altPhone = $.trim($(".address_phone em").eq(2).html()), orderInfo.areaID = areaID = $.cookie("areaID"), orderInfo.kcbcartInfo = $.cookie("KcbCarInfo");
        $trigger.attr("disabled", "disabled");
        orderInfo.isSendMessage = 0;
        var sendTime = $("#input_time").html(), sendNotes = $("#leave_message_box").val();
        if (sendNotes == "给餐厅留言") {
            sendNotes = ""
        }
        if (sendTime == "立即送出") {
            sendTime = ""
        }
        else {
            sendTime = sendTime.substring(0, 5) + "送出"
        }
        orderInfo.notes = sendNotes + sendTime;
        if (tools.IsEmpty(orderInfo.userID) || parseInt(orderInfo.userID) <= 0) {
            orderInfo.userID = anonymous(orderInfo.phone, orderInfo.address);
            if (parseInt(orderInfo.userID) < 0) {
                ShowMessage("系统繁忙，暂时无法下单，您可以刷新页面再尝试下单");
                $trigger.removeAttr("disabled");
                return false
            }
        }
        $trigger.css({
            "background-position": "left bottom",
            color: "#818181"
        }).val("正在提交").attr("disabled", "disabled");
        if (IsNewAddress == 1) {
            contectInfo.userID = orderInfo.userID;
            contectInfo.address = orderInfo.address;
            contectInfo.phone = orderInfo.phone;
            contectInfo.altPhone = orderInfo.altPhone;
            contectInfo.isDefault = 1;
            params.url = "/ajax/ContactInfo/AddNewContactInfo.ashx";
            params.type = "POST";
            params.data = contectInfo;
            params.success = function(){
            };
            tools.ajax(params)
        }
        params.type = "POST";
        params.async = false;
        params.url = "/order/SendOrder";
        params.data = orderInfo;
        params.dataType = "text";
        params.success = function(data){
            result = data
        };
        tools.ajax(params);
        var flag = "";
        switch (result) {
            case "-1":
                ShowMessage("下单失败！");
                flag = "1";
                break;
            case "-2":
                ShowMessage("订单信息不真实！");
                flag = "1";
                break;
            case "-3":
                ShowMessage("该餐厅未上线！");
                flag = "1";
                break;
            case "-4":
                ShowMessage("订单总金额小于起送价！");
                flag = "1";
                break;
            case "-10":
            case "-11":
            case "-12":
                ShowMessage("系统异常！");
                flag = "1";
                break;
            case "-13":
                $(".validRs").html("验证码错误");
                flag = "1";
                break;
            case "-15":
                ShowMessage("该餐厅不是推荐餐厅，请重新下单！");
                window.location = "/area/" + areaID;
                flag = "1";
                break;
            default:
                if (result == null || result == "") {
                    ShowMessage("下单失败，请重新点击确认下单按钮！");
                    flag = "1"
                }
                else {
                    if (parseInt(result) > 0) {
                        location.href = "/order/success/" + result
                    }
                }
                break
        }
        if (flag == "1") {
            $trigger.val("确认下单").css({
                background: "url(../assets/base/button-big.png)",
                color: "#963"
            });
            $trigger.removeAttr("disabled")
        }
    });
    function ShowMessage(message){
        $.XYTipsWindow({
            ___title: "开吃吧提示",
            ___drag: "___boxTitle",
            ___width: "300px",
            ___height: "100px",
            ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">' + message + "！</p>",
            ___showbg: true,
            ___time: 1800
        })
    }
});
