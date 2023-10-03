const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  // character can't more than 9
  if (
    output.length - 1 >= 8 &&
    !(
      specialChars.includes(btnValue) ||
      btnValue === "." ||
      btnValue === "AC" ||
      btnValue === "DEL"
    )
  ) {
    return;
  } else if (btnValue === "=" && output !== "") {
    //If output has '%', replace with '/100' before evaluating.
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    //if DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else if (
    //if the last character is operator and input operator then change operator and return
    specialChars.includes(output.charAt(output.length - 1)) &&
    specialChars.includes(btnValue)
  ) {
    output = output.toString().slice(0, -1);
    output += btnValue;
    display.value = output;
    return;
  } else if (
    //if the last character is comma and input comma or operator then return
    output.charAt(output.length - 1) === "." &&
    (btnValue === "." || specialChars.includes(btnValue))
  ) {
    return;
  } else if (btnValue === ".") {
    //if input a comma ...
    //... output is empty and button is comma then output will be "0."
    if (output === "") {
      output = "0.";
      display.value = output;
      return;
    } else if (specialChars.includes(output.charAt(output.length - 1))) {
      //... last character is operator then output will be "0."
      output += "0.";
      display.value = output;
      return;
    } else {
      output += ".";
    }
  } else if (output.length - 1 === 0 && output === "0") {
    //if there is have 1 character and this is 0 then ...
    // ... button 0 then return
    if (btnValue === "0" || btnValue === "00") {
      return;
      // ... button not an (operator or comma) then change the character, display, and return
    } else if (!specialChars.includes(btnValue)) {
      output = btnValue;
      display.value = output;
      return;
    } else {
      output += btnValue;
    }
  } else {
    //If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;

    //if button 00 and ouput empty or after operator output will be just show 0
    if (
      btnValue === "00" &&
      (output === "" || specialChars.includes(output.charAt(output.length - 1)))
    ) {
      output += "0";
      display.value = output;
      return;
    }
    output += btnValue;
  }
  display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
