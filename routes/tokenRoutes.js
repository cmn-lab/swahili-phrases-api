const express = require("express");
const router = express.Router();
const tokenValidator = require("../validator/tokenValidator");
const tokenControllers = require("../controllers/tokenControllers");

router.route('/').post(tokenValidator.checkToken, tokenControllers.handleTokenRefresh);

module.exports = router