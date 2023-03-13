const Product = require('../models/Product')

const getIndex = (req, res) => {
    if (req.cookies.isAdmin, req.cookies.userLogin != true) res.redirect('/')
    else {
        res.render('admin', {
            title: 'Admin',
            admin: true,
            isAdmin: req.cookies.isAdmin,
            userLogin: req.cookies.userLogin
        })
    }

}

const postIndex = (req, res) => {
    const { name, description, image, price, color, size, type, garment, equipment, typeGarment } = req.body
    const newProduct = new Product(name, description, image, price, color, size, type, garment, equipment, typeGarment)
    newProduct.save(() => {
        res.redirect('/')
    })
}



module.exports = {
    getIndex: getIndex,
    postIndex: postIndex

}