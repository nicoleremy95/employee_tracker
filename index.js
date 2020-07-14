const mysql = require("mysql");
const inquirer = require("inquirer")

const itemArray = [];

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "greatbay_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askUser();
  });

  function askUser(){
      inquirer.prompt(
        {
            type: "list",
            name: "userChoice",
            message: "what would yo like to do?",
            choices: ["View all Employees", "View by department", "View employees by manager", "Add employee", "Remove Employee", "Update Employee", "exit"]

        }
        ).then (function ({userChoice}){
            console.log(userChoice)
            switch(userChoice){
                default:
                    console.log("done for now")
                    break;
                case "View all Employees":
                    viewEmployees();
                    break;
                case "View by department":
                    viewByDept();
                    break;
                case "View employees by manager":
                    viewByManager();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
    })
  }

function viewEmployees(){
      console.log("view employees")
      askUser();
}

function viewByDept(){
    console.log("view employees by dept")
    askUser();
}

function viewByManager(){
        console.log("view employees by manager")
        askUser();
}

function addEmployee(){
    console.log("add employee")
    askUser();
}

function removeEmployee(){
    console.log("remove employees")
    askUser();
}

function updateEmployee(){
    console.log("update employees")
    askUser();
}