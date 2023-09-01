const winning_pattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let start_btn = document.getElementById("start");
let restart_btn = document.getElementById("restart");
let box_click = Array.from(document.getElementsByClassName("box"));
let boxes = Array(9).fill(null);
let header = document.getElementById("header");
let current_player = "X";
start_btn.addEventListener('click', start);
let result = false;
let result_pattern;
let count = [];
let play = true;

function start() {
    box_click.forEach(x => x.addEventListener('click', boxClicked));
    if(play) header.innerHTML = "Let's Play!!";

    
    play=false;
};

restart_btn.addEventListener('click', restart);

function restart() {

    header.innerHTML = "press start";

    boxes.fill(null);

    box_click.forEach(x => {
        x.innerHTML = '';
        x.style.background = '';
    }
    );
    result = false;
    current_player = "X";
    result_pattern = '';
    count = [];
    play=true;

}
function boxClicked(x) {
    let index = x.target.id;

    if (boxes[index] === null && result === false && !play) {

        boxes[index] = current_player;
        result = playerwon();
      
        document.getElementById(index).innerHTML = current_player;
        if (result) {

            result_pattern.forEach(x => {
                box_click[x].style.background = "red";

            });
            header.innerHTML = current_player + " " + "has won!!!";
        } else if (count.length === 8) {
            header.innerHTML = "Draw!!";

        }
        count.push(' ');
        current_player = current_player === "X" ? "O" : "X";

    }
};

function playerwon() {

    for (let i = 0; i < winning_pattern.length; i++) {
        let x = winning_pattern[i];

        if ((boxes[x[0]] !== null) && (boxes[x[0]] === boxes[x[1]]) 
         && (boxes[x[1]] !== null) && (boxes[x[1]] === boxes[x[2]]) &&
            (boxes[x[2]] !== null) && (boxes[x[2]] === boxes[x[1]])
        ) {
            result_pattern = x;
            return true;
        }
    }

    return false;
};
