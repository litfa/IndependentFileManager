module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
    },
    "rules": {
        "no-console": "off",
        // "indent": [
        //     "error",
        //     4
        // ],
        "linebreak-style": [
            "error",
            "windows"
        ],

        "semi": [
            "error",
            "always"
        ]
    },

};