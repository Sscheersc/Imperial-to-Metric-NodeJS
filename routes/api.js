"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;

    if (!input) {
      return res.status(400).json({ error: 'missing input' });
    }
    // Retrieve number and unit from input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return res.status(200).send("invalid number and unit");
    }

    if (initUnit === "invalid unit") {
      return res.status(200).send("invalid unit");
    }

    if (initNum === "invalid number") {
      return res.status(200).send("invalid number");
    }

    try {
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);

      // Directly create the response string using existing methods
      const responseString = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

      res.status(200).json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: responseString,
      });
    } catch (error) {
      console.error("Error processing conversion:", error);
      res.status(500).json({ error: "internal server error" });
    }
  });
};
