#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import { log } from "console";

const res = await inquirer.prompt({
  name: "userInput",
  type: "number",
  message: "Please enter the amount of seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter a number";
    } else if (input > 60 || input <= 0) {
      return "Seconds must be a positive number less than or equal to 60";
    } else {
      return true;
    }
  },
});

let input = res.userInput;

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val); //int = initial
  const intervalTime = new Date(intTime);
  
  const interval = setInterval(() => {
    const currTime = new Date();
    const diffTime = differenceInSeconds(intervalTime, currTime);

    if (diffTime <= 0) {
      console.log("Timer has expired");
      clearInterval(interval);
      process.exit();
    }

    const min = Math.floor(diffTime / 60);
    const sec = diffTime % 60;
    console.log(
      `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
}

//function call
startTime(input);

