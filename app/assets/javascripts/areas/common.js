function tool() {}
tool.prototype = {
    ajax: function(a) {
        $.ajax(a)
    },
    checkValidateCode: function(b, c) {
        var d = {},
        a = "";
        if (this.IsEmpty(b)) {
            return "验证码不能为空 "
        }
        d.type = "POST";
        d.async = false;
        d.url = "/ajax/ValidateCode.ashx";
        d.data = {
            validateCode: b,
            time: c
        };
        d.dataType = "text";
        d.success = function(e) {
            a = e
        };
        this.ajax(d);
        switch (a) {
        case "-1":
            return "验证码错误";
        case "-2":
            return "验证码过期";
        case "-3":
            return "网络连接超时,请刷新页面重新操作";
        case "1":
            return "1"
        }
    },
    IsEmpty: function(a) {
        if (a == null || a == "" || a === "null") {
            return true
        } else {
            return false
        }
    },
    mailboxFormat: function(a) {
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "邮箱不能为空"
            }
        }
        RegularExp = new RegExp("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
        if (!RegularExp.exec(a)) {
            return {
                isCorrect: false,
                message: "邮箱格式错误"
            }
        }
        return {
            isCorrect: true,
            message: ""
        }
    },
    checkMailExist: function(b) {
        var c = {};
        var a = "";
        c.type = "POST";
        c.async = false;
        c.url = "/user/CheckUserMail";
        c.data = {
            mail: b
        };
        c.dataType = "text";
        c.success = function(d) {
            a = d
        };
        this.ajax(c);
        return a
    },
	checkUserExist: function(phone, addr) {
        var c = {};
        var a = "";
        c.type = "POST";
        c.async = false;
        c.url = "/user_contact/CheckContactInfo";
        c.data = {
            phone: phone,
			addr: addr
        };
        c.dataType = "text";
        c.success = function(d) {
            a = d
        };
        this.ajax(c);
        return a
    },
    commonCheckFormat: function(a, b) {
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "内容不能为空"
            }
        }
        RegularExp = new RegExp(b);
        if (!RegularExp.exec(a)) {
            return {
                isCorrect: false,
                message: "格式不符合要求"
            }
        }
        return {
            isCorrect: true,
            message: ""
        }
    },
    commonCheckPassword: function(a, b) {
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "密码不能为空"
            }
        }
        RegularExp = new RegExp(b);
        if (!RegularExp.exec(a)) {
            return {
                isCorrect: false,
                message: "密码不符合要求"
            }
        }
        return {
            isCorrect: true,
            message: ""
        }
    },
    getRandom: function(d, b) {
        var c = "";
        for (var a = 0; a < d; a++) {
            c += this.getLetters(b)
        }
        return c
    },
    getLetters: function(b) {
        var c = "1 2 3 4 5 6 7 8 9 0 a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");
        var d = "a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");
        var a = "0 1 2 3 4 5 6 7 8 9".split(" ");
        switch (b) {
        case 1:
            return d[Math.floor(Math.random() * 52)];
        case 2:
            return a[Math.floor(Math.random() * 10)];
        case 3:
            return c[Math.floor(Math.random() * 62)];
        default:
            return ""
        }
    },
    checkMobile: function(a) {
        var b = new RegExp("^1[0-9]{10}");
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "手机号不能为空"
            }
        }
        if (a.length < 11) {
            return {
                isCorrect: false,
                message: "请输入11位手机号"
            }
        }
        if (!b.exec(a)) {
            return {
                isCorrect: false,
                message: "手机号码格式错误"
            }
        }
        if (b.exec(a)) {
            return {
                isCorrect: true,
                message: "手机号码正确"
            }
        } else {
            return {
                isCorrect: false,
                message: "手机号码格式错误"
            }
        }
    },
    checkQQ: function(b) {
        var a = new RegExp("^[1-9][0-9]{4,9}$");
        if (this.IsEmpty(b)) {
            return {
                isCorrect: false,
                message: "QQ号码不能为空"
            }
        } else {
            if (!a.test(b)) {
                return {
                    isCorrect: false,
                    message: "QQ号码格式错误"
                }
            } else {
                return {
                    isCorrect: true,
                    message: ""
                }
            }
        }
    },
    checkPhone: function(a) {
        var b = /^[0-9\-]*$/;
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "电话号码不能为空"
            }
        }
        if (a.length < 7 || a.indexOf("1") == 0 || !b.test(a)) {
            return {
                isCorrect: false,
                message: "电话号码格式错误"
            }
        } else {
            if (b.test(a)) {
                return {
                    isCorrect: true,
                    message: "电话号码正确"
                }
            } else {
                return {
                    isCorrect: false,
                    message: "电话号码格式错误"
                }
            }
        }
    },
    checkNum: function(b) {
        var a = /^\d+$/;
        if (this.IsEmpty(b)) {
            return {
                isCorrect: false,
                message: "电话号码不能为空"
            }
        } else {
            if (a.test(b)) {
                return {
                    isCorrect: true,
                    message: "电话号码正确"
                }
            } else {
                return {
                    isCorrect: false,
                    message: "电话号码格式错误"
                }
            }
        }
    },
    checkPassword: function(a) {
        if (this.IsEmpty(a)) {
            return {
                isCorrect: false,
                message: "密码不能为空"
            }
        } else {
            if (a.length < 6) {
                return {
                    isCorrect: false,
                    message: "密码长度不能小于6位"
                }
            } else {
                if (a.length > 15) {
                    return {
                        isCorrect: false,
                        message: "密码长度不能大于15位"
                    }
                } else {
                    return {
                        isCorrect: true,
                        message: "输入正确"
                    }
                }
            }
        }
    },
    floatAdd: function(f, d) {
        var c, b, a;
        try {
            c = f.toString().split(".")[1].length
        } catch(g) {
            c = 0
        }
        try {
            b = d.toString().split(".")[1].length
        } catch(g) {
            b = 0
        }
        a = Math.pow(10, Math.max(c, b));
        return (f * a + d * a) / a
    },
    floatMul: function(d, b) {
        var a = 0,
        f = d.toString(),
        c = b.toString();
        try {
            a += f.split(".")[1].length
        } catch(g) {}
        try {
            a += c.split(".")[1].length
        } catch(g) {}
        return Number(f.replace(".", "")) * Number(c.replace(".", "")) / Math.pow(10, a)
    }
};
function stopProcess(a) {
    a = a || window.event;
    if (a.stopPropagation) {
        a.stopPropagation()
    } else {
        a.cancelBubble = true
    }
}
function satTextarea(c, b) {
    var a = c.value.length;
    if (a < b) {
        $(".satNumbers").next().html("还可以输入<strong>" + b + "</strong>个汉字");
        $(".reply_addtip strong").html(b - a)
    } else {
        $(".satNumbers").next().html("已超过<strong>50</strong>个汉字");
        $(".reply_addtip strong").html(a - b)
    }
}
function request(c) {
    var b = location.href,
    d = b.substring(b.indexOf("?") + 1, b.length).split("&"),
    a = {},
    e;
    for (i = 0; j = d[i]; i++) {
        a[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
    }
    e = a[c.toLowerCase()];
    if (typeof(e) == "undefined") {
        return ""
    } else {
        return e
    }
}
if ($("#orderDynamicList").length > 0) {
    var aniSpeed = {
        slow: 2000,
        med: 1000,
        fast: 500,
        flash: 200
    };
    function foodListScroll() {
        $("#orderDynamicList").stop().animate({
            top: "46px"
        },
        aniSpeed.med,
        function() {
            $("#orderDynamicList").css("top", "0");
            $("#orderDynamicList li:last").stop().css("opacity", 0).prependTo("#orderDynamicList").animate({
                opacity: 1
            },
            aniSpeed.med)
        })
    }
    setInterval("foodListScroll()", 4000)
}
function setMessageReaded() {
    var a = new tool();
    var b = {};
    b.type = "POST";
    b.async = false;
    b.url = "http://kaichiba.com/ajax/Notice/SetaAllMessageReaded.ashx";
    b.dataType = "text";
    b.success = function(c) {};
    a.ajax(b)
}
function newUnreadMessage() {
    $.ajax({
        type: "POST",
        async: false,
        url: "/ajax/Notice/GetUnReadMessageByUserID.ashx",
        dataType: "text",
        success: function(a) {
            if (a == "") {
                $(".num").html(0).hide()
            } else {
                if (a == "-1") {
                    window.clearTimeout(t);
                    return
                } else {
                    messageArray = a.split("|");
                    var c = parseInt(messageArray[1]);
                    var d = messageArray[2];
                    if (c == 0 || isNaN(c)) {
                        $(".num").hide();
                        $(".notification").removeClass("has_noti")
                    } else {
                        $(".num").html(c).show()
                    }
                    if (d != "") {
                        var b = d.split(",");
                        $(".urgency_message").attr("NoticeID", b[0]);
                        $(".urgency_message #UserPhone").html(b[1]);
                        $(".urgency_message").show();
                        $("#shade").show()
                    }
                    $(".MessageBox").html(messageArray[0]);
                    NavMessage()
                }
            }
        }
    })
}
function setHeight(c, b) {
    var a = b.height();
    if (c.height() < a) {
        c.height(a + 20)
    }
}
function NavMessage() {
    $(".MessageBox li").bind("click",
    function() {
        var a = $(this).attr("messagetype");
        if (a == 1) {
            if ($.cookie("isLogin") == 0 || $.cookie("isLogin") == null) {
                window.location.href = "http://kaichiba.com/personal/iTodayOrder_anonymous.aspx";
                return
            }
            window.location.href = "http://kaichiba.com/personal/iTodayOrder.aspx"
        } else {
            if (a == 2) {
                if ($.cookie("isLogin") == 0 || $.cookie("isLogin") == null) {
                    window.location.href = "http://kaichiba.com/personal/sysNotice_anonymous.aspx";
                    return
                }
                window.location.href = "http://kaichiba.com/personal/sysNotice.aspx"
            } else {
                if (a == 3) {
                    window.location.href = "http://kaichiba.com/personal/iSupMessage.aspx"
                } else {
                    if (a == 4) {
                        window.location.href = "http://kaichiba.com/personal/iMessage.aspx"
                    }
                }
            }
        }
    })
}
$(document).ready(function() {
    if ($.browser.msie) {
        if ($.browser.version == "6.0") {
            $(document.body).append('<div id="ie6_bg"></div><div id="ie6_tip"><div id="ie6_sorry">对不起，您的浏览器版本过低，您可以尝试：</div><div id="ie6_update">升级浏览器</div></div>');
            $("#ie6_update").click(function() {
                location.href = "http://chrome.360.cn/"
            })
        }
    }
    var h, a;
    $(".quick_menu .Newaccount").click(function() {
        if ($(".layer_topInfo").is(":hidden")) {
            $(".layer_top_Message").hide();
            $(".layer_topInfo").css("display", "block")
        } else {
            $(".layer_topInfo").css("display", "none")
        }
    });
    $("#keyword").focus(function() {
        var k = $(this);
        var l = k.val();
        if (l == "搜索餐厅、美食") {
            k.val("")
        }
    }).blur(function() {
        if ($(this).val() == "" || $(this).val() == "搜索餐厅、美食") {
            $(this).val("搜索餐厅、美食")
        }
    });
    if ($("#fSidebar").length > 0) {
        setHeight($("#fSidebar"), $("#about"))
    }
    if ($("#pCenter").length > 0) {
        setHeight($("#pMenu"), $("#pCenter"))
    }
    var c = $.cookie("areaID"),
    b = $.cookie("areaName"),
    g = $.trim($(".title-txt").html()),
    f = {},
    d = new tool();
    $(".fSideNav a").each(function() {
        if ($(this).html() == g) {
            $(this).parent().addClass("active")
        }
    });
    if ($("#needUniCookie").length == 0) {
        if (d.IsEmpty(c) || d.IsEmpty(b)) {
            location.href = "/home";
            return
        } else {
            $("#school_index").prepend(b);
            $("#school a").eq(0).attr("href", "/areas/" + c).html(b);
            $("#school a").eq(1).attr("href", "/home")
        }
    } else {
        if (d.IsEmpty(c) || d.IsEmpty(b)) {
            $("#school_index").prepend("请选择您的位置");
            $("#school a").eq(0).attr("href", "/areas/" + c).html("请选择您的位置");
            $("#school a").eq(1).attr("href", "/home")
        } else {
            $("#school_index").prepend(b);
            $("#school a").eq(0).attr("href", "/areas/" + c).html(b);
            $("#school a").eq(1).attr("href", "/home")
        }
    }
    if (!d.IsEmpty($.cookie("userID"))) {
        t = setTimeout(function() {
            newUnreadMessage()
        },
        0)
    }
    $(".urgency_message_bottom").live("click",
    function() {
        var k = $(".urgency_message").attr("NoticeID");
        $(".urgency_message").hide();
        $("#shade").hide();
        $.ajax({
            type: "POST",
            url: "../ajax/Notice/ChangeSysNoticeState.ashx",
            data: {
                noticeID: k
            },
            success: function(l) {
                $(".urgency_message").attr("NoticeID", "");
                $(".urgency_message #UserPhone").html("");
                t = setTimeout(function() {
                    newUnreadMessage()
                },
                0)
            }
        })
    });
    $(".setallmessage").live("click",
    function() {
        $(".layer_top_Message").css("display", "none");
        $(".num").hide();
        $(".notification").removeClass("has_noti");
        $(".MessageBox li").addClass("readed");
        $(".MessageBox strong").css("color", "#b4b4b4");
        setMessageReaded();
        return false
    });
    NavMessage();
    $("#feedback_btn").click(function() {
        $(".authenticationCode_fBack").click();
        $.XYTipsWindow({
            ___title: "开吃吧提示",
            ___drag: "___boxTitle",
            ___width: "500px",
            ___height: "240px",
            ___content: "id:MsgHide",
            ___showbg: true
        });
        var k = $.cookie("kcb");
        if (k == null) {
            $("#isUser").css("display", "none");
            $("#isVisitor").css("display", "block");
            $("#visitorMail").val("")
        }
        $("#authenticationCode_fBack").click();
        $(".validRs").html("");
        $("#feedbackTip").next().val("");
        $(".ValiDateCode").val("")
    });
    $(".feedBackBt").click(function() {
        var p = $.trim($("#feedBackTipContent").val()),
        n = $.trim($("#fBackValiDateCode").val()),
        m = $.trim($("#ajaxUrl").val());
        var k = d.checkValidateCode(n, 100);
        if (p == null || p == "") {
            $(".fBackValiRs").html("内容不能为空");
            return
        }
        if (k != "1") {
            $(".fBackValiRs").html(k);
            $("#authenticationCode_fBack").click();
            return
        }
        var l = $.cookie("userID");
        if (l == null) {
            var o = $("#visitorMail").val();
            if (o != null) {
                k = d.mailboxFormat(o);
                if (k.isCorrect == false) {
                    $(".fBackValiRs").html(k.message).css("color", "red");
                    return
                }
                p += " *****游客联系邮箱：" + o
            }
        }
        f.type = "POST";
        f.async = false;
        f.url = "/ajax/FeedBackMessage.ashx";
        f.dataType = "text";
        f.data = {
            content: p,
            validateCode: n
        };
        f.success = function(q) {
            if (q == "1") {
                parent.$.XYTipsWindow.removeBox();
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align:center;margin-top:40px;font-size:16px;font-weight:bold;">感谢您的宝贵建议！</p>',
                    ___showbg: true,
                    ___time: 1800
                });
                $("#feedBackTipContent").val("")
            } else {
                parent.$.XYTipsWindow.removeBox();
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">问题反馈失败，请重试！</p>',
                    ___showbg: true,
                    ___time: 1800
                })
            }
            $("#top_authenticationCode_fBack").click()
        };
        d.ajax(f)
    });
    $(".fCancelBt").live("click",
    function() {
        parent.$.XYTipsWindow.removeBox();
        $(".validRs").html("");
        $("#feedBackTip").next().val("");
        $(".fBackValiDateCode").val("")
    });
    if ($.trim($("#hotFoodExsit").val()) == 1 && !d.IsEmpty(c)) {
        var e;
        f.type = "GET";
        f.url = "../inc/RecommendFood/" + c + ".txt";
        f.dataType = "text";
        f.success = function(k) {
            e = k.toString();
            $("#hotFood").css("display", "block");
            $("#hotFoodContent").html(e);
            $("a.addHotFood").click(function() {
                var l = $(this).next().html();
                $.cookie("searchFoodId", l, {
                    path: "/",
                    expires: 1
                })
            })
        };
        d.ajax(f)
    } else {
        $("#hotFood").css("display", "none")
    }
