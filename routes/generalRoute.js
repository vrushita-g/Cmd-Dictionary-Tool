const CONFIG = require('../config');
const API_SERVICE = require('../service/apiService');

function GeneralRoutes(data) {
    // data
    this._app       = data[0];
    this._command   = data[1];
    this._word      = data[2];
    if(this._app && this._app === CONFIG.APP){
        switch(this._command){
            case CONFIG.COMMANDS.DEFINITIONS:
                API_SERVICE.displayDefinitions(this._word);
                break;
            case CONFIG.COMMANDS.SYNONYMS:
                API_SERVICE.displaySynonyms(this._word);
                break;
            case CONFIG.COMMANDS.ANTONYMS:
                API_SERVICE.displayAntonyms(this._word);
                break;
            case CONFIG.COMMANDS.EXAMPLES:
                API_SERVICE.displayExamples(this._word);
                break;
            case CONFIG.COMMANDS.DICTIONARY:
                API_SERVICE.displayFullDictionary(this._word);
                break;
            case CONFIG.COMMANDS.PLAY:
                API_SERVICE.initializeGame(this._gameState);
                break;
            default:
                API_SERVICE.defaultAction(this._command);
        }
    }
}

module.exports = GeneralRoutes;