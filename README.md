Main keys :
1 to 7 for square shape with different color
Q to U for circle shape with different color
L to remove the last shape
Quick sliding from Z to M to execute the gamble function

Changing the game : 
Change the difficulty, make the game longer / shorter by changing the condition of the for loop in function systemBox()

    for (let i = 0; i < premadeColors.length; i++) {
        const randomColor = premadeColors[Math.floor(Math.random() * premadeColors.length)];
        const randomShape = Math.random() < 0.5 ? "square" : "circle";
        itemsSystem.push({ color: randomColor, shape: randomShape });
    }
  Change premadeColors.length to any number
  *Do the same with gambling function, no need for userBox() since it uses itemsSystem.length in the if statement*

Change the percent in gambling function : 
        const gamble = Math.random() < 0.2; //20% win

Change how fast should the slider be :
    if (key === slideKeys[slideKeyIndex] && now - slideTime < 200)
The smaller the number, the faster you must slide

        
  How this game work :
  There will be a button, it will check if the user input ( color and shape ) matches with the system premade shape and color. If it does, then +1 score, otherwise -1 score. The gambling function give a 20% chance to win. If it does then plus 20 points, otherwise minus 5 point.

  Score and hidden score : 
  There will be a hidden score counter. Every you got it wrong, it will be -1. After 5 times, if you get it wrong again in the 5th time. You lost, game reset, a link open up.
  Score can not be negative, 0 is the lowest, therefore once you reach 1 and got it wrong again, the score reset to 10 to restart the game
