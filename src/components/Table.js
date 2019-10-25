import React, {useState, useEffect} from 'react';
import './Table.css'

function Table(props) {

    let [hands, setHands] = useState({
        dealer: [],
        user: []
    })

    let [playerDone, setPlayerDone] = useState(false)

    function startGame(){
        let {deck, setDeck} = props
        let firstCards = deck.slice(0,4)
        
        let updateDeck = deck.slice()

        setHands({
            dealer:[firstCards[0], firstCards[2]],
            user: [firstCards[1], firstCards[3]]
        })
        updateDeck.splice(0, 4)
        setDeck(updateDeck)
        // console.log(props.deck, firstDealHand)
    }

    function hit(){
        setHands({
            ...hands,
            user: [...hands.user, props.deck[0]]
        })
        let newDeck = props.deck.slice()
        newDeck.shift()
        props.setDeck(newDeck)
    }

    let dealerCards = playerDone 
        ? hands.dealer.map((card, i) => {
            return <span className='card'>{card}</span>
        })
        : hands.dealer.map((card, i) => {
            if(i === 0){
                return <span className='card'>{card}</span>
            } else return <span className='card'></span>
        })

    let userTotal = hands.user.reduce((acc, curr, ind) => {
        let faces = ['J', 'Q', 'K']
        if(faces.includes(curr)){
            acc += 10
        } else if(curr === 'A'){
            if(acc < 11){
                acc += 11
            } else acc += 1
        } else acc += curr
        return acc
    }, 0)
    let dealerTotal = hands.dealer.reduce((acc, curr, ind) => {
        let faces = ['J', 'Q', 'K']
        if(faces.includes(curr)){
            acc += 10
        } else if(curr === 'A'){
            if(acc < 11){
                acc += 11
            } else acc += 1
        } else acc += curr
        return acc
    }, 0)




    return (
        <div className='table'>
            <p>Dealer</p>
            <span className='card'></span>

            {!hands.dealer[0] &&<button onClick={startGame}>Deal</button>}
            
            <div className='dealer'>
                {dealerCards}
            </div>

            <div className='options'>
                {userTotal < 21 && <button onClick={hit}>Hit</button>}
                {userTotal < 21 && <button onClick={() => setPlayerDone(true)}>Stay</button>}
            </div>

            <div className='player'>
                {hands.user.map((card, i) => {
                    return <span className='card'>{card}</span>
                })}
            </div>
            <h1>{userTotal > 0 && userTotal}</h1>

        </div>
    );
}

export default Table;
