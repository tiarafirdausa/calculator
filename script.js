const calculatorScreen = document.querySelector(".calculator-screen");

const updateScreen = (number) => {
  calculatorScreen.value = number;
};

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

//fugsi inputNumber akan mengambil nilai number
const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(prevNumber + calculationOperator + currentNumber);
  });
});

//fungsi inputOperator akan mengambil nilai operator
const inputOperator = (operator) => {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = "0";
};

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    const { value } = event.target;
    inputOperator(value);
    updateScreen(prevNumber + value);
  });
});

//fungsi calculate akan menghitung hasil dari operasi yang diinputkan
const calculate = () => {
  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currentNumber);
      break;
    case "x":
      result = parseFloat(prevNumber) * parseFloat(currentNumber);
      break;
    case "÷":
      result = parseFloat(prevNumber) / parseFloat(currentNumber);
      break;
    default:
      break;
  }
  currentNumber = result;
  calculationOperator = "";
};

//fungsi equalSign akan memanggil fungsi calculate dan updateScreen
const equalSign = document.querySelector(".equal-sign");
equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
});

//fungsi clearAll akan menghapus semua data yang ada
const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
};

const clearBtn = document.querySelector(".all-clear");
clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
});

//fungsi inputDecimal akan menambahkan titik pada angka
const inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(prevNumber + calculationOperator + currentNumber);
});

//fungsi percentage akan mengubah angka menjadi persen
const percentage = document.querySelector(".percentage");
percentage.addEventListener("click", () => {
  if (currentNumber !== "0") {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
  }
  updateScreen(prevNumber + calculationOperator + currentNumber);
});

//fungsi inputPlusmin akan mengubah angka menjadi positif atau negatif
const inputPlusmin = () => {
  if (currentNumber !== "0") {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
  }
};

const plusMinus = document.querySelector(".plusmin");
plusMinus.addEventListener("click", () => {
  inputPlusmin();
  updateScreen(prevNumber + calculationOperator + currentNumber);
});

//fungsi deleteLastCharacter akan menghapus karakter terakhir
const deleteLastCharacter = () => {
  if (currentNumber.length > 0 && currentNumber !== "0") {
    currentNumber = currentNumber.slice(0, -1);
    if (currentNumber === "" || currentNumber === "-") {
      currentNumber = "0";
    }
  } else if (calculationOperator !== "") {
    calculationOperator = "";
  } else if (prevNumber !== "") {
    prevNumber = prevNumber.slice(0, -1);
  }
};

const deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
  deleteLastCharacter();
  updateScreen(prevNumber + calculationOperator + currentNumber);
});