//    if (!d.IsEmpty(c)) {
//        f.type = "GET";
//        f.url = "http://kaichiba.com/inc/SysNotice/" + $.cookie("uniID") + ".txt";
//        f.dataType = "text";
//        f.success = function(k) {
//            if (k.indexOf("</html>") > 0) {
//                return
//            } else {
//                $("#siteNotice .ri_body").html(k.toString())
//            }
//        };
//        d.ajax(f)
//    }
    $(".tabHd li").click(function() {
        $trigger = $(this);
        if (!$trigger.hasClass("tabSelect")) {
            $trigger.addClass("tabSelect").siblings().removeClass("tabSelect");
            if ($.trim($trigger.html()) == "注册") {
                $(".minLogin").css("display", "none");
                $(".minRegist").css("display", "block")
            }
            if ($.trim($trigger.html()) == "登录") {
                $(".minLogin").css("display", "block");
                $(".minRegist").css("display", "none")
            }
        }
    });
    $(".minLoginBg,.close").click(function() {
        $(".minLoginBg,.minLogReg").css("display", "none")
    })
});
function ChangeTrigger() {
    dispatch(window.parent.document.getElementById("Tb_tabHd"), "click")
}
function dispatch(h, e) {
    try {
        var f = document.createEvent("Event");
        f.initEvent(e, true, true);
        h.dispatchEvent(f)
    } catch(g) {
        alert(g)
    }
};