var id = "",
    guessCount = 0,
    correctNumber = 0,
    correctPosition = 0,
    answer = [],
    emptyColor = "rgb(230, 230, 230)",
    emptyColorChoice = "rgb(190, 190, 190)",
    colorLineClass = ["color_0", "color_1", "color_2", "color_3", "color_4", "color_5", "color_6"],
    colorArray = [];

var colorChoices = [],
    colorChoicesTarget = [document.querySelector(".red_color"), document.querySelector(".orange_color"), document.querySelector(".yellow_color"), document.querySelector(".green_color"), document.querySelector(".blue_color"), document.querySelector(".violet_color")],
    guessLine = [document.querySelector(".guess_0"), document.querySelector(".guess_1"), document.querySelector(".guess_2"), document.querySelector(".guess_3"), document.querySelector(".guess_4"), document.querySelector(".guess_5"), document.querySelector(".guess_6")],
    hintBox = [document.querySelector(".hint_box_0"), document.querySelector(".hint_box_1"), document.querySelector(".hint_box_2"), document.querySelector(".hint_box_3"), document.querySelector(".hint_box_4"), document.querySelector(".hint_box_5"), document.querySelector(".hint_box_6")],
    txtHint = [document.querySelector(".txt_hint_0"), document.querySelector(".txt_hint_1"), document.querySelector(".txt_hint_2"), document.querySelector(".txt_hint_3"), document.querySelector(".txt_hint_4"), document.querySelector(".txt_hint_5"), document.querySelector(".txt_hint_6")],
    guess = [
        [document.querySelector(".color_0_0"), document.querySelector(".color_0_1"), document.querySelector(".color_0_2"), document.querySelector(".color_0_3")],
        [document.querySelector(".color_1_0"), document.querySelector(".color_1_1"), document.querySelector(".color_1_2"), document.querySelector(".color_1_3")],
        [document.querySelector(".color_2_0"), document.querySelector(".color_2_1"), document.querySelector(".color_2_2"), document.querySelector(".color_2_3")],
        [document.querySelector(".color_3_0"), document.querySelector(".color_3_1"), document.querySelector(".color_3_2"), document.querySelector(".color_3_3")],
        [document.querySelector(".color_4_0"), document.querySelector(".color_4_1"), document.querySelector(".color_4_2"), document.querySelector(".color_4_3")],
        [document.querySelector(".color_5_0"), document.querySelector(".color_5_1"), document.querySelector(".color_5_2"), document.querySelector(".color_5_3")],
        [document.querySelector(".color_6_0"), document.querySelector(".color_6_1"), document.querySelector(".color_6_2"), document.querySelector(".color_6_3")]
    ];

for (i = 0; i <= 5; i++) {
    colorChoices.push(window.getComputedStyle(colorChoicesTarget[i], null).backgroundColor);
    colorArray.push(window.getComputedStyle(colorChoicesTarget[i], null).backgroundColor);
    console.log(colorChoices[i]);
}

function createAnswer() {
    randomNumber = 0;
    for (i = 0; i <= 3; i++) {
        randomNumber = Math.floor(Math.random() * colorArray.length);
        answer.push(colorArray[randomNumber]);
        colorArray.splice(randomNumber, 1);
    }
}

function reapplyColorChoices() {
    for (i = 0; i <= 5; i++) {
        colorChoicesTarget[i].style.backgroundColor = colorChoices[i];
    }
}

function setHeight() {
    for (var i = 0; i <= 5; i++) {
        var colorWidth = parseFloat(window.getComputedStyle(colorChoicesTarget[i], null).getPropertyValue("width"));
        colorChoicesTarget[i].style.height = colorWidth + "px";
    };
}

function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(type, ev) {
    if (type == "new") {
        targetClass = ev.target.classList[1];
        sourceType = "new";
    } else if (type == "switch") {
        targetClass = ev.target.classList[2];
        sourceType = "switch";
    }
}

