
const allCells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const winningMessage = document.querySelector('[ data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');

const restart = document.getElementById('restartbtn');

const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

let  circleTurn

startGame();

restart.addEventListener('click', startGame);

function startGame(){

allCells.forEach(cell =>{
    circleTurn = false;
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click',handleClick)
    cell.addEventListener('click', handleClick, {once:true})
});
 markHover();
 winningMessageElement.classList.remove('show');
}

function handleClick(e){
  const cell = e.target;

   const  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; 
   placeMark(cell, currentClass);
  
   if(checkWin(currentClass)){
       endGame(false)
   } else if (isDraw()){
    endGame(true);
   } else{
    swapTurns();
    markHover();
   }
  
}

function isDraw(){
    return [...allCells].every(cell =>{
        return cell.classList.contains(X_CLASS) ||
         cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn =!circleTurn;
}

function markHover(){
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_CLASS);
     if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
     } else{
        board.classList.add(X_CLASS)
     }
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination =>{
        return combination.every(index =>{
            return allCells[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
     if (draw){  
         winningMessage.innerText = "Draw"
     } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
     }
     winningMessageElement.classList.add('show');
}