const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { clearLine } = require("inquirer/lib/utils/readline");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gafunzi29!",
  database: "employee_db",
});
db.connect(function () {
  editDb();
  console.log("server connected to the databases");
});

function editDb() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view role",
          "view all employees",
          "add a department",
          "add a role",
          "add employee",
          "update employee role",
        ],
      },
    ])
    .then((response) => {
      if (response.selection === "view all departments") {
        viewDepartment();
      } else if (response.selection === "view role") {
        viewRole();
      } else if (response.selection === "view all employees") {
        viewAllEmployees();
      } else if (response.selection === "add a department") {
        addDepartment();
      } else if (response.selection === "add a role") {
        addRole();
      } else if (response.selection === "add employee") {
        addEmployee();
      } else if (response.selection === "update employee role") {
        updateEmployeRole();
      } else if (response.selection === "update employee role") {
        updateEmployeRole()
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function viewDepartment() {
  db.query("SELECT * FROM departement", function (err, result) {
    console.table(result);
    editDb();
  });
}

function viewRole() {
  db.query("SELECT * FROM role", function (err, result) {
    console.table(result);
    editDb();
  });
}

function viewAllEmployees() {
  db.query(
    `SELECT employee.id, employee.first_name AS first_name, employee.last_name AS last_name,
            role.title AS title, role.Salary AS salary, name AS department
            FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN departement ON role.departement_id = departement.id;`,
    function (err, result) {
      console.table(result);
      editDb();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Which departement do you want to add?",
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO departement (name) VALUES(?)",
        [response.name],
        function (err, result) {
          viewDepartment();
        }
      );
    });
}

function addRole() {
  db.query(
    "SELECT name, id AS value FROM departement",
    function (err, data_department) {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "What is the new Title?",
          },
          {
            type: "input",
            name: "salary",
            message: "how much will be the salary for this new role?",
          },
          {
            type: "list",
            name: "selection",
            message: "Which department?",
            choices: data_department
          },
        ])
        .then((response) => {
          db.query(
            "INSERT INTO role (title, Salary, departement_id) VALUES(?,?,?)",
            [response.title, response.salary, response.selection],
            function (err, result) {
              viewRole();
            }
          );
        });
    }
  );
}

function addEmployee() {
  db.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee",
    function (err, data) {
      db.query(
        "SELECT title AS name, id AS value FROM role",
        function (err, role_data) {
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter the First name of the employee",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter the last name of the employee",
              },
              {
                type: "list",
                name: "role",
                message: "which is your role?",
                choices: role_data,
              },
              {
                type: "list",
                name: "manager",
                message: "who is your manager",
                choices: data,
              },
            ])
            .then((response) => {
              db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
                [
                  response.firstName,
                  response.lastName,
                  response.role,
                  response.manager,
                ],
                function (err, result) {
                  viewAllEmployees();
                }
              );
            });
        }
      );
    }
  );
};

function updateEmployeRole(){
    db.query("SELECT CONCAT (first_name, ' ', last_name) AS name, id AS value FROM employee", function(err, data){
        db.query("SELECT title, title AS value FROM  role", function(err, role){
          
          inquirer.prompt([
            {
              type: "list",
              name: "selection",
              message: "Which Employee would you like to update?",
              choices: data
            },
            {
              type: "list",
              name: "role",
              message: "which role do you want to give this employee?",
              choices: role
            }
          ]).then(response => {
            db.query("UPDATE employee SET role_id = ? WHERE id = ? VALUES(?, ?)",[response.role, response.selection], function(err, result){
              viewAllEmployees()
            })
          })
      })

    })

}