function drop(ev) {
    var currentElement = document.querySelector("." + targetClass);
    if (sourceType == "new") {
        if (window.getComputedStyle(currentElement, null).backgroundColor != emptyColorChoice) {
            ev.target.style.backgroundColor = currentElement.style.backgroundColor;
        }
    } else if (sourceType == "switch") {
        if (window.getComputedStyle(currentElement, null).backgroundColor != emptyColor) {
            ev.target.style.backgroundColor = currentElement.style.backgroundColor;
            deleteDuplicate(ev.target);
        }
    }
    for (i = 0; i <= 5; i++) {
        colorChoicesTarget[i].style.backgroundColor = colorChoices[i];
        for (a = 0; a <= 3; a++) {
            if (colorChoicesTarget[i].style.backgroundColor == guess[guessCount][a].style.backgroundColor) {
                deleteColorChoices(colorChoicesTarget[i], emptyColorChoice);
                colorChoicesTarget[i].setAttribute('draggable', false);
            }
        }
    }
    quantityCheck();
};


function deleteDuplicate(current) {
    for (i = 0; i <= 3; i++) {
        if (guess[guessCount][i].style.backgroundColor == current.style.backgroundColor) {
            if (guess[guessCount][i] != current) {
                deleteColorChoices(guess[guessCount][i], emptyColor);
            }
        }
    }
}

function removeColor(ev) {
    for (i = 0; i <= 3; i++) {
        if (ev.target == guess[guessCount][i]) {
            if (ev.target.style.backgroundColor != null || ev.target.style.backgroundColor != emptyColor) {
                addColorChoices(ev.target.style.backgroundColor);
                ev.target.style.backgroundColor = emptyColor;
            }
        }
    }
    if (hintBox[guessCount].style.display == "flex") {
        hintBox[guessCount].style.display = "none";
    };
    quantityCheck();
}

function deleteColorChoices(targetClass, color) {
    targetClass.style.backgroundColor = color;
}

function resetColorChoices() {
    for (var i = 0; i <= 5; i++) {
        colorChoicesTarget[i].style.backgroundColor = colorChoices[i];
        colorChoicesTarget[i].setAttribute('draggable', true);
    }
}

function addColorChoices(background) {
    for (var i = 0; i <= 5; i++) {
        if (background == colorChoices[i]) {
            colorChoicesTarget[i].style.backgroundColor = background;
            colorChoicesTarget[i].setAttribute('draggable', true);
        }
    }
}

function quantityCheck() {
    var count = 0;
    for (i = 0; i <= 3; i++) {
        if (guess[guessCount][i].style.backgroundColor == "" || guess[guessCount][i].style.backgroundColor == emptyColor) {
            count += 1;
        }
    }
    if (count == 0) {
        hintBox[guessCount].style.display = "flex";
        hintBox[guessCount].style.backgroundColor = "rgb(251, 133, 68)";
        txtHint[guessCount].innerHTML = "NEXT";
    }
}

function qualityCheck(ev) {
    for (i = 0; i <= 3; i++) {
        guess[guessCount][i].setAttribute('ondrop', false);
    }
    if (hintBox[guessCount].style.backgroundColor == "rgb(251, 133, 68)") {
        correctNumber = 0;
        correctPosition = 0;
        for (i = 0; i <= 3; i++) {
            for (a = 0; a <= 3; a++) {
                if (guess[guessCount][a].style.backgroundColor == answer[i]) {
                    if (a == i) {
                        correctPosition += 1;
                    } else {
                        correctNumber += 1;
                    }
                }
            }
        }
        hintBox[guessCount].style.backgroundColor = "rgb(255, 255, 255)";
        txtHint[guessCount].style.color = "black";
        txtHint[guessCount].style.fontSize = "20pt";
        txtHint[guessCount].innerHTML = correctPosition + " - " + correctNumber;
        guessCount += 1;
        if (guessCount <= 6) {
            guessLine[guessCount].style.opacity = "1";
        }
        resetColorChoices();
        resultCheck();
    }
}

function resultCheck() {
    if (correctPosition == 4) {
        alert("Win");
    } else {
        if (guessCount == 7) {
            alert("Lose");
        }

    }
}