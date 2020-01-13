'use strict';

const models = require('../models');
const Battery = models.Battery;

class BatteryController {

    async add(arrayOrFields) {
        if ( arrayOrFields.constructor === Array ) {
            const result = [];
            for( const fields of arrayOrFields) {
                result.push(await this.add(fields));
            }
            return result;
        }else{
            return Battery.create(arrayOrFields);
        }
    }

    async addArray(array) {
        for(const idx of array) {
            await this.add(array[idx]);
        }
    }

    async getAll() {
        return Battery.findAll();
    }
}

module.exports = new BatteryController();
