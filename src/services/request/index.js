const got = require('got');
const merge = require('lodash.merge');

function createRequestService() {
    function post(options) {
        let opts = {
            method: 'POST',
            headers: {
                accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            json: true,
            body: options.body,
            throwHttpErrors: false
        };
        opts = merge(opts, options);
        return got(options.url, opts);
    }

    function get(options) {
        let opts = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            json: true,
            throwHttpErrors: false
        };
        opts = merge(opts, options);
        return got(opts.url, opts);
    }

    function put(options) {
        let opts = {
            method: 'PUT',
            headers: {
                accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            json: true,
            body: options.body,
            throwHttpErrors: false
        };
        opts = merge(opts, options);
        return got(options.url, opts);
    }

    function patch(options) {
        let opts = {
            method: 'PATCH',
            headers: {
                accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            },
            json: true,
            body: options.body,
            throwHttpErrors: false
        };
        opts = merge(opts, options);
        return got(options.url, opts);
    }

    return Object.freeze({
        post,
        get,
        put,
        patch
    });
}

module.exports = createRequestService;
