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

    function hit(player){
        setHands({
            ...hands,
            [player]: [...hands[player], props.deck[0]]
        })
        let newDeck = props.deck.slice()
        newDeck.shift()
        props.setDeck(newDeck)
    }

    function reset() {
        setHands({
            dealer: [],
            user: []
        })
        setPlayerDone(false)
        //restarting game isn't replacing old deck
        props.newGame(false)
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

    userTotal >= 21 && playerDone === false && setPlayerDone(true)
    playerDone && dealerTotal < 17 && hit('dealer')



    return (
        <div className='table'>
            <p>Dealer</p>
            <span className='card'>{props.deck.length}</span>

            {!hands.dealer[0] &&<button onClick={startGame}>Deal</button>}
            
            <div className='dealer'>
                {dealerCards}
            </div>
            <h1>{playerDone && dealerTotal}</h1>

            <div className='options'>
                {/*wont show buttons unless hands have been dealt */}
                {hands.user[0] && userTotal < 21 && <button onClick={() => hit('user')}>Hit</button>}
                {hands.user[0] && userTotal < 21 && <button onClick={() => setPlayerDone(true)}>Stay</button>}
            </div>

            <div className='player'>
                {hands.user.map((card, i) => {
                    return <span className='card'>{card}</span>
                })}
            </div>
            <h1>{userTotal > 0 && userTotal}</h1>

                {/*conditional for checking winner. A little nasty. May move into a function to be run on game completion later.*/}
            {playerDone ?
                userTotal > dealerTotal 
                    ? userTotal <= 21
                        ? <h1>You Win!!</h1>
                        : <h1>bust...</h1>
                    : userTotal === dealerTotal 
                        ? <h1>Push</h1>
                        : dealerTotal < 21
                            ? <h1>Lose...</h1>
                            : <h1>You Win!!</h1>
                : null
            }
            {/*currenly routes player back to deck choice screen. can update later to rebuild/reshuffle deck */}
            {playerDone &&
                <button onClick={reset}>NewGame</button>
            }
        </div>
    );
}

export default Table;
