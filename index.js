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


let btn_enter = document.getElementById("enter");
let btn_clear = document.getElementById("clear");
let p1, p2;
let player_x, player_o;
let player_name = 0;
let header = document.getElementById("header");
let clear;
let start_btn = document.getElementById("start");
let restart_btn = document.getElementById("restart");
let box_click = Array.from(document.getElementsByClassName("box"));
let boxes = Array(9).fill(null);
let current_player = "X";
let result = false;
let result_pattern;
let count = [];
let play = true;
let player1_win_count = 0;
let player2_win_count = 0;
let tie_count = 0;

btn_enter.addEventListener("click", function () {
    clear = true;

    if (player_name === 0) {

        p1 = document.getElementById("p1").value.trim();
        p2 = document.getElementById("p2").value.trim();

        if (p1.length >= 1 && p2.length >= 1) {
            player_x = p1;
            player_o = p2;

            header.innerHTML = "Press Start";

            if (clear) start();

        } else {

            if (p1.length === 0) {
                document.getElementById("p1").style.background = "red";
                setTimeout(() => {
                    document.getElementById("p1").style.background = "none";
                }, 1000);
            }
            if (p2.length === 0) {
                document.getElementById("p2").style.background = "red";
                setTimeout(() => {
                    document.getElementById("p2").style.background = "none";
                }, 1000);
            }
        }
        player_name = 1;
    }

});

btn_clear.addEventListener("click", function () {

    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    player_name = 0;
    clear = false;
    restart();
    header.innerHTML = "Enter name";
    document.getElementById("currentturn").innerHTML = current_player;
    document.getElementById("p1win").innerHTML = 0;
    document.getElementById("p2win").innerHTML = 0;
    document.getElementById("tie").innerHTML = 0;
});








function start() {

    start_btn.addEventListener("click", function () {

        if (clear) {
            if (play) header.innerHTML = "Let's Play!!";
            play = false;
            box_click.forEach(x => x.addEventListener('click', boxClicked));
        }

    });

}

restart_btn.addEventListener('click', restart);


function restart() {
    if (count.length >= 1) {
        header.innerHTML = "Press start";

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
        play = true;
        document.getElementById("currentturn").innerHTML = current_player;


    }
}
function boxClicked(x) {
    let index = x.target.id;

    if (boxes[index] === null && result === false && !play) {

        boxes[index] = current_player;
        result = playerwon();
        let turn = 0;
        document.getElementById(index).innerHTML = current_player;
        if (result) {
            result_pattern.forEach(x => {
                box_click[x].style.background = "red";

            });
            let won = current_player == "X" ? p1 : p2;
            header.innerHTML = won + " has won!!!";

            if (won === p1) {
                document.getElementById("p1win").innerHTML = ++player1_win_count;
                turn = 1;

            } else {
                turn = 1;
                document.getElementById("p2win").innerHTML = ++player2_win_count;
            }
            document.getElementById("currentturn").innerHTML = "-";
        } else if (count.length === 8) {
            header.innerHTML = "Draw!!";
            document.getElementById("tie").innerHTML = ++tie_count;
            turn = 1;
            for (let i = 0; i < 9; i++) {
                box_click[i].style.background = "red";

            }
            document.getElementById("currentturn").innerHTML = "-";
        }

        count.push(' ');

        current_player = current_player === "X" ? "O" : "X";

        if (turn == 0) document.getElementById("currentturn").innerHTML = current_player;

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



