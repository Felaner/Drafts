'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

// router.get('/', (req, res) => {
//     res.render('layouts', {
//         title: 'Макеты'
//     });
// });


router.get('/arkhitekturniy', (req, res) => {
    const folder = 'public/images/maket/arch';
    let images = fs.readdirSync(folder)
    res.render('archdraft', {
        title: 'Архитектурный макет',
        images
    });
});

router.get('/kontseptualniy', (req, res) => {
    const folder = 'public/images/maket/concept';
    let images = fs.readdirSync(folder)
    res.render('conceptdraft', {
        title: 'Концептуальный макет',
        images
    });
});

router.get('/landshaftniy', (req, res) => {
    const folder = 'public/images/maket/landshaft';
    let images = fs.readdirSync(folder)
    res.render('landdraft', {
        title: 'Ландшафтный макет',
        images
    });
});

router.get('/interaktivniy', (req, res) => {
    const folder = 'public/images/maket/interactive';
    let images = fs.readdirSync(folder)
    res.render('interdraft', {
        title: 'Макет с интерактивной подсветкой',
        images
    });
});

router.get('/podarochniy', (req, res) => {
    const folder = 'public/images/maket/podar';
    let images = fs.readdirSync(folder)
    res.render('giftdraft', {
        title: 'Подарочный макет',
        images
    });
});

router.get('/promyshlenniy', (req, res) => {
    const folder = 'public/images/maket/promish';
    let images = fs.readdirSync(folder)
    res.render('promdraft', {
        title: 'Промышленный макет',
        images
    });
});
module.exports = router;