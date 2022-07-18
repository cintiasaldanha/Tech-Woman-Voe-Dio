var mongoose = require("mongoose");
const Table = require("../models/table").model;
const fs = require("fs");
const { table } = require("console");
const { all } = require("../routes/availabilityRoute");

let tableData = fs.readFileSync(__dirname + "/allTables.json");
tableData = JSON.parse(tableData).tables;

let allTables = [];
tableData.forEach(table => {
  allTables.push(new Table(table));
});

module.exports = allTables;