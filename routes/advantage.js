'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const mailer = require('../mailer/mail');
const { EMAIL_USER } = require('../keys/index');

router.get('/', (req, res) => {
    res.render('advantage', {
        title: 'Преимущества',
        isAdvantage: true
    });
});

router.post('/', async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const {name, contacts, object, scale, size, detailing, backlight, glass, stand, shipping, delivery, areaMessage} = req.body;
        const message = {
            to: 'axon15@yandex.ru',
            html: `<ul>` +
                `<li>ФИО: ${name}</li>` +
                `<li>Контакты: ${contacts}</li>` +
                `<li>Какой объект нужно сделать?: ${object}</li>` +
                `<li>Масштаб макета: ${scale}</li>` +
                `<li>Размер макета: ${size}</li>` +
                `<li>Степень детализации: ${detailing}</li>` +
                `<li>Нужна ли подсветка?: ${backlight}</li>` +
                `<li>Нужен ли стеклянный колпак?: ${glass}</li>` +
                `<li>Нужны ли ножки или тумба к подмакетнику?: ${stand}</li>` +
                `<li>Нужен ли транспортировочный кофр?: ${shipping}</li>` +
                `<li>Нужна ли доставка?: ${delivery}</li>` +
                `<li>Сообщение: ${areaMessage}</li>` +
                `</ul>`
        }
        mailer(message)
        return res.sendStatus(200);
    } catch(e) {
        console.log(e);
    }
})

module.exports = router;