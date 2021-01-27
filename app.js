/*
0) default (i.e. blank state / AC)
1) first operand [x] clicked & staged [enabling further digit inputs until 2)]
2) operator clicked & staged
3) second operand [y] clicked & staged [enabling further digit inputs until stage 4)]
4) calculation performed [when (=) clicked]
*/

//basic maths operators
const add = (x,y) => x + y;
const subtract = (x,y) => x - y;
const multiply = (x,y) => x * y;
const divide = (x,y) => x / y;

// operate (takes 2 operands (x and y) and operator (z))

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
            if (y === 0) { //EDGE CASE 1: DIVIDE BY ZERO
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

//functions that interacts with the display when button is clicked
const addToDisplay = (value) => {
    return screen.innerText += value; //stages key input onto the screen as a string
}

const clearDisplay = () => {
    return screen.innerText = ""; //to render the staged string into blank; a.k.a. clear screen
}

//EDGE CASE 2: LARGE NUMBER OUTPUTS

const refine = (num) => {
    if (num.toString().length >= 10) { //e.g. if result is over 7 sig figs (fills up screen)
        sciNotation = parseInt(num).toExponential(2); //to yield e.g. 5.00e+5
        numToDisplay = sciNotation;
    }
    else {
        numToDisplay = num; // don't do any exponential monkey business given the expl. below
    }
    return numToDisplay;
}

//these are indicators for the logic (not the display) of the calculator.
//manipulated during certain stages of the calculation
let numberOnScreen = false;
let operatorOnScreen = false;
let firstNumber; //declaring these variables render them undefined until further action;
let operator;
let secondNumber;
let thirdNumber;


// add one event listener to the entire buttons
const allButtons = document.getElementById("keys");

allButtons.addEventListener("click", (e) => {
    const target = e.target; // target attribute will return the specific button that is clicked

    const input = target.innerHTML;
    const screenNumber = screen.innerHTML;

    //when a number key is pressed (before an operator key is pressed)
    if (target.classList.contains("number") && !operator) {

        if (screenNumber.length >= 10) {
            clearDisplay();
            bigNumber = screenNumber + input;
            refinedInput = refine(bigNumber);
            addToDisplay(refinedInput);
            numberOnScreen = true;
        }

        else if (screenNumber.includes("e")) { //i.e. if the input is a large num that has been refine'ed
            clearDisplay();
            bigNumber += input; // this ensures the addition of more sig figs as input gets larger
            addToDisplay(refine(bigNumber));
            numberOnScreen = true;
        }

        else {
        addToDisplay(input);
        numberOnScreen = true;
        }
    }

    //whenever an operator key is clicked
    if (target.classList.contains("operator")) {
        firstNumber = screen.innerText;
        operator = target.innerHTML;
        clearDisplay();
        // target.style.backgroundColor = "red";
        numberOnScreen = false;
    }

    //EDGECASE TO BE ADDED: if OPERATOR BUTTON is clicked TWICE
    // PLACEHOLDER!
    //

    //when number key is clicked, after an operator key has been clicked
    if (target.classList.contains("number") && operator) {

        if (screenNumber.length >= 10) {
            clearDisplay();
            bigNumber = screenNumber + input;
            refinedInput = refine(bigNumber);
            addToDisplay(refinedInput);
            numberOnScreen = true;
        }

        else if (screenNumber.includes("e")) { //i.e. if the input is a large num that has been refine'ed
            clearDisplay();
            bigNumber += input; // this ensures the addition of more sig figs as input gets larger
            addToDisplay(refine(bigNumber));
            numberOnScreen = true;
        }

        else {
        addToDisplay(input);
        numberOnScreen = true;
        }
    }
    //when equals key is pressed, having logged firstNumber, operator, secondNumber
    if (target.classList.contains("equals") && firstNumber && operator) {
        secondNumber = screen.innerText;
        clearDisplay();

        firstNumber = +firstNumber; //unary operator to convert str to num
        secondNumber = +secondNumber; //(parseInt avoided, as to inadvertently convert a float into an int!)
        result = operate(firstNumber, secondNumber, operator);
        console.log(`output is ${result}`);
        console.log(typeof result);

        if (result.toString().length >= 10) { //if output is a decimal, no need to refine but
            result = refine(result);
        }

        else if (result.toString().length >= 10 && result % 1 != 0) {
            result = result.toFixed(6);
        }
        addToDisplay(result);
            firstNumber = +result;
            secondNumber = undefined;
            operator = undefined;
            thirdNumber = true;
    }
    if (target.classList.contains("percent")) {
        percent = screen.innerText / 100;
        if (percent.length >= 10) {
            clearDisplay();
            addToDisplay(refine(percent));
        }
        else {
            clearDisplay();
            addToDisplay(percent);
        }
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

 /* edge cases fixed:

 allclear (AC) button; (done)
 parsing floats;
 big numbers (to sig figs);
 negative numbers (for both first and second operands);
 automatic next calculation


/* bugs

[1]: the inverse sign applies well with the firstNumber,
but not with the secondNumber

*/
