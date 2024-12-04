// Selecting elements
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".calculator-button");

// Initialize calculator
const initializeCalculator = () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button.textContent); // Log button press
    });
  });
};

// Run the calculator
initializeCalculator();
