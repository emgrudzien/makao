import {createTag} from "./helpers.mjs";
import { nextPlayer, getCard, undoCards } from "./state.mjs";
import { isJack, isAce } from "./rules.mjs"


const generateCard = (cardName) => {

    return createTag({
        tagName: "div",
        className: ["card", cardName],
     })
}

export const setCards = (idx) => {
    const playerContainer = document.querySelector(`.player${idx}`);
    const cardsToSet = playerContainer.querySelectorAll(".card")
    const playerContainerLeft = playerContainer.offsetLeft;
    const playerContainerTop = playerContainer.offsetTop;
    let cardIdx = 0;
    cardsToSet.forEach((card) => 
    {
        card.style.left = playerContainerLeft + cardIdx * 15 + 'px';
        card.style.top = playerContainerTop + 30 + 'px';
        card.startLeft = card.style.left;
        card.startTop = card.style.top;
        cardIdx++;
    })
    
}


const createPlayer = (config, idx) => {

    const playerUi = createTag({
        tagName: "div",
        className: ["player", `player${idx}`, config.active ? "active" : "not-active", config.current ? "current" : "not-active"] 
    })

    const playerNameTag = createTag({
        tagName: "span",
        className: "name",
        text: config.name,
    })

    const playerCardsTag = createTag({
        tagName: "div",
        className: "cards" 
    })

    config.cards.forEach((card) => {
        const cardTag = generateCard(card)
        playerCardsTag.appendChild(cardTag)
    })

    playerUi.appendChild(playerNameTag)

    if (config.active){
        const buttonNext = createTag({
            tagName: "button",
            className: "btn-next-player",
            text: "Next",
            evts: [{
                type: "click",
                cb: nextPlayer
            }]
        })

        const buttonUndo = createTag({
            tagName: "button",
            className: "btn-undo",
            text: "Undo",
            evts: [{
                type: "click",
                cb: undoCards
            }]
        })

        playerUi.appendChild(buttonNext)
        playerUi.appendChild(buttonUndo)
    }

    playerUi.appendChild(playerCardsTag)

    return playerUi
}

const createTable = (hiddenCards, visibleCards) => {

    const tableTag = createTag({
        tagName: "div",
        className: "center"
    })

    const visibleCardsTag = createTag({
        tagName: "div",
        className: "game"

    })

    visibleCards.forEach((card) => {
        const cardTag = generateCard(card)
        visibleCardsTag.appendChild(cardTag)
    })

    tableTag.appendChild(visibleCardsTag)

    const hiddenCardsTag = createTag({
        tagName: "div",
        className: "restOfCards",
        evts: [{
            type: "click",
            cb: getCard
        }]
    })

    hiddenCards.forEach((card) => {
        const cardTag = generateCard(card)
        hiddenCardsTag.appendChild(cardTag)
    })
    
    tableTag.appendChild(hiddenCardsTag)

    return tableTag
}

const createColorModal = (modalTag, modalWrapperTag) => {
    const cardsColorTag = createTag({
        tagName: "div",
        className: "cards-color"
    })
    modalTag.appendChild(cardsColorTag)

    const colorOfCard = ["hearts", "spades", "clubs", "diamonds"]
    
    colorOfCard.forEach((color) => {
       const cardColorTag = createTag({
           tagName: "button",
           className: ["card-color", color],
           evts: [{
               type: "click",
               cb: () => {
                   console.log(color)
                   modalWrapperTag.remove()
                }
           }]

       })
       cardsColorTag.appendChild(cardColorTag)
    })
}

const createFigureModal = (modalTag, modalWrapperTag) => {

    const cardsFigureTag = createTag({
        tagName: "div",
        className: "cards-figure"
    })

    modalTag.appendChild(cardsFigureTag)

    const figuresOfCard = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
    
    figuresOfCard.forEach((figure) => {
       const cardFigureTag = createTag({
           tagName: "button",
           className: ["card-figure", figure],
           text: figure,
           evts: [{
               type: "click",
               cb: () => {
                   console.log(figure)
                   modalWrapperTag.remove()
                }
           }]

       })
       cardsFigureTag.appendChild(cardFigureTag)
    })
    
 }
export const modal = () => {
    const modalWrapperTag = createTag({
        tagName: "div",
        className: "modal-wrapper"
    })

    const modalTag = createTag({
        tagName: "div",
        className: "modal"
    })

    modalWrapperTag.appendChild(modalTag)

    const closeBtnTag = createTag({
        tagName: "button",
        className: "close-btn",
        text: "x",
        evts: [{
            type: "click",
            cb: () => modalWrapperTag.remove()
        }]
    })
    modalTag.appendChild(closeBtnTag)

    if (isAce()) {
        createColorModal(modalTag, modalWrapperTag) 
    } 
    if (isJack()) {
        createFigureModal(modalTag, modalWrapperTag)
    }

    return modalWrapperTag
}

export const createMainTable = (state) => {
    const tableBoardTag = createTag({
        tagName: "section",
        className: "tableBoard"
    })

    const mainTableTag = createTag({
        tagName: "div",
        className: "mainTable"
    })

    tableBoardTag.appendChild(mainTableTag)

    state.players.forEach((player, idx) => {
        const playerHTML = createPlayer(player, ++idx)
        mainTableTag.appendChild(playerHTML)
       
    })

    const tableHTML = createTable(state.hiddenCards, state.visibleCards)
    mainTableTag.appendChild(tableHTML)

    return tableBoardTag

}

//modal do figur
// modal do kolorow na podstawie state
//jeden rule do kart funkcyjnych