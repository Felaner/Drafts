'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('admin', {
        title: 'Войти в админку',
        isAdmin: true
    });
});

module.exports = router;