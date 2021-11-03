'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('archdraft', {
        title: 'Архитектурный макет',
        isHome: true
    });
});

module.exports = router;