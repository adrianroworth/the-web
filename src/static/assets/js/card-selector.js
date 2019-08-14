/* global document, AjaxRequest */
const CardSelector = element => {
    if (!element) {
        return false;
    }

    const view = this;
    const elementHtml = `
        <div class="card-table__card-selector-selectors">
            <div class="card-table__card-selector-selectors-item">
                <select class="card-table__card-selector-selectors-item-select" name="cardValue" id="card-value">
                    <option value="">-- value --</option>
                    <option value="1">Ace</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">Jack</option>
                    <option value="12">Queen</option>
                    <option value="13">King</option>
                </select>
            </div>
            
            <div class="card-table__card-selector-selectors-item">
                <select class="card-table__card-selector-selectors-item-select" name="cardSuit" id="card-suit">
                    <option value="">-- suit --</option>
                    <option value="s">Spades</option>
                    <option value="d">Diamonds</option>
                    <option value="c">Clubs</option>
                    <option value="h">hearts</option>
                </select>
            </div>
            
        </div>
        <div class="card-table__card-selector-current-selection" id="card-preview">
        </div>
        <div class="card-table__card-selector-actions card-table__card-selector-actions--disabled" id="card-selection-actions">
            <a href="#" class="card-table__card-selector-actions card-table__card-selector-actions-action card-table__card-selector-actions-action--get-hands" id="get-hands">GET HANDS</a>
        </div>
        <div class="card-table__card-selector-entire-selection" id="entire-selection-preview">
        </div>
        <form id="selected-cards" method="post" action="/">
        </form>
    `;

    view.element = element;
    view.element.innerHTML = elementHtml;

    const cardPreviewEl = document.getElementById('card-preview');
    const entireSelectionPreviewEl = document.getElementById('entire-selection-preview');
    // const selectedCardsForm = document.getElementById('selected-cards');
    view.selectedCards = [];

    view.currentCard = {
        value: undefined,
        suit: undefined
    };

    function updateEntirePreview() {
        let entirePreviewInputsHtml = '';
        view.selectedCards.forEach(card => {
            entirePreviewInputsHtml += `
                <div class="card-table__card-selector-entire-selection-item">
                    <img 
                        src="/assets/images/${card.value}-${card.suit}.png" 
                        class="card-table__card-selector-entire-selection-item-image" 
                        alt="${card.value} of ${card.suit}" />
                </div>
            `;
        });
        entireSelectionPreviewEl.innerHTML = entirePreviewInputsHtml;
    }

    function appendCardToForm() {
        if (view.selectedCards.length > 5) {
            document
                .getElementById('card-selection-actions')
                .classList.remove('card-table__card-selector-actions--disabled');
        }
        // don't waste energy doing unnecessary DOM stuff until we have 7 cards.
        if (view.selectedCards.length < 7) {
            let duplicateFound = false;
            view.selectedCards.forEach(card => {
                if (card.value === view.currentCard.value && card.suit === view.currentCard.suit) {
                    duplicateFound = true;
                }
            });
            if (!duplicateFound) {
                view.selectedCards.push(Object.assign({}, view.currentCard)); // push a copy of the object.
            }
            updateEntirePreview();
        }
        // let formInputsHtml = '';
        // view.selectedCards.forEach(card => {
        //     formInputsHtml += `<input type="hidden" name="card[]" value="${card.value}-${card.suit}" />`;
        // });
        // view.selectedCardsForm.innerHTML = formInputsHtml;
        // postCards();
    }

    function updatePreview() {
        if (view.currentCard.value && view.currentCard.suit) {
            const cardValue = view.currentCard.value;
            const cardSuit = view.currentCard.suit;
            cardPreviewEl.innerHTML = `
                <img src="/assets/images/${cardValue}-${cardSuit}.png" class="card-table__card-selector-current-selection-image" alt="${cardValue} of ${cardSuit}" />
            `;
        }
    }

    document.getElementById('card-value').addEventListener(
        'change',
        function updateCardValue() {
            view.currentCard.value = this.value.toLowerCase();
            updatePreview();
        },
        false
    );

    document.getElementById('card-suit').addEventListener(
        'change',
        function updateCardSuit() {
            view.currentCard.suit = this.value.toLowerCase();
            updatePreview();
        },
        false
    );

    cardPreviewEl.addEventListener(
        'click',
        function updateCardSuit() {
            appendCardToForm();
        },
        false
    );

    return CardSelector;
};

CardSelector.prototype.go = () => {
    const view = this;
    const convertedFormData = view.selectedCards
        .map(card => {
            return `cards[]=${encodeURIComponent(`${card.value}-${card.suit}`)}`;
        })
        .join('&');
    return new AjaxRequest('/', 'POST', convertedFormData)
        .then(result => {
            return result;
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log({ err });
        });
};
