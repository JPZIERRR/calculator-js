'strict mode';

const result = document.querySelector(".result");
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerHTML = originClear ? 0 : currentNumber.replace('.', ',');
}

const addDigit = function(digit) {
    if(digit === "," && (currentNumber.includes(',') || !currentNumber)) return;
    
    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult();
}

const setOperator = function(newOperator) {
    if(currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(',', '.'));
        currentNumber = "";
    }

    operator = newOperator;
}

const calculate = function() {
    if(operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case '+':
            resultValue = firstOperand + secondOperand;
            break;

        case '-':
            resultValue = firstOperand - secondOperand;
            break;

        case 'x':
            resultValue = firstOperand * secondOperand;
            break;

        case '÷':
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if(!secondOperand) {
       return;
    }

    if (resultValue.toString().split('.')[1]?. length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    updateResult();
}

const clearCalculator = function() {
    currentNumber = '';
    firstOperand = null;
    operator = null;
    updateResult(true);
}

const setPercentage = function() {
    let result = parseFloat(currentNumber) / 100;

    if(['+', '-'].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split('.')[1]?. length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerHTML;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText)
        } else if (['+', '-', 'x', '÷'].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === 'C') {
            clearCalculator();
        } else if (buttonText === '+-') {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult()
        } else if (buttonText === '%') {
            setPercentage();
        } 
    });
});