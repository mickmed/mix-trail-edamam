const { Router } = require("express")
const controllers = require("../controllers/recipes")
const authControllers = require('../controllers/auth')
const restrict = require('../helpers')



const router = Router()

router.get("/recipes", controllers.getRecipes)
router.get("/recipes/:id", controllers.getRecipe)
router.post("/recipes", controllers.createRecipe)
router.put("/recipes/:id", controllers.updateRecipe)

router.delete("/recipes/:id", controllers.deleteRecipe)


router.get('/users/:id/recipes', controllers.getRecipesByUser)

// router.get('/fix', controllers.fixNutrientVals)



router.post('/sign-up', authControllers.signUp)
router.post('/sign-in', authControllers.signIn)
router.get('/verify', authControllers.verifyUser)
router.post('/change-password', authControllers.changePassword)

module.exports = router
