const chalk = require('chalk');
const DictionaryService = require('../service/apiService');
const readline = require('readline');
const inquirer = require('inquirer');


let GameRoute = {

    run: async function () {
        let word = await DictionaryService.displayWordOfTheDay(true);
        let definitions = await DictionaryService.displayDefinitions(word, true);
        let relatedWords = await DictionaryService.getSynonymsAndAntonyms(word);
        let synonyms = relatedWords.synonyms;
        let antonyms =  relatedWords.antonyms;
        let choices = [
            {
                name: "definition",
                value: definitions
            },
            {
                name: "synonym",
                value: synonyms
            }
        ];

        if (antonyms.length) {
            choices.push({
                name: "antonym",
                value: antonyms
            })
        }

        let randomChoice = await this.getRandomChoice(choices);

        let oneRandomChoiceElement = await this.getRandomChoice(randomChoice.value)

        console.log(chalk.yellow(randomChoice.name.toUpperCase()));
        console.log(oneRandomChoiceElement, '\n');
        await this.ask(word, synonyms, randomChoice)
    },

    ask: async function (word, synonyms, randomChoice) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter the Word? ', async (wordInput) => {
            if ((wordInput == word) || (synonyms.includes(wordInput))) {
                console.log(chalk.green('You have entered the correct word'))
            } else {
                console.log(chalk.red('The word you have entered is incorrect'))
                let responses = await inquirer.prompt([{
                    name: 'stage',
                    message: 'select an option',
                    type: 'list',
                    choices: [{name: '1. try again'}, {name: '2. hint'}, {name: '3. quit'}],
                }]);
                let stage = responses.stage
                switch (stage) {
                    case '1. try again':
                        rl.close();
                        await this.ask(word, synonyms, randomChoice)
                        break;
                    case '2. hint':
                        let shuffledWord = word.split('').sort(function () {
                            return 0.5 - Math.random()
                        }).join('');
                        let anotherRandomChoiceElement = await this.getRandomChoice(randomChoice.value)
                        let hintChoices = [
                            {
                                name: 'shuffledWord',
                                value: shuffledWord
                            },
                            {
                                name: 'anotherDetail',
                                value: anotherRandomChoiceElement
                            }
                        ];
                        let hintRandomChoice = await this.getRandomChoice(hintChoices)
                        if (hintRandomChoice.name == 'shuffledWord') {
                            console.log(chalk.blue(hintRandomChoice.value))
                        } else {
                            console.log(chalk.yellow(randomChoice.name.toUpperCase()))
                            console.log(anotherRandomChoiceElement)
                        }
                        rl.close();
                        await this.ask(word, synonyms, randomChoice)
                        break;
                    case '3. quit':
                        console.log(chalk.yellow('Word is ', chalk.blue(word), '\n'))
                        break;
                    default:
                        break;
                }
            }
            rl.close();
        });

    },

    getRandomChoice: async function (array) {
        return array[Math.floor(Math.random() * array.length)]
    }
};



module.exports = GameRoute;
