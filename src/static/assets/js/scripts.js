/* global window, document, CardSelector */
(function go(document, window) {
    const w = window;

    function generateHandHtml(handName, handData) {
        let handHtml = '';
        if (handData.description) {
            handHtml = `
                <dl class="results__result">
                    <dt class="results__result-title">${handName} - ${handData.description}</dt>`;
        }

        const cards =
            (handData && handData.cards && handData.cards[0]) ||
            (handData && handData[0] && handData[0].cards);
        cards.forEach(card => {
            if (Array.isArray(card)) {
                handHtml += generateHandHtml(handName, [
                    {
                        cards: card
                    }
                ]);
                return;
            }
            handHtml += `
                <dd class="results__result-cards">
                    <img src="/assets/images/${card.cardCode}.png"
                        class="results__result-cards-image" alt="${card.card}" />
                </dd>`;
        });
        handHtml += '</dl>';
        return handHtml;
    }

    function unleashTheBeast() {
        w.cardSelector = new CardSelector(document.getElementById('card-selector'));

        document.getElementById('get-hands').addEventListener(
            'click',
            async e => {
                e.preventDefault();
                const results = await window.cardSelector.go();

                const hands = JSON.parse(results);

                let resultsHtml = '';

                Object.keys(hands)
                    .reverse()
                    .forEach(hand => {
                        resultsHtml += generateHandHtml(hand, hands[hand]);
                    });

                const cardSelector = document.getElementById('card-selector');
                const container = cardSelector.parentNode;
                // container.removeChild(cardSelector);

                const resultsContainer = document.createElement('div');
                resultsContainer.id = 'results-container';
                resultsContainer.className = 'results';
                resultsContainer.innerHTML = resultsHtml;
                container.appendChild(resultsContainer);

                return false;
            },
            false
        );
    }

    unleashTheBeast();
})(document, window);
