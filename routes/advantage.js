'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('advantage', {
        title: 'Преимущества',
        isAdvantage: true
    });
});

module.exports = router;