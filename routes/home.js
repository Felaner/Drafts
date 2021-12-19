'use strict'

const {Router} = require('express');
const router = Router();
const mailer = require('../mailer/mail');
const { EMAIL_USER } = require('../keys/index');
const request = require('request')

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Главная',
        isHome: true
    });
});

router.post('/', async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const {name, phone, areaMessage} = req.body;
        const message = {
            to: 'axon15@yandex.ru',
            html: `<ul>` +
                `<li>Имя: ${name}</li>` +
                `<li>Телефон: ${phone}</li>` +
                `<li>Сообщение: ${areaMessage}</li>` +
                `</ul>`
        }
        mailer(message)
        return res.sendStatus(200);
    } catch(e) {
        console.log(e);
    }
})

router.get('/policy', (req, res) => {
    res.render('policy', {
        title: 'Политика конфиденциальности'
    });
});

module.exports = router;