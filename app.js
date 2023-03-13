const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require('mongoose');
const userController = require('./controllers/user.controller');


mongoose.connect('mongodb://mongodb:root@localhost:27017/shop', { useNewUrlParser: true });

app.use(bodyParser.json());

// Route pour créer un utilisateur
app.post('/users', userController.createUser);

// Route pour récupérer tous les utilisateurs
app.get('/users', userController.getUsers);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});



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