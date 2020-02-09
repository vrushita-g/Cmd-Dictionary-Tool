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
        let definitions = await requestApi(apiUrl);
        if (definitions) {
            console.log(chalk.green('synonyms'.toUpperCase()));
            for (let synonym of synonyms) {
                console.log(chalk.blue(synonym.text))
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
            return JSON.parse(response);
        })
        .catch((err) => {
            console.log(chalk.red(err.body))
        });
}

module.exports = apiService;