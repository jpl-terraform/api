'use strict';

const Model = require('sequelize').Model;

const sequelize = require('./database').sequelize;
const Sequelize = require('./database').Sequelize;

class Battery extends Model{}

Battery.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    percentage: Sequelize.INTEGER,
    duration: Sequelize.INTEGER,
}, {timestamps: false, sequelize});

module.exports = Battery;