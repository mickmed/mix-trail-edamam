const { Router } = require("express");
const authControllers = require("../controllers/auth");

console.log("routes");
const authRouter = Router();

authRouter.post("/sign-up", authControllers.signUp);
authRouter.post("/sign-in", authControllers.signIn);
authRouter.get("/verify", authControllers.verifyUser);
authRouter.post("/change-password", authControllers.changePassword);

// authRouter.get("/rec", authControllers.getRecipes);


module.exports = authRouter;
