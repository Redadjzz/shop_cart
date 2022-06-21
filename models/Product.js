const fs = require('fs')
const path = require('path')

const appDir = path.dirname(require.main.filename)

const { v4: uuidv4 } = require('uuid');
const p = path.join(appDir, 'data', 'products.json')

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    })
}
class Product {
    constructor(name, description, image, price) {
        this.name = name
        this.description = description
        this.image = image
        this.price = price
    }


    save(callback) {
        this.id = uuidv4()
        getProductsFromFile(product => {
            product.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                if (err) console.log(err)
                callback()

            })
        })

        fs.readFile(p, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }

            products.push(this)




        })
    }

    static findAll(callback) {
        getProductsFromFile(product => {
            callback(product)
        })
    }

    static findById(id, callback) {
        getProductsFromFile(product => {
            const product = products.find(prod => prod.id == id)
            callback(product)
        })
    }
}

module.exports = Product