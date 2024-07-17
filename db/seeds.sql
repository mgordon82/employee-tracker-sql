DO $$
    BEGIN

    INSERT INTO department (name)
    VALUES ('HR'),
            ('IT'),
            ('Billing'),
            ('Payroll');

    INSERT INTO role (title, salary, department)
    VALUES ('Manager', 50000.00, 1),
            ('Developer', 85000.00, 2),
            ('VP', 250000, 3),
            ('CTO', 275000, 2),
            ('Associate', 30000, 4);
    
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
        ('Sam', 'Smith', 5, 1),
        ('Joe', 'Cool', 2, null),
        ('Sean', 'Strong', 4, null),
        ('Greg', 'Daniels', 1, null);

RAISE NOTICE 'Data loaded';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        ROLLBACK;
END $$;