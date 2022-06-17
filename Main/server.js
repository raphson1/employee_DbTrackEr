const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Gafunzi29!',
        database: 'employee_db'
    },
);
db.connect(function(){
    editDb();
    console.log('server connected to the databases')
})

function editDb(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: [
                    'view all departments',
                    'view role',
                    'view all employies',
                    'add a department',                 
                    'add a role',
                    'add employee', 
                    'update employee role'
                    ]
        }
    ])
    .then(response => {
        if(response.selection === 'view all departments'){
            viewDepartment()
        } else if (response.selection === 'view role'){
            viewRole()
        } else if (response.selection === 'view all employies'){
            viewAllEmployies()
        } else if (response.selection === 'add a department'){
            addDepartment()
        } else if (response.selection === 'add a role'){
            addRole()
        } else if (response.selection === 'add employee'){
            addEmployee()
        } else if (response.selection === 'update employee role'){
            updateEmployeRole()
        }
    }).catch(err => {
        console.log(err)
    });
};

function viewDepartment(){
    db.query('SELECT * FROM departement', function(err, result){
        console.table(result);
        editDb()
    });
};

function viewRole(){
    db.query('SELECT * FROM role', function(err, result){
        console.table(result)
        editDb()
    })
};

function viewAllEmployies(){
    db.query(`SELECT employee.id, employee.first_name AS first_name, employee.last_name AS last_name,
            role.title AS title, role.Salary AS salary
            FROM employee LEFT JOIN role ON employee.role_id = role.id;`, function(err, result){
                console.table(result)
                editDb()
            })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Which departement do you want to add?"
        }
    ]).then(response => {
        db.query('INSERT INTO departement (name) VALUES(?)',[response.name], function(err, result){
            viewDepartment()
        })
    }) 
};

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role you like to add?" 
        },
        {
            type: "input",
            name: "salary",
            message: "how much will be the salary for this new role?"
        },
        {
            type: "input",
            name: "selection",
            message: "Which department?",   
        }
    ]).then(response => {
        db.query('INSERT INTO role (title, Salary, departement_id) VALUES(?,?,?)',
        [response.title, response.salary, response.selection], function(err, result){
            viewRole()
        })
    }) 
};

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the First name of the employee"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the last name of the employee"
        },
        {
            type: "input",
            name: "role",
            message: "which is your role?",
        },
        {
            type: "input",
            name: "manager",
            message: "who is your manager",
           
        }
    ]).then(response => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)',
        [response.firstName, response.lastName, response.role, response.manager], function(err, result){
            viewAllEmployies()
        })
    })
};
