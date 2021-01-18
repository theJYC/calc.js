//calculator to be keyboard and click activated

/*

0) default (i.e. blank state / AC)
1) key(s) [x] pressed & staged (loop operation until state 2))
2) operator pressed & staged
3) key(s) [y] pressed & staged (loop operation until state 4)
4) calc function performed (trigger: (=))

*/

//basic maths operators

const add = (x,y) => x + y;
const subtract = (x,y) => x - y;
const multiply = (x,y) => x * y;
const divide = (x,y) => x / y;

// operate (takes an operator and 2 numbers)

const operate = (x,y,z) => {
    switch(z) {
        case "+":
            return add(x,y);
            break;
        case "-":
            return subtract(x,y);
            break;
        case "*":
            return multiply(x,y);
            break;
        case "/":
            if (y === 0) {
                return 'nah';
            } else {
                return divide(x,y);
            }
            break;
    }
}

//select all the buttons that are to be manipulated by JS:

const numberKeys = document.querySelectorAll(".number"); //number buttons
const operatorKeys = document.querySelectorAll(".operator"); //operator button
const resetKey = document.querySelector("#reset"); //reset button
const inverseKey = document.querySelector("#inverse"); //inverse button
const percentKey = document.querySelector("#percent"); //percent button
const screen = document.querySelector("#screen-number"); // screen value

//functions that populate the display when number button is clicked


const addToDisplay = (value) => {
    return screen.innerText += value; //to stage the key input onto the screen as a string
}

const clearDisplay = () => {
    return screen.innerText = ""; //to render the staged string into blank; a.k.a. clear screen
}

//these are indicators for the logic (not the display) of the calculator.
//p.s. important to separate out the logic and the display!
let numberOnScreen = false;
let operatorOnScreen = false;
let firstNumber; //made these into variables, which will all be undefined to begin with;
let operator;
let secondNumber;

// add one event listener to the entire buttons
const allButtons = document.getElementById("keys");

allButtons.addEventListener("click", (e) => {
    const target = e.target; // target attribute will return the specific button that is clicked

    if (target.classList.contains("number") && !operator) {
        addToDisplay(target.innerHTML);
        numberOnScreen = true;
        firstNumber = screen.innerHTML;
    }
    if (target.classList.contains("operator")) {
        firstNumber = screen.innerText;
        operator = target.innerHTML;
        clearDisplay();
        addToDisplay(operator);
        numberOnScreen = false;
        operatorOnScreen = true;
    }
    if (target.classList.contains("number") && operator) {
        if (operatorOnScreen) {
            clearDisplay();
        }
        addToDisplay(target.innerHTML);
        numberOnScreen = true;
        secondNumber = screen.innerHTML;
    }
    if (target.classList.contains("equals") && firstNumber && operator && secondNumber) {
        clearDisplay();
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
        result = operate(firstNumber, secondNumber, operator);
        addToDisplay(result);
        firstNumber = result;
        secondNumber = undefined;
        operator = undefined;
    }
    if (target.classList.contains("allclear")) {
        clearDisplay();
        firstNumber = undefined;
        secondNumber = undefined;
        operator = undefined;
    }
    if (target.classList.contains("inverse") && numberOnScreen)  {
        inversed = screen.innerText * -1;
        clearDisplay();
        addToDisplay(inversed);
        if (firstNumber < 0 && secondNumber > 0) {
            addToDisplay(inversed)
        }
    }
});

//nextsteps:
// allclear (AC) button; (done)
 // float toFixed();
 // big numbers (to sig figs);
 // negative numbers;
 // automatic next calculation

