const mysql = require("mysql");
const inquirer = require("inquirer")


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employees_db"
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
            choices: ["ADD DEPARTMENT", "ADD ROLE", "ADD EMPLOYEE", "VIEW DEPARTMENTS", "VIEW ROLES", "VIEW EMPLOYEES", "UPDATE EMPLOYEE ROLES", "EXIT"]

        }
        ).then (function ({userChoice}){
            console.log(userChoice)
            switch(userChoice){
                default:
                    console.log("done for now")
                    break;
                case "ADD DEPARTMENT":
                    addDepartment();
                    break;
                case "ADD ROLE":
                    addRole();
                    break;
                case "ADD EMPLOYEE":
                    addEmployee();
                    break;
                case "VIEW DEPARTMENTS":
                    viewDepartment();
                    break;
                case "VIEW ROLES":
                    viewRoles();
                    break;
                case "VIEW EMPLOYEES":
                    viewEmployees();
                    break;
                case "UPDATE EMPLOYEE ROLES":
                    updateEmployee();
                    break;
                case "EXIT":
                    connection.end();
                    break;
            }
    })
  }

function addDepartment(){
      inquirer.prompt([
          {
                type: "input",
                name: "departmentName",
                message: "What is the name of the department you would like to add?"
          }
      ]).then(answer=>{
          connection.query(
            "INSERT INTO departments SET ?",
            {
                name: answer.departmentName,
            }
          ) 
          askUser();
      }) 
}

function addRole(){
    console.log("add role")
    askUser();
}

function addEmployee(){
        console.log("add employee")
        askUser();
}

function viewDepartment(){
    console.log("view dept")
    askUser();
}

function viewRoles(){
    console.log("view roles")
    askUser();
}

function viewEmployees(){
    console.log("view employees")
    askUser();
}

function updateEmployee(){
    console.log("update employees")
    askUser();
}