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
  }
};

// Initialize calculator
const initializeCalculator = () => {
  loadLastExpression();

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleButtonClick(button.textContent);
    });
  });

  // Handle keyboard input
  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key >= "0" && key <= "9") {
      handleButtonClick(key);
    } else if (key === "Enter" || key === "=") {
      handleButtonClick("=");
    } else if (key === "Escape" || key === "c") {
      handleButtonClick("C");
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleButtonClick(key);
    }
  });
};

// Handle button clicks and keyboard input
const handleButtonClick = (value) => {
  // The rest of your logic for handling button clicks
};

// Run the calculator
initializeCalculator();
