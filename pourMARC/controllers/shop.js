const Product = require('../models/Product')
const Cart = require('../models/Cart')

const getCart = (req, res) => {
    Cart.getCart(cart => {
        if (cart.products.length > 0) {
            Product.findAll(products => {
                let cartProducts = []

                products.forEach(product => {
                    const productData = cart.products.find(prod => prod.id === product.id)
                    if (productData) {
                        cartProducts.push({ product: product, qty: productData.qty })
                    }
                })

                res.render('cart', {
                    title: 'Panier',
                    path: '/panier',
                    cartProducts: cartProducts,
                    totalPrice: cart.totalPrice,
                    hasProducts: true
                })
            })
        } else {
            res.render('cart', {
                title: 'Panier',
                path: '/panier',
                hasProducts: false
            })
        }
    })
}


const getIndex = (req, res) => {
    let filter = {}
    if (req.query.color) filter.color = req.query.color
    if (req.query.size) filter.size = req.query.size
    if (req.query.minPrice) filter.minPrice = req.query.minPrice
    if (req.query.maxPrice) filter.maxPrice = req.query.maxPrice
    if (req.query.type) filter.type = req.query.type
    if (req.query.garment) filter.garment = req.query.garment
    if (req.query.equipment) filter.equipment = req.query.equipment
    if (req.query.typeGarment) filter.typeGarment = req.query.typeGarment

    Product.findAll(products => {
        let filteredProducts = []
        for (let i = 0; i < products.length; i++) {
            if (Object.keys(filter).length == 0) filteredProducts.push(products[i])
            else {
                if (filter.color && products[i].color == filter.color) filteredProducts.push(products[i])
                if (filter.size && products[i].size == filter.size) filteredProducts.push(products[i])

                if (filter.type && products[i].type == filter.type) filteredProducts.push(products[i])
                if (filter.garment && products[i].garment == filter.garment) filteredProducts.push(products[i])
                if (filter.typeGarment && products[i].typeGarment == filter.typeGarment) filteredProducts.push(products[i])
                if (filter.equipment && products[i].equipment == filter.equipment) filteredProducts.push(products[i])


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

const postCart = (req, res) => {
    Product.findById(req.body.productId, product => {
        Cart.add(req.body.productId, product.price, () => {
            res.redirect('/panier')
        })
    })
}

module.exports = {
    getIndex: getIndex,
    getProductDetails: getProductDetails,
    getCart: getCart,
    postCart: postCart,
    login: login,
    logout: logout
}