var util = require('util'); //node utils
var chalk = require('chalk');

module.exports = {
    log: {
        json: function(object) {
            var json = util.inspect(object, {
                depth: 3,
                colors: true
            }).trim();

            if (json != '{}' && json != '' && json != 'undefined' && typeof json != 'undefined') {
                process.stdout.write(chalk.white(json) + '\n');
            }
        },

        ok: function(msg) {
            console.log(chalk.green('✓ ') + msg);
        },
        fail: function(msg) {
            console.log(chalk.red('✗ ') + msg);  
        }
    }
};




