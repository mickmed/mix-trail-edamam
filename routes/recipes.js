const { Router } = require('express')
const controllers = require('../controllers/recipes')

const router = Router()


router.get('/recipes', controllers.getRecipes)
router.get('/recipe/:id', controllers.getRecipe)
router.post('/recipes', controllers.createRecipe)


module.exports = router