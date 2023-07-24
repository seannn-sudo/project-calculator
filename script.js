// Function to count how many decimal places a floating-point number has
function countDecimals (num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

// Function to perform the mathematical operations based on the input string and operator
function operate(input,operator){
    let [number1,number2] = [0,0]

    //Handle negative number
    if (input[0] ==='-'){
        const operators_group = ['+', '-', '×', '÷'];
        input = input.slice(1)
        operator = operators_group.find(op => input.includes(op));
        [number1,number2] = input.split(operator);
        number1 = '-'+number1
    }
    else [number1,number2] = input.split(operator); //split string to number 1, number 2
    if (number2 == '=') return input = number1 //If user click '=' when there is only number 1 and no number 2 then display number 1
    else{
        //Convert number from string to float
        number1 = parseFloat(number1);
        number2 = parseFloat(number2);
        //If user put multiple operator then return the first number
        if (isNaN(number2 )) return number1.toString()
        let result = 0;
        switch (operator){
            case '÷': result = number1 / number2;break;
            case '×': result = number1 * number2;break;
            case '-': result = number1 - number2;break;
            case '+': result = number1 + number2;break;
        }
        if (countDecimals (result)> 10) return result.toFixed(10)
        else return result.toString()
    }    
}

// Function to handle button clicks
function action(buttonText){
    const operators_group = ['+', '-', '×', '÷'];
    const isInputOperator = operators_group.includes(buttonText)

    //If text is empty and user click operator buttons or '=' then return empty text
    if (input ===''){
        if (buttonText === '=') {return}
        if (isInputOperator) {input ='0'}
    }
    const operator = operators_group.find(op => input.includes(op));
    

    //If users click a new number after click '=' then clear existing data
    if (isNewCalculation  && !isInputOperator && buttonText !== '=') {input=''}

    isNewCalculation  = false;//set isNewCalculation  = false again after lear existing data or user doesn't click new number

    input += buttonText;

    //If user click 'C' then clear the last char
    if (buttonText === 'C'){input = input.slice(0,input.length-2);}
    
    // If user click 'C' then clear all
    if (buttonText === 'AC'){
        input ='';
        displayResultDiv.textContent = '';
    }

    displayCurrentDiv.textContent = input;
    // Only Each pair of numbers being evaluated at a time when user uses multiple operators
    if (operator && isInputOperator) {
        let result = operate(input,operator);
        input = result + buttonText;
        displayCurrentDiv.textContent = input;
        displayResultDiv.textContent = result;
    }
    // Call function operate when users click '='
    if (buttonText === '='){
        let result = operate(input,operator);
        displayResultDiv.textContent = result;
        input = result;
        isNewCalculation  = true; // set isNewCalculation  = true for preparing if user wants to input new number instead of operator
    }
    
}

// Function to handle keyboard input
function handleKeyboardInput(e){
    const key = e.key;
    const isInvalidInput = /[^0-9+\-=.]/;
    if (key === 'Escape') return action ('AC')
    else if (key === 'Backspace') return action('C')
    else if (key === 'Enter') return action('=')
    else if (key === '*') return action('×')
    else if (key === '/') return action('÷')
    else if (isInvalidInput.test(key)) return
    else return action(key)
}

// Initializations and event listeners
let input = '';
let isNewCalculation  = false; //This is a checker to wipe out existing data for a situation where users click a new number after click '='
let displayCurrentDiv = document.querySelector('.display-current');
let displayResultDiv = document.querySelector('.display-result');

// Listening to click inputs
const buttonsList = document.querySelectorAll('.grid-item');
for (let button of buttonsList){button.addEventListener('click', e => action(e.target.textContent))}

// Listening to keyboard inputs
window.addEventListener('keydown', handleKeyboardInput)