

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
let dec = false;
let eq = false;
let opChoice = 0;
let operatorDiv;
let answer = 0;
let current;

getAnswer = function(arr3) {
  let x = Number(arr3[0]);
  let y = Number(arr3[2]);
  let tempAnswer = 0;
  switch (arr3[1]) {
    case "+":
      tempAnswer = x + y;
      break;
    case "-":
      tempAnswer = x - y;
      break;
    case "x":
      tempAnswer = x * y;
      break;
    case "/":
      tempAnswer = x / y;
      break;
    case "mod":
      tempAnswer = x % y;
      break;
    case "xy":
      tempAnswer = Math.pow(x, y);
  }
  return tempAnswer;
}

shrinkArray = function(calc, index) {
  let temp = [];
  temp = calc.slice(index - 1, index + 2);
  result = getAnswer(temp);
  calc[index] = result;
  calc.splice(index - 1, 1);
  calc.splice(index, 1);
  return calc;
}

equalsPressed = function(calc) {
  eq = true;
  let index = 0;
  let result = 0;
  while (calc.length > 3) {
    if (calc.includes("xy")) {
      index = calc.indexOf("xy");
      calc = shrinkArray(calc, index);
    } else if (calc.includes("x") || calc.includes("/") || calc.includes("mod")) {
      for (let i = calc.length -1; i > 0; i--) {
        if (calc[i] === "x" || calc[i] === "/" || calc[i] === "mod") {
          index = i;
        }
      }
      calc = shrinkArray(calc, index);
    } else {
      index = 1;
      calc = shrinkArray(calc, index);
    }
  }
  answer = getAnswer(calc);
}

decimalPressed = function(calc) {
  dec = true;
  if (calc.length % 2 === 0) {
    calc.push(0); //this puts zero on screen id decimal is pressed prior to a number
  }
  current = calc.length - 1;
  let currentNum = calc[current];
  currentNum = currentNum.toString();
  currentNum += ".";
  calcStack[current] = currentNum;
}

function clickEvent() {
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
    dec = false;
    opChoice = 0;
    if (calcStack.length % 2 === 0) {
      operatorDiv.style.backgroundColor = "#c2c5fc";
    }
  } else if (divClass.includes("operator") && calcStack.length % 2 === 1 && calcStack.length > 0 && !eq) {
    dec = false;
    if (divId === "square") {
      displayNum[0] = Math.pow(displayNum[0], 2);
    } else if (divId === "sqrt") {
      displayNum[0] = Math.sqrt(displayNum[0]).toFixed(10);
      if (displayNum[0].endsWith("00000")) {
        console.log(displayNum[0]);
        displayNum[0] = displayNum[0].slice(0, displayNum[0].length - 11);
      }
    } else {
      opChoice += 1;
      divClicked.style.backgroundColor = "#ffa3ef";
      operatorDiv = divClicked;
    }
  } else if (divClass.includes("number") && !eq) {
    if (opChoice % 2 === 1) {
      opChoice += 1;
    }
    if (calcStack.length % 2 === 0) {
      if (calcStack.length > 0) {
        operatorDiv.style.backgroundColor = "#c2c5fc";
      }
      displayNum = [];
    }
    num = parseInt(divValue);
    if (!dec) {
      if (displayNum[0] > 0) {
        displayNum[0] = displayNum[0] * 10 + num;
      } else {
        displayNum[0] = num;
      }
    } else {
      calcStack[current] += divValue;
    }

  } else if (divId === "equals" && calcStack.length % 2 === 1 && calcStack.length > 1) {
    equalsPressed(calcStack);
    calcStack = [];
    answer = answer.toFixed(10);
    if (answer.includes(".")) { //removes remaining zeros after toFixed operation
      while (answer.endsWith("0")) {
        answer = answer.slice(0,answer.length-1);
      }
    }
    if (answer.endsWith(".")) {
      answer = answer.slice(0,answer.length-1);
    }
    calcStack[0] = answer;
  } else if (divId === "decimal" && !dec) {
    console.log("decimal pressed");
    decimalPressed(calcStack);
  }

  let dispArea = document.querySelector("#display h2");

  if (!dec) {
    if (opChoice % 2 === 0 && !eq && divId !== "clear") {
      if (calcStack.length % 2 === 0) {
        calcStack.push(displayNum[0]);
      } else {
        calcStack[calcStack.length -1] = displayNum[0];
      }
    } else if (calcStack.length % 2 === 1 && divId !== "clear" && divId !== "equals") {
      calcStack.push(divLabel);
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
