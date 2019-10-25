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
        console.log(newDeck)
        //this will update how many decks are involved and create them
        setDeck(newDeck)
  }

  function shuffle() {
    //borrowed fisher yates shuffle for better mix rates
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
            <h1 className='title'>BlackJack</h1>
            <p>Choose deck amount</p>
            <input type='number' value={count}onChange={event => build(event.target.value)}/>
            <button onClick={play}>Play</button>
          </div>
          : <Table deck={deck} setDeck={setDeck} newGame={setPlay}/>
        }
        {/* if i don't send the setPlay function back i can play more rounds with the old deck. but deck reset wasn't working properly.*/}
      
    </div>
  );
}

export default App;
