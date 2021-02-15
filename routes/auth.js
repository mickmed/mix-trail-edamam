const { Router } = require("express");
const authControllers = require("../controllers/auth");
const restrict = require("../helpers");

console.log("routes");
const router = Router();

router.post("/sign-up", authControllers.signUp);
router.post("/sign-in", authControllers.signIn);
router.get("/verify", authControllers.verifyUser);
router.post("/change-password", authControllers.changePassword);

module.exports = router;
