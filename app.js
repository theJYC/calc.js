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

const numberKeys = document.querySelectorAll("#number"); //number buttons
const operatorKeys = document.querySelectorAll("#operator"); //operator button
const resetKey = document.querySelector("#reset"); //reset button
const inverseKey = document.querySelector("#inverse"); //inverse button
const percentKey = document.querySelector("#percent"); //percent button
const screen = document.querySelector("#screen-number"); // screen value

//functions that populate the display when number button is clicked


const addToDisplay = () => {
    return screen.innerText += numberKeys.innerHTML;
}

for (number of numberKeys) {
    number.addEventListener("click", addToDisplay)
}
