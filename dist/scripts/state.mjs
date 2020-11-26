import { reload, remove, cards } from "./game.js"


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
            active: false,
            name: "Paweł3",
            cards: []
        },
        {
            active: true,
            name: "Paweł4",
            cards: []
        }
    ],

    hiddenCards: [],
    visibleCards: []

}

const getActivePlayer = () => gameState.players.filter((e) => e.active)[0]
const getActivePlayerIdx = () => gameState.players.indexOf(getActivePlayer())


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
    if (getActivePlayer().current){
        const lastCard = gameState.hiddenCards.pop()
        getActivePlayer().cards.push(lastCard)
        reload()
    }
}

//model aplikacji


export const nextPlayer = () => {
    const len = gameState.players.length
    const activePlayer = getActivePlayer()
    const idx = getActivePlayerIdx()
// wzór do zapamietania!
    const nextIdx = (idx + 1) % len

    activePlayer.active = false
    gameState.players[nextIdx].active = true

   reload()
}
const removeCard = (idxOfPlayer, idxOfCard) => gameState.players[idxOfPlayer].cards.splice(idxOfCard, 1)
const addCardToGame = (cardName) => {
    gameState.visibleCards.push(cardName)    
}

export const playCard = () => {
    const chosenCard = document.querySelector(".moved")
    
    if (chosenCard.classList.length > 1){
        const cardName = chosenCard.classList[1]
        const activePlayer = gameState.players.filter((e) => e.active)[0]
        const idxOfPlayer = gameState.players.indexOf(activePlayer)
        const idxOfCard = gameState.players[idxOfPlayer].cards.indexOf(cardName)
        removeCard(idxOfPlayer, idxOfCard)
        addCardToGame(cardName)
    }
}