// Selecting elements
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".calculator-button");
const lastResultDisplay = document.querySelector("#last-result-display");

// Variables to track the state
let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = null;
let isEvaluated = false;

// Function to update the display
const updateDisplay = (value) => {
  display.textContent = value;
};

// Reset calculator state
const resetCalculator = () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  result = null;
  isEvaluated = false;
  updateDisplay("");
  toggleButtons(true);
};

// Toggle buttons (disable or enable)
const toggleButtons = (enable) => {
  buttons.forEach((button) => {
    if (button.id !== "button-clear") {
      button.disabled = !enable;
      button.style.opacity = enable ? "1" : "0.5";
    }
  });
};

// Save the last expression to localStorage
const saveLastExpression = (expression) => {
  localStorage.setItem("lastExpression", expression);
};

// Load the last expression on page load
const loadLastExpression = () => {
  const lastExpression = localStorage.getItem("lastExpression");
  if (lastExpression) {
    lastResultDisplay.textContent = lastExpression;
  } else {
    lastResultDisplay.textContent = "None"; // Default message when no last expression is saved
  }
};

// Initialize calculator
const initializeCalculator = () => {
  loadLastExpression();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      // Handle clear button
      if (button.id === "button-clear") {
        resetCalculator();
        return;
      }

      // Handle equals button
      if (button.id === "button-equals") {
        if (firstNumber && operator && secondNumber) {
          try {
            result = eval(`${firstNumber} ${operator} ${secondNumber}`);
            const expression = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
            updateDisplay(result);
            saveLastExpression(expression);
            lastResultDisplay.textContent = expression; // Update last result display with the last evaluated expression
            isEvaluated = true;
            toggleButtons(false); // Disable buttons after evaluation
          } catch {
            updateDisplay("Error");
          }
        }
        return;
      }

      // Handle number buttons
      if (!isNaN(value)) {
        if (isEvaluated) return; // Do nothing if evaluated

        // Append numbers to the correct variable
        if (operator) {
          if (secondNumber === "0" && value === "0") return; // Prevent padding with zeros
          secondNumber += value;
        } else {
          if (firstNumber === "0" && value === "0") return; // Prevent padding with zeros
          firstNumber += value;
        }
      }

      // Handle operator buttons
      if (["+", "-", "*", "/"].includes(value)) {
        if (!firstNumber || isEvaluated) return; // Ensure first number is set
        operator = value;
      }

      // Update display dynamically
      if (!isEvaluated) {
        updateDisplay(`${firstNumber} ${operator} ${secondNumber}`);
      }
    });
  });
};

// Run the calculator
initializeCalculator();
