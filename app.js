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
const screen = document.querySelector("#screen-number"); // screen value


//functions that populate the display when number button is clicked
const addToDisplay = (value) => {
    return screen.innerText += value; //to stage the key input onto the screen as a string
}

const clearDisplay = () => {
    return screen.innerText = ""; //to render the staged string into blank; a.k.a. clear screen
}

//edge cases

const refineNumber = (num) => { //e.g. starting with output 500000
    sciNotation = num.toExponential(2); //to yield 5.00e+5
    coefAndExp = sciNotation.split("e"); //to yield ["5.00", "+5"]
    coefficient = coefAndExp[0]; //to yield "5.00" i.e. the coefficient
    console.log(coefficient)
    exponent = coefAndExp[1]; //to yield "+5" i.e. the exponent
    console.log(exponent);
    return parseInt(`${coefficient} x10^${exponent}`); // to yield 5.00 x10^+5
}

//this^ currently does not work so will get back to it.
//right now the output, when integrated onto calculator,
// is displaying coeff and exp but on a new line.



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

    if (target.classList.contains("number") && !operator) { //when a number key is pressed (before an operator key is pressed)
        addToDisplay(target.innerHTML);
        numberOnScreen = true;
        firstNumber = screen.innerHTML;
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
        resultRefined = refineNumber(result); //refineNumber to condense output and make more manageable
        addToDisplay(resultRefined);
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
