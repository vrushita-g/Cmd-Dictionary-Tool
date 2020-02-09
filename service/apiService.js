const RP = require('request-promise');
const chalk = require('chalk');
const CONFIG = require('../config');

let apiService = {
    displayDefinitions: async function (word) {
        let apiUrl = CONFIG.API_URL.BASE_URL + '/word/' + word + CONFIG.API_URL.DEFINITIONS + CONFIG.API_KEY;
        let definitions = await requestApi(apiUrl);
        if (definitions) {
            console.log(chalk.green('definitions'.toUpperCase()));
            for (let definition of definitions) {
                console.log(chalk.blue(definition.text))
            }
        }
    },
    displaySynonyms: async function (word) {
        let apiUrl = CONFIG.API_URL.BASE_URL + '/word/' + word + CONFIG.API_URL.SYNONYMS + CONFIG.API_KEY;
        let resp = await requestApi(apiUrl);
        if(resp){
            let synonyms = resp.find(x => x.relationshipType === 'synonym');
            if (synonyms) {
                console.log(chalk.green('synonyms'.toUpperCase()));
                for (let synonym of synonyms.words) {
                    console.log(chalk.blue(synonym))
                }
            }
        }

    },
    displayAntonyms: async function (word) {
        let apiUrl = CONFIG.API_URL.BASE_URL + '/word/' + word + CONFIG.API_URL.ANTONYMS + CONFIG.API_KEY;
        let resp = await requestApi(apiUrl);
        if(resp){
            let antonyms = resp.find(x => x.relationshipType === 'antonym');
            if (antonyms) {
                console.log(chalk.green('antonyms'.toUpperCase()));
                for (let antonym of antonyms.words) {
                    console.log(chalk.blue(antonym))
                }
            } else {
                console.log(chalk.yellow('Antonyms not found for the given word.\n'));
            }
        }
    },
    displayExamples: async function (word) {
        let apiUrl = CONFIG.API_URL.BASE_URL + '/word/' + word + CONFIG.API_URL.EXAMPLES + CONFIG.API_KEY;
        let resp = await requestApi(apiUrl);
        if(resp){
            let examples = resp.examples.map(x => x.text);
            if (examples) {
                console.log(chalk.green('examples'.toUpperCase()))
                for (let example of examples) {
                    console.log(chalk.blue(example));
                }
            }
        }
    }
};

function requestApi(apiUrl) {
    let options = {
        method: "GET",
        url: apiUrl
    };
    return RP(options)
        .then((response) => {
            console.log(response);
            return JSON.parse(response);
        })
        .catch((err) => {
            console.log(chalk.red(err.body))
        });
}

module.exports = apiService;