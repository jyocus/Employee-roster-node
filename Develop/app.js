const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

var employeesArr = [] // Empty array that will save all team members 

//Inquirer prompts to gather user input - worked with Benjamin Dionysus, Matt Hiatt, and Steve Kavuu on structure
function managerQuestions() {
    inquirer.prompt(
        [{

            message: "Name:",
            name: "name:",
            type: 'input',
        },
        {
            message: "Office Number:",
            name: "officeNumber",
            type: 'input',
        },
        {
            message: "Email:",
            name: "email",
            type: 'input',
        }])
        .then(function (answers) {
            employeesArr.push(new Manager(answers.name, employeesArr.length, answers.email, answers.officeNumber));
            initialQuestions();
        });

    function engineerQuestions() {
        inquirer.prompt(
            [{

                message: "Name:",
                name: "name",
                type: 'input',
            },
            {
                message: "GitHub Username:",
                name: "github",
                type: 'input',
            },
            {
                message: "Email:",
                name: "email",
                type: 'input',
            }])
            .then(function (answers) {
                employeesArr.push(new Engineer(answers.name, employeesArr.length, answers.email, answers.github));
                initialQuestions();
            });

        function internQuestions() {
            inquirer.prompt(
                [{

                    message: "Name:",
                    name: "name:",
                    type: 'input',
                },
                {
                    message: "Name of school:",
                    name: "school",
                    type: 'input',
                },
                {
                    message: "Email:",
                    name: "email",
                    type: 'input',
                }])
                .then(function (answers) {
                    employeesArr.push(new Intern(answers.name, employeesArr.length, answers.email, answers.school));
                    initialQuestions();
                    console.log(answers);
                });

    // function to initialize program
    function init() {
        inquirer
        .prompt(initialQuestions)
        .then(function (answers) {
            console.log(response);
            // function to write html file
            fs.writeFile(outputPath,render(employeesArr), function (err) {
    
                if (err) {
                    return console.log(err);
                }
    
                // console.log("Success!");
            })
        })
    }
    
    // function call to initialize program
    init();
        }

function initialQuestions () {

    var roleChoices=[]
    roleChoices.push("Add an Intern");
    roleChoices.push("Add an Engineer")
    roleChoices.push("add a Manager");

    inquirer.prompt([{
        message:"What Employee would you like to add?",
        name: "role",
        type: "list",
        choices: roleChoices
    }])
    .then(function(answers){
        switch(answers.role){
            case "Add Manager": {
                managerQuestions();
                break;
            }
            case "Add Engineer":{
                engineerQuestions();
                break;
            }
            case "Add Intern":{
                internQuestions();
            }
        }
    })
}
    }
}

