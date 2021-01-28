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
const screen = document.querySelector("#screen-number");

//functions for interacting with display
const addToDisplay = (value) => {
    return screen.innerText += value; //stages key input onto the screen as a string
}

const clearDisplay = () => {
    return screen.innerText = ""; //to render the staged string into blank; a.k.a. clear screen
}

//EDGE CASE 2: LARGE NUMBER OUTPUTS

const convertToReadable = (num) => {
    if (num.toString().length >= 10) { //e.g. if result is over 10 sig figs (fills up screen)
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
            refinedInput = convertToReadable(bigNumber);
            addToDisplay(refinedInput);
            numberOnScreen = true;
        }

        else if (screenNumber.includes("e")) { //i.e. if the input is a large num that has been refine'ed
            clearDisplay();
            bigNumber += input; // this ensures the addition of more sig figs as input gets larger
            addToDisplay(convertToReadable(bigNumber));
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
            refinedInput = convertToReadable(bigNumber);
            addToDisplay(refinedInput);
            numberOnScreen = true;
        }

        else if (screenNumber.includes("e")) { //i.e. if the input is a large num that has been refine'ed
            clearDisplay();
            bigNumber += input; // this ensures the addition of more sig figs as input gets larger
            addToDisplay(convertToReadable(bigNumber));
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
        secondNumber = +secondNumber; //parseInt avoided to prevent converting a float into an int!
        result = operate(firstNumber, secondNumber, operator);
        console.log(`output is ${result}`);

        //first check-- if output is a large input decimal (e.g. 2/3)
        if (result.toString().length >= 10 && result < 1 && result > 0) {
            console.log('output is a large input decimal')
            addToDisplay(result.toFixed(6));
        }
        //second check-- if output is a float larger than 1 but smaller than 999 (e.g. 5/3)
        else if (result.toString().length >= 10 && result > 1 && result < 999) {
            console.log('output is a float larger than 1 but smaller than 999')
            addToDisplay(result.toFixed(5));
        }
        // third check-- if output is > 10 char's,
        // but not a float in the meaning that was defined above @ first & second check (e.g. 23234234231)
        else if (result.toString().length >= 10) {
            console.log("output is larger than 10 char's in length")
            addToDisplay(convertToReadable(result));
        }
        // if all three checks are passed, it means output is an integer or float that is not a large number
        // i.e. an integer/float that is less than 10 digits (e.g. 123415)
        else {
            console.log("output is an integer or float no larger than 10 characters in length")
            addToDisplay(result);
        }
            firstNumber = +result;
            secondNumber = undefined;
            operator = undefined;
            thirdNumber = true;
    }
    if (target.classList.contains("percent")) {
        percent = screen.innerText / 100;
        if (percent.length >= 10) {
            clearDisplay();
            addToDisplay(convertToReadable(percent));
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
        addToDisplay(inversed);
    }


});

 /*
 edge cases still to be fixed (in order of priority):

 THIS BUG IS NOW FIXED :) X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X

 1a) 0.33333223455433 input converts to 0.00e+0
 -when there are long lines of outputs (between 0 and 1), find a different way to display the output.
 -ideally the output should be in a readable format for small numbers (decimals).
 -0.00e+0 vs. 0.3333322 (a more readable output rounded up, to sum 10 char's in length to fit screen)

 X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X

 1b) % (percent) function outputing without convertToReadable() taking place
 -this must be to do with .toExponent() not being entirely compatible for small numbers in JS.
 -this must also be tied to edge case 1) above.
 -this kind of is tied to edge case 1a), but different
  because the fix will have to be a local fix to the percent() function
  (applying the same fix from operate() to percent(), re: floats btw 0 and 1).

 THIS REMAINS SECOND PRIORITY
 2) 0.33333223455433 input (after being converted to 0.00e+0) plus operator and operand will output 0.
 -evidently this bug has to do with stage 1) of the calculator.
 -will need to isolate the fix on there.
 -ideally, 0.3333333 will be turned to 0.333333 (.toFixed(6 or etc.)).

 3) when multiple operators are pressed
 -stage the last pressed operator, and ignore the previous ones.
 -maybe add a visual function to indicate the operator 'in action'.


n.b. these edge cases were not fixed at the time this script was written
given that they are centered around doing a deeper dive into JS's unique way of handling numbers.

since the priority was to deploy a functional web application with command of DOM and WebAPI concepts,
i will be putting a pause on working on those edge cases until further notice
since the learning priority was achieved. learned a whole lot about js & interactive web dev! :)

*/
