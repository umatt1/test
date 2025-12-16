// Constants
const PRECISION_MULTIPLIER = 1000000000;

// Calculator state
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;
let history = '';

// DOM elements
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

// Initialize calculator
function initCalculator() {
    // Number buttons
    document.querySelectorAll('.btn-number').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            handleNumber(value);
        });
    });
    
    // Operator buttons
    document.querySelectorAll('.btn-operator').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleOperator(action);
        });
    });
    
    // Function buttons
    document.querySelectorAll('.btn-function').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleFunction(action);
        });
    });
    
    // Advanced buttons
    document.querySelectorAll('.btn-advanced').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleAdvanced(action);
        });
    });
    
    // Equals button
    document.querySelector('.btn-equals').addEventListener('click', () => {
        handleEquals();
    });
    
    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
}

// Handle number input
function handleNumber(value) {
    if (shouldResetDisplay) {
        currentValue = value;
        shouldResetDisplay = false;
    } else {
        if (value === '.' && currentValue.includes('.')) return;
        currentValue = currentValue === '0' && value !== '.' ? value : currentValue + value;
    }
    updateDisplay();
}

// Handle operator input
function handleOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        handleEquals();
    }
    
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
    
    const operatorSymbol = getOperatorSymbol(op);
    history = `${previousValue} ${operatorSymbol}`;
    updateHistory();
}

// Handle function buttons
function handleFunction(action) {
    switch (action) {
        case 'clear':
            currentValue = '0';
            previousValue = '';
            operation = null;
            history = '';
            shouldResetDisplay = false;
            break;
        case 'delete':
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            break;
        case 'percent':
            currentValue = (parseFloat(currentValue) / 100).toString();
            break;
        case 'negate':
            currentValue = (parseFloat(currentValue) * -1).toString();
            break;
    }
    updateDisplay();
    updateHistory();
}

// Handle advanced functions
function handleAdvanced(action) {
    const num = parseFloat(currentValue);
    
    switch (action) {
        case 'sqrt':
            if (num < 0) {
                currentValue = 'Error';
            } else {
                currentValue = Math.sqrt(num).toString();
            }
            break;
        case 'square':
            currentValue = (num * num).toString();
            break;
        case 'power':
            previousValue = currentValue;
            operation = 'power';
            shouldResetDisplay = true;
            history = `${previousValue} ^`;
            updateHistory();
            return;
        case 'pi':
            currentValue = Math.PI.toString();
            break;
    }
    
    shouldResetDisplay = true;
    updateDisplay();
}

// Handle equals
function handleEquals() {
    if (operation === null || shouldResetDisplay) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    
    switch (operation) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                currentValue = 'Error';
                operation = null;
                previousValue = '';
                history = '';
                updateDisplay();
                updateHistory();
                return;
            }
            result = prev / current;
            break;
        case 'power':
            result = Math.pow(prev, current);
            break;
    }
    
    // Format result
    if (result !== undefined) {
        // Round to avoid floating point errors
        result = Math.round(result * PRECISION_MULTIPLIER) / PRECISION_MULTIPLIER;
        currentValue = result.toString();
    }
    
    const operatorSymbol = getOperatorSymbol(operation);
    history = `${previousValue} ${operatorSymbol} ${current} =`;
    
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    
    updateDisplay();
    updateHistory();
}

// Get operator symbol for display
function getOperatorSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'subtract': return '−';
        case 'multiply': return '×';
        case 'divide': return '÷';
        case 'power': return '^';
        default: return '';
    }
}

// Update display
function updateDisplay() {
    display.textContent = currentValue;
}

// Update history display
function updateHistory() {
    historyDisplay.textContent = history;
}

// Keyboard support
function handleKeyboard(event) {
    const key = event.key;
    
    // Numbers and decimal
    if ((key >= '0' && key <= '9') || key === '.') {
        event.preventDefault();
        handleNumber(key);
    }
    
    // Operators
    switch (key) {
        case '+':
            event.preventDefault();
            handleOperator('add');
            break;
        case '-':
            event.preventDefault();
            handleOperator('subtract');
            break;
        case '*':
            event.preventDefault();
            handleOperator('multiply');
            break;
        case '/':
            event.preventDefault();
            handleOperator('divide');
            break;
        case 'Enter':
        case '=':
            event.preventDefault();
            handleEquals();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            event.preventDefault();
            handleFunction('clear');
            break;
        case 'Backspace':
            event.preventDefault();
            handleFunction('delete');
            break;
        case '%':
            event.preventDefault();
            handleFunction('percent');
            break;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}
