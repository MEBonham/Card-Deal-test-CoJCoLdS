import React, { useState, useEffect } from 'react';
import MersenneTwister from 'mersenne-twister';

import './App.css'

const App = () => {
    const CARDS_TO_DEAL = 5;
    const gen = new MersenneTwister();

    const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
    const deckInOrder = [];
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deckInOrder.push({
                val: values[i],
                suit: suits[j]
            });
        }
    }
    const [deckShuffled, setDeckShuffled] = useState([]);

    const [players, setPlayers] = useState([
        {
            name: "Alice",
            hand: []
        },
        {
            name: "Bob",
            hand: []
        },
        {
            name: "Carol",
            hand: []
        },
        {
            name: "Dan",
            hand: []
        }
    ]);
    // console.log(players);

    const shuffle = () => {
        // Give each card in the deck a random value in the interval [0,1).
        // Sort the array of cards according to those random values.
        // Then drop the random values, retaining only the cards' original data.
        // See https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array for idea origin and alternative algorithms.
        setDeckShuffled(deckInOrder
            .map((cardObj) => ({ cardObj, sortIdx: gen.random() }))
            .sort((a, b) => a.sortIdx - b.sortIdx)
            .map(({ cardObj }) => cardObj)
        );
    }
    // Anytime the deck gets Shuffled, re-deal to players (handling asynchronicity with useEffect dependency array)
    useEffect(() => {
        const numPlayers = players.length;

        if (deckShuffled.length > 0) {
            setPlayers(players
                .map((playerObj, playerIdx) => {
                    const tempHand = [];
                    // Deal cards from the shuffled deck in the order they would be given out in physically dealing the cards, just for realism.
                    // For example, with four players, the first player dealt to will get cards number 1, 5, 9, 13, and 17 from the deck.
                    for (let i = playerIdx; i < CARDS_TO_DEAL * numPlayers; i += numPlayers) {
                        tempHand.push(deckShuffled[i]);
                    }
    
                    return({
                        ...playerObj,
                        hand: tempHand
                    });
                })
            );
        }
    }, [ deckShuffled ]);

    return(
        <div className="App">
            <div className="display">
                {players.map((playerObj) => (
                    <section key={playerObj.name}>
                        <h1>{playerObj.name}</h1>
                        <ul>
                            {playerObj.hand.map((cardObj) => (
                                <li>{`${cardObj.val} of ${cardObj.suit}`}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
            <button onClick={shuffle}>Shuffle &amp; Deal</button>
        </div>
    );
}

export default App;