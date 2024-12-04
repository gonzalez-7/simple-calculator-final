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

    // Add mouse down/up events for button click feedback
    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)"; // Shrink the button a bit when clicked
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "scale(1)"; // Reset the size after release
    });

    // Add hover effect with CSS
    button.addEventListener("mouseover", () => {
      button.style.backgroundColor = "#ddd"; // Change button color on hover
    });

    button.addEventListener("mouseout", () => {
      button.style.backgroundColor = ""; // Reset to original color after hover
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
  // Handle the logic for button clicks, numbers, operators, and equals
  if (value === "C") {
    resetCalculator();
    return;
  }

  if (value === "=") {
    if (firstNumber && operator && secondNumber) {
      try {
        result = eval(`${firstNumber} ${operator} ${secondNumber}`);
        updateDisplay(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
        saveLastExpression(`${firstNumber} ${operator} ${secondNumber} = ${result}`);
        isEvaluated = true;
        toggleButtons(false); // Disable buttons after evaluation
      } catch (error) {
        updateDisplay("Error");
      }
    }
    return;
  }

  // Handle number buttons
  if (!isNaN(value)) {
    if (isEvaluated) {
      firstNumber = value; // Start fresh for chaining
      secondNumber = "";
      isEvaluated = false;
    }

    // Append numbers to the correct variable
    if (operator) {
      secondNumber += value;
    } else {
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
};

// Run the calculator
initializeCalculator();
