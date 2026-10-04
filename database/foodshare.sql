CREATE DATABASE IF NOT EXISTS foodshare;
USE foodshare;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT, full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, phone VARCHAR(20), password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, location VARCHAR(150), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS donations (
    id INT PRIMARY KEY AUTO_INCREMENT, donor_id INT NOT NULL, food_name VARCHAR(100) NOT NULL,
    description VARCHAR(500), quantity INT NOT NULL, location VARCHAR(150) NOT NULL,
    pickup_date DATE, pickup_time TIME, status VARCHAR(30) DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS requests (
    id INT PRIMARY KEY AUTO_INCREMENT, donation_id INT NOT NULL, ngo_id INT NOT NULL,
    quantity INT NOT NULL, status VARCHAR(30) DEFAULT 'PENDING', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donation_id) REFERENCES donations(id), FOREIGN KEY (ngo_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS deliveries (
    id INT PRIMARY KEY AUTO_INCREMENT, request_id INT NOT NULL, volunteer_id INT,
    status VARCHAR(30) DEFAULT 'ASSIGNED', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(id), FOREIGN KEY (volunteer_id) REFERENCES users(id)
);

-- JPA keeps these tables in sync on backend startup (spring.jpa.hibernate.ddl-auto=update).
-- Demo passwords are BCrypt hashes of the word password; users can also register through the UI.
-- To add more demo users safely, register them through the app so Spring generates each BCrypt password hash.
INSERT IGNORE INTO users (id, full_name, email, phone, password, role, location) VALUES
(1,'Ananya Rao','donor1@foodshare.com','9000000001','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','DONOR','Hyderabad'),
(2,'Ravi Kumar','donor2@foodshare.com','9000000002','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','DONOR','Secunderabad'),
(3,'Meera Shah','donor3@foodshare.com','9000000003','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','DONOR','Kondapur'),
(4,'Hope NGO','ngo1@foodshare.com','9000000004','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','NGO','Hyderabad'),
(5,'Care Foundation','ngo2@foodshare.com','9000000005','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','NGO','Madhapur'),
(6,'Community Kitchen','ngo3@foodshare.com','9000000006','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','NGO','Begumpet'),
(7,'Arjun Volunteer','volunteer1@foodshare.com','9000000007','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','VOLUNTEER','Hyderabad'),
(8,'Sara Volunteer','volunteer2@foodshare.com','9000000008','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','VOLUNTEER','Secunderabad'),
(9,'Dev Volunteer','volunteer3@foodshare.com','9000000009','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','VOLUNTEER','Kondapur'),
(10,'FoodShare Admin','admin@foodshare.com','9000000010','$2a$10$i5cKv8OXCONVj295t.RiR.BOiAtKlLXlIJ8VieEdpwnmU6fhHyS/y','ADMIN','Hyderabad');

INSERT IGNORE INTO donations (id, donor_id, food_name, description, quantity, location, pickup_date, pickup_time, status) VALUES
(1,1,'Vegetable Biryani','Freshly prepared vegetarian meals',20,'Hyderabad',CURDATE(),'19:00:00','AVAILABLE'),
(2,2,'Fresh Bread','Packaged loaves baked today',12,'Secunderabad',CURDATE(),'18:00:00','AVAILABLE'),
(3,3,'Fruit Boxes','Seasonal fruit boxes',8,'Kondapur',DATE_ADD(CURDATE(), INTERVAL 1 DAY),'10:00:00','AVAILABLE');
