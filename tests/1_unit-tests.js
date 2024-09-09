const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("1/ ConvertHandler should correctly read a whole number input.", function () {
    assert.equal(convertHandler.getNum("5L"), 5);
  });
  test("2/ ConvertHandler should correctly read a decimal number input.", function () {
    assert.equal(convertHandler.getNum("30.2L"), 30.2);
  });
  test("3/ ConvertHandler should correctly read a fractional input.", function () {
    assert.equal(convertHandler.getNum("3/4L"), 3 / 4);
  });
  test("4/ ConvertHandler should correctly read a fractional input with a decimal.", function () {
    assert.equal(convertHandler.getNum("3.2/4L"), 3.2 / 4);
  });
  test("5/ ConvertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
     assert.strictEqual(convertHandler.getNum("3/2/3"), "invalid number");
  });
  test("6/ ConvertHandler should correctly return an error for an invalid unit", function () {
    assert.strictEqual(convertHandler.getUnit("32g"), "invalid unit");
  });
  test("7/ ConvertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    assert.equal(convertHandler.getNum("L"), 1);
  });
  test("8/ ConvertHandler should correctly read each valid input unit.", function () {
    assert.equal(convertHandler.getUnit("5L"), "L");
    assert.equal(convertHandler.getUnit("5gal"), "gal");
    assert.equal(convertHandler.getUnit("5km"), "km");
    assert.equal(convertHandler.getUnit("5mi"), "mi");
    assert.equal(convertHandler.getUnit("5kg"), "kg");
    assert.equal(convertHandler.getUnit("5lbs"), "lbs");
  });
  test("9/ ConvertHandler should correctly return an error", function () {
    assert.strictEqual(convertHandler.getUnit("5g"), "invalid unit");
  });
  test("10/ ConvertHandler should return the correct return unit for each valid input unit.", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
  test("11/ ConvertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  test("12/ ConvertHandler should correctly convert gal to L.", function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.00001);
  });
  test("13/ ConvertHandler should correctly convert L to gal.", function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.00001);
  });
  test("14/ ConvertHandler should correctly convert mi to km.", function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.00001);
  });
  test("15/ ConvertHandler should correctly convert km to mi.", function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.00001);
  });
  test("16/ ConvertHandler should correctly convert lbs to kg.", function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.00001);
  });
  test("17/ ConvertHandler should correctly convert kg to lbs.", function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.00001);
  });
});
