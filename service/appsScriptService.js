const request = require('request-promise-native');
const queryString = require('querystring');


let appsScriptService = {
    generateCoverLetter: function (coverLetterInfo) {
        let generate_cover_letter = 'https://script.google.com/macros/s/AKfycbx5h-ZDEY7CZiJJuFGIIyQHfUXggBfMQ0Ms-h5OcEeY-CyaJTs/exec?';
        return request.get(generate_cover_letter + queryString.stringify(coverLetterInfo));
    }
};

module.exports = appsScriptService;