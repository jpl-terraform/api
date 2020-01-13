db = require('./database');

module.exports = {
    Battery : require('./battery'),
};

db.sequelize.sync();