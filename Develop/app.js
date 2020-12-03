const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


var employeesArr = [] // Empty array that will save all team members 

function initialQuestions() {

    var roleChoices = []
    roleChoices.push("Add Intern");
    roleChoices.push("Add Engineer")
    roleChoices.push("Add Manager");
    roleChoices.push("I'm Finished");

    inquirer.prompt([{
        message: "What Employee would you like to add?",
        name: "role",
        type: "list",
        choices: roleChoices
    }])
        .then(function (answers) {
            switch (answers.role) {
                case "Add Manager": {
                    managerQuestions();
                    break;
                }
                case "Add Engineer": {
                    engineerQuestions();
                    break;
                }
                case "Add Intern": {
                    internQuestions();
                    break;
                }
                case "I'm Finished": {
                    fs.writeFile(outputPath, render(employeesArr), function (err) {

                        if (err) {
                            
                        }
        
                        // console.log("Success!");
                    })
                    break;
                }
            }
        })
}

//Inquirer prompts to gather user input - worked with Benjamin Dionysus, Matt Hiatt, and Steve Kavuu on structure
function managerQuestions() {
    inquirer.prompt(
        [{

            message: "Name:",
            name: "name",
            type: 'input',
        },
        {

            message: "Role:",
            name: "role",
            type: 'input',

        },
        {
            message: "Email:",
            name: "email",
            type: 'input',
        },
        {
            message: "ID:",
            name: "id",
            type: 'input',
        },
        {
            message: "Office Number:",
            name: "officeNumber",
            type: 'input',
        },
       ])
        .then(function (answers) {
            employeesArr.push(new Manager(answers.name, employeesArr.length, answers.email, answers.officeNumber));
            initialQuestions();
        });
}

function engineerQuestions() {
    inquirer.prompt(
        [{

            message: "Name:",
            name: "name",
            type: 'input',
        },
        {
            message: "Role:",
            name: "role",
            type: 'input',
        },
        {
            message: "Email:",
            name: "email",
            type: 'input',
        },
        {
            message: "ID:",
            name: "id",
            type: 'input',
        },
        {
            message: "GitHub Username:",
            name: "github",
            type: 'input',
        }
        ])
        .then(function (answers) {
            employeesArr.push(new Engineer(answers.name, employeesArr.length, answers.email, answers.github));
            initialQuestions();
        });
}

function internQuestions() {
    inquirer.prompt(
        [{

            message: "Name:",
            name: "name",
            type: 'input',
        },
        {
            message: "Role:",
            name: "role",
            type: 'input',
        },
        {
            message: "Email:",
            name: "email",
            type: 'input',
        },
        {
            message: "ID:",
            name: "id",
            type: 'input',
        },
        {
            message: "School:",
            name: "school",
            type: 'input',
        }])
        .then(function (answers) {
            employeesArr.push(new Intern(answers.name, employeesArr.length, answers.email, answers.school));
            initialQuestions();
            
        });
}

initialQuestions();




