
const buttonNames = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
];
var lrows = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var lcolumns = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var ldiagonals = [[0, 0, 0], [0, 0, 0]]
var lrows_buttons = [["buttons one", 0, 0], ["buttons two", 0, 1], ["buttons three", 0, 2], ["buttons four", 1, 0], ["buttons five", 1, 1], ["buttons six", 1, 2
], ["buttons seven", 2, 0], ["buttons eight", 2, 1], ["buttons nine", 2, 2]];
var lcolumns_buttons = [["buttons one", 0, 0], ["buttons two", 1, 0], ["buttons three", 2, 0], ["buttons four", 0, 1], ["buttons five", 1, 1], ["buttons six", 2, 1
], ["buttons seven", 0, 2], ["buttons eight", 1, 2], ["buttons nine", 2, 2]];
var ldiagonals_buttons = [["buttons one", 0, 0], ["buttons five", 0, 1], ["buttons nine", 0, 2], ["buttons three", 1, 0], ["buttons five", 1, 1], ["buttons seven", 1, 2]]
//creating buttons
var body = document.getElementsByClassName("button-container")[0];
var cnt = 0;
var cntmoves = 0;
for (let i = 0; i < 3; i++) {
    var row = document.createElement("div");
    for (let j = 0; j < 3; j++) {
        var button = document.createElement("button");
        button.className = `buttons ${buttonNames[cnt]}`;
        button.innerText = "";
        row.appendChild(button);
        cnt++;
    }
    body.appendChild(row);
}
function update_rows_and_columns(nameofclass, type) {
    lrows_buttons.forEach(function (x) {
        if (x[0] === nameofclass) {
            lrows[x[1]].splice(x[2], 1, type);
        }
    });
    lcolumns_buttons.forEach(function (x) {
        if (x[0] === nameofclass) {
            lcolumns[x[1]].splice(x[2], 1, type);
        }
    });
    if (["buttons one", "buttons three", "buttons five", "buttons seven", "buttons nine"].includes(nameofclass)) {
        ldiagonals_buttons.forEach(function (x) {
            if (x[0] === nameofclass) {
                ldiagonals[x[1]].splice(x[2], 1, type);
            }
        });
    };
    check_winning(lrows);
    check_winning(lcolumns);
    check_winning(ldiagonals);
};
document.querySelectorAll(".buttons").forEach(function (x) {
    x.addEventListener("click", function () {
        let img2 = document.createElement("img");
        img2.src = "images/crossimage.png";
        this.appendChild(img2);
        this.disabled = true;
        cntmoves++;
        var test = this.className;
        update_rows_and_columns(test, true);
        computermove();
    });
});
//main loop
//player is true;computer is false
function placecircle(buttonclass) {
    let img1 = document.createElement("img");
    img1.src = "images/circleimage.png"
    let button1 = document.getElementsByClassName(buttonclass)[0];
    if (button1.disabled === false) {
        button1.appendChild(img1);
        button1.disabled = true;
        cntmoves++
    };
}
function check(array1, array2, checkvar) {
    let flag = true;
    for (j in array1) {
        /**
         * checking rows:loop through array and check every element
         * checking columns:maintain count variable that increases till n
            * check ith element of every nested array
         * checking diagonals:check elements with equal i and j values
            * other diagonal:start one variable from n and decrease,other starts from 0 and increase 
         */
        if ((array1[j].includes(0)) && ((compare_array(array1[j], [checkvar, checkvar, 0])) || (compare_array(array1[j], [0, checkvar, checkvar])) || (compare_array(array1[j], [checkvar, 0, checkvar])))) {
            var c1 = j;
            var c2 = array1[j].indexOf(0);
            for (i in array2) {
                if ((array2[i][1] == c1) && (array2[i][2] == c2)) {
                    var test = array2[i][0];
                    placecircle(test);
                    update_rows_and_columns(test, false);
                    flag = false;
                }
            }
        }
    };
    return flag;
}

function check_winning(list) {
    let winner = document.getElementsByClassName("winner")[0];
    list.forEach(function (x) {
        if (compare_array(x, [true, true, true])) {
            winner.innerText = "You won!";
            for (i in lrows_buttons) {
                let a = document.getElementsByClassName(lrows_buttons[i][0])[0];
                a.disabled = true;
            }
        }
        else if (compare_array(x, [false, false, false])) {
            winner.innerText = "You lost!";
            for (i in lrows_buttons) {
                let a = document.getElementsByClassName(lrows_buttons[i][0])[0];
                a.disabled = true;
            }
        }
    })
}

function check_losing() {
    a = check(lrows, lrows_buttons, false);
    if (a === false) {
        return;
    }
    a = check(lcolumns, lcolumns_buttons, false);
    if (a === false) {
        return;
    }
    console.log(ldiagonals);
    a = check(ldiagonals, ldiagonals_buttons, false);
    if (a === false) {
        return;
    }
    a = check(lrows, lrows_buttons, true);
    if (a === false) {
        return;
    }
    a = check(lcolumns, lcolumns_buttons, true);
    if (a === false) {
        return;
    }
    a = check(ldiagonals, ldiagonals_buttons, true);
    if (a === false) {
        return;
    }
    if (cntmoves !== 9) {
        while (true) {
            const random_Element = lrows[Math.floor(Math.random() * lrows.length)];
            if (random_Element.includes(0)) {
                let c1 = lrows.indexOf(random_Element);
                let c2 = random_Element.indexOf(0);
                for (j in lrows_buttons) {
                    if (lrows_buttons[j][1] == c1 && lrows_buttons[j][2] == c2) {
                        placecircle(lrows_buttons[j][0]);
                        update_rows_and_columns(lrows_buttons[j][0], false);
                        return;
                    }
                }
            }
        }
    }
}

function compare_array(l1, l2) {
    if (l1.length !== l2.length) {
        return false
    }
    for (let i = 0; i < l1.length; i++) {
        if (l1[i] !== l2[i]) {
            return false
        }
    }
    return true;
};
function computermove() {
    if (cntmoves == 1) {
        if (lrows[1][1] == 0) {
            placecircle("buttons five");
            update_rows_and_columns("buttons five", false);
        } else {
            const myArray = ["buttons one", "buttons three", "buttons seven", "buttons nine"]
            const randomElement = myArray[Math.floor(Math.random() * myArray.length)];
            placecircle(randomElement);
            update_rows_and_columns(randomElement, false);
        }
    } else {
        check_losing();
    }
};  