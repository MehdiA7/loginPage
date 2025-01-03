require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const router = express.Router();

/* Formulaire de connexion */
router.post('/', (req, res) => {
    // Pas d'information à traiter
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter the correct email and password' })
    }

    // Checking
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password)

    // Pas bon
    if (!user) {
        return res.status(400).json({ message: 'Error. Wrong login or password' })
    }else{
        res.sendFile('../superUserPages/welcome.html');
    }
})

module.exports = router;
