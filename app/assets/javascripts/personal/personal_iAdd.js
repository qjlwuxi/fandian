var regExpMobile = new RegExp("^1[0-9]{10}"), regex = /^[0-9\-]*$/, userID = $.cookie("userID"), s = new tool();
function checkDelivery(e, c, b){
    var a = "";
    if (e == null || e == "") {
        $("#NewAddress").next().removeClass("focusTips").addClass("logTips").html("送餐地址不能为空");
        a = false
    }
    if (c == null || c == "") {
        $("#NewPhone").next().removeClass("focusTips").addClass("logTips").html("手机号码不能为空");
        a = false
    }
    if (!s.checkMobile(c).isCorrect) {
        $("#NewPhone").next().removeClass("focusTips").addClass("logTips").html(s.checkMobile(c).message)
    }
    if (s.checkMobile(c).isCorrect) {
        a = true
    }
    if (b != null && b != "") {
        var d = b;
        var a = "";
        a = s.checkMobile(d);
        if (a.isCorrect == false) {
            a = s.checkPhone(d);
            if (a.isCorrect == false) {
                $("#NewAltPhone").next().removeClass("focusTips").addClass("logTips").html(a.message);
                return false
            }
            else {
                $("#NewAltPhone").next().removeClass("logTips").addClass("focusTips").html(a.message)
            }
        }
        else {
            $("#NewAltPhone").next().removeClass("logTips").addClass("focusTips").html(a.message)
        }
    }
    return a
}

function saveDeliveryFoodTel(){
    var c = $.trim($("#NewAddress").val()), b = $.trim($("#NewPhone").val()), a = $.trim($("#NewAltPhone").val());
    if (checkDelivery(c, b, a)) {
        var d = "NewAddress=" + c + "&NewPhone=" + b + "&NewAltPhone=" + a;
        $.ajax({
            url: "../ajax/ContactInfo/AddDeliveryFood.ashx",
            data: d,
            dataType: "json",
            success: function(e){
                if (e.Status) {
                    var f = "<tr><td type='address'>" + c + "</td><td class='td_center' type='phone'>" + b + "</td><td  class='td_center' type='AlternatePhone'>" + a + '</td><td><a class="to_default" href="javascript:;">设为默认</a> <span style="display: none;">' + e.id + '</span><a href="#" class="change">修改</a><a href="#" class="del">删除</a></td></tr>';
                    $("#NewAddress,#NewPhone,#NewAltPhone").val("");
                    $("#tbDeliveryInfo").append(f)
                }
                else {
                    $.XYTipsWindow({
                        ___title: "开吃吧提示",
                        ___drag: "___boxTitle",
                        ___width: "300px",
                        ___height: "100px",
                        ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">' + e.Info + "！</p>",
                        ___showbg: true,
                        ___time: 1800
                    })
                }
                setHeight($("#pMenu"), $("#pCenter"))
            },
            error: function(e){
            }
        })
    }
}

function setDefaultAddr(g){
    var a = $(g).parent();
    var d = $.trim(a.siblings('[type="address"]').html());
    var c = $.trim(a.siblings('[type="phone"]').html());
    var b = $.trim(a.siblings('[type="AlternatePhone"]').html());
    var e = $.trim($(g).next().html());
    var f = $.cookie("userID");
    $.ajax({
        type: "POST",
        url: "../ajax/ContactInfo/ChangeContactInfo.ashx",
        data: {
            userContactInfoID: e,
            userID: f,
            address: d,
            phone: c,
            altphone: b,
            isDefault: "1"
        },
        success: function(h){
            if (h == 1) {
                $(".default").removeClass("default").addClass("to_default").html("设为默认");
                a.children(".to_default").removeClass("to_default").addClass("default").html("默认信息")
            }
            else {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">暂时无法设置为默认!</p>',
                    ___showbg: true,
                    ___time: 1800
                })
            }
        },
        error: function(h){
        }
    })
}

