let boxes = document.querySelectorAll("div.box");
let player_1 = 'X';
let player_2 = 'O';
let current_player = 'X';
let result = document.querySelector('h1');
let start_value = document.querySelector("h1#start_value");
let winning_pattern;
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let array = Array(9).fill(null);
let flag = 0;
var start_btn = document.getElementById("start");


start_btn.addEventListener("click", start);

function start() {
    start_value.innerHTML = "";
    started();

}


function started() {

    boxes.forEach(box => box.addEventListener('click', boxClicked));

}


function boxClicked(e) {
     if (array[e.target.id] === null) {
          let result = playerwon();
    if (result) {
        start_value.innerHTML = "Game Ended!!";

    }

    let index = e.target.id;


    if (array[index] === null && !result) {
        array[index] = e.target.innerHTML = current_player;
    }

    if ((array.find(x => x == null) === undefined)) {
        start_value.innerHTML = "Draw!!";
    }else if(playerwon() && flag === 0) {
        flag = 1;
        start_value.innerHTML = current_player + " has won";
        winning_pattern.map(pattern => boxes[pattern].style.backgroundColor = winnerIndicator);
    }


    
    current_player = current_player === player_1 ? player_2 : player_1;

     }
}

function playerwon() {


    for (let i = 0; i < winningCombos.length; i++) {
        const arr = winningCombos[i];

        let firstindex = (array[arr[0]] === array[arr[1]]) && (array[arr[0]] !== null);
        let middleindex = (array[arr[1]] === array[arr[2]]) && (array[arr[1]] !== null);
        let lastindex = (array[arr[2]] === array[arr[0]]) && (array[arr[2]] !== null);


        if (firstindex && lastindex && middleindex) {
            winning_pattern = [arr[0], arr[1], arr[2]];
            return true;
        }
    }


    return false;
}


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



document.getElementById('restart').addEventListener('click', restarted);


function restarted() {
    console.log("hi");
    result.innerHTML = "Tic Tac Toc";
    array.fill(null);

    boxes.forEach(
        x => {
            x.innerHTML = '';
            x.style.backgroundColor = '';
        }
    );
    flag = 0;
    current_player ="X";
    start_value.innerHTML = "";

}
