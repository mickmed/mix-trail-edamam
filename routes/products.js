// const { Router } = require('express')
// const controllers = require('../controllers/products')

// const router = Router()

// console.log('here')

// router.get('./', controllers.getRoot)
// router.get('./products', controllers.getProducts)
// router.get('./products/:id', controllers.getProduct)
// router.post('./products', controllers.createProduct)
// router.put('./products/:id', controllers.updateProduct)
// router.delete('./products/:id', controllers.deleteProduct)

// module.exports = router


const { Router } = require('express')
const controllers = require('../controllers/products')

const router = Router()


router.get('/products', controllers.getProducts)
router.get('/products/:id', controllers.getProduct)
router.post('/products', controllers.createProduct)
router.put('/products/:id', controllers.updateProduct)
router.delete('/products/:id', controllers.deleteProduct)

module.exports = router