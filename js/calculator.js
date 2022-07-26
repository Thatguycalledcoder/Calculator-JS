// Target the DOM elements
const all_display = document.querySelector('#all-input'),
    display = document.querySelector('#current-input'),
    clear_button = document.querySelector('#clear'),
    backspace_button = document.querySelector('#backspace'),
    dot_button = document.querySelector('.disable'),
    input_buttons = document.querySelectorAll('#input'),
    operators = document.querySelectorAll('#operator'),
    key_input = document.querySelector('#keyin'),
    reset_button = document.querySelector('#reset');

let result = undefined,
    n1 = undefined,
    n2 = undefined,
    dot_count = 1,
    sub_count = 0,
    current_input = '',
    all_input = '',
    previous = '';

const math_operators = ['+', '-', '*', '/', '='];

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
// Clears all input data
function clear_inputs() {
    result = undefined;
    n1 = undefined;
    n2 = undefined;
    sub_count = 0;
    dot_count = 1;
    current_input = '';
    all_input = '';
    dot_button.removeAttribute('disabled');
}
function divide(num1, num2) {
    if (num2 === 0) {
        alert("Division by zero leads to an undefined result");
        refresh();
    }
    else
        return num1 / num2;
}
// Takes inputs and given operator to perform calculations
function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }
}
// Clears all input and display data
function refresh() {
    clear_inputs();
    display.textContent = '';
    all_display.textContent = '';
}
// Function for operator events
function operator_func(operator) {
    // If = button is pressed
    if (operator === '=' && current_input !== '') {
        // Checks if there have been previous computations
        if (result != undefined) {
            operate(result, parseFloat(current_input), previous);
            result = Math.round(result * 100) / 100;
            display.textContent = result;
            clear_inputs();
        } 
        // Checks if only one input is given
        else if (previous === '') {
            display.textContent = current_input;
            clear_inputs();
        }
        // Checks if only two inputs have been given
        else {
            operate(n1, parseFloat(current_input), previous);
            result = Math.round(result * 100) / 100;
            display.textContent = result;
            clear_inputs();
        }
    }
    // If - button is pressed for starting negative numbers
    else if (current_input === '' && operator === '-' && sub_count == 0) {
        current_input = '-';
        all_input += '-';
        display.textContent = current_input;
        all_display.textContent = all_input;
        sub_count++;
    }
    else if (current_input != '') {
        if (result != undefined) {
            n1 = result;
            n2 = parseFloat(current_input);
            current_input = "";
            operate(n1, n2, previous);
            result = Math.round(result * 100) / 100;
            display.textContent = result;
            previous = operator;
            sub_count = 0;
        }
        else if (n1 == undefined) {
            n1 = parseFloat(current_input);
            previous = operator;
            current_input = "";
            sub_count = 0;
        }
        else {
            n2 = parseFloat(current_input);
            current_input = "";
            operate(n1, n2, previous);
            result = Math.round(result * 100) / 100;
            display.textContent = result;
            previous = operator
            sub_count = 0;
        }
        all_input += operator;
        all_display.textContent = all_input;
        dot_button.removeAttribute('disabled');
        dot_count++;
    }
    else {
        alert("Please enter an input")
    }
}
// Function for input events
function inputs_func(input) {
    if (input === '.' && dot_count === 1) {
        dot_count--;
        dot_button.setAttribute('disabled', true);
    }
    current_input += input;
    all_input += input;
    display.textContent = current_input;
    all_display.textContent = all_input;
}
function backspace_func() {
    if (current_input !== '') {
        if (current_input.endsWith('.')) {
            dot_button.removeAttribute('disabled');
            dot_count++;
        }
        current_input = current_input.slice(0, -1);
        all_input = all_input.slice(0, -1);
        display.textContent = current_input;
        all_display.textContent = all_input;
    }
}
// Event listener for clear button
clear_button.addEventListener('click', () => {
    refresh();
});
// Event listener for backspace button
backspace_button.addEventListener('click', () => {
    backspace_func()
})
// Event listeners for input of digits
input_buttons.forEach((input) => {
    input.addEventListener('click', () => {
        inputs_func(input.innerHTML);
    })
})
// Event listeners for mathematical operators
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        operator_func(operator.innerHTML);
    })
})
// Keyboard support event listener
key_input.addEventListener('keyup', (e) => {
    if (e.key === "Backspace") {
        backspace_func();
    }
    if (!(isNaN(parseFloat(e.key))) || (e.key === '.' && dot_count === 1)) {
        inputs_func(e.key);
    }
    if (math_operators.includes(e.key)) {
        operator_func(e.key);
    }
    reset_button.click();
})