
function regist(){
};
var tools = new tool();
var params = {};
regist.prototype = {
    checkmail: function(mail, source){
        var result;
        result = tools.mailboxFormat(mail);
        if (!result.isCorrect) {
            $("#Mail").next("p").html(result.message).removeClass("focusTips").addClass("logTips");
            return false;
        }
        result = tools.checkMailExist(mail);
        if (parseInt(result) > 0) {
            switch (source) {
                case "float":
                    $("#Mail").next("p").html("该帐号已注册").removeClass("focusTips").addClass("logTips");
                    return false;
                default:
                    $("#Mail").next("p").removeClass("focusTips").addClass("logTips").html("帐号存在,请直接<a href='#'  onclick='ChangeTrigger()' style='color:blue'>登录</a>");
                    return false;
            }
        }
        else {
            $("#Mail").next("p").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
            return true;
        }
    },
    checkPassword: function(pwd, pwd2, type){
        var result;
        result = tools.commonCheckPassword(pwd, "^[0-9a-zA-z_]{6,15}$");
        if (result.isCorrect == false) {
            $("#PassWord").next("p").text(result.message).removeClass("focusTips").addClass("logTips");
            return false;
        }
        if (type == 2 && pwd != pwd2) {
            $("#PassWord2").next("p").text("前后输入不一致").removeClass("focusTips").addClass("logTips");
            return false;
        }
        if (result.isCorrect == true) {
            $("#PassWord2").next("p").removeClass("logTips").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
        }
        $("#PassWord").next("p").removeClass("logTips").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
        return true;
    },
    checkNickName: function(nickname){
        var result;
        result = tools.commonCheckFormat(nickname, "^.{1,20}$");
        if (result.isCorrect == false) {
            $("#NickName").next("p").text(result.message).removeClass("focusTips").addClass("logTips");
            return false;
        }
        $("#NickName").next("p").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
        return true;
    },
    registIn: function(datas){
        var result;
        params.type = "POST";
        params.async = false;
        params.url = "../ajax/Login_Register/userRegist.ashx";
        params.data = datas;
        params.dataType = "json";
        params.success = function(data){
            result = data;
        };
        tools.ajax(params);
        return parseInt(result["userID"].toString()) > 0 ? true : false;
    },
    InviteUserRelation: function(){
        var result;
        params.type = "POST";
        params.url = "../ajax/Login_Register/InviteUserRelation.ashx";
        params.data = {
            userID: $.cookie("userID"),
            inviteID: $("#inviteUserID").val()
        };
        params.dataType = "text";
        params.success = function(data){
            result = data;
        };
        tools.ajax(params);
        return parseInt(result) > 0 ? true : false;
    },
    ShowInviteUserInfo: function(){
        $("#mailInfo").html($("#Mail").val());
        $("#mobileInfo").html($("#bind_phone").val());
        $("#XYTipsWindowBg").css("display", "block");
        $("#newRegistInfo").css("display", "block");
    },
    floatSuccess: function(){
        var seenum = $.trim($.cookie("seenum"));
        var preurl = $.cookie("preURL");
        if (preurl.indexOf("rush_food") >= 0) {
            $.cookie('isTrigger', '1', {
                expires: 1
            });
            parent.location.href = preurl;
        }
        else 
            if (seenum != null && seenum == 1) {
                $.cookie('seenum', '', {
                    expires: -1
                });
                parent.location.href = preurl;
            }
            else {
                parent.location.href = "order.aspx";
            }
    },
    inviteSuccess: function(){
        this.InviteUserRelation();
        this.ShowInviteUserInfo();
        $("#RegistIn").next("p").html("");
    }
};
function checkemail(mail, source){
    var result;
    result = tools.mailboxFormat(mail);
    if (!result.isCorrect) {
        $("#Mail").next("p").html(result.message).removeClass("focusTips").addClass("logTips");
        return false;
    }
    result = tools.checkMailExist(mail);
    if (parseInt(result) > 0) {
        switch (source) {
            case "float":
                $("#Mail").next("p").html("该帐号已注册").removeClass("focusTips").addClass("logTips");
                return false;
            default:
                $("#Mail").next("p").removeClass("focusTips").addClass("logTips").html("帐号存在,请直接<a href='login.aspx' style='color:blue'>登录</a>");
                return false;
        }
    }
    else {
        $("#Mail").next("p").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
        return true;
    }
}

var isregist = 0;
function check(TextId, Regular){
    var value = $.trim($(TextId).val()), RegularExp = new RegExp(Regular);
    $(TextId).next("p").text("").removeClass("logTips");
    if (RegularExp.test(value)) {
        if (TextId == "#Mail") {
            return true;
        }
        $(TextId).next("p").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />").removeClass("logTips");
        return true;
    }
    else {
        return false;
    }
}

function checkall(source){
    var mail = $.trim($("#Mail").val()), nickName = $.trim($("#NickName").val()), password1 = $.trim($("#PassWord").val()), password2 = $.trim($("#PassWord2").val()), regists = new regist();
    if (!regists.checkmail(mail, source)) {
        return false;
    }
    if (!regists.checkNickName(nickName)) {
        return false;
    }
    if (!regists.checkPassword(password1, 0, 1)) {
        return false;
    }
    if (!regists.checkPassword(password1, password2, 2)) {
        return false;
    }
    else {
        $("#mobileTips").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
        return true;
    }
}

