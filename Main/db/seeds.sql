INSERT INTO departement(id, name)
VALUES (1, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (4, "Security");


INSERT INTO role(id, title, Salary, departement_id) 
VALUES (1, "lead Engineer", 150000, 1),
       (2, "Software Engineer", 135000, 1),
       (3, "Account Manager", 120000, 2),
       (4, "Lawyer", 80000, 3),
       (5, "Legal Team Lead", 90000, 3),
       (6, "Security Lead", 70000, 4),
       (7, "Accountant", 70000, 2),
       (8, "Security", 65000, 4);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Eric", "Ruboneka", 1, 1),
       (2, "Jack", "Joe", 2, 1),
       (3, "Justin", "James", 4, 2),
       (4, "Lebon", "Ngabire", 3, 2),
       (5, "Abby", "Belicia", 5, 1),
       (6, "Betty", "Bea", 5, 5),
       (7, "Lambert", "Rugaju", 6, 3),
       (8, "Kaje", "Rosa", 8, 6);

