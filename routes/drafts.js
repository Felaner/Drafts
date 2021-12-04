'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('drafts', {
        title: 'Готовые чертежи'
    });
});

module.exports = router;