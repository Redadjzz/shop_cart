const Product = require('../models/Product')
const products = require('../models/Product')

const getIndex = (req, res) => {
    let filter = {}
    if (req.query.color) filter.color = req.query.color
    if (req.query.size) filter.size = req.query.size
    if (req.query.minPrice) filter.minPrice = req.query.minPrice
    if (req.query.maxPrice) filter.maxPrice = req.query.maxPrice
    Product.findAll(products => {
        let filteredProducts = []
        for (let i = 0; i < products.length; i++) {
            if (Object.keys(filter).length == 0) filteredProducts.push(products[i])
            else {
                if (filter.color && products[i].color == filter.color) filteredProducts.push(products[i])
                if (filter.size && products[i].size == filter.size) filteredProducts.push(products[i])
                if (filter.minPrice && filter.maxPrice && products[i].price >= filter.minPrice && products[i].price <= filter.maxPrice) filteredProducts.push(products[i])    
            }
        }
        res.render('index', {
            title: 'Accueil',
            path: '/',
            query: req.query,
            products: filteredProducts,
            isAdmin: req.cookies.isAdmin,
            userLogin: req.cookies.userLogin
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

const logout = (req, res) => {
    res.clearCookie("userLogin")
    res.clearCookie("isAdmin")
    res.redirect('/')
}

const login = (req, res) => {
    let authenticated = false
    let isAdmin = false
    let userLogin = undefined
    user = {
        login: "marc",
        password: "test",
        admin: true
    }
    if (req.query.login == user.login && req.query.password == user.password) {
        isAdmin = user.admin
        res.cookie("userLogin", user.login)
        res.cookie("isAdmin", isAdmin)
        res.redirect('/')
    } else {
        res.render('login', {
            title: 'Login',
            path: '/login',
            query: req.query,
            authenticated,
            isAdmin: req.cookies.isAdmin,
            userLogin: req.cookies.userLogin
        })    
    }
}

module.exports = {
    getIndex: getIndex,
    getProductDetails: getProductDetails,
    getCart: getCart,
    login: login,
    logout: logout
}