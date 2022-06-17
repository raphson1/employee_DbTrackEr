INSERT INTO departement(name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Security");


INSERT INTO role(title, Salary, departement_id) 
VALUES ("lead Engineer", 150000, 1),
       ("Software Engineer", 135000, 1),
       ("Account Manager", 120000, 2),
       ("Lawyer", 80000, 3),
       ("Legal Team Lead", 90000, 3),
       ("Security Lead", 70000, 4),
       ("Accountant", 70000, 2),
       ("Security", 65000, 4);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Eric", "Ruboneka", 1, 1),
       ("Jack", "Joe", 2, 1),
       ("Justin", "James", 4, 2),
       ("Lebon", "Ngabire", 3, 2),
       ("Abby", "Belicia", 5, 1),
       ("Betty", "Bea", 5, 5),
       ("Lambert", "Rugaju", 6, 3),
       ("Kaje", "Rosa", 8, 6);

