import {createTag} from "./helpers.mjs";

const cardsColors = [
    "hearts", "diamonds", "clubs", "spades"
]

const cardsTypes = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
 
const cards = cardsTypes.map((card) => {
    return cardsColors.map((color) => {
        return color + card 
})
}).flat()
//flat spłaszcza -> jesli mamy tablice w tablicy robi z tego jedną tablice
console.log(cards)


const divTag = document.createElement("div")

cards.forEach((card) => {
    const cardTag = document.createElement("div")
    cardTag.classList.add("card")
    cardTag.classList.add(card)
   divTag.appendChild(cardTag)
})



// document.body.appendChild(divTag)

const inputTag = createTag({tagName: "input",
className: ["dupa", "dupa2"],
id: "trololo",
attrs: [{
    key: "placeholder",
    value: "ggg"
},
{
    key: "type",
    value: "text"
}],
evts: [{
    type: "click",
    cb: (e) => {
        console.log("Działa")
    }
}]
})

// document.body.appendChild(inputTag)

//na podstawie 2 klasy ma sie pojawic tło karty
