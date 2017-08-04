

const buttonData = [
  {"name": "clear", "label": "C", "class": "operator"},
  {"name": "display", "label": ""},
  {"name": "power", "label": "xy", "class": "operator"},
  {"name": "square", "label": "x2", "class": "operator"},
  {"name": "sqrt", "label": "sqrt", "class": "operator"},
  {"name": "mod", "label": "mod", "class": "operator"},
  {"name": "seven", "label": "7", "class": "number", "value": 7},
  {"name": "eight", "label": "8", "class": "number", "value": 8},
  {"name": "nine", "label": "9", "class": "number", "value": 9},
  {"name": "divide", "label": "/", "class": "operator"},
  {"name": "four", "label": "4", "class": "number", "value": 4},
  {"name": "five", "label": "5", "class": "number", "value": 5},
  {"name": "six", "label": "6", "class": "number", "value": 6},
  {"name": "multiply", "label": "x", "class": "operator"},
  {"name": "one", "label": "1", "class": "number", "value": 1},
  {"name": "two", "label": "2", "class": "number", "value": 2},
  {"name": "three", "label": "3", "class": "number", "value": 3},
  {"name": "subtract", "label": "-", "class": "operator"},
  {"name": "zero", "label": "0", "class": "number", "value": 0},
  {"name": "decimal", "label": "."},
  {"name": "equals", "label": "=", "class": "equals"},
  {"name": "add", "label": "+", "class": "operator"}
];

let container = document.getElementById("calculator-body");
let displayNum = [];
let calcStack = [];
let operationChosen = false;
let secondNum = false;
let dec = false;
let eq = false;
let index = 0;
let operatorDiv;
let answer = 0;

equalsPressed = function(calc) {
  eq = true;
  let x = calc[0];
  let y = calc[2];
  switch (calc[1]) {
    case "+":
      answer = x + y;
      break;
    case "-":
      answer = x - y;
      break;
    case "x":
      answer = x * y;
      break;
    case "/":
      answer = x / y;
      break;
    case "mod":
      answer = x % y;
      break;
    case "xy":
      answer = Math.pow(x, y);
  }
}

decimalPressed = function(calc) {
  dec = true;
  let current = calc.length - 1;
  let currentNum = calc[current];
  currentNum = currentNum.toString();
  currentNum += ".";
  calcStack[current] = currentNum;
  console.log(calcStack);
}

function clickEvent() {
  if (operationChosen) {
    index = 2;
  }
  let divClicked;

  if (event.target.getAttribute("class")) {
    divClicked = event.target;
  } else {
    divClicked = event.target.parentElement;
  }
  let divId = divClicked.id;
  let divClass = divClicked.getAttribute("class");
  let divValue = divClicked.getAttribute("value");
  let divLabel = divClicked.querySelector("h2").textContent;
  let num; //this will become the number that was clicked

  if (divId === "clear") {
    displayNum = [];
    calcStack = [];
    eq = false;
    if (operationChosen) {
      operatorDiv.style.backgroundColor = "#c2c5fc";
      operationChosen = false;
      secondNum = false;
    }
  } else if (divClass.includes("operator") && !operationChosen && displayNum[0] > 0 && !eq) {
    if (divId === "square") {
      displayNum[0] = Math.pow(displayNum[0], 2);
    } else if (divId === "sqrt") {
      displayNum[0] = Math.sqrt(displayNum[0]);
    } else {
      divClicked.style.backgroundColor = "#ffa3ef";
      operationChosen = true;
      operatorDiv = divClicked;
    }
  } else if (divClass.includes("number") && !eq) {
    if (operationChosen && !secondNum) {
      operatorDiv.style.backgroundColor = "#c2c5fc";
      displayNum = [];
      secondNum = true;
    }
    num = parseInt(divValue);

    if (displayNum[0] > 0) {
      displayNum[0] = displayNum[0] * 10 + num;
    } else {
      displayNum[0] = num;
    }

  } else if (divId === "equals" && secondNum) {
    equalsPressed(calcStack);
    calcStack = [];
    calcStack[0] = answer;
  } else if (divId === "decimal" && !dec) {
    console.log("decimal pressed");
    decimalPressed(calcStack);
  }

  let dispArea = document.querySelector("#display h2");

  if (!dec) {
    if (!operationChosen) {
      calcStack[0] = displayNum[0];
    } else if (!secondNum && divId !== "clear") {
      calcStack.push(divLabel);
    } else if (secondNum && !eq) {
      calcStack[2] = displayNum[0];
    }
  }
  console.log(calcStack);
  dispString = calcStack.toString().replace(/,/g, " ");
  dispArea.innerText = dispString;
}

//loop to set up physical calulcator and assign appropriate classes
for (let i = 0; i < buttonData.length; i++) {
  let content;
  let newDiv = document.createElement("div");

  if (buttonData[i].label === "xy") {
    content = `
    <h2>x<sup>y</sup></h2>
    `
  } else if (buttonData[i].label === "x2"){
    content = `
    <h2>x<sup>2</sup></h2>
    `
  } else {
    content = `
    <h2>${buttonData[i].label}</h2>
    `
  }

  newDiv.setAttribute("class", "button");
  newDiv.setAttribute("id", buttonData[i].name);
  if (i % 4 === 1) {
    newDiv.classList.add("right-side");
  }
  if (i >= buttonData.length - 4) {
    newDiv.classList.add("bottom-row");
  }

  if (buttonData[i].class) {
    newDiv.classList.add(buttonData[i].class);
  }

  let newClass = newDiv.getAttribute("class");
  if (newClass.includes("number")) {
    newDiv.setAttribute("value", buttonData[i].value);
  }

  newDiv.addEventListener("click", clickEvent);
  newDiv.innerHTML = content;
  container.appendChild(newDiv);
}
