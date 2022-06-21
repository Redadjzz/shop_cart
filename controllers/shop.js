const Product = require('../models/Product')
const products = require('../models/Product')

const getIndex = (req, res) => {
    Product.findAll(products => {
        res.render('index', {
            title: 'Accueil',
            path: '/',
            products: products

        })
    })
}

const getProductDetails = (req, res) => {
    Product.findById(req.params.id, product => {
        console.log(product)
        res.render('product-details', {
            title: product.name,
            product: product
        })
    })
}

const getCart = (req, res) => {
    res.render('cart', {
        title: 'Panier',
        path: '/panier'
    })

}

module.exports = {
    getIndex: getIndex,
    getProductDetails: getProductDetails,
    getCart: getCart
}