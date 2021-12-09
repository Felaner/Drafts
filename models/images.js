const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

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
    project: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = image