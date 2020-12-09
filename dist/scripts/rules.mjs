import { checkCard } from "./state.mjs"
import { gameState, getActivePlayer, getActivePlayerIdx, functionalCards } from "./state.mjs"



const isEndGame = () => {
    const activePlayer = getActivePlayer()
    if (activePlayer.cards) {
        return false
    }
    return true
}

const getCardColor = (card) => {
    return card.split("_")[0]
}

export const getCardFigure = (card) => card.split("_")[1]
    

const checkColor = (topCard, movedCard) => {
    return topCard.split("_")[0] === movedCard.split("_")[0]
}

const checkFigure = (topCard, movedCard) => {
    return topCard.split("_")[1] === movedCard.split("_")[1]
}

export const getCardName = (card) => card.classList[1]

const checkIfCardIsFunctional = (card) => functionalCards.includes(card.split("_")[1])

export const changeStateIfCardIsFunctional = (card) => {

    //wywolanie funkcji zwraca true lub false wiec wystarczy taki zapis
    gameState.condition = checkIfCardIsFunctional(card);
    console.log("condition",  gameState.condition )
}

const is2or3 = () => {
    const topCardIdx = gameState.visibleCards.length-1
    return getCardFigure(gameState.visibleCards[topCardIdx]) === "2" || getCardFigure(gameState.visibleCards[topCardIdx]) === "3"
}

const takeCardIf2or3 = () => {
    
}

const canTossOnly2or3orKing = () => {
    const topCardIdx = gameState.visibleCards.length-1
    const colorOfTopCard = getCardColor(gameState.visibleCards[topCardIdx])
    


}

export const resetRound = () => {
    gameState.round = {
        takenCard: false,
        cards: []
    }
}

export const isJack = () => {
    return getCardFigure(gameState.round.cards[0]) === "jack"
}

export const isAce = () => {
    return getCardFigure(gameState.round.cards[0]) === "ace"
}

export const canTossCard = () => !gameState.round.takenCard

export const canTakeCard = () => gameState.round.cards.length === 0

const takeCard = () => gameState.round.takenCard = true

export const addCardToRound = (card) => {
    gameState.round.cards.push(card)
}

export const removeCardsFromRound = () => {
    gameState.round.cards = []
}

export const canTossCardInRow = (card) => {
    
    if (gameState.round.cards.length === 0 ){
        const topCard = gameState.visibleCards[gameState.visibleCards.length-1]
    
        return checkColor(topCard, card) || checkFigure(topCard, card)
    }

    const lastCard = gameState.round.cards[gameState.round.cards.length-1]

    return checkFigure(lastCard, card)
     
}