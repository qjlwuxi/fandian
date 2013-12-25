(function(){
    $.XYTipsWindow = function(e){
        defaults = $.extend({
            ___title: "Hello World",
            ___boxID: c(10),
            ___content: "text:内容",
            ___width: "300",
            ___height: "200",
            ___titleClass: "boxTitle",
            ___closeID: "",
            ___triggerID: "",
            ___boxBdColor: "#E9F3FD",
            ___boxBdOpacity: "1",
            ___boxWrapBdColor: "#A6C9E1",
            ___windowBgColor: "#000000",
            ___windowBgOpacity: "0.5",
            ___time: "",
            ___drag: "",
            ___dragBoxOpacity: "1",
            ___showTitle: true,
            ___showBoxbg: true,
            ___showbg: false,
            ___offsets: "",
            ___button: "",
            ___callback: function(){
            },
            ___fns: function(){
            }
        }, e);
        $.XYTipsWindow.init(defaults)
    };
    var b, d = !-[1, ] && !window.XMLHttpRequest;
    var a = new Array();
    var c = function(h){
        var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var e = 0, g = ""; e < h; e++) {
            g += f.charAt(Math.floor(Math.random() * 62))
        }
        return g
    };
    $.extend($.XYTipsWindow, {
        init: function(g){
            b = g;
            if ($("#" + g.___boxID).length > 0) {
                alert("对不起，创建弹出层失败！窗口“" + g.___boxID + "”已存在！");
                return false
            }
            var f = $("#" + g.___boxID);
            $.XYTipsWindow.showBox(g);
            $(".___closeBox", f).die().live("click", function(){
                $.XYTipsWindow.removeBox()
            }).css({
                zIndex: "891218"
            });
            if (g.___closeID != "") {
                $("#" + g.___closeID, f).die().live("click", function(){
                    $.XYTipsWindow.removeBox()
                })
            }
            if (g.___time != "") {
                setTimeout($.XYTipsWindow.removeBox, g.___time)
            }
            if (g.___showbg != "" && g.___showbg == true) {
                var e = '<div id="XYTipsWindowBg" style="position:absolute;background:#999;filter:alpha(opacity=0);opacity:0;width:100%;left:0;top:0;z-index:870617"><iframe src="about:blank" style="width=100%;height:' + $(document).height() + 'px;filter:alpha(opacity=0);opacity:0;scrolling=no;z-index:870610"></iframe></div>';
                $(e).appendTo("body").animate({
                    opacity: g.___windowBgOpacity
                }, 200)
            }
            if (g.___drag != "") {
                $.XYTipsWindow.dragBox(g)
            }
            if (g.___fns != "" && $.isFunction(g.___fns)) {
                g.___fns.call(this)
            }
            $.XYTipsWindow.contentBox(g);
            if (g.___button != "") {
                $.XYTipsWindow.ask(g)
            }
            $.XYTipsWindow.keyDown(g);
            $.XYTipsWindow.setBoxzIndex(g);
            if (g.___showbg != true) {
                $("#" + g.___boxID).addClass("shadow")
            }
            $("#" + g.___boxID).die().live("mouseenter", function(){
                b = g
            })
        },
        getID: function(){
            return thisID = b.___boxID
        },
        showBox: function(w){
            var m = w.___showTitle != true ? 1 : 33, l = w.___showTitle != true ? 0 : 10;
            $boxDialogHeight = w.___button != "" ? 45 : 0;
            $boxDialogBorder = $boxDialogHeight == "0" ? "0" : "1";
            var h = parseInt(w.___width) > 1000 ? 1000 : parseInt(w.___width), z = parseInt(w.___height) > 550 ? 550 : parseInt(w.___height);
            var t = '<div id="' + w.___boxID + '" class="XYTipsWindow">';
            t += '<div class="___boxWrap">';
            t += '<div class="___boxTitle"><h3></h3><span class="___closeBox">关闭</span></div>';
            t += '<div class="___boxContent"></div>';
            t += '<div class="___boxDialog"></div>';
            t += "</div>";
            t += '<div class="___boxBd"></div>';
            t += '<iframe src="about:blank" style="position:absolute;left:0;top:0;filter:alpha(opacity=0);opacity:0;scrolling=no;z-index:10714"></iframe>';
            t += "</div>";
            $(t).appendTo("body");
            var C = $("#" + w.___boxID);
            C.css({
                position: "relative",
                width: h + 12 + "px",
                height: z + m + l + $boxDialogHeight + 11 + "px",
                zIndex: "891208"
            });
            var r = $("iframe", C);
            r.css({
                width: h + 12 + "px",
                height: z + m + l + $boxDialogHeight + 1 + "px"
            });
            var F = $(".___boxWrap", C);
            F.css({
                position: "relative",
                top: "6px",
                margin: "0 auto",
                width: h + "px",
                height: z + m + $boxDialogHeight + 7 + "px",
                border: "1px solid #e5e5e5",
                background: "#fff",
                overflow: "hidden",
                zIndex: "20590"
            });
            var f = $(".___boxContent", C);
            f.css({
                position: "relative",
                width: h + "px",
                height: z + "px",
                padding: "0",
                overflow: "auto",
                backgroundColor: "#fff"
            });
            var i = $(".___boxDialog", C);
            i.css({
                width: h - 15 + "px",
                height: $boxDialogHeight + "px",
                textAlign: "right",
                backgroundColor: "#fff"
            });
            var g = $(".___boxBd", C);
            g.css({
                position: "absolute",
                width: h + 12 + "px",
                height: z + m + l + $boxDialogHeight + 1 + "px",
                left: "0",
                top: "0",
                zIndex: "10715"
            });
            var u = $(".___boxTitle>h3", C);
            u.html(w.___title);
            u.parent().css({
                position: "relative",
                width: h + "px",
                background: "#FB501C"
            });
            if (w.___titleClass != "") {
                u.parent().addClass(w.___titleClass);
                u.parent().find("span").hover(function(){
                    $(this).addClass("hover")
                }, function(){
                    $(this).removeClass("hover")
                })
            }
            if (w.___showTitle != true) {
                $(".___boxTitle", C).remove()
            }
            if (w.___showBoxbg != true) {
                $(".___boxBd", C).remove();
                C.css({
                    width: h + 2 + "px",
                    height: z + m + $boxDialogHeight + 1 + "px"
                });
                F.css({
                    left: "0",
                    top: "0"
                })
            }
            var x = -1;
            $.XYTipsWindow.getDomPosition(w);
            var j = w.___offsets;
            var v = $('<div id="' + w.___boxID + 'parent"></div>');
            var s = d ? (w.___triggerID != "" ? 0 : document.documentElement.scrollTop) : "";
            if (w.___offsets == "" || w.___offsets.constructor == String) {
                switch (j) {
                    case ("left-top"):
                        j = {
                            left: "0px",
                            top: "0px" + s
                        };
                        x = 0;
                        break;
                    case ("left-bottom"):
                        j = {
                            left: "0px",
                            bottom: "0px"
                        };
                        break;
                    case ("right-top"):
                        j = {
                            right: "0px",
                            top: "0px" + s
                        };
                        x = 0;
                        break;
                    case ("right-bottom"):
                        j = {
                            right: "0px",
                            bottom: "0px"
                        };
                        break;
                    case ("middle-top"):
                        j = {
                            left: "50%",
                            marginLeft: -parseInt(C.width() / 2) + "px",
                            top: "0px" + s
                        };
                        x = 0;
                        break;
                    case ("middle-bottom"):
                        j = {
                            left: "50%",
                            marginLeft: -parseInt(C.width() / 2) + "px",
                            bottom: "0px"
                        };
                        break;
                    case ("left-middle"):
                        j = {
                            left: "0px",
                            top: "50%" + s,
                            marginTop: -parseInt(C.height() / 2) + "px" + s
                        };
                        x = $getPageSize[1] / 2 - C.height() / 2;
                        break;
                    case ("right-middle"):
                        j = {
                            right: "0px",
                            top: "50%" + s,
                            marginTop: -parseInt(C.height() / 2) + "px" + s
                        };
                        x = $getPageSize[1] / 2 - C.height() / 2;
                        break;
                    default:
                        j = {
                            left: "50%",
                            marginLeft: -parseInt(C.width() / 2) + "px",
                            top: "50%" + s,
                            marginTop: -parseInt(C.height() / 2) + "px" + s
                        };
                        x = $getPageSize[1] / 2 - C.height() / 2;
                        break
                }
            }
            else {
                var y = j.top;
                j.top = j.top + s;
                if (typeof(y) != "undefined") {
                    y = y.replace("px", "");
                    x = y
                }
            }
            if (w.___triggerID != "") {
                var n = $("#" + w.___triggerID).offset();
                var B = $("#" + w.___triggerID).outerWidth(), e = $("#" + w.___triggerID).outerHeight();
                var p = n.left, D = n.top;
                var q = j.left, k = j.top;
                if (typeof(q) != "undefined" || typeof(k) != "undefined") {
                    q = parseInt(q.replace("px", ""));
                    k = parseInt(k.replace("px", ""))
                }
                var A = q >= 0 ? parseInt(q) + p : parseInt(q) + p - $getPageSize[2];
                var E = k >= 0 ? parseInt(k) + D : parseInt(k) + D - $getPageSize[3];
                j = {
                    left: A + "px",
                    top: E + "px"
                }
            }
            if (d) {
                if (w.___triggerID == "") {
                    if (x >= 0) {
                        $.XYTipsWindow.addStyle(".ui_fixed_" + w.___boxID + "{width:100%;height:100%;position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+" + x + ")}");
                        v = $('<div class="' + w.___boxID + 'IE6FIXED" id="' + w.___boxID + 'parent"></div>');
                        C.appendTo(v);
                        $("body").append(v);
                        $("." + w.___boxID + "IE6FIXED").css(j).css({
                            position: "absolute",
                            width: h + 12 + "px",
                            height: z + m + l + $boxDialogHeight + 1 + "px",
                            zIndex: "891208"
                        }).addClass("ui_fixed_" + w.___boxID)
                    }
                    else {
                        $.XYTipsWindow.addStyle(".ui_fixed2_" + w.___boxID + "{width:100%;height:100%;position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight)}");
                        v = $('<div class="' + w.___boxID + 'IE6FIXED"  id="' + w.___boxID + 'parent"></div>');
                        C.appendTo(v);
                        $("body").append(v);
                        $("." + w.___boxID + "IE6FIXED").css(j).css({
                            position: "absolute",
                            width: h + 12 + "px",
                            height: z + m + l + $boxDialogHeight + 1 + "px",
                            zIndex: "891208"
                        }).addClass("ui_fixed2_" + w.___boxID)
                    }
                    $("body").css("background-attachment", "fixed").css("background-image", "url(n1othing.txt)")
                }
                else {
                    v.css({
                        position: "absolute",
                        left: A + "px",
                        top: E + "px",
                        width: h + 12 + "px",
                        height: z + m + l + $boxDialogHeight + 1 + "px",
                        zIndex: "891208"
                    })
                }
            }
            else {
                v.css(j).css({
                    position: "fixed",
                    width: h + 12 + "px",
                    height: z + m + l + $boxDialogHeight + 1 + "px",
                    zIndex: "891208"
                });
                if (w.___triggerID != "") {
                    v.css({
                        position: "absolute"
                    })
                }
                $("body").append(v);
                C.appendTo(v)
            }
        },
        contentBox: function(i){
            var h = $("#" + i.___boxID);
            var e = parseInt(i.___width) > 1000 ? 1000 : parseInt(i.___width), f = parseInt(i.___height) > 550 ? 550 : parseInt(i.___height);
            var g = $(".___boxContent", h);
            $contentType = i.___content.substring(0, i.___content.indexOf(":"));
            $content = i.___content.substring(i.___content.indexOf(":") + 1, i.___content.length);
            $.ajaxSetup({
                global: false
            });
            switch ($contentType) {
                case "text":
                    g.html($content);
                    break;
                case "id":
                    $("#" + $content).children().appendTo(g)
            }
        },
        ask: function(l){
            var j = $("#" + l.___boxID);
            $boxDialog = $(".___boxDialog", j);
            if (l.___button != "") {
                var h = {}, g = [];
                if (l.___button instanceof Array) {
                    for (var f = 0; f < l.___button.length; f++) {
                        h[l.___button[f]] = l.___button[f];
                        g.push(l.___button[f])
                    }
                }
                else {
                    for (var e in l.___button) {
                        h[l.___button[e]] = e;
                        g.push(l.___button[e])
                    }
                }
                $boxDialog.html($.map(g, function(i){
                    return "<input class='dialogBtn' type='button'  value='" + i + "' />"
                }).join(" "));
                $(".dialogBtn", $boxDialog).each(function(){
                    if ($(this).attr("value") == "取消" || $(this).attr("value") == "返回") {
                        $(this).addClass("hover")
                    }
                });
                $(".dialogBtn", $boxDialog).click(function(){
                    var i = this;
                    if (l.___callback != "" && $.isFunction(l.___callback)) {
                        l.___callback(h[i.value])
                    }
                    if ($(this).attr("value") == "取消" || $(this).attr("value") == "返回" || $(this).attr("value") == "OK") {
                        $.XYTipsWindow.removeBox(l)
                    }
                })
            }
        },
        getDomPosition: function(g){
            var f = $("#" + g.___boxID);
            var j = document.documentElement.clientWidth, e = document.documentElement.clientHeight;
            var l = f.outerWidth(), k = f.outerHeight();
            var i = f.offset(), h = i.left, m = i.top;
            $getPageSize = new Array();
            $getPageSize.push(j, e, l, k, h, m)
        },
        setBoxzIndex: function(g){
            a.push(document.getElementById(g.___boxID + "parent"));
            var e = "mousedown" || "click";
            var f = $("#" + g.___boxID + "parent");
            f.die().live("click", function(){
                for (var h = 0; h < a.length; h++) {
                    a[h].style.zIndex = 891218
                }
                this.style.zIndex = 891208
            })
        },
        addStyle: function(f){
            var e = this.style;
            if (!e) {
                e = this.style = document.createElement("style");
                e.setAttribute("type", "text/css");
                document.getElementsByTagName("head")[0].appendChild(e)
            }
            e.styleSheet && (e.styleSheet.cssText += f) || e.appendChild(document.createTextNode(f))
        },
        dragBox: function(h){
            var f = 0, e = 0, g = false;
            var i = $("#" + h.___boxID);
            $Handle = $("." + h.___drag, i);
            $Handle.mouseover(function(){
                if (h.___triggerID != "") {
                    $(this).css("cursor", "default")
                }
                else {
                    $(this).css("cursor", "move")
                }
            });
            $Handle.mousedown(function(k){
                g = h.___triggerID != "" ? false : true;
                if (h.___dragBoxOpacity) {
                    if (h.___boxBdOpacity != "1") {
                        i.children("div").css("opacity", h.___dragBoxOpacity);
                        i.children("div.___boxBd").css("opacity", h.___boxBdOpacity)
                    }
                    else {
                        i.children("div").css("opacity", h.___dragBoxOpacity)
                    }
                }
                k = window.event ? window.event : k;
                var j = document.getElementById(h.___boxID);
                f = k.clientX - j.offsetLeft;
                e = k.clientY - j.offsetTop;
                $(document).mousemove(function(m){
                    if (g) {
                        m = window.event ? window.event : m;
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                        var n = m.clientX - f;
                        var l = m.clientY - e;
                        $(j).css({
                            left: n,
                            top: l
                        })
                    }
                });
                $(document).mouseup(function(){
                    g = false;
                    if (h.___dragBoxOpacity) {
                        if (h.___boxBdOpacity != "1") {
                            i.children("div").css("opacity", "1");
                            i.children("div.___boxBd").css("opacity", h.___boxBdOpacity)
                        }
                        else {
                            i.children("div").css("opacity", "1")
                        }
                    }
                })
            })
        },
        removeBox: function(){
            var g = $("#" + b.___boxID);
            var f = $("#XYTipsWindowBg");
            if (g != null || f != null) {
                var e = $(".___boxContent", g);
                $contentType = b.___content.substring(0, b.___content.indexOf(":"));
                $content = b.___content.substring(b.___content.indexOf(":") + 1, b.___content.length);
                if ($contentType == "id") {
                    e.children().appendTo($("#" + $content));
                    g.parent().removeAttr("style").remove();
                    f.remove()
                }
                else {
                    g.parent().removeAttr("style").remove();
                    f.remove()
                }
            }
        },
        keyDown: function(e){
            document.onkeydown = function(f){
                f = f || event;
                if (f.keyCode == 27) {
                    $.XYTipsWindow.removeBox()
                }
            }
        }
    })
})(jQuery);
