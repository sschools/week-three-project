

const buttonData = [
  {"name": "clear", "label": "C", "class": "operator"},
  {"name": "display", "label": ""},
  {"name": "power", "label": "xy", "class": "operator"},
  {"name": "sqaure", "label": "x2", "class": "operator"},
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
let calcArray = [];
let operationChosen = false;
let index = 0;

function clickEvent() {
  if (operationChosen) {
    index = 2;
  }
  let divClicked;
  let operatorDiv;
  if (event.target.getAttribute("class")) {
    divClicked = event.target;
  } else {
    divClicked = event.target.parentElement;
  }
  let divId = divClicked.id;
  let divClass = divClicked.getAttribute("class");
  let divValue = divClicked.getAttribute("value");
  let num; //this will become the number that was clicked

  if (divId === "clear") {
    displayNum = [];
    calcArray = [];
  } else if(divClass.includes("operator") && !operationChosen && displayNum[0] > 0) {
    divClicked.style.backgroundColor = "#ffa3ef";
    operationChosen = true;
    operatorDiv = divClicked;
    calcArray.push(displayNum[0]);
    calcArray.push(divClicked.id);
  } else {
    num = parseInt(divValue);

    if (displayNum[0] > 0) {
      displayNum[0] = displayNum[0] * 10 + num;
    } else {
      displayNum[0] = num;
    }

  }

  let dispArea = document.querySelector("#display h2");
  dispArea.innerText = displayNum[0];
  console.log(calcArray);
}

//loop to set up physical calulcator and assign appropriate classes
for (let i = 0; i < buttonData.length; i++) {
  let newDiv = document.createElement("div");
  let newText = document.createElement("h2");
  let content = document.createTextNode(buttonData[i].label);

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

  newText.appendChild(content);
  newDiv.appendChild(newText);
  container.appendChild(newDiv);
}
