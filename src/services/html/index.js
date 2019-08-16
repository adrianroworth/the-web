const createTheTransformer = require('the-transformer');

function createHtmlService() {
    const transformer = createTheTransformer();

    function getHtml() {
        return transformer.getHtml();
    }

    return Object.freeze({
        getHtml
    });
}

module.exports = createHtmlService;
