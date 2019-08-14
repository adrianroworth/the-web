const path = require('path');

const APP_DIR = __dirname;

const VIEW_PATH = path.resolve(APP_DIR, '../views/');
const VIEW_LAYOUTS_PATH = path.resolve(VIEW_PATH, 'layouts/');
const VIEW_PAGES_PATH = path.resolve(VIEW_PATH, 'pages/');
const VIEW_PARTIALS_PATH = path.resolve(VIEW_PATH, 'partials/');

module.exports = {
    APP_DIR,
    VIEW_PATH,
    VIEW_LAYOUTS_PATH,
    VIEW_PAGES_PATH,
    VIEW_PARTIALS_PATH
};
