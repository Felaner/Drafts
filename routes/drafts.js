'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/gotovye_chertezhi_po_graficheskomu_modelirovaniyu_i_inzhenernoy_grafike', (req, res) => {
    res.render('readydrafts', {
        title: 'Готовые чертежи по графическому моделированию и инженерной графике'
    });
});

router.get('/perevod_chertezhey_s_bumazhnogo_nositelya_v_programmy', (req, res) => {
    res.render('translatedrafts', {
        title: 'Перевод чертежей с бумажного носителя в программы'
    });
});

router.get('/chertezhi_karandashom_ot_ruki_na_bumage', (req, res) => {
    res.render('pencildrafts', {
        title: 'Чертежи карандашом от руки на бумаге'
    });
});

router.get('/chertezhi_s_gotovykh_izdeliy', (req, res) => {
    res.render('productsdrafts', {
        title: 'Чертежи с готовых изделий'
    });
});

module.exports = router;