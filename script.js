// Selecting elements
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".calculator-button");

// Initialize calculator
const initializeCalculator = () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent); // Update the display
    });
  });
};

// Function to update the display
const updateDisplay = (value) => {
    display.textContent = value;
};

// Run the calculator
initializeCalculator();
