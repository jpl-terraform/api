'use strict';

const models = require('../models');
const Battery = models.Battery;

class BatteryController {

    async add(fields) {
        return Battery.create(fields);
    }

    async getAll() {
        return Battery.findAll();
    }
}

module.exports = new BatteryController();
