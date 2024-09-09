function ConvertHandler() {
  
  this.getNum = function (input) {
    let result;
    let numRegex = /^[\d/.]+/;
    let num = input.match(numRegex);

    if (!num) return 1;

    if (num[0].includes("//") || num[0].split("/").length > 2) {
      return "invalid number";
    }

    try {
      result = eval(num[0]);
    } catch (e) {
      return "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);

    if (!match) {
      return "invalid unit";
    }

    const unit = match[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (validUnits.includes(unit)) {
      return unit === "l" ? "L" : unit;
    } else {
      return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return unitMap[initUnit] || "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    const unitSpelling = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return unitSpelling[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = "invalid unit";
    }

    return parseFloat(result.toFixed(5));
  };
}

module.exports = ConvertHandler;
