#!/usr/bin/env node
//this is the shebang syntax for node
//i am saying that whenever someone runs this code, it must be run within the javascript environment

let helpFn = require("./commands/help");
let organizeFn = require("./commands/organize");
let viewFn = require("./commands/view")

//from third item we need to make the array
let input = process.argv.slice(2);

//menu selected
let command = input[0];

switch(command){
    case "view":
        viewFn.view(input[1],input[2]);
        break;
    case "organize":
        organizeFn.organize(input[1],input[2]);
        break;
    default:
        //help
        helpFn.help();
        break;
}