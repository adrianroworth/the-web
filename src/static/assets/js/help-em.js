// let HelpEm;

// HelpEm = playerCards => {
//     const view = this;
//     let cards;
//     const cardSuitLookupTable = {
//         s: 'spades',
//         h: 'hearts',
//         d: 'diamonds',
//         c: 'clubs'
//     };
//     const cardNameLookupTable = {
//         1: 'ace',
//         2: 'two',
//         3: 'three',
//         4: 'four',
//         5: 'five',
//         6: 'six',
//         7: 'seven',
//         8: 'eight',
//         9: 'nine',
//         10: 'ten',
//         11: 'jack',
//         12: 'queen',
//         13: 'king'
//     };
//     view.winningHands = {};

//     Object.defineProperty(view, 'cards', {
//         // we want it visible.
//         enumerable: true,
//         // normal getting/setting behaviour.
//         get() {
//             return cards;
//         },
//         set(value) {
//             view.checkInput(value);
//             cards = transformCards(value);
//             ascertainHand();
//         }
//     });

//     view.checkInput = value => {
//         // must have 7 cards.
//         if (value.length !== 7) {
//             throw new Error("Texas Help'em requires exactly 7 cards exactly");
//         }

//         // check for duplicates.
//         if (value.length !== new Set(value).size) {
//             throw new Error("Texas Help'em all cards to be unique");
//         }
//     };

//     // const hands = {
//     //     'high-card': {
//     //         name: 'High Card',
//     //         description: 'Card with the highest value',
//     //         precedence: 0,
//     //         rule: () => {
//     //             const result = [];
//     //             const cardsClone = view.cards.slice(0);
//     //             const set = [];

//     //             sortCardsByCardValue(cardsClone);

//     //             set.push(cardsClone[cardsClone.length - 1]);

//     //             result.push(set);

//     //             return result;
//     //         }
//     //     },
//     //     pair: {
//     //         name: 'Pair',
//     //         description: 'Two cards with the same value',
//     //         precedence: 1,
//     //         rule: () => {
//     //             const result = [];
//     //             const cardsClone = view.cards.slice(0);

//     //             const cardQuantityLookup = swapObjectKeysAndValues(getCardQuantities(cardsClone));

//     //             // if there 2 of any cards with identical values.
//     //             if (cardQuantityLookup['2']) {
//     //                 // we want the largest pairs, so:
//     //                 // get all the cards that there are 2 of:
//     //                 //     e.g. ["2", "4", "7"]
//     //                 // sort for good measure. this will guarantee numerical order.
//     //                 // reverse it so that the largest number is first:
//     //                 //     e.g. ["7", "4", "2"]
//     //                 // get the first item in the array:
//     //                 //     e.g. ["7", "4"]
//     //                 const highest = cardQuantityLookup['2']
//     //                     .sort()
//     //                     .reverse()
//     //                     .slice(0, 1);
//     //                 highest.forEach(setValue => {
//     //                     const set = [];
//     //                     cardsClone.forEach(card => {
//     //                         if (card.cardValue === Number.parseInt(setValue, 10)) {
//     //                             set.push(card);
//     //                         }
//     //                     });
//     //                     result.push(set);
//     //                 });
//     //             }

//     //             return (result.length && result) || false;
//     //         }
//     //     },
//     //     'two-pairs': {
//     //         name: 'Two Pairs',
//     //         description: 'Two times two cards with the same value',
//     //         precedence: 2,
//     //         rule: () => {
//     //             const result = [];
//     //             const cardsClone = view.cards.slice(0);

//     //             const cardQuantityLookup = swapObjectKeysAndValues(getCardQuantities(cardsClone));

//     //             // if there 2 of any cards with identical values AND there
//     //             // are at least 2 sets of these identical card pairs.
//     //             if (cardQuantityLookup['2'] && cardQuantityLookup['2'].length > 1) {
//     //                 const highest = cardQuantityLookup['2']
//     //                     .sort()
//     //                     .reverse()
//     //                     .slice(0, 2);
//     //                 const sets = [];
//     //                 highest.forEach(setValue => {
//     //                     const set = [];
//     //                     cardsClone.forEach(card => {
//     //                         if (card.cardValue === Number.parseInt(setValue, 10)) {
//     //                             set.push(card);
//     //                         }
//     //                     });
//     //                     sets.push(set);
//     //                 });
//     //                 result.push(sets);
//     //             }

//     //             return (result.length && result) || false;
//     //         }
//     //     },
//     //     'three-of-a-kind': {
//     //         name: 'Three Of A Kind',
//     //         description: 'Three cards with the same value',
//     //         precedence: 3,
//     //         rule: () => {
//     //             const result = [];
//     //             const cardsClone = view.cards.slice(0);

//     //             const cardQuantityLookup = swapObjectKeysAndValues(getCardQuantities(cardsClone));

//     //             // if there 3 of any cards with identical values.
//     //             if (cardQuantityLookup['3']) {
//     //                 const highest = cardQuantityLookup['3']
//     //                     .sort()
//     //                     .reverse()
//     //                     .slice(0, 1);
//     //                 highest.forEach(setValue => {
//     //                     const set = [];
//     //                     cardsClone.forEach(card => {
//     //                         if (card.cardValue === Number.parseInt(setValue, 10)) {
//     //                             set.push(card);
//     //                         }
//     //                     });
//     //                     result.push(set);
//     //                 });
//     //             }

