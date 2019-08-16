const express = require('express');
// const path = require('path');
const createHtmlService = require('../services/html');
const createApiService = require('../services/api');

const router = express.Router();

/** ***************************************************** */
/** root routes start                                   * */
/** ***************************************************** */

router.get('/', (req, res, next) => {
    try {
        const htmlService = createHtmlService();
        const html = htmlService.getHtml();
        res.send(html);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const apiService = createApiService();
        const cards = req.body;
        const response = await apiService.getHands(cards);

        // success.
        if (response.data) {
            // generate html using the transformer an include the previous form data and the new result in the html.
        }

        // if the response contains errors, then render the html with the errors passed in.
        // const htmlService = createHtmlService();
        res.status(200).json(response.body);
    } catch (err) {
        res.status(err.statusCode).json(err.body);
        next(err);
    }
});

/** ***************************************************** */
/** root routes end                                     * */
/** ***************************************************** */

/** ***************************************************** */
/** other routes start                                  * */
/** ***************************************************** */

// catch-all 404 page.
router.get('*', (req, res) => {
    return res.send('OH OH!!');
    // return res.render(`${path.resolve(req.app.get('GLOBAL').VIEW_PAGES_PATH, 'error/404')}`);
});

/** ***************************************************** */
/** other routes end                                    * */
/** ***************************************************** */

module.exports = router;
