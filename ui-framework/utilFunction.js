String.prototype.colorRgb2Hex = function() {
    var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    var that = this;

    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";

        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);

            if (hex === "0") {
                hex += hex;
            }

            strHex += hex;
        }

        if (strHex.length !== 7) {
            strHex = that;
        }

        return strHex.toUpperCase();
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");

        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";

            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }

            return numHex.toUpperCase();
        }
    } else {
        return that.toUpperCase();
    }
}

exports.getValue = function (field){
    return field.colorRgb2Hex();
}
