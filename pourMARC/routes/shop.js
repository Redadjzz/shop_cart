const express = require('express')
const shop = require('../controllers/shop')
const router = express.Router()

const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex)

router.get('/produit/:id', shopController.getProductDetails)


router.get('/panier', shopController.getCart)

router.get('/login', shopController.login)
router.get('/logout', shopController.logout)

router.post('/ajouter-au-panier', shopController.postCart)


module.exports = router