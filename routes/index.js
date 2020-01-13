'use strict';

class RouterBuilder {
    build(app){
        app.use('/battery',require('./battery.router'))
    }
}

module.exports = new RouterBuilder();