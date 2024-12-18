const {
    getToken
  } = require("../controllers/locationIQ.controller");
  const express = require("express");
  
  const locationIQRouter = express.Router();
  
  locationIQRouter.route("/locationid/getToken").get(getToken);
  
  module.exports = locationIQRouter;
  