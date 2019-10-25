import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [suit, updateSuit] = useState([2,3,4,5,6,7,8,9,10,'J','Q','K','A'])
  let [deck, createDeck] = useState([])



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
