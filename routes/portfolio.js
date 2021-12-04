'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    // Первая часть
    const folderAcademycity = 'public/images/portfolio/academycity/';
    const folderAltaystroy = 'public/images/portfolio/altaystroy/';
    const folderAltaytentkupol = 'public/images/portfolio/altaytentkupol/';
    const folderAltaytentmr = 'public/images/portfolio/altaytentmr/';
    const folderBerdsk = 'public/images/portfolio/berdsk/';
    const folderDomina = 'public/images/portfolio/domina/';
    const folderGranotek = 'public/images/portfolio/granotek/';
    const folderIziskania = 'public/images/portfolio/iziskania/';
    const folderOctober = 'public/images/portfolio/october/';
    const folderVenecia = 'public/images/portfolio/venecia/';
    // Вторая часть
    const folderDomNaChap = 'public/images/portfolio/domNaChap/';
    const folderElsi = 'public/images/portfolio/elsi/';
    const folderFabrichnaya = 'public/images/portfolio/fabrichnaya/';
    const folderGbu = 'public/images/portfolio/gbu/';
    const folderKotelnayaKotlomash = 'public/images/portfolio/kotelnayaKotlomash/';
    const folderKotelnayaOoo = 'public/images/portfolio/kotelnayaOoo/';
    const folderKvartalKoms = 'public/images/portfolio/kvartalKoms/';
    const folderLegendarniy = 'public/images/portfolio/legendarniy/';
    const folderMaketiDlyaLudey = 'public/images/portfolio/maketiDlyaLudey/';
    const folderMupSah = 'public/images/portfolio/mupSah/';
    const folderMupSahHistory = 'public/images/portfolio/mupSahHistory/';
    const folderNaNarodnoy = 'public/images/portfolio/naNarodnoy/';
    const folderTes = 'public/images/portfolio/tes/';
    const folderZavod = 'public/images/portfolio/zavod/';
    // Первая часть
    let academycity = fs.readdirSync(folderAcademycity)
    let altaystroy = fs.readdirSync(folderAltaystroy)
    let altaytentkupol = fs.readdirSync(folderAltaytentkupol)
    let altaytentmr = fs.readdirSync(folderAltaytentmr)
    let berdsk = fs.readdirSync(folderBerdsk)
    let domina = fs.readdirSync(folderDomina)
    let granotek = fs.readdirSync(folderGranotek)
    let iziskania = fs.readdirSync(folderIziskania)
    let october = fs.readdirSync(folderOctober)
    let venecia = fs.readdirSync(folderVenecia)
    // Вторая часть
    let domNaChap = fs.readdirSync(folderDomNaChap)
    let elsi = fs.readdirSync(folderElsi)
    let fabrichnaya = fs.readdirSync(folderFabrichnaya)
    let gbu = fs.readdirSync(folderGbu)
    let kotelnayaKotlomash = fs.readdirSync(folderKotelnayaKotlomash)
    let kotelnayaOoo = fs.readdirSync(folderKotelnayaOoo)
    let kvartalKoms = fs.readdirSync(folderKvartalKoms)
    let legendarniy = fs.readdirSync(folderLegendarniy)
    let maketiDlyaLudey = fs.readdirSync(folderMaketiDlyaLudey)
    let mupSah = fs.readdirSync(folderMupSah)
    let mupSahHistory = fs.readdirSync(folderMupSahHistory)
    let naNarodnoy = fs.readdirSync(folderNaNarodnoy)
    let tes = fs.readdirSync(folderTes)
    let zavod = fs.readdirSync(folderZavod)

    let images = {
        academycity, altaystroy, altaytentkupol, altaytentmr, berdsk, domina, granotek, iziskania, october, venecia, domNaChap,
        elsi, fabrichnaya, gbu, kotelnayaKotlomash, kotelnayaOoo, kvartalKoms, legendarniy, maketiDlyaLudey, mupSah, mupSahHistory,
        naNarodnoy, tes, zavod
    }
    res.render('portfolio', {
        title: 'Портфолио',
        images
    });
});

module.exports = router;