'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('drafts', {
        title: 'Макеты и чертежи',
        isDrafts: true
    });
});

module.exports = router;