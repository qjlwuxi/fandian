visitRecord = new Object();
$(document).ready(function(){
    visitRecord.init()
});
visitRecord.init = function(){
    var i = location.href;
    var j = window.parent.document.referrer.toString();
    var l = $("#iDealKCBVisitRecord").attr("src");
    var h;
    var d;
    var k;
    var m;
    var n = window.screen.width + "x" + window.screen.height;
    var c = "true";
    var e = 0;
    var a;
    var b;
    var o;
    if (visitRecord.cookie.Get("iDealSessionId") != null) {
        d = visitRecord.cookie.Get("iDealSessionId");
        visitRecord.cookie.Set("iDealSessionId", d, true, 20 * 60 * 1000);
        m = parseInt(visitRecord.cookie.Get("iDealViewCount")) + 1;
        visitRecord.cookie.Set("iDealViewCount", m, false, 0)
    }
    else {
        d = visitRecord.getVisitorId();
        visitRecord.cookie.Set("iDealSessionId", d, true, 20 * 60 * 1000);
        m = 1;
        visitRecord.cookie.Set("iDealViewCount", m, false, 0)
    }
    if (visitRecord.userCheckLogin()) {
        h = visitRecord.getUserInfo().ID;
        if (visitRecord.cookie.Get("iDealUserVisit") != null) {
            var g = visitRecord.cookie.Get("iDealUserVisit");
            var f = new Array();
            f = g.split("|");
            if (h == f[0]) {
                k = f[1];
                c = "false"
            }
            else {
                k = visitRecord.getVisitorId();
                visitRecord.cookie.Set("iDealUserVisit", h + "|" + k, true, 365 * 24 * 60 * 60 * 1000)
            }
        }
        else {
            k = visitRecord.getVisitorId();
            visitRecord.cookie.Set("iDealUserVisit", h + "|" + k, true, 365 * 24 * 60 * 60 * 1000)
        }
    }
    else {
        h = "0";
        if (visitRecord.cookie.Get("iDealVisitorID") != null) {
            k = visitRecord.cookie.Get("iDealVisitorID");
            c = "false"
        }
        else {
            k = visitRecord.getVisitorId();
            visitRecord.cookie.Set("iDealVisitorID", k, true, 365 * 24 * 60 * 60 * 1000)
        }
    }
    if (visitRecord.cookie.Get("areaID") != null) {
        e = visitRecord.cookie.Get("areaID")
    }
    else {
        e = 0
    }
    if (visitRecord.cookie.Get("firstTime") != null) {
        a = visitRecord.cookie.Get("firstTime");
        b = visitRecord.cookie.Get("viewTime");
        o = new Date().toLocaleDateString();
        visitRecord.cookie.Set("viewTime", o, true, 365 * 24 * 60 * 60 * 1000)
    }
    else {
        a = new Date().toLocaleDateString();
        b = a;
        o = a;
        visitRecord.cookie.Set("firstTime", a, true, 365 * 24 * 60 * 60 * 1000);
        visitRecord.cookie.Set("viewTime", o, true, 365 * 24 * 60 * 60 * 1000)
    }
//	没有找到AddVisitRecord
//    $.getJSON(visitRecord.defaults.ajaxurl + "AddVisitRecord", {
//        page: i,
//        referrerPage: encodeURI(j),
//        jssrc: l,
//        userId: h,
//        sessionId: d,
//        visitorId: k,
//        screen: n,
//        viewCount: m,
//        isFirst: c,
//        universityID: e,
//        firstTime: a,
//        lastTime: b,
//        viewTime: o
//    }, function(p){
//    })
};
visitRecord.getVisitorId = function(){
    var a = "";
    for (var b = 0; b < 10; b++) {
        a += Math.floor(Math.random() * 10)
    }
    return a
};
visitRecord.defaults = {
    ajaxurl: "http://127.0.0.1:3001/"
};
visitRecord.cookie = {
    Get: function(a){
        var b = new RegExp("(?:;)?" + a + "=([^;]*);?");
        if (b.test(document.cookie)) {
            return decodeURIComponent(RegExp["$1"])
        }
        else {
            return null
        }
    },
    Set: function(b, g, c, d){
        var h = new Date();
        h.setTime(h.getTime() + d);
        var i = "/";
        var e;
        var a;
        var f;
        if (c) {
            f = b + "=" + encodeURIComponent(g) + ";expires=" + h.toGMTString() + "; path=" + i
        }
        else {
            f = b + "=" + encodeURIComponent(g) + "; path=" + i
        }
        document.cookie = f
    },
    Del: function(e){
        var d = "/";
        var a;
        var c;
        var b = e + "=;expires=" + new Date(0).toGMTString() + "; path=" + d;
        document.cookie = b
    }
};
visitRecord.getUserInfo = function(){
    var a;
    var b = visitRecord.cookie.Get("userID");
    a = {
        ID: b
    };
    return a
};
visitRecord.userCheckLogin = function(){
    var a = visitRecord.cookie.Get("userID");
    if (a != null) {
        return true
    }
    else {
        return false
    }
};
