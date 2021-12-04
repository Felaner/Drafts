'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('otzyvy', {
        title: 'Отзывы',
        isOtzyvy: true
    });
});

module.exports = router;