function changeAddr(f){
    var a = f.parent().siblings(), d = a.filter('[type="address"]').html(), c = a.filter('[type="phone"]').html(), b = a.filter('[type="AlternatePhone"]').html(), e = f.prev().html();
    $(".chg_add .changeAddr").val($.trim(d));
    $(".chg_add .changeTel").val($.trim(c));
    $(".chg_add .changeAltTel").val($.trim(b));
    $.XYTipsWindow({
        ___title: "修改送餐信息",
        ___drag: "___boxTitle",
        ___width: "400px",
        ___height: "180px",
        ___content: "id:hideChg",
        ___button: ["确定"],
        ___showbg: true,
        ___time: 300000,
        ___callback: function(){
            var i, j = $(".chg_add .changeAddr").val(), h = $(".chg_add .changeTel").val(), g = $(".chg_add .changeAltTel").val();
            if ($(".chg_add .chkDefault").attr("checked")) {
                i = 1
            }
            else {
                i = 0
            }
            if (j == "" || j == null) {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">送餐地址不能为空!</p>',
                    ___showbg: true,
                    ___time: 1800
                });
                return false
            }
            if (h == "" || h == null) {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">联系电话不能为空!</p>',
                    ___showbg: true,
                    ___time: 1800
                });
                return false
            }
            if (!regExpMobile.exec(h)) {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___drag: "___boxTitle",
                    ___width: "300px",
                    ___height: "100px",
                    ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">联系电话格式错误(必须是手机号码)!</p>',
                    ___showbg: true,
                    ___time: 1800
                });
                return false
            }
            if (g.length > 0) {
                if (!regExpMobile.exec(g)) {
                    if (g.length < 7 || g.indexOf("1") == 0 || !regex.test(g)) {
                        $.XYTipsWindow({
                            ___title: "开吃吧提示",
                            ___drag: "___boxTitle",
                            ___width: "300px",
                            ___height: "100px",
                            ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">备选电话格式错误!</p>',
                            ___showbg: true,
                            ___time: 1800
                        });
                        return false
                    }
                }
                else {
                    if (g.length != 11) {
                        $.XYTipsWindow({
                            ___title: "开吃吧提示",
                            ___drag: "___boxTitle",
                            ___width: "300px",
                            ___height: "100px",
                            ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">备选电话格式错误!</p>',
                            ___showbg: true,
                            ___time: 1800
                        });
                        return false
                    }
                }
            }
            $.ajax({
                type: "POST",
                url: "../ajax/ContactInfo/ChangeContactInfo.ashx",
                data: {
                    userContactInfoID: e,
                    userID: userID,
                    address: j,
                    phone: h,
                    altPhone: g,
                    isDefault: i
                },
                success: function(k){
                    if (k == 1) {
                        parent.$.XYTipsWindow.removeBox();
                        $.XYTipsWindow({
                            ___title: "开吃吧提示",
                            ___drag: "___boxTitle",
                            ___width: "300px",
                            ___height: "100px",
                            ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">修改成功!</p>',
                            ___showbg: true,
                            ___time: 1800
                        });
                        a.filter('[type="address"]').html(j);
                        a.filter('[type="phone"]').html(h);
                        a.filter('[type="AlternatePhone"]').html(g);
                        if (i == 1) {
                            $(".default").removeClass("default").addClass("to_default").html("设为默认");
                            a.siblings().children(".to_default").removeClass("to_default").addClass("default").html("默认信息")
                        }
                        else {
                            a.siblings().children(".default").removeClass("default").addClass("to_default").html("设为默认")
                        }
                    }
                    else {
                        $.XYTipsWindow({
                            ___title: "开吃吧提示",
                            ___drag: "___boxTitle",
                            ___width: "300px",
                            ___height: "100px",
                            ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">修改失败!</p>',
                            ___showbg: true,
                            ___time: 1800
                        })
                    }
                }
            })
        }
    })
}

function deleteAddr(c){
    var b = c, a = b.prev().prev().html();
    $.XYTipsWindow({
        ___title: "开吃吧提示",
        ___drag: "___boxTitle",
        ___width: "300px",
        ___height: "100px",
        ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">您确定要删除该地址吗？</p>',
        ___button: ["确定", "取消"],
        ___showbg: true,
        ___callback: function(d){
            if (d == "确定") {
                $.ajax({
                    type: "POST",
                    url: "../ajax/ContactInfo/DeleteContactInfoByID.ashx",
                    data: {
                        userContactInfoID: a
                    },
                    success: function(g){
                        if (g == 1) {
                            if (b.siblings(".default").length > 0 && b.siblings(".default").html() == "默认信息") {
                                var f = b.parents("tr").next();
                                if (f.length <= 0) {
                                    f = b.parents("tr").prev()
                                }
                                if (f.length > 0) {
                                    var e = f.children("td").children(".to_default");
                                    setDefaultAddr(e)
                                }
                            }
                            b.parents("tr").remove();
                            setHeight($("#pMenu"), $("#pAccount"));
                            parent.$.XYTipsWindow.removeBox()
                        }
                        else {
                            $.XYTipsWindow({
                                ___title: "开吃吧提示",
                                ___drag: "___boxTitle",
                                ___width: "300px",
                                ___height: "100px",
                                ___content: 'text:<p style="color:#555;text-align: center;margin-top:40px;font-size:16px;font-weight:bold;">删除失败!</p>',
                                ___showbg: true,
                                ___time: 1800
                            });
                            parent.$.XYTipsWindow.removeBox()
                        }
                    }
                })
            }
        }
    })
}

$(document).ready(function(){
    $("#NewAddress").blur(function(){
        var b = $(this), a = $.trim(b.val());
        if (a == null || a == "") {
            b.next().removeClass("focusTips").addClass("logTips").html("送餐地址不能为空")
        }
        else {
            b.next().removeClass("logTips").addClass("focusTips").html("输入正确")
        }
    });
    $("#NewPhone").blur(function(){
        var a = $(this), b = $.trim(a.val());
        if (!s.checkMobile(b).isCorrect) {
            a.next().removeClass("focusTips").addClass("logTips").html(s.checkMobile(b).message)
        }
        else {
            a.next().removeClass("logTips").addClass("focusTips").html(s.checkMobile(b).message)
        }
    });
    $("#NewAltPhone").blur(function(){
        var b = $(this);
        if (!s.IsEmpty(b.val())) {
            var c = b.val();
            var a = "";
            a = s.checkMobile(c);
            if (a.isCorrect == false) {
                a = s.checkPhone(c);
                if (a.isCorrect == false) {
                    b.next().removeClass("focusTips").addClass("logTips").html(a.message);
                    return false
                }
                else {
                    b.next().removeClass("logTips").addClass("focusTips").html(a.message)
                }
            }
            else {
                b.next().removeClass("logTips").addClass("focusTips").html(a.message)
            }
        }
        else {
            b.next().removeClass().html("")
        }
    });
    $(".change").live("click", function(){
        changeAddr($(this))
    });
    $(".to_default").live("click", function(){
        setDefaultAddr(this)
    });
    $(".del").live("click", function(){
        deleteAddr($(this))
    });
    $("#saveNewAddr").bind("click", function(){
        saveDeliveryFoodTel()
    });
    $("#newInfo .fold_sign").live("click", function(){
        var a = $(this);
        if (a.hasClass("fsign_down")) {
            a.removeClass("fsign_down").addClass("fsign_up")
        }
        else {
            a.removeClass("fsign_up").addClass("fsign_down")
        }
        $("#newInfo .ac_content").toggle()
    })
});
