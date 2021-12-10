'use strict'

const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const { project: Project, image: Image } = require('../models/projects')

router.get('/', async (req, res) => {
    const result = [];
    await Project.findAll({
        where: {
            type: 'Архитектурный макет'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(arch => {
        result.push(arch)
    })
    await Project.findAll({
        where: {
            type: 'Концептуальный макет'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'id', 'ASC']
        ]
    }).then(concept => {
        result.push(concept)
    })
    await Project.findAll({
        where: {
            type: 'Ландшафтный макет'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(land => {
        result.push(land)
    })
    await Project.findAll({
        where: {
            type: 'Макет с интерактивной подсветкой'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(inter => {
        result.push(inter)
    })
    await Project.findAll({
        where: {
            type: 'Подарочный макет'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(gift => {
        result.push(gift)
    })
    await Project.findAll({
        where: {
            type: 'Промышленный макет'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(prom => {
        result.push(prom)
    })
    await Project.findAll({
        where: {
            type: 'Прочее'
        },
        include: {
            model: Image
        },
        order: [
            [Image, 'name', 'ASC']
        ]
    }).then(any => {
        result.push(any)
        let arch = result[0],
            concept = result[1],
            land = result[2],
            inter = result[3],
            gift = result[4],
            prom = result[5],
            anything = result[6]
        res.render('portfolio', {
            title: 'Портфолио',
            arch, concept, land, inter, gift, prom, anything
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
        const {projectName, projectType, projectScale,
            projectSize, projectTime, projectCustomer,
            projectCustomerUrl, projectDescription} = req.body
        await Project.create({
            name: projectName,
            type: projectType,
            scale: projectScale,
            size: projectSize,
            time: projectTime,
            customer: projectCustomer,
            customerUrl: projectCustomerUrl,
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
            let filename = img.originalname.substr(0, img.originalname.lastIndexOf('.'));
            sharp(img.buffer)
                .toFormat('webp')
                .webp({ quality: 90 })
                .toFile(dirname + `/${filename}.webp`)
            Image.create({
                src: `images/portfolio/${projectName}` + `/${filename}.webp`,
                name: filename,
                ProjectId: projectIdImg.id
            }).catch(err => {
                console.log(err)
            });
        })
        return res.status(200).render('portfolioadd', {
            title: 'Добавить проект',
        });
    } catch(e) {
        console.log(e);
    }
});

router.get('/edit', auth, async (req, res) => {
    try {
        const projects = await Project.findAll();

        res.render('edit', {
            title: `Редактирование проектов`,
            projects
        });
    } catch (e) {
        console.dir(e)
    }
});

router.get('/edit/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        res.render('project-edit', {
            title: `Редактирование ${project.name}`,
            project
        });
    } catch (e) {
        console.dir(e)
    }
});

router.post('/edit', auth, async (req, res) => {
    const {id, projectEditName, projectEditType,
        projectEditScale, projectEditSize, projectEditTime,
        projectEditCustomer, projectEditCustomerUrl, projectEditDescription} = req.body;

    try {
        await Project.update(
            {
                name: projectEditName,
                type: projectEditType,
                scale: projectEditScale,
                size: projectEditSize,
                time: projectEditTime,
                customer: projectEditCustomer,
                customerUrl: projectEditCustomerUrl,
                description: projectEditDescription
            },
            {
                where: {
                    id: id
                }
            }
        ).then(result => {
            res.redirect('/portfolio');
        }).error(e => {
            console.log(e)
        });
    } catch (e) {
        console.dir(e)
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        const images = Image.findAll({
            attributes: ['src'],
            where: {
                ProjectId: req.body.id
            }
        }).then(result => {
            result.forEach(el => {
                try {
                    fs.rmSync('public/' + el.src, { recursive: true, force: true });
                } catch (error) {
                    console.error(error)
                }
            })
        })
        await Project.destroy({
            where: {
                id: req.body.id
            }
        });
        res.redirect('/portfolio');
    } catch(e) {
        console.dir(e);
    }
})

module.exports = router;