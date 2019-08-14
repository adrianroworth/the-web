const path = require('path');
const TexasHelpEm = require('../../lib/texasHelpEm');

async function indexGet(req, res) {
    return res.render(`${path.resolve(req.app.get('GLOBAL').VIEW_PAGES_PATH, 'index')}`);
}

function indexPost(req, res) {
    const HelpEm = TexasHelpEm();
    const cards = req.body['cards[]'];

    if (cards.length !== 7) {
        const error = Error();
        error.statusCode = 400;
        error.title = 'Bad Request';
        error.message = 'Request must contain an array with 7 elements';
        throw error;
    }
    HelpEm.setCards(cards);
    const hands = HelpEm.getHands();
    return res.json(hands);
}

module.exports = {
    indexGet,
    indexPost
};
