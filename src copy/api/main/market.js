const market = require("../../db/market.json");

module.exports = async (req, res) => {
  res.json(market);
};
