'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('drafts', {
        title: 'Готовые чертежи'
    });
});

router.get('/arkhitekturniy', (req, res) => {
    res.render('archdraft', {
        title: 'Архитектурный макет'
    });
});

router.get('/kontseptualniy', (req, res) => {
    res.render('conceptdraft', {
        title: 'Концептуальный макет'
    });
});

router.get('/landshaftniy', (req, res) => {
    res.render('landdraft', {
        title: 'Ландшафтный макет'
    });
});

router.get('/interaktivniy', (req, res) => {
    res.render('interdraft', {
        title: 'Макет с интерактивной подсветкой'
    });
});

router.get('/podarochniy', (req, res) => {
    res.render('giftdraft', {
        title: 'Подарочный макет'
    });
});

router.get('/promyshlenniy', (req, res) => {
    res.render('promdraft', {
        title: 'Промышленный макет'
    });
});
module.exports = router;