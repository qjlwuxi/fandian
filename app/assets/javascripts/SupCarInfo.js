function KcbCarInfo(){
    this.SupID = this.SupName = null;
    this.Businessstate = 1;
    this.SendPrice = this.totalPrice = 0;
    this.BusinessModel = 1;
    this.FoodInfos = new Array();
    this.RefreshCookie = function(){
        $.cookie("KcbCarInfo", JSON.stringify(this), {
            path: "/",
            expires: 43200
        })
    }
}

function FoodInfo(){
    this.foodID = this.foodName = null;
    this.number = this.foodprice = 0;
    this.activityState = 0
}

function ExistsFood(food){
    var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
    var FoodList = kcbCarInFo.FoodInfos;
    for (var i = 0; i < FoodList.length; i++) {
        if (food.foodID == FoodList[i].foodID) {
            addFood(food);
            return
        }
    }
    AddNewFood(food)
}

function AddNewFood(foodmodel){
    var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
    var FoodList = kcbCarInFo.FoodInfos;
    FoodList[FoodList.length] = foodmodel;
    kcbCarInFo.totalPrice = floatAdd(parseFloat(kcbCarInFo.totalPrice), parseFloat(foodmodel.foodprice));
    CreateJson(kcbCarInFo, FoodList)
}

function addFood(food){
    var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
    var FoodList = kcbCarInFo.FoodInfos;
    for (var i = 0; i < FoodList.length; i++) {
        if (food.foodID == FoodList[i].foodID) {
            FoodList[i].number = parseInt(FoodList[i].number) + 1;
            kcbCarInFo.totalPrice = floatAdd(parseFloat(kcbCarInFo.totalPrice), parseFloat(FoodList[i].foodprice))
        }
    }
    CreateJson(kcbCarInFo, FoodList)
}

function CreateJson(a, b){
    var c = new KcbCarInfo();
    if (b.length == 0 || b == null) {
        $.cookie("KcbCarInfo", null, {
            path: "/",
            expires: 43200
        });
        return
    }
    else {
        c.Businessstate = a.Businessstate;
        c.BusinessModel = a.BusinessModel;
        c.SendPrice = a.SendPrice;
        c.SupID = a.SupID;
        c.SupName = a.SupName;
        c.totalPrice = a.totalPrice;
        c.FoodInfos = b
    }
    c.RefreshCookie()
}

function subFood(food){
    var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
    var FoodList = kcbCarInFo.FoodInfos;
    for (var i = 0; i < FoodList.length; i++) {
        if (food.foodID == FoodList[i].foodID) {
            FoodList[i].number = parseInt(FoodList[i].number) - 1;
            kcbCarInFo.totalPrice = floatSub(parseFloat(kcbCarInFo.totalPrice), parseFloat(FoodList[i].foodprice));
            if (FoodList[i].number == 0) {
                FoodList.splice(i, 1)
            }
        }
    }
    CreateJson(kcbCarInFo, FoodList)
}

function DelFood(food){
    var kcbCarInFo = eval("(" + $.cookie("KcbCarInfo") + ")");
    var FoodList = kcbCarInFo.FoodInfos;
    for (var i = 0; i < FoodList.length; i++) {
        if (food.foodID == FoodList[i].foodID) {
            kcbCarInFo.totalPrice = floatSub(parseFloat(kcbCarInFo.totalPrice), (parseFloat(FoodList[i].foodprice) * parseFloat(FoodList[i].number)));
            FoodList.splice(i, 1)
        }
    }
    CreateJson(kcbCarInFo, FoodList)
}

function floatAdd(f, d){
    var c, b, a;
    try {
        c = f.toString().split(".")[1].length
    } 
    catch (g) {
        c = 0
    }
    try {
        b = d.toString().split(".")[1].length
    } 
    catch (g) {
        b = 0
    }
    a = Math.pow(10, Math.max(c, b));
    return (f * a + d * a) / a
}

function floatSub(f, d){
    var c, b, a;
    try {
        c = f.toString().split(".")[1].length
    } 
    catch (g) {
        c = 0
    }
    try {
        b = d.toString().split(".")[1].length
    } 
    catch (g) {
        b = 0
    }
    a = Math.pow(10, Math.max(c, b));
    return (f * a - d * a) / a
}

function floatMul(d, b){
    var a = 0, f = d.toString(), c = b.toString();
    try {
        a += f.split(".")[1].length
    } 
    catch (g) {
    }
    try {
        a += c.split(".")[1].length
    } 
    catch (g) {
    }
    return Number(f.replace(".", "")) * Number(c.replace(".", "")) / Math.pow(10, a)
};
