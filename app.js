const boardGame = document.querySelector("#boardGame")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'white'
playerDisplay.textContent = 'white'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

const createBoard = () => {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement("div")
        square.classList.add("square")
        square.innerHTML = startPiece
        square.firstChild?.setAttribute("draggable", "true")
        square.setAttribute("square-id", i)
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
                square.classList.add(i % 2 === 0 ? "beige" : "brown") 
            } else {
                square.classList.add(i % 2 === 0 ? "brown" : "beige")
            }

        if (i <= 15) { 
            square.firstChild.firstChild.classList.add("black")
        }
        if (i>= 48) {
            square.firstChild.firstChild.classList.add("white") 
        } 
        boardGame.append(square) 
    })

}

createBoard();


const allSquares =  document.querySelectorAll(" .square")

allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    // square.addEventListener("dragend", dragEnd)
    square.addEventListener("dragover", dragOver)
    // square.addEventListener("dragenter", dragEnter)
    // square.addEventListener("dragleave", dragLeave)
    square.addEventListener("drop", dragDrop)
}
);


let startElementId = null
let draggedElementId = null
function dragStart(e) {
    startElementId = e.target.parentNode.getAttribute("square-id")
    draggedElementId = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElementId.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains("piece")
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'black' ? 'white' : 'black'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        if(takenByOpponent && valid) {
            e.target.append(draggedElementId)
            e.target.remove()
            changePlayer()
            return
        }
        if (taken && !takenByOpponent) {
            return
        }
        if (valid) {
            e.target.append(draggedElementId)
            changePlayer()
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute("square-id")) || Number(target.parentNode.getAttribute("square-id"))
    const startId = Number(startElementId)
    const piece = draggedElementId.id
    console.log('targetId', targetId)
    console.log('startId', startId)
    console.log('piece', piece)

    switch(piece) {
        case 'pawn':
            const starterRow = [8,9,10,11,12,13,14,15]
            if (starterRow.includes(startId) && startId + width * 2 === targetId
                || startId + width === targetId 
                || startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild 
                || startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
            ) {
            return true
            }
    }
}






function changePlayer() {
    if (playerGo === 'white') {
        playerGo = 'black';
        reverseIds();
    } else {
        playerGo = 'white';
        revertIds();
    }
    playerDisplay.textContent = playerGo;
}

function reverseIds()  {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i ) => 
        square.setAttribute("square-id", 63 - i))
}

function revertIds()  {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i ) => 
        square.setAttribute("square-id", i))
}