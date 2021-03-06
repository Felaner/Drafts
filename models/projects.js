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
    scale: {
        type: Sequelize.STRING,
        allowNull: true
    },
    size: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customer: {
        type: Sequelize.STRING,
        allowNull: true
    },
    customerUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
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

project.hasMany(image, {foreignKey : 'ProjectId'});
image.belongsTo(project, {foreignKey : 'ProjectId'})

module.exports = {
    project, image
}