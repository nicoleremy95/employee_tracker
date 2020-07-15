const mysql = require("mysql");
const inquirer = require("inquirer")
const queries = require("./lib/queries.js")

 


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
    connection.query("SELECT * FROM departments", function(err,res){
        if (err) throw err;

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
                type: "list",
                name: "departmentId",
                message: "which department?",
                choices: function(){
                    let choiceArray = [];
                    for (let i =0; i<res.length; i++){
                        choiceArray.push(res[i].name)
                    }
                    return choiceArray;
                }
            }
        ]).then(answers=>{
            console.log(answers)
            connection.query(
              "INSERT INTO roles SET ?",
              {
                  title: answers.roleTitle,
                  salary: answers.salary,
                  department_id: answers.departmentId
                //   department_id: connection.query("SELECT id FROM department WHERE name = ?", [answers.department_id], function(err,res){
                //       if (err) throw err; 
                //       return res
                //   }
                //   )
                
              }, function (err, res){
                  if (err) throw err;
                  console.table(res)
                  askUser();
              }
            ) 
            
        }) 
    })
    
}

function addEmployee(){
    connection.query("SELECT title, COUNT(title) FROM employees_db.roles GROUP BY title HAVING COUNT(title)>1", function(err,res){
        if (err) throw err;

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
                type: "list",
                name: "roleId",
                message: "what is the role  for this employee?",
                choices: function(){
                    let choiceArrayEmp = [];
                        for (let i =0; i<res.length; i++){
                            choiceArrayEmp.push(res[i].title)
                        }
                        return choiceArrayEmp;
                }
            }
        ]).then(answers=>{
            connection.query(
                
                "INSERT INTO employees SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleId,
                    // manager_id: answers.managerId
                }, function (err,res){
                    if (err) throw err; 
                    console.table(res)
                    askUser();
                }
            ) 
        } )
    })
}   

function viewDepartment(){
    connection.query(
       "SELECT * FROM departments", function (err, res){
           if (err) throw err;
           console.log("==============================")
           console.table(res)
           console.log("==============================")
           askUser();
       }
    )
    
}

function viewRoles(){
    connection.query(
        "SELECT roles.title, roles.salary, roles.department_id, departments.name FROM roles INNER JOIN departments ON roles.department_id = departments.id", function(err, res){
            if (err) throw err;
            console.log("==============================")
            console.table(res)
            console.log("==============================")
            askUser();
        }
     )
}

function viewEmployees(){
    connection.query(
        "SELECT employees.first_name, employees.last_name, employees.role_id, roles.title, roles.salary, roles.department_id, departments.name FROM departments INNER JOIN roles ON roles.department_id = departments.id INNER JOIN employees ON employees.role_id = roles.id;", function(err,res){
            if (err) throw err;
            console.log("==============================")
            console.table(res)
            console.log("==============================")
            askUser();
        }
     ) 
     
}

 function updateEmployee(){
    connection.query(
        "SELECT * FROM employees", function (err, res){
            if (err) throw err;
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeName",
                    message: "which employee would you like to update?",
                    choices: function (){
                        let choiceArray = [];
                        for (i=0; i<res.length; i++){
                            choiceArray.push(res[i].first_name)
                        }
                        return choiceArray;
                    }
                }
                
            ]).then(function ({employeeName}){
                console.log(employeeName)
                
                connection.query(
                    "SELECT title, COUNT(title) FROM employees_db.roles GROUP BY title HAVING COUNT(title)>1", function(err, res){
                        if (err) throw err;
                        inquirer.prompt([
                            
                            {
                                type: "list",
                                name: "employeeRole",
                                message: "which role?",
                                choices: function(){
                                    let choiceArrayRole = [];
                                    for (let i =0; i<res.length; i++){
                                        choiceArrayRole.push(res[i].title)
                                    }
                                    return choiceArrayRole;
                                }
                            }
                            
                        ]).then(function({employeeRole}){
                            console.log(employeeRole)
                            //TODO: create an UPDATE query based on employeeName and employeeRole
                            connection.query("UPDATE employees SET last_name = ? WHERE first_name = ?", [employeeRole, employeeName], function(err, res){
                                if (err) throw err;
                                console.table(res)
                            })
                        })
                    }
                )
            })
        }
       
        
    )
    
     
}