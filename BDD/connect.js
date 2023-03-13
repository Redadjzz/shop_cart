const express = require('express');
const mongoose = require('mongoose');
const users = require('./users.json');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/Shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
    // Ajouter des utilisateurs fictifs à la base de données
    User.insertMany(users).then(() => {
        console.log('Data successfully loaded');
        mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    });
}).catch((err) => {
    console.log(err);
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});