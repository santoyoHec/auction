const catchError = require("../utils/catchError");

const getToken = catchError(async (req, res) => {
    const LOCATIONIQ_TOKEN = process.env.LOCATIONIQ_TOKEN;
    if (!LOCATIONIQ_TOKEN) {
        return res.sendStatus(404);
    }
    const location ={
        token: LOCATIONIQ_TOKEN
    }
    return res.json({LocationID: location});
  });

  module.exports = {
    getToken
  };