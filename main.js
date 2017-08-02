const buttonData = [
  {"name": "clear", "label": "C"},
  {"name": "display", "label": "0"},
  {"name": "power", "label": "xy"},
  {"name": "sqaure", "label": "x2"},
  {"name": "sqrt", "label": "sqrt"},
  {"name": "mod", "label": "mod"},
  {"name": "seven", "label": "7"},
  {"name": "eight", "label": "8"},
  {"name": "nine", "label": "9"},
  {"name": "divide", "label": "/"},
  {"name": "four", "label": "4"},
  {"name": "five", "label": "5"},
  {"name": "six", "label": "6"},
  {"name": "multiply", "label": "x"},
  {"name": "one", "label": "1"},
  {"name": "two", "label": "2"},
  {"name": "three", "label": "3"},
  {"name": "subtract", "label": "-"},
  {"name": "zero", "label": "0"},
  {"name": "decimal", "label": "."},
  {"name": "equals", "label": "="},
  {"name": "add", "label": "+"}
];

console.log(buttonData.length);
for (let i = 0; i < buttonData.length; i++) {
  console.log(buttonData[i].name + " " + buttonData[i].label);
}

let container = document.getElementById("calculator-body");

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

  newText.appendChild(content);
  newDiv.appendChild(newText);
  container.appendChild(newDiv);
}
