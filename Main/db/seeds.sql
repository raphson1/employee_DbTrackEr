INSERT INTO departement(id, name)
VALUES (4, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (9, "Security");


INSERT INTO role(id, title, Salary, departement_id) 
VALUES (1, "lead Engineer", 150000, 4),
       (6, "Software Engineer", 135000, 4),
       (10, "Account Manager", 120000, 2),
       (13, "Lawyer", 80000, 3),
       (15, "Legal Team Lead", 90000, 3),
       (18, "Security Lead", 70000, 9),
       (23, "Accountant", 70000, 2),
       (34, "Security", 65000, 9);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Eric", "Ruboneka", 1),
       (2, "Jack", "Joe", 13, 1),
       (3, "Justin", "James", 6, 2),
       (4, "Lebon", "Ngabire", 10, 2),
       (5, "Abby", "Belicia", 15);

