'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const { project: Project, image: Image } = require('../models/projects')

router.get('/', async (req, res) => {
    await Project.findAll({
        include: {
            model: Image
        }
    }).then(result => {
        res.render('portfolio', {
            title: 'Портфолио',
            result
        });
    })
});

router.get('/add', auth, async (req, res) => {
    res.render('portfolioadd', {
        title: 'Добавить проект'
    });
});

router.post('/add', auth, async (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const {projectName, projectDescription, projectType} = req.body
        await Project.create({
            name: projectName,
            type: projectType,
            description: projectDescription
        }).catch(err => {
            console.log(err)
        });
        const dirname = `public/images/portfolio/${projectName}`;
        if (!fs.existsSync(dirname)) {
            try {
                fs.mkdirSync(dirname, { recursive: true })
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Папка существует')
        }
        const projectIdImg = await Project.findOne({
            attributes: ['id'],
            where: {
                name: projectName
            }
        }).catch(err => {
            console.log(err)
        })
        req.files['projectImages'].forEach(img => {
            let filename = img.originalname.split('.')[0];
            sharp(img.buffer)
                .toFormat('webp')
                .webp({ quality: 90 })
                .toFile(dirname + `/${filename}.webp`)
            Image.create({
                src: dirname + `/${filename}.webp`,
                name: filename,
                ProjectId: projectIdImg.id
            }).catch(err => {
                console.log(err)
            });
        })
        return res.status(200).render('portfolioadd', {
            title: 'Добавить проект'
        });
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;