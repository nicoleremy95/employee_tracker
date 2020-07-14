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
    inquirer.prompt([
        {
              type: "input",
              name: "roleTitle",
              message: "What is the name of the role you would like to add?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role?"
        },
        {
            type: "input",
            name: "departmentId",
            message: "what is the department id for this role?"
        }
    ]).then(answers=>{
        connection.query(
          "INSERT INTO roles SET ?",
          {
              title: answers.roleTitle,
              salary: answers.salary,
              department_id: answers.departmentId
          }
        ) 
        askUser();
    }) 
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the employee you would like to add?"
        },
        {
            type: "input",
            name: "roleId",
            message: "what is the role ID for this employee?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager ID for this employee?"
        }
    ]).then(answers=>{
        connection.query(
          "INSERT INTO employees SET ?",
          {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.roleId,
              manager_id: answers.managerId
          }
        ) 
        askUser();
    }) 
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