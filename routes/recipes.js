const { Router } = require('express')
const controllers = require('../controllers/recipes')

const router = Router()


router.get('/recipes', controllers.getRecipes)
router.get('/recipes/:id', controllers.getRecipe)
router.post('/recipes', controllers.createRecipe)
router.put('/recipes/:id', controllers.updateRecipe)


module.exports = router