const chalk = require('chalk');
const MESSAGE = require('../helper/message.helper');

function Help(){
    console.log(chalk.green(MESSAGE.HELP_MESSAGE));
}

module.exports = Help;