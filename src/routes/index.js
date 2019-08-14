const express = require('express');
const path = require('path');
const createHtmlService = require('../services/htmlService');

const router = express.Router();

/** ***************************************************** */
/** root routes start                                   * */
/** ***************************************************** */

router.get('/', (req, res) => {
    try {
        const htmlService = createHtmlService();
        const html = htmlService.getHtml();
        res.send(html);
    } catch (err) {
        throw err;
    }
});

// router.post('/', (req, res) => {

// });

/** ***************************************************** */
/** root routes end                                     * */
/** ***************************************************** */

/** ***************************************************** */
/** other routes start                                  * */
/** ***************************************************** */

// catch-all 404 page.
router.get('*', (req, res) => {
    return res.send('OH OH!!');
    return res.render(`${path.resolve(req.app.get('GLOBAL').VIEW_PAGES_PATH, 'error/404')}`);
});

/** ***************************************************** */
/** other routes end                                    * */
/** ***************************************************** */

module.exports = router;
