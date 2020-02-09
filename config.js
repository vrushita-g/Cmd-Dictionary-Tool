
let CONF = {
    API_KEY           : 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164',
    APP               : './dict',
    // general commands
    COMMANDS          : {
        DEFINITIONS  : 'defn',
        SYNONYMS     : 'syn',
        ANTONYMS     : 'ant',
        EXAMPLES     : 'ex',
        DICTIONARY   : 'dict',
        PLAY         : 'play'
    },

    // API url
    API_URL           : {
        BASE_URL              : 'https://fourtytwowords.herokuapp.com',
        DEFINITIONS           : '/definitions?api_key=',
        SYNONYMS              : '/relatedWords?api_key=',
        ANTONYMS              : '/relatedWords?api_key=',
        EXAMPLES              : '/examples?api_key=',
        RANDOM_WORD           :'/words/randomWord?api_key='
    },
};

module.exports = CONF;
