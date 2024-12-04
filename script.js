// Selecting elements
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".calculator-button");

// Variables to track the state
let firstNumber = "";
let operator = "";
let secondNumber = "";

// Initialize calculator
const initializeCalculator = () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      // Handle number buttons
      if (!isNaN(value)) {
        // Append numbers to the correct variable
        if (operator) {
          secondNumber += value; // Append to second number if operator is set
        } else {
          firstNumber += value; // Append to first number if no operator
        }
        updateDisplay(`${firstNumber} ${operator} ${secondNumber}`); // Update display
      }

      // Handle operator buttons
      if (["+", "-", "*", "/"].includes(value)) {
        if (firstNumber) {
          operator = value; // Set operator when first number is entered
        }
      }

      // Handle equals button
      if (value === "=") {
        if (firstNumber && operator && secondNumber) {
          const result = eval(`${firstNumber} ${operator} ${secondNumber}`); // Evaluate expression
          updateDisplay(`${firstNumber} ${operator} ${secondNumber} = ${result}`); // Show result
        }
      }

      // Handle clear button
      if (value === "C") {
        firstNumber = "";
        operator = "";
        secondNumber = "";
        updateDisplay(""); // Clear the display
      }
    });
  });
};

// Function to update the display
const updateDisplay = (value) => {
  display.textContent = value;
};

// Run the calculator
initializeCalculator();
