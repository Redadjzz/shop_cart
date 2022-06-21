const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

app.set('view engine', 'pug')
app.use(cookieParser())
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/css', express.static('css'));


app.use(bodyParser.urlencoded({ extended: false }))
const shopRoutes = require('./routes/shop')
app.use('/', shopRoutes)
const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`serveur lancé sur le port ${port}.`))