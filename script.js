let display = '0';
let prevValue = null;
let operator = null;
let waitingForOperand = false;
let expression = '';

const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');
const clearBtn = document.getElementById('btn-clear');

function updateDisplay() {
  const formatted = formatNumber(display);
  resultEl.textContent = formatted;
  resultEl.className = 'result' + (formatted.length > 10 ? ' small' : '');
  expressionEl.textContent = expression || '\u00a0';
  clearBtn.textContent = display === '0' && !prevValue ? 'AC' : 'C';
}

function formatNumber(val) {
  if (val.length > 12) {
    return parseFloat(val).toExponential(5);
  }
  return val;
}

function pressDigit(digit) {
  if (waitingForOperand) {
    display = digit;
    waitingForOperand = false;
  } else {
    display = display === '0' ? digit : display + digit;
  }
  updateDisplay();
}

function pressDecimal() {
  if (waitingForOperand) {
    display = '0.';
    waitingForOperand = false;
    updateDisplay();
    return;
  }
  if (!display.includes('.')) {
    display += '.';
    updateDisplay();
  }
}

function pressClear() {
  display = '0';
  prevValue = null;
  operator = null;
  waitingForOperand = false;
  expression = '';
  highlightOperator(null);
  updateDisplay();
}

function pressSign() {
  display = String(parseFloat(display) * -1);
  updateDisplay();
}

function pressPercent() {
  display = String(parseFloat(display) / 100);
  updateDisplay();
}

function calculate(a, op, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: return b;
  }
}

function pressOperator(op) {
  const inputValue = parseFloat(display);

  if (prevValue === null) {
    prevValue = display;
    expression = display + ' ' + opSymbol(op);
  } else if (operator && !waitingForOperand) {
    const result = calculate(parseFloat(prevValue), operator, inputValue);
    const r = String(parseFloat(result.toFixed(10)));
    display = r;
    prevValue = r;
    expression = r + ' ' + opSymbol(op);
  }

  operator = op;
  waitingForOperand = true;
  highlightOperator(op);
  updateDisplay();
}

function pressEqual() {
  if (!operator || prevValue === null || waitingForOperand) return;

  const inputValue = parseFloat(display);
  const result = calculate(parseFloat(prevValue), operator, inputValue);
  const r = String(parseFloat(result.toFixed(10)));

  expression = prevValue + ' ' + opSymbol(operator) + ' ' + display + ' =';
  display = r;
  prevValue = null;
  operator = null;
  waitingForOperand = true;
  highlightOperator(null);
  updateDisplay();
}

function opSymbol(op) {
  return { '+': '+', '-': '-', '*': '×', '/': '÷' }[op] || op;
}

function highlightOperator(op) {
  document.querySelectorAll('.btn-operator').forEach(btn => {
    btn.classList.remove('active');
  });

  if (op) {
    const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
    document.querySelectorAll('.btn-operator').forEach(btn => {
      if (btn.textContent.trim() === symbols[op]) {
        btn.classList.add('active');
      }
    });
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') pressDigit(e.key);
  else if (e.key === '.') pressDecimal();
  else if (e.key === '+') pressOperator('+');
  else if (e.key === '-') pressOperator('-');
  else if (e.key === '*') pressOperator('*');
  else if (e.key === '/') {
    e.preventDefault();
    pressOperator('/');
  }
  else if (e.key === 'Enter' || e.key === '=') pressEqual();
  else if (e.key === 'Escape') pressClear();
  else if (e.key === 'Backspace') {
    if (display.length > 1) display = display.slice(0, -1);
    else display = '0';
    updateDisplay();
  }
});

updateDisplay();