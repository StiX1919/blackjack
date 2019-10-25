import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table'

function App() {
  let [suit, updateSuit] = useState([2,3,4,5,6,7,8,9,10,'J','Q','K','A'])
  let [deck, setDeck] = useState([])
  let [playing, setPlay] = useState(false)
  let [count, changeCount] = useState([1])

  useEffect(() => {
    build(count)
  },[])

  function build(value){
    changeCount(value)
    let newDeck = []
        for(let count = 0; count < value * 4; count++){
          newDeck = [...newDeck, ...suit]
        }
        //this will update how many decks are involved and create them
        setDeck(newDeck)
  }

  function shuffle() {
    //borrowed fisher yates shuffle for better results
    const shuffledDeck = deck.slice()
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck)
  }
  function play(){
    shuffle()
    setPlay(true)
  }

  console.log(deck)
  return (
    <div className="App">
      {!playing 
        ? <div>
            <p>Choose deck amount</p>
            <input type='number' value={count}onChange={event => build(event.target.value)}/>
            <button onClick={play}>Play</button>
          </div>

        : <Table deck={deck} setDeck={setDeck}/>
      }
      
    </div>
  );
}

export default App;
