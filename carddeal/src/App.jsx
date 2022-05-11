import React, { useState } from 'react';

import './App.css'

const App = () => {

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

    const shuffle = () => {

    }
    const deal = () => {
        
    }
    const shuffleAndDeal = () => {
        shuffle();
        deal();
    }

    return(
        <div className="App">
            <div className="display">
                {players.map((playerObj) => (
                    <section>
                        <h1>{playerObj.name}</h1>
                        <ul>
                            {playerObj.hand.map((cardObj) => (
                                <li>{cardObj.val} of {cardObj.suit}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
            <button onClick={shuffleAndDeal}>Shuffle &amp; Deal</button>
        </div>
    );
}

export default App;