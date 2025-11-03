// Arrays to store color items
let items = []; // array to hold item (Use for user boxes input)
let itemsSystem = []; // array to hold item (use for system boxes)
let score = 10; // Score
let hiddenScore = 0; // hidden score
let circleKeys = ["Q", "W", "E", "R", "T", "Y", "U"]; // Keys to summon circle shape
//let squareKeys = ["1", "2", "3", "4", "5", "6", "7"]; no need, I use "i+1" instead
let slideKeys = ["z", "x", "c", "v", "b", "n", "m"]; // required order
let slideKeyIndex = 0; // check the index of the key being pressed
let slideTime = 0; // time of the last pressed key

const premadeColors = ["Red", "Green", "Blue", "Yellow", "White", "Orange", "Cyan"]; // Change the color here

function updateDisplay() {
    const colorGuideSquare = premadeColors.map(function(color, i) {
        return '<div class="color-box square" style="background-color:' + color + ';">' + (i + 1) + '</div>';
    }).join("");
    //I use map so it will check through every elements of the array, which is 7 color in totals. Then it will create a div per color

    const colorGuideCircle = premadeColors.map(function(color, i) {
        return '<div class="color-box circle" style="background-color:' + color + ';">' + circleKeys[i] + '</div>';
    }).join("");

    const userColorBoxes = items.map(function(obj) {
        return '<div class="color-box ' + obj.shape + '" style="background-color:' + obj.color + ';"></div>';
    }).join("");

    const systemColorBoxes = itemsSystem.map(function(obj) {
        return '<div class="color-box ' + obj.shape + '" style="background-color:' + obj.color + ';"></div>';
    }).join("");

    document.getElementById("Information").innerHTML =
        "Color Key (Squares): <div class='color-container'>" + colorGuideSquare + "</div>" +
        "Color Key (Circles): <div class='color-container'>" + colorGuideCircle + "</div>";

    document.getElementById("userText").innerHTML =
        "Your Colors: <div class='color-container'>" + userColorBoxes + "</div>";

    document.getElementById("SystemText").innerHTML =
        "System Colors: <div class='color-container'>" + systemColorBoxes + "</div>";

    document.getElementById("scoreText").innerHTML =
        "Your Score ( Below 0 and you lose ): " + score;
}



//My key slider, which act as a gamble mechanism
document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();
    const now = Date.now();
// slideKeyIndex start with 0, which is "z" in slideKeys. Check if they are correct, then move to check the next key, which is 1, equal to "x". Then check if time between those 2 buttons are less then 200ms
    if (key === slideKeys[slideKeyIndex] && now - slideTime < 200) {
        slideKeyIndex++;
        slideTime = now;

    if (slideKeyIndex === slideKeys.length) {
        items = [];
        const gamble = Math.random() < 0.2; //20% win

        if (gamble) { // boolean to check if gamble is true ( 20% )
            for (let i = 0; i < premadeColors.length; i++) {
                items.push({
                color: itemsSystem[i].color, shape: itemsSystem[i].shape
                });
            }
            score += 20;
            alert("Gamble win");
            if (score > 50){
            alert("You win!");
            window.location.reload();
            }
            systemBox();

        } else { // or false ( 80% )
            for (let i = 0; i < premadeColors.length; i++) {
                const randomColor = premadeColors[Math.floor(Math.random() * premadeColors.length)];
                const randomShape = Math.random() < 0.5 ? "square" : "circle";
                items.push({ color: randomColor, shape: randomShape });
                }
            score -= 5;
            alert("Gamble lost");
            if (score < 0){
            window.location.reload();
            alert("You lose!");
            } 
            }
            updateDisplay();
            slideKeyIndex = 0;
        }

    } else if (key === slideKeys[0]) { // reset the Index back to 1 if mistakenly press something else, then press Z will reset the whole thing and start running again
        slideKeyIndex = 1;
        slideTime = now;
    } else {
        slideKeyIndex = 0;
    }
});


function userBox() {
    document.addEventListener("keydown", function (event) {
        let newColor = null;
        let shape = "square";

        // Square keys: 1–7
        if (event.key === "1") newColor = "Red";
        else if (event.key === "2") newColor = "Green";
        else if (event.key === "3") newColor = "Blue";
        else if (event.key === "4") newColor = "Yellow";
        else if (event.key === "5") newColor = "White";
        else if (event.key === "6") newColor = "Orange";
        else if (event.key === "7") newColor = "Cyan";
        //I do not add shape = ""; here because default it is square, just to shorten the code. 

        // Circle keys: Q–U
        else if (event.key.toLowerCase() === "q") { newColor = "Red"; shape = "circle"; }
        else if (event.key.toLowerCase() === "w") { newColor = "Green"; shape = "circle"; }
        else if (event.key.toLowerCase() === "e") { newColor = "Blue"; shape = "circle"; }
        else if (event.key.toLowerCase() === "r") { newColor = "Yellow"; shape = "circle"; }
        else if (event.key.toLowerCase() === "t") { newColor = "White"; shape = "circle"; }
        else if (event.key.toLowerCase() === "y") { newColor = "Orange"; shape = "circle"; }
        else if (event.key.toLowerCase() === "u") { newColor = "Cyan"; shape = "circle"; }

        if (event.key === "l") { // Remove last item 
            items.pop();
            updateDisplay();
            return;
        }

// let color use newColor values
        if (newColor) {
            items.push({ color: newColor, shape: shape });
            if (items.length > itemsSystem.length){
                items.shift();
            } 
            updateDisplay();
        }
    });
}



// The system premade box
function systemBox() {
    itemsSystem = [];
    for (let i = 0; i < premadeColors.length; i++) {
        const randomColor = premadeColors[Math.floor(Math.random() * premadeColors.length)];
        const randomShape = Math.random() < 0.5 ? "square" : "circle";
        itemsSystem.push({ color: randomColor, shape: randomShape });
    }
    updateDisplay();
}

// Compare the system box and user box
function compareArrays(items, itemsSystem) {
    if (items.length !== itemsSystem.length) {
        return false;
    }

    for (let i = 0; i < items.length; i++) {
        if (items[i].color !== itemsSystem[i].color || items[i].shape !== itemsSystem[i].shape) {
            return false;
        }
    }
    return true;
}

// Button to check and to execute the compareArrays function
document.getElementById("CheckerButton").textContent = "Check Colors";
document.getElementById("CheckerButton").addEventListener("pointerdown", function() {
    if (compareArrays(items, itemsSystem)) {
        alert("Correct");
        systemBox();
        items = [];
        score++;
        updateDisplay();
    } else {
        alert("Wrong");
        systemBox();
        items = [];
        score--;
        hiddenScore--;
        if (score < 1) {
            alert("You lose!");
            window.location.reload();
        }
        if (score > 50){
            alert("You win!");
            window.location.reload();
        }
        if (hiddenScore < -5) {
            window.open("https://www.youtube.com/watch?v=lfmg-EJ8gm4");
            hiddenScore = 0;
            window.location.reload();
        }
        updateDisplay();
    }
});

userBox();
systemBox();
