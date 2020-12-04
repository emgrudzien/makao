import { modalColor } from "./ui.mjs"
import { reload, remove, cards } from "./game.js"
import { removeCardsFromRound, canTakeCard, canTossCard, isJack, changeStateIfCardIsFunctional } from "./rules.mjs"


export const gameState = {
    
    players: [
        {
            active: false,
            name: "Mania",
            cards: []
        },
        {
            active: false,
            name: "Paweł2",
            cards: []
        },
        {
            current: true,
            active: true,
            name: "Paweł3",
            cards: []
        },
        {
            active: false,
            name: "Paweł4",
            cards: []
        }
    ],

    hiddenCards: [],
    visibleCards: [],
    round: {
        takenCard: false,
        cards: []
    },

    condition: false, 
    rules: []
    
}


export const functionalCards = [
    "2", "3", "4", "jack", "king", "ace"
]
export const getActivePlayer = () => gameState.players.filter((e) => e.active)[0]
export const getActivePlayerIdx = () => gameState.players.indexOf(getActivePlayer())


const shuffleCard = () => {
    const card = cards[Math.round(Math.random() * (cards.length - 1))]

    const idxOfCard = cards.indexOf(card)
    cards.splice(idxOfCard, 1)

    return card
}


export const shuffleCards = () => {
    gameState.players.forEach((player) => {
        for (let i = 0; i < 5; i++){
            player.cards.push(shuffleCard())
        }

    })
    
    gameState.visibleCards.push(shuffleCard())

    const deckLen = cards.length 

    for (let i = 0; i < deckLen; i++){
        gameState.hiddenCards.push(shuffleCard())
    }
}

export const getCard = () => {
    if (getActivePlayer().current && canTakeCard()){
        const lastCard = gameState.hiddenCards.pop()
        getActivePlayer().cards.push(lastCard)
        reload()
    }
}

//model aplikacji


export const nextPlayer = () => {
    const roundLen = gameState.round.cards.length
   
    if (roundLen === 0 || roundLen === 1 || roundLen ===3 || roundLen === 4){
        if (roundLen !== 0) {
            changeStateIfCardIsFunctional(gameState.round.cards[0])
        }
        if (gameState.condition){
            
            document.body.appendChild(modalColor())
        }
        // const len = gameState.players.length
        // const activePlayer = getActivePlayer()
        // const idx = getActivePlayerIdx()
        // gameState.round.cards.forEach((card) => playCard(card))
    
// wzór do zapamietania!
        // const nextIdx = (idx + 1) % len

        // activePlayer.active = false
        // gameState.players[nextIdx].active = true
    
        removeCardsFromRound()

        reload()
    } else {
        undoCards()
    }
}

export const undoCards = () => {
    
    gameState.round.cards.forEach((card) => removeCardsFromRound(card))
    reload()
}

const removeCard = (idxOfPlayer, idxOfCard) => gameState.players[idxOfPlayer].cards.splice(idxOfCard, 1);

const addCardToGame = (cardName) => gameState.visibleCards.push(cardName);

// ta funkcja juz nieaktualna bo sprawdzala wartosci miedzy karta a visible cards a teraz sprawdzamy z round.cards
export const checkCard = (card) => {
    const cardProperties = card.classList[1].split("_")
    const visibleCardsProperties = gameState.visibleCards[gameState.visibleCards.length-1].split("_")

    return cardProperties[0] == visibleCardsProperties[0] || cardProperties[1] == visibleCardsProperties[1];
}

export const playCard = (cardName) => {
    
    const activePlayer = gameState.players.filter((e) => e.active)[0]
    const idxOfPlayer = gameState.players.indexOf(activePlayer)
    const idxOfCard = gameState.players[idxOfPlayer].cards.indexOf(cardName)
    removeCard(idxOfPlayer, idxOfCard)
    addCardToGame(cardName)
    
}

