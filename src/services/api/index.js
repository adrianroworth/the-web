const createRequestService = require('../request');

function createApiService() {
    async function getHands(cards) {
        const requestService = createRequestService();
        const options = {
            url: `${process.env.THE_API}/hands/`,
            body: {
                data: {
                    type: 'hands',
                    attributes: cards
                }
            }
        };

        const response = await requestService.post(options);
        return response;
    }

    return Object.freeze({
        getHands
    });
}

module.exports = createApiService;
