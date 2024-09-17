const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  const tooltip = document.createElement("span");
  tooltip.classList.add("tooltip");
  tooltip.textContent = button.getAttribute("data-tooltip");
  button.appendChild(tooltip);
});