//     //             return (result.length && result) || false;
//     //         }
//     //     },
//     //     straight: {
//     //         name: 'Straight',
//     //         description:
//     //             'Sequence of 5 cards in increasing value (Ace can precede 2 and follow up King)',
//     //         precedence: 4,
//     //         rule: () => {
//     //             const result = [];
//     //             const cardsClone = view.cards.slice(0);
//     //             let set = [];
//     //             let cardsContainAce = false;
//     //             let aceCard;

//     //             sortCardsByCardValue(cardsClone);

//     //             // check to see if the set of cards contains
//     //             // an ace.
//     //             cardsClone.forEach(card => {
//     //                 if (card.cardValue === 1) {
//     //                     cardsContainAce = true;
//     //                     aceCard = card;
//     //                 }
//     //             });

//     //             // add a duplicate of the ace card to the
//     //             // start of the array. The reason for this
//     //             // is so we can test for ace-low, and
//     //             // ace-high straights in a single loop.
//     //             if (cardsContainAce) {
//     //                 cardsClone.unshift(aceCard);
//     //             }

//     //             // reverse the array so that we are checking for the
//     //             // highest straight, as opposed to the lowest.
//     //             // if we find consecutive numbers going in reverse we
//     //             // will then reverse the result to be a increasing straight.
//     //             cardsClone.reverse();

//     //             cardsClone.forEach(card => {
//     //                 // if we have already found a 'straight' then
//     //                 // don't waste any more time looping.
//     //                 if (set.length === 5) {
//     //                     return;
//     //                 }

//     //                 // if there is nothing in the set, then add the
//     //                 // first item and go from there.
//     //                 if (!set.length) {
//     //                     set.push(card);
//     //                 }

//     //                 // if the the last card in the set array's value
//     //                 // is 1 more than the current card value.
//     //                 // i.e. if they are consecutive integers.
//     //                 if (set[set.length - 1].cardValue - card.cardValue === 1) {
//     //                     // add it to the array
//     //                     set.push(card);
//     //                 } else {
//     //                     // otherwise start again.
//     //                     set = [];
//     //                     set.push(card);
//     //                 }
//     //             });

//     //             if (set.length === 5) {
//     //                 // put the cards back in numerical order.
//     //                 set.reverse();

//     //                 result.push(set);
//     //             }
//     //             return (result.length && result) || false;
//     //         }
//     //     },
//     //     flush: {
//     //         name: 'flush',
//     //         description: '5 cards of the same suit',
//     //         precedence: 5,
//     //         rule: () => { }
//     //     }
//     // };

//     function sortCardsByCardValue(cards, acesHigh = true) {
//         cards.sort(function compare(a, b) {
//             if ((acesHigh && a.cardValue === 1) || a.cardValue > b.cardValue) {
//                 return 1;
//             }
//             if ((acesHigh && b.cardValue === 1) || a.cardValue < b.cardValue) {
//                 return -1;
//             }
//             return 0;
//         });
//     }

//     // returns an object.
//     // object key is the card value.
//     // object value is the number of times the card
//     // appears in the game (of the 7 cards).
//     function getCardQuantities(cards) {
//         const cardQuanities = {};
//         cards.forEach(card => {
//             cardQuanities[card.cardValue] = cardQuanities[card.cardValue]
//                 ? cardQuanities[card.cardValue] + 1
//                 : 1;
//         });
//         return cardQuanities;
//     }

//     // swaps the keys and values for the given array.
//     // if the original object had keys with identical
//     // values, then the new object lists these keys
//     // in an array.
//     // e.g.
//     // {
//     //     1: 2,
//     //     2: 2,
//     //     4: 3
//     // }
//     // transforms in to this:
//     // {
//     //     2:  ["1", "2"],
//     //     3: ["4"]
//     // }

//     function swapObjectKeysAndValues(obj) {
//         const newObj = {};
//         for (const key in obj) {
//             if (!newObj[obj[key]]) {
//                 newObj[obj[key]] = [];
//             }
//             newObj[obj[key]].push(key);
//         }
//         return newObj;
//     }

//     function transformCards(cards) {
//         return cards.map(card => {
//             const cardData = card.split('-');
//             return {
//                 cardCode: card,
//                 cardValue: Number.parseInt(cardData[0], 10),
//                 cardSuit: cardSuitLookupTable[cardData[1]],
//                 cardName: cardNameLookupTable[cardData[0]],
//                 card: `${cardNameLookupTable[cardData[0]]} of ${cardSuitLookupTable[cardData[1]]}`
//             };
//         });
//     }

//     function ascertainHand() {
//         Object.keys(hands).forEach(hand => {
//             const potentialWinnerHand = hands[hand];
//             const result = potentialWinnerHand.rule();
//             if (result) {
//                 view.winningHands[hand] = {};
//                 view.winningHands[hand].cards = result;
//                 view.winningHands[hand].precedence = potentialWinnerHand.precedence;
//                 view.winningHands[hand].name = potentialWinnerHand.name;
//             }
//         });
//     }

//     if (playerCards) {
//         view.cards = playerCards;
//     }
// };

// HelpEm.prototype.getHands = () => {
//     const view = this;
//     return view.winningHands;
// };

// HelpEm.prototype.getHand = handName => {
//     const view = this;
//     return view.winningHands[handName];
// };
// HelpEm.prototype.getBestHand = () => {
//     const view = this;
//     const winningHandsClone = Object.assign({}, view.winningHands);
//     let bestHand;
//     let highestPrecedence = -1;
//     Object.keys(view.winningHands).forEach(handName => {
//         if (winningHandsClone[handName].precedence > highestPrecedence) {
//             highestPrecedence = winningHandsClone[handName].precedence;
//             bestHand = handName;
//         }
//     });
//     return view.winningHands[bestHand];
// };

// module.exports = HelpEm;
