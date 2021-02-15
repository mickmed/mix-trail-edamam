const { Router } = require("express")
const controllers = require("../controllers/recipes")
const authControllers = require('../controllers/auth')
const restrict = require('../helpers')



const router = Router()

router.get("/", controllers.getRecipes)
router.get("/:id", controllers.getRecipe)
router.post("/", restrict, controllers.createRecipe)
router.put("/:id", controllers.updateRecipe)

router.delete("/:id", restrict, controllers.deleteRecipe)


router.get('/users/:id', controllers.getRecipesByUser)

// router.get('/fix', controllers.fixNutrientVals)



// router.post('/sign-up', authControllers.signUp)
// router.post('/sign-in', authControllers.signIn)
// router.get('/verify', authControllers.verifyUser)
// router.post('/change-password', authControllers.changePassword)

module.exports = router
