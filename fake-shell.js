let runningPrompt = "meenugamadhavi@Meenugas-MacBook-Pro ";

const changeDirectory = function (args) {
  const path = args.toString().split("/");
  const currentDirectory = path.at(-1);
  return currentDirectory;
}

const echo = function (args) {
  console.log(args.join(""));
  return "";
}

const runCommond = function (string) {
  const [command, ...args] = string.split(" ");

  switch (command) {
    case "cd": return changeDirectory(args);
    case "echo": return echo(args);
  }
}
console.log("hello")

let prompt2 = runningPrompt + " %";

while (true) {
  const command = prompt(prompt2);
  prompt2 = runningPrompt + runCommond(command) + " %";
}