function checkAndRetist(source){
    var regists = new regist();
    var mail = $.trim($("#Mail").val()), nickName = $.trim($("#NickName").val()), phone = $.trim($("#bind_phone").val()), password1 = $.trim($("#PassWord").val()), $mail = $("#Mail").next("p"), $nickName = $("#NickName").next("p"), $password1 = $("#PassWord").next("p"), uniID = $.cookie("uniID"), isRedirect = 1, regIP = $.cookie("regIP");
    uniID = uniID == null ? 0 : uniID;
    var info = {
        Mail: mail,
        NickName: nickName,
        PassWord: password1,
        uniID: uniID,
        regIP: regIP,
        Phone: phone
    };
    if (!checkall(source)) {
        return false;
    }
    if (source == "invite") {
        if (!checkmobile()) {
            return false;
        }
        if (!checkCode()) {
            return false;
        }
    }
    $("#RegistIn").val("正在提交").attr("disabled", "disabled");
    if (!regists.registIn(info)) {
        $.XYTipsWindow({
            ___title: "开吃吧提示",
            ___drag: "___boxTitle",
            ___width: "300px",
            ___height: "100px",
            ___content: "text:<p style=\"color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;\">网络繁忙，请稍候再重新注册！</p>",
            ___showbg: true,
            ___time: 1800
        });
        $("#RegistIn").val("注册").removeAttr("disabled");
        return false;
    }
    else {
        switch (source) {
            case "float":
                regists.floatSuccess();
                return;case "invite":
                regists.inviteSuccess();
                setTimeout(function(){
                    window.location = "http://kaichiba.com";
                }, 5200);
                return false;
        }
    }
}

function EnterKeyClickLogin(button){
    if (event.keyCode == 13) {
        event.returnValue = false;
        event.cancel = true;
        if (button == "RegistIn") {
            document.all[button].click();
        }
    }
}

$(document).ready(function(){
    isFloatingLayerRegeist = $("#isFloatingLayer").val();
    var regists = new regist();
    $(".login input[type=\"text\"]").focus(function(){
        $(this).css({
            "border": "1px solid #aaa",
            "color": "#000"
        });
    }).blur(function(){
        $(this).css({
            "border": "1px solid #ccc",
            "color": "#666"
        });
    });
    $("#Mail").blur(function(){
        var mail = $.trim($(this).val()), $mail = $(this).next("p");
        if (mail == "") {
            $("#Mail").next("p").text("邮箱不能为空").removeClass("focusTips").addClass("logTips");
        }
        else {
            if ($(this).prev("label").html() == "登录邮箱：") {
                checkemail(mail);
                return;
            }
            regists.checkmail(mail);
        }
    }).focus(function(){
        $("#Mail").next("p").text("请输入你的常用邮箱").removeClass("logTips").addClass("focusTips");
    });
    $("#Mail").focus();
    $("#NickName").blur(function(){
        var nickName = $.trim($("#NickName").val()), $nickName = $("#NickName").next("p");
        if (nickName == "") {
            $nickName.text("昵称不能为空").removeClass("focusTips").addClass("logTips");
        }
        else {
            regists.checkNickName(nickName);
        }
    }).focus(function(){
        $("#NickName").next("p").text("请输入昵称，最长20个字符").removeClass("logTips").addClass("focusTips");
    });
    $("#PassWord").blur(function(){
        var password1 = $.trim($("#PassWord").val()), $password1 = $("#PassWord").next("p");
        if (password1 == "") {
            $password1.text("密码不能为空").removeClass("focusTips").addClass("logTips");
        }
        else {
            regists.checkPassword(password1, 0, 1);
        }
    }).focus(function(){
        $("#PassWord").next("p").text("密码必须由6-15个字符组成").removeClass("logTips").addClass("focusTips");
    });
    $("#PassWord2").blur(function(){
        var password2 = $.trim($("#PassWord2").val()), $password2 = $("#PassWord2").next("p"), password1 = $.trim($("#PassWord").val());
        if (password2 == "") {
            $password2.text("请确认密码").removeClass("focusTips").addClass("logTips");
        }
        else {
            regists.checkPassword(password1, password2, 2);
        }
    }).focus(function(){
        $("#PassWord2").next("p").text("").removeClass("logTips").addClass("focusTips");
    });
    $("#bind_phone").blur(function(){
        var phoneNum = $.trim($("#bind_phone").val()), $phoneNum = $("#bind_phone").next("p");
        if (phoneNum == "") {
            $phoneNum.text("");
        }
        else {
            if (checkmobile()) {
                $("#mobileTips").html("<img src=\"../image/tick_circle.png\" alt=\"正确\" />");
                return true;
            }
        }
    }).focus(function(){
        $("#bind_phone").next("p").text("请输入可用的手机号码").removeClass("logTips").addClass("focusTips");
    });
});
