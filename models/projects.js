const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const project = sequelize.define('Project', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const image = sequelize.define('Image', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    src: {
        allowNull: false,
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ProjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey : true
    }
})

// const fullProject = sequelize.define('fullProject', {
//     id: {
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         type: Sequelize.INTEGER
//     }
// })

project.hasMany(image, {foreignKey : 'ProjectId'});
image.belongsTo(project, {foreignKey : 'ProjectId'})

module.exports = {
    project, image
}