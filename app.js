const READLINE = require('readline');
const CHALK = require('chalk');
const HELP = require('./routes/helpRoute');
const ROUTES = require('./routes/generalRoute');

let a = [{"text":"123"},{"text":"353"}]
for (let i of a) {
    console.log(i)
}
let inputInterface = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "ENTER>"
});

console.log(CHALK.green('Write "help" to get commands'));

// attaching the listeners to our input interface's line event
inputInterface.on('line', (line) => {
    if (line === 'help') {
        HELP();
    }else {
          ROUTES(line.trim().split(' '))
    }
    inputInterface.prompt();
});