const add = (number1, number2) => number1 + number2;
const sub = (number1, number2) => number1 - number2;
const equal = (number1, number2) => number1 === number2;
const lessThan = (number1, number2) => number1 < number2;

const jump = function (sprintCode, location) {
  location = sprintCode[location + 1];
  return [sprintCode[location], location];
};

const copy = function (sprintCode, location) {
  const sourceCell = sprintCode[location + 1];
  const destination = sprintCode[location + 2];
  sprintCode[destination] = sprintCode[sourceCell];
  location += 3;

  return [sprintCode[location], location];
};

const getNumber = function (sprintCode, location) {
  return sprintCode[location];
};

const lessThanOrEqual = function (sprintCode, location, operation) {
  const number1 = getNumber(sprintCode, sprintCode[location + 1]);
  const number2 = getNumber(sprintCode, sprintCode[location + 2]);
  const destination = sprintCode[location + 3];
  const res = operation(number1, number2);
  location = res ? sprintCode[destination] : location + 4;

  return [sprintCode[location], location];
};

const addSub = function (sprintCode, location, operation) {
  const number1 = getNumber(sprintCode, sprintCode[location + 1]);
  const number2 = getNumber(sprintCode, sprintCode[location + 2]);
  const result = sprintCode[location + 3];
  sprintCode[result] = operation(number1, number2);

  return [sprintCode[location + 4], location + 4];
};

const addition = (sprintCode, location) => {
  return addSub(sprintCode, location, add);
};

const substraction = (sprintCode, location) => {
  return addSub(sprintCode, location, sub);
};

const jumpIfEqual = (sprintCode, location) => {
  return lessThanOrEqual(sprintCode, location, equal);
};

const jumpIfLessThan = (sprintCode, location) => {
  return lessThanOrEqual(sprintCode, location, lessThan);
};

const getFinalCode = function (sprintCode) {
  return "After Execution " + sprintCode.join(" ");
};

const runInstructions = function (sprintCode, instruction, pos) {
  const commands = {
    3: jump,
    7: copy,
    1: addition,
    2: substraction,
    4: jumpIfEqual,
    5: jumpIfLessThan,
  };
  while (instruction !== 9) {
    if (!(instruction in commands)) {
      return `${instruction} command not found`;
    }

    [instruction, pos] = commands[instruction](sprintCode, pos);
  }

  return getFinalCode(sprintCode);
};

const getSprintCode = function () {
  const spacesCode = prompt("Enter Sprint Code");
  const sprintCode = spacesCode.split(" ").map((element) => +element);
  sprintCode.unshift(" ");

  return sprintCode;
};

const startSprint = function () {
  const code = getSprintCode();
  return runInstructions(code, code[1], 1);
};

console.log(startSprint());
