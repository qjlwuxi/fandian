var priceLevel = 1;
var foodInfo = "";
var startTimer;
var oldInfo = $("#dynamic").html();
var isSelect = false;
var isRunning = false;
function addSong(c){
    var a = document.getElementById("ieSound");
    var b = document.getElementById("chSound");
    a.src = c;
    b.src = c;
    a.setAttribute("loop", -1);
    b.setAttribute("loop", -1)
}

function downMoveDown(){
    $("#boxR").animate({
        top: "185"
    }, 100);
    $("#down").animate({
        height: "100px"
    }, 100, function(){
        downMoveUp()
    })
}

function downMoveUp(){
    $("#boxR").animate({
        top: "85"
    }, 50);
    $("#down").animate({
        height: "0px"
    }, 50, function(){
        upMoveUp()
    })
}

function upMoveUp(){
    $("#boxR").animate({
        top: "-35px"
    }, 50);
    $("#up").animate({
        height: "100px"
    }, 50, function(){
        start = setInvalid;
        startScroll();
        addSong("../audio/607.wav")
    })
}

function menuScroll(){
    $("#dynamic").animate({
        top: "-40px"
    }, 50, function(){
        $("#dynamic").css("top", "0");
        $("#dynamic li:first").css("opacity", 0).appendTo("#dynamic").animate({
            opacity: 1
        }, 50)
    })
}

function getFood(){
    $.ajax({
        type: "post",
        url: "/ajax/Food/GetRandomFood.ashx",
        data: {
            universityID: $.cookie("uniID"),
            priceLevel: priceLevel
        },
        dataType: "json",
        success: function(a){
            foodInfo = a;
            clearInterval(startTimer);
            $(".prr").next().css("background-position", "0 -42px").html('<a href="javascript:;">吃一份</a>');
            $(".prr a").css("background-position", "0 0");
            addSong("");
            start = end;
            isSelect = true;
            isRunning = false;
            showInfo(foodInfo)
        }
    })
}

function startScroll(){
    startTimer = setInterval("menuScroll()", 50);
    setTimeout(function(){
        getFood()
    }, 2000)
}

function showInfo(a){
    var b = 0;
    if (a == null || a == "" || parseInt(a.result) < 0) {
        alert("未获取到菜品，请重新再试一次!");
        return
    }
    $("#dynamic").html(a.foodInfoHtml)
}

function setInvalid(){
    return false
}

var start = end = function(){
    if (!checkUniversity()) {
        return false
    }
    checkUserInfo();
    isRunning = true;
    $(".prr").next().html("吃一份").css("background-position", "0 0");
    $(".prr a").css("background-position", "0 -42px");
    $("#dynamic").html(oldInfo);
    addSong("../audio/s2.wav");
    $("#boxR").animate({
        top: "85px"
    }, 200);
    $("#up").animate({
        height: "0px"
    }, 200, function(){
        downMoveDown()
    })
};
function checkUserInfo(){
    if ($.cookie("cartFoodInfo") != null && $.cookie("cartFoodInfo") == "") {
        $.cookie("cartFoodInfo", null)
    }
    if ($.cookie("cartSupInfo") == null && $.cookie("cartSupInfo") == "") {
        $.cookie("cartSupInfo", null)
    }
    return true
}

function checkUniversity(){
    if ($.cookie("uniID") == null || $.cookie("uniID") == "") {
        alert("还没有选择位置，先选选你在哪个位置吧！");
        window.location = "/index.aspx";
        return false
    }
    else {
        return true
    }
}

function CreateOrder(){
    if ($.cookie("userID") != null && $.cookie("userID") != "" && $.cookie("kcb") != null && $.cookie("kcb") != "") {
        location.href = "/order.aspx";
        return false
    }
    else {
        location.href = "/order_anonymous.aspx";
        return false
    }
}

$(function(){
    $("#radFood").click(function(){
        $(".layer_bg,.gfb").css("display", "block")
    });
    if ($.cookie("rem") != "1") {
        $(".gfb .go1").show()
    }
    $(".rem").click(function(){
        $.cookie("rem", "1");
        $(this).parent().remove()
    });
    $(".prr a").click(function(){
        if (isRunning) {
            return
        }
        $(this).next().show()
    });
    $(".prr li").click(function(){
        $(".prr a").text($(this).text());
        $(".prr ul").hide();
        priceLevel = $(this).val()
    });
    $("#boxOuter .gfood a").live("click", function(){
        if (isRunning) {
            return
        }
        if (!isSelect || $.cookie("cartFoodInfo") == null || $.cookie("cartFoodInfo") == "" || $.cookie("cartSupInfo") == null || $.cookie("cartSupInfo") == "") {
            alert("您还没有拉杆选菜品呢！")
        }
        else {
            CreateOrder()
        }
    })
});
