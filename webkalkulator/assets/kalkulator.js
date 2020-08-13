const kalkulator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    waitingSecond : false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = kalkulator.displayNumber;
} 

function clearKalkulator() {
    kalkulator.displayNumber = '0';
    kalkulator.operator = null;
    kalkulator.firstNumber = null;
    kalkulator.waitingSecond = false;
}

function inputDigit(digit) {
    if (kalkulator.waitingSecond && kalkulator.firstNumber === kalkulator.displayNumber) {
        kalkulator.displayNumber = digit;
    } else {
        if (kalkulator.displayNumber === '0') {
            kalkulator.displayNumber = digit;
        } else {
            kalkulator.displayNumber += digit;
        }
    }
}

function inverseNumber() {
    if (kalkulator.displayNumber === '0') {
        return;
    } else {
        kalkulator.displayNumber *= -1;
    }
}

function handleOperator(operator) {
    if (!kalkulator.waitingSecond) {
        kalkulator.operator = operator;
        kalkulator.waitingSecond = true;
        kalkulator.firstNumber = kalkulator.displayNumber;
    } else {
        alert('Operator telah ditentukan!!!');
    }
}

function performCalculation() {
    if (kalkulator.firstNumber === null && kalkulator.operator === null) {
        alert('Masukkan angka dan operator terlebih dahulu!');
        return;
    } 
    
    let result = 0;
    if (kalkulator.operator === '+') {
        result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
    } else {
        result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
    }
    
    const history = {
        firstNumber: kalkulator.firstNumber,
        secondNumber: kalkulator.displayNumber,
        operator: kalkulator.operator,
        result: result
    };

    putHistory(history);
    kalkulator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");

for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearKalkulator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equal')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });

}
