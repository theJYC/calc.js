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
        case "x":
            return multiply(x,y);
            break;
        case "÷":
            if (y === 0) { // EDGE CASE 1: DIVIDE BY ZERO
                alert("Cannot divide by zero.");
                return clearDisplay();
            } else {
                return divide(x,y);
            }
            break;
    }
}

//select all the buttons that are to be manipulated by JS:
const screen = document.querySelector("#screen-number"); // screen value

//functions that interacts with the display when number button is clicked
const addToDisplay = (value) => {
    return screen.innerText += value; //to stage the key input onto the screen as a string
}

const clearDisplay = () => {
    return screen.innerText = ""; //to render the staged string into blank; a.k.a. clear screen
}

//EDGE CASE 2: LARGE NUMBER OUTPUTS

const refineNumber = (num) => {
    if (num.toString().length > 10) { //e.g. if result is over 7 sig figs (fills up screen)
        sciNotation = parseInt(num).toExponential(2); //to yield e.g. 5.00e+5
        numToDisplay = sciNotation;
    }
    else {
        numToDisplay = num; // don't do any exponential monkey business given the expl. below
    }
    return numToDisplay;
}

//these are indicators for the logic (not the display) of the calculator.
//p.s. important to separate out the logic and the display!
let numberOnScreen = false;
let operatorOnScreen = false;
let firstNumber; //made these into variables, which will all be undefined to begin with;
let operator;
let secondNumber;
let thirdNumber;

// add one event listener to the entire buttons
const allButtons = document.getElementById("keys");

allButtons.addEventListener("click", (e) => {
    const target = e.target; // target attribute will return the specific button that is clicked

    if (target.classList.contains("number") && !operator) { //when a number key is pressed (before an operator key is pressed)
        input = addToDisplay(target.innerHTML);
        if (input.length >= 10) {
            clearDisplay();
            addToDisplay(refineNumber(input)); //pls fix!
        }
        else {
        //     alert("Input allowed up to 10 significant figures")
        //     input.pop();
        // }
        numberOnScreen = true;
        firstNumber = parseInt(screen.innerHTML);
        }
    }
    if (target.classList.contains("operator")) { //whenever an operator key is clicked
        firstNumber = screen.innerText;
        operator = target.innerHTML;
        clearDisplay();
        addToDisplay(operator);
        numberOnScreen = false;
        operatorOnScreen = true;
    }
    if (target.classList.contains("number") && operator) { //when number key is clicked, after an operator key has been clicked
        clearDisplay();
        addToDisplay(target.innerHTML);
        numberOnScreen = false;
        if (target.classList.contains("number") && operator && !numberOnScreen) {
            secondNumber = screen.innerHTML;
            numberOnScreen = true;
        }
    }
    if (target.classList.contains("equals") && firstNumber && operator && secondNumber) { //when equals key is pressed
        clearDisplay();
        firstNumber = parseInt(firstNumber);
        secondNumber = parseInt(secondNumber);
        result = operate(firstNumber, secondNumber, operator);
        console.log(result);
        if (result[0] === 0) { // if result is a decimal that starts with 0 (e.g. 0.54)
            result = parseInt(result.toFixed(3))
        }
        else { // result does not start with a 0; i.e. not a decimal
            result = refineNumber(result); //refineNumber to condense output and make more manageable
        }
        addToDisplay(result);
        firstNumber = result;
        secondNumber = undefined;
        operator = undefined;
        thirdNumber = true;
    }
    if (target.classList.contains("percent")) {
        percent = screen.innerText / 100;
        clearDisplay();
        addToDisplay(percent);
    }

    if (target.classList.contains("number") && thirdNumber) {
        clearDisplay();
        thirdNumber = false;
        addToDisplay(target.innerHTML);
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
        addToDisplay(inversed); //bug [1]
    }


});

//nextsteps:
// allclear (AC) button; (done)
 // float toFixed();
 // big numbers (to sig figs);
 // negative numbers;
 // automatic next calculation

/* bugs

[1]: the inverse sign applies well with the firstNumber,
but not with the secondNumber

*/
