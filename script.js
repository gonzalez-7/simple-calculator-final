// Selecting elements
const display = document.querySelector("#display"); // Display area where the calculation result is shown
const buttons = document.querySelectorAll(".calculator-button"); // All calculator buttons (numbers and operators)
const lastResultDisplay = document.querySelector("#last-result-display"); // Element to show the last calculated expression

// Variables to track the state
let firstNumber = ""; // First number input by the user
let operator = ""; // Operator chosen (+, -, *, /)
let secondNumber = ""; // Second number input by the user
let result = null; // Result of the calculation
let isEvaluated = false; // Flag to check if the calculation is done

// Function to update the display
const updateDisplay = (value) => {
  display.textContent = value; // Set the display content to the provided value
};

// Reset calculator state
const resetCalculator = () => {
  firstNumber = ""; // Reset the first number
  operator = ""; // Reset the operator
  secondNumber = ""; // Reset the second number
  result = null; // Reset the result
  isEvaluated = false; // Set evaluation flag to false
  updateDisplay(""); // Clear the display
  toggleButtons(true); // Enable the calculator buttons
};

// Toggle buttons (disable or enable)
const toggleButtons = (enable) => {
  buttons.forEach((button) => { // Iterate over all calculator buttons
    if (button.id !== "button-clear") { // Do not disable the clear button
      button.disabled = !enable; // Enable or disable button based on the 'enable' parameter
      button.style.opacity = enable ? "1" : "0.5"; // Change button opacity to indicate if it is enabled
    }
  });
};

// Save the last expression to localStorage
const saveLastExpression = (expression) => {
  localStorage.setItem("lastExpression", expression); // Store the expression in localStorage
};

// Load the last expression on page load
const loadLastExpression = () => {
  const lastExpression = localStorage.getItem("lastExpression"); // Get the last expression from localStorage
  if (lastExpression) {
    lastResultDisplay.textContent = lastExpression; // Display the last expression if it exists
  } else {
    lastResultDisplay.textContent = "None"; // Display 'None' if no last expression is saved
  }
};

// Initialize calculator
const initializeCalculator = () => {
  loadLastExpression(); // Load and display the last expression when the page loads

  buttons.forEach((button) => { // Iterate over all buttons
    button.addEventListener("click", () => { // Add click event listener to each button
      const value = button.textContent; // Get the text value of the clicked button

      // Handle clear button
      if (button.id === "button-clear") { 
        resetCalculator(); // Reset the calculator state
        return;
      }

      // Handle equals button
      if (button.id === "button-equals") { 
        if (firstNumber && operator && secondNumber) { // Ensure both numbers and an operator are present
          try {
            result = eval(`${firstNumber} ${operator} ${secondNumber}`); // Evaluate the mathematical expression
            const expression = `${firstNumber} ${operator} ${secondNumber} = ${result}`; // Format the expression
            updateDisplay(result); // Show the result in the display
            saveLastExpression(expression); // Save the result expression to localStorage
            lastResultDisplay.textContent = expression; // Update the last result display with the expression
            isEvaluated = true; // Mark that evaluation is complete
            toggleButtons(false); // Disable buttons after evaluation
          } catch {
            updateDisplay("Error"); // If there's an error in evaluation, show "Error"
          }
        }
        return;
      }

      // Handle number buttons
      if (!isNaN(value)) { // Check if the clicked value is a number
        if (isEvaluated) return; // Do nothing if the calculation has already been evaluated

        // Append numbers to the correct variable
        if (operator) {
          if (secondNumber === "0" && value === "0") return; // Prevent adding extra zeros to the second number
          secondNumber += value; // Add the number to secondNumber
        } else {
          if (firstNumber === "0" && value === "0") return; // Prevent adding extra zeros to the first number
          firstNumber += value; // Add the number to firstNumber
        }
      }

      // Handle operator buttons
      if (["+", "-", "*", "/"].includes(value)) { // Check if the clicked value is an operator
        if (!firstNumber || isEvaluated) return; // Ensure the first number is set before adding an operator
        operator = value; // Set the operator
      }

      // Update display dynamically
      if (!isEvaluated) {
        updateDisplay(`${firstNumber} ${operator} ${secondNumber}`); // Show the current expression
      }
    });
  });
};

// Run the calculator
initializeCalculator(); // Initialize the calculator when the script loads
