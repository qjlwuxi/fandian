var isload = 0, isHide = 0;
var tools = new tool();
var params = {};
var oldertotaltds;
function showLayer(){
    $("body").append('<div class="layer_bg"></div><div id="commentLayer" class="br8"><div class="layer_inner br4"><a href="javascript:;" class="close" onclick="closeLayer();">关闭</a><p class="help_title">下面这些餐厅为什么不能在线订餐?</p><p class="help_info">这些餐厅的菜单变化很大，而且菜价经常变动，为了避免给同学们带来不准确的信息，建议同学们电话订餐，以免出错。</p></div></div>');
    $(".layer_bg").show();
}

function closeLayer(){
    $(".layer_bg,#commentLayer").remove();
}

function scrollPics(){
    var sHeight = $("#focus").height();
    var len = $("#focus ul li").length;
    var index = 0;
    var picTimer;
    if (len == 0) {
        $("#focus").hide();
        clearInterval(picTimer);
    }
    else 
        if (len != 1) {
            var btn = "<div class='btn'>";
            for (var i = 0; i < len; i++) {
                btn += "<span>" + (i + 1) + "</span>";
            }
            btn += "</div>"
            $("#focus").append(btn);
        }
    $("#focus .btn span").mouseenter(function(){
        index = $("#focus .btn span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");
    $("#focus ul").css("height", sHeight * (len + 1));
    $("#focus ul li div").hover(function(){
        $(this).siblings().css("opacity", 0.7);
    }, function(){
        $("#focus ul li div").css("opacity", 1);
    });
    $("#focus").hover(function(){
        clearInterval(picTimer);
    }, function(){
        if (len > 1) {
            picTimer = setInterval(function(){
                if (index == len) {
                    showFirPic();
                    index = 0;
                }
                else {
                    showPics(index);
                }
                index++;
            }, 3000);
        }
    }).trigger("mouseleave");
    function showPics(index){
        var nowTop = -index * sHeight;
        $("#focus ul").stop(true, false).animate({
            "top": nowTop
        }, 500);
        $("#focus .btn span").removeClass("on").eq(index).addClass("on");
    }
    function showFirPic(){
        $("#focus ul").append($("#focus ul li:first").clone());
        var nowTop = -len * sHeight;
        $("#focus ul").stop(true, false).animate({
            "top": nowTop
        }, 500, function(){
            $("#focus ul").css("top", "0");
            $("#focus ul li:last").remove();
        });
        $("#focus .btn span").removeClass("on").eq(0).addClass("on");
    }
}

function ShowDetail_0(){
    var $context = $(this).find(".si_block");
    var $contextTip = $context.parents("table").next();
    var $checkShop = $(this).parents(".sup_list_body");
    var shopAttr = $checkShop.attr("id");
    if (shopAttr == "hallListOnline") {
        $context.addClass("shine_red");
    }
    if (shopAttr == "hallListOffline") {
        $context.addClass("shine_blue");
    }
    var currentHoverSupID = Number($context.attr("id")), sid = Number($context.attr("sid")), _left = (sid % 4) * 174 + 177, _top = parseInt(sid / 4) * 112 - 22, flag = true, $loading = $contextTip.find(".loading"), $detailInfo = $contextTip.find(".detail_info");
	isload = setTimeout(function(){
        $contextTip.css({
            "left": _left + "px",
            "top": _top + "px"
        }).show();
        if ($context.find(".hide_detail") && $context.find(".hide_detail").html() != null) {
            var $cloneInfo = $context.find(".hide_detail");
            appendInfo = $cloneInfo.html();
            if ($cloneInfo.attr("data-id") == $context.attr("id")) {
                $detailInfo.html("").append(appendInfo).show();
                flag = false;
                return false;
            }
        }
        if (!flag) {
            return;
        }
        params.type = "GET";
        params.async = false;
        params.url = "/shops/get_detail";
        params.data = "shopID=" + $context.attr("id");
        params.dataType = "json";
        params.cache = false;
        params.error = function(data){
        };
        params.success = function(data){
//			data = {SupplierID:1,BusinessState:1,OrderCommentNum:200,SupplierName:"沙县小吃",PrimaryBusiness:"中式",SupplierRemark:"我们不送",SendFoodPrice:20,Location:"滨湖区稻香新村",SupplierBusinessTime:"15:00-20:00",SendFoodRate:20};
            
			$detailInfo.html("");
            if (currentHoverSupID != data.SupplierID) {
                return;
            }
            var businessState = Number(data.BusinessState);
            switch (businessState) {
                case 0:
                    businessState = "已打烊, 暂不提供外卖服务";
                    break;
                case 1:
                    businessState = "营业中";
                    $contextTip.find(".shopTip_status").css("color", "#333");
                    break;
            }
            var message = "";
            if (data.OrderCommentNum != "" && parseInt(data.OrderCommentNum) >= 10 && data.OrderCommentNum != undefined) {
                message = data.OrderCommentNum + "评价";
            }
            $detailInfo.append('<div class="row1"><img src="' + $context.find(".si_logo img").attr("src") + '" alt="" width="43px" height="43px" /><p class="t_name">' + data.SupplierName + '</p><p class="t_type">' + data.PrimaryBusiness + '</p></div><p><span class="t_com">' + message + '</span><span class="t_rec"></span>');
            if ($context.hasClass("si_closed")) {
                $detailInfo.append('<p class="t_status" style="background:lightgreen">' + businessState + '</p>');
            }
            if (data.SupplierRemark != null && $.trim(data.SupplierRemark) != "") {
                $detailInfo.append('<p class="t_intro"><b>公告：</b>' + data.SupplierRemark + '</p>');
            }
            if (data.SendFoodPrice != null && $.trim(data.SendFoodPrice) != "") {
                $detailInfo.append('<p class="t_send"><b>起送价：</b>' + data.SendFoodPrice + '</p>');
            }
            $detailInfo.append('<p class="t_addr"><b>地址：</b>' + data.Location + '</p><p class="t_time"><b>营业时间：</b>' + data.SupplierBusinessTime + '</p>');
            if (data.SendFoodRate != null && parseInt(data.SendFoodRate) > 0 && $.trim(data.SendFoodRate) != "") {
                $detailInfo.append('<p class="t_send"><b>平均送餐时间：</b>' + data.SendFoodRate + '分钟</p>');
            }
            $loading.hide().next().show();
            $context.append($detailInfo.clone().attr("data-id", data.SupplierID).addClass("hide_detail"));
        };
        tools.ajax(params);
    }, 100);
}

function ShowDetail_1(){
    var $context = $(this).find(".si_block");
    var $contextTip = $context.parents("table").next();
    clearTimeout(isload);
    $contextTip.css("display", "none");
    $context.removeClass("shine_red").removeClass("shine_blue");
    $context = null;
    $contextTip = null;
}

function ShowOnLine(){
    var totaltds = $("#SupplierListBody tr td");
    oldertotaltds = $("#SupplierListBody").html();
    var tdlist = new Array($(totaltds).length);
    var j = 0;
    for (var i = 0; i < totaltds.length; i++) {
        if ($(totaltds[i]).children().children().eq(1).children().eq(2).attr("class") != "rest") {
            tdlist[j] = $(totaltds[i]);
            $(tdlist[j]).children().eq(0).attr("sid", j);
            j++;
        }
    }
    for (var t = 0; t < tdlist.length; t++) {
        $(totaltds[t]).html($(tdlist[t]).html());
    }
    var hidenumber = 0;
    var totaltrs = $("#SupplierListBody tr");
    for (var i = 0; i < totaltrs.length; i++) {
        var tds = $(totaltrs[i]).children();
        for (var t = 0; t < tds.length; t++) {
            if ($(tds).html() == "") {
                hidenumber++;
                $(tds).hide();
            }
            if (hidenumber >= 4) {
                $(totaltrs[i]).hide();
            }
        }
    }
}

function ShowRest(){
    $("#SupplierListBody").html(oldertotaltds);
    $("#onlineSup td").hover(ShowDetail_0, ShowDetail_1);
}

function stars(sum){
    var stars = "";
    if (sum >= 0 && sum <= 0.5) {
        stars = "star_half";
    }
    else 
        if (sum > 0.5 && sum <= 1.0) {
            stars = ("star1");
        }
        else 
            if (sum >= 1.0 && sum <= 1.5) {
                stars = ("star1_half");
            }
            else 
                if (sum > 1.5 && sum <= 2) {
                    stars = ("star2");
                }
                else 
                    if (sum > 2 && sum <= 2.5) {
                        stars = ("star2_half");
                    }
                    else 
                        if (sum > 2.5 && sum <= 3) {
                            stars = ("star3");
                        }
                        else 
                            if (sum > 3 && sum <= 3.5) {
                                stars = ("star3_half");
                            }
                            else 
                                if (sum > 3.5 && sum <= 4) {
                                    stars = ("star4");
                                }
                                else 
                                    if (sum > 4 && sum <= 4.5) {
                                        stars = ("star4_half");
                                    }
                                    else 
                                        if (sum > 4.5 && sum <= 5) {
                                            stars = ("star5");
                                        }
                                        else {
                                            stars = "";
                                        }
    return stars;
}

function ShowOnlineChoice(){
    if ($.cookie("showOnline") != null && $.cookie("showOnline") == "1") {
        $("#showOnLine").attr("checked", "checked");
    }
}

function checkUniversity(){
    if ($.cookie("uniID") == null || $.cookie("uniID") == "") {
        alert("还没有选择位置，先选选你在哪个位置吧！");
        window.location = "/index.aspx";
        return false;
    }
    else {
        AddGetFoodByRandomCount();
        return true;
    }
}

function AddGetFoodByRandomCount(){
    params.type = "POST";
    params.async = false;
    params.url = "/ajax/Statistics/AddGetFoodByRandomCount.ashx";
    params.data = {};
    tools.ajax(params);
}

$(document).ready(function(){
	//设定轮转图片
    scrollPics();
	//设置多选框
    ShowOnlineChoice();
	//延时加载图片
    $("#hallListOnline img").lazyload({
        placeholder: "images/grey.gif",
        effect: "fadeIn"
    });
	//显示店铺详情
    $("#onlineSup td").hover(ShowDetail_0, ShowDetail_1);
	//筛选营业店铺
    $("#showOnLine").change(function(){
        if ($("#showOnLine").attr("checked") == "checked") {
            ShowOnLine();
            $.cookie("showOnline", "1", {
                path: "/",
                expires: 1
            });
        }
        else {
            $.cookie("showOnline", null, {
                path: "/",
                expires: -1
            });
            window.location = "/area/" + areaID;
        }
    });
    $(".si_name a,.si_logo a").click(function(e){
        stopProcess(e);
    });
    $(".sup_list td").click(function(){
        var id = $(this).find(".si_block").attr("id");
        if (navigator.userAgent.toString() == "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.28) Gecko/20120306 Firefox/3.6.28") {
            window.open("/s_" + id + ".html");
        }
        else 
            if (document.all) {
                $("#s_" + id)[0].click();
            }
            else {
                var e = document.createEvent("MouseEvent");
                e.initEvent("click", false, false);
                $("#s_" + id)[0].dispatchEvent(e);
            }
    });
    $("#ValidateCodeClick_default").click(function(){
        $("#authenticationCode_default").click();
    });
    $(".nofind span").click(function(){
        $("#apply_supname, .recValiDateCode").val("");
        $("#apply_supphone").val("选填,能记住餐厅电话对我们更有帮助哦").css("color", "#bbb");
        $("#apply_supaddr").val("选填,可以告诉我们餐厅的位置吗").css("color", "#bbb");
        $(".validRs").html("");
        $("#authenticationCode_default").click();
        $("#apply_supname").blur(function(){
            var name = $.trim($(this).val());
            if (name == "" || name == null) {
                $("#supnametip").html("请输入餐厅名称").css("color", "red");
            }
            else {
                $("#supnametip").html("");
            }
        });
        $("#apply_supphone").focus(function(){
            var phone = $.trim($(this).val());
            if (phone === "选填,能记住餐厅电话对我们更有帮助哦") {
                $("#apply_supphone").val("").css("color", "black");
            }
        }).blur(function(){
            var phone = $.trim($(this).val());
            if (phone == "" || phone == null) {
                $("#apply_supphone").val("选填,能记住餐厅电话对我们更有帮助哦").css("color", "#bbb");
            }
        });
        $("#apply_supaddr").focus(function(){
            var addr = $.trim($(this).val());
            if (addr === "选填,可以告诉我们餐厅的位置吗") {
                $("#apply_supaddr").val("").css("color", "black");
            }
        }).blur(function(){
            var addr = $.trim($(this).val());
            if (addr == "" || addr == null) {
                $("#apply_supaddr").val("选填,可以告诉我们餐厅的位置吗").css("color", "#bbb");
            }
        });
        $.XYTipsWindow({
            ___title: "开吃吧提示",
            ___drag: "___boxTitle",
            ___width: "500px",
            ___height: "290px",
            ___content: "id:pop1",
            ___showbg: true
        });
    });
    $(".submitBtn").live("click", function(){
        var applySupName = $.trim($("#apply_supname").val()), applySupPhone = $.trim($("#apply_supphone").val()), applySupAddr = $.trim($("#apply_supaddr").val()), validateCode = $.trim($(".recValiDateCode").val())
        result = "";
        if (applySupName == null || applySupName == "") {
            $("#supnametip").html("请输入餐厅名称").css("color", "red");
            return;
        }
        if (applySupPhone == "选填,能记住餐厅电话对我们更有帮助哦") {
            applySupPhone = "";
        }
        if (applySupAddr == "选填,可以告诉我们餐厅的位置吗") {
            applySupAddr = "";
        }
        result = tools.checkValidateCode(validateCode, 100);
        if (result != 1) {
            $(".validRs").html(result);
            $("#authenticationCode_default").click();
            return;
        }
        params.type = "POST";
        params.async = false;
        params.url = "/ajax/Supplier/SubmitRecommendSupDetail.ashx";
        params.data = {
            supplierName: applySupName,
            supplierPhone: applySupPhone,
            address: applySupAddr,
            uniID: $.cookie("uniID"),
            validateCode: validateCode
        };
        params.dataType = "text";
        params.success = function(data){
            parent.$.XYTipsWindow.removeBox();
            if (data == "1") {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___width: "360px",
                    ___height: "100px",
                    ___showbg: true,
                    ___content: "text:<p style=\"color:#555;padding:30px 20px 0;font-size:16px;font-weight:bold;\">感谢你提交新的餐厅，我们会发网站通知告诉你处理结果!</p>",
                    ___button: ["OK"]
                });
            }
            else {
                $.XYTipsWindow({
                    ___title: "开吃吧提示",
                    ___width: "360px",
                    ___height: "100px",
                    ___showbg: true,
                    ___content: "text:<p style=\"color:#555;padding:30px 20px 0;font-size:16px;font-weight:bold;\">暂时无法推荐餐厅，请重试！</p>",
                    ___button: ["我知道了"]
                });
            }
            $("#authenticationCode_default").click();
        };
        tools.ajax(params);
    });
    $(".cancelBtn").live("click", function(){
        parent.$.XYTipsWindow.removeBox();
    });
});
