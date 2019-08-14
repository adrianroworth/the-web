/* global XMLHttpRequest */
const AjaxRequest = (url, method, data = {}) => {
    const view = this;
    view.url = url;
    view.method = method.toUpperCase() || 'GET';
    view.data =
        typeof data === 'string'
            ? data
            : Object.keys(data)
                  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
                  .join('&');
    return this.do();
};

AjaxRequest.prototype.do = () => {
    const view = this;
    if (!view.url) {
        throw new Error('NO URL specified. AJAX Request impossible.');
    }
    const request = new XMLHttpRequest();
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
    return new Promise((resolve, reject) => {
        request.open(view.method, view.url, true);

        if (view.method === 'POST') {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                resolve(request.responseText);
            } else {
                reject(new Error('We reached our target URL, but it returned an error'));
            }
        };

        request.onerror = err => {
            reject(err);
        };

        request.send(view.data);
    });
};
