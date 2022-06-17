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
    console.log('server connected to the databases')
);

function editDb(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you want to do?',
            choices: ['view all departments', 'add a department', 'add a role','add an employee', 'update an employee role']
        }
    ])
    .then(response => {
        if(response.selection === 'view all departments'){
            db.query('SELECT * FROM departement', function(err, result){
                console.log(result);
            });
        } else if (response.selection === 'add a department'){
            
            addDeprtment()
        } else if (response.selection === 'add a role'){
            addRole()
        } else if (response.selection === 'add an employee'){
            addEmployee()
        }
    }).catch(err => {
        console.log(err)
    });

}

editDb()



