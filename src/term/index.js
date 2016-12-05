var toTerm = require("./toTerm.js");
var exprt = function () {
    toTerm.apply(null, arguments)
};

exprt.Base = require("./term");
exprt.Object = require("./objTerm");
exprt.Array = require("./arrTerm");
exprt.DomElement = require("./domElementTerm");
exprt.DomText = require("./domTextElementTerm");
exprt.List = require("./termList");

module.exports = exprt;
