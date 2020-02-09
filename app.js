const READLINE = require('readline');
const CHALK = require('chalk');
const HELP = require('./routes/helpRoute');


let inputInterface = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "ENTER>"
});

console.log(CHALK.green('Write help to get commands'));

// attaching the listeners to our input interface's line event
inputInterface.on('line', (line) => {
    if (line === 'help') {
        HELP();
    }
    inputInterface.prompt();
});