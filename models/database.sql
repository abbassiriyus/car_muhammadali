


create table users(
   "id" serial primary key,
   "lastname" varchar(255) not null,
   "firstname" varchar(255) not null, 
   "phone" varchar(255) not null, 
   "email" varchar(255) not null, 
   "password" varchar(255) not null, 
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
  create table contact(
    "id" serial primary key,
    "lastname" varchar(255) not null,
    "firstname" varchar(255) not null, 
    "phone" varchar(255) not null, 
    "email" varchar(255) not null, 
    "password" varchar(255) not null, 
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null 
  );
  create table car(
  "id" serial primary key,
  "title"  varchar(255) not null,
  "image" text,
  "looking" integer default 0 not null,
  "listing_id" text,
  "price" integer not null,
  "year" integer not null,
  "make" varchar(255) not null,
  "model" varchar(255) not null,
  "interior_color" varchar(255) not null,
  "exterior_color" varchar(255) not null,
  "transmission" varchar(255) not null,
  "odometer" integer not null,
  "state" text,
  "subcategory" integer not null,
  "category" integer not null,
  "power_windows" boolean default false not null,
  "air_conditioning" boolean default false not null,
  "power_brakes" boolean default false not null,
  "engine_condition" varchar(255) not null,
  "location" varchar(255) not null,
  "description" text not null,
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null
  );

  create table car_image(
  "id" serial primary key,
  "car_id" integer not null,
  "image" text, 
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null 
  );

  create table category(
  "id" serial primary key,
  "title" varchar(255),
  "looking" integer default 0 not null,
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null 
  );

  create table subcategory(
  "id" serial primary key,
  "category_id" integer not null,
  "title" varchar(255),
  "looking" integer default 0 not null,
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null 
  );

CREATE TABLE favorite (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "car_id" varchar(255) NOT NULL,
  "time_create" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "time_update" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE ("user_id", "car_id")
);

ALTER SEQUENCE my_kitchen_id_seq OWNED BY my_kitchen.id;
GRANT USAGE, SELECT ON SEQUENCE my_kitchen_id_seq TO uzdubuz_id_rsa;









INSERT INTO category (titile) VALUES
  ('Toyota'), ('Honda'), ('Ford'), ('Volkswagen'), ('BMW'),
  ('Mercedes-Benz'), ('Audi'), ('Nissan'), ('Chevrolet'), ('Hyundai');


INSERT INTO subcategory (category_id, title) VALUES
  (1, 'Toyota Camry'), (1, 'Toyota Corolla'),
  (2, 'Honda Civic'), (2, 'Honda Accord'),
  (3, 'Ford Mustang'), (3, 'Ford F-150'),
  (4, 'Volkswagen Golf'), (4, 'Volkswagen Jetta'),
  (5, 'BMW 3 Series'), (5, 'BMW 5 Series'),
  (6, 'Mercedes-Benz C-Class'), (6, 'Mercedes-Benz E-Class'),
  (7, 'Audi A4'), (7, 'Audi A6'),
  (8, 'Nissan Altima'), (8, 'Nissan Rogue'),
  (9, 'Chevrolet Silverado'), (9, 'Chevrolet Malibu'),
  (10, 'Hyundai Sonata'), (10, 'Hyundai Tucson');




INSERT INTO subcategory (category_id, title) VALUES
  (1, 'Toyota RAV4'), (1, 'Toyota Highlander'), (1, 'Toyota Sienna'),
  (2, 'Honda CR-V'), (2, 'Honda Pilot'), (2, 'Honda Odyssey'),
  (3, 'Ford Escape'), (3, 'Ford Explorer'), (3, 'Ford Expedition'),
  (4, 'Volkswagen Tiguan'), (4, 'Volkswagen Atlas'), (4, 'Volkswagen Passat'),
  (5, 'BMW X5'), (5, 'BMW 7 Series'), (5, 'BMW Z4'),
  (6, 'Mercedes-Benz GLC'), (6, 'Mercedes-Benz S-Class'), (6, 'Mercedes-Benz GLE'),
  (7, 'Audi Q5'), (7, 'Audi A8'), (7, 'Audi R8'),
  (8, 'Nissan Murano'), (8, 'Nissan Pathfinder'), (8, 'Nissan Maxima'),
  (9, 'Chevrolet Equinox'), (9, 'Chevrolet Traverse'), (9, 'Chevrolet Tahoe'),
  (10, 'Hyundai Elantra'), (10, 'Hyundai Santa Fe'), (10, 'Hyundai Kona');






INSERT INTO car (
  title, image, looking, listing_id, price, year, make, model, 
  interior_color, exterior_color, transmission, odometer, state, 
  category,subcategory,power_windows, air_conditioning, power_brakes, 
  engine_condition, location, description
) VALUES
  (
    'Toyota Camry', 'https://cdn-images.motor.es/image/m/1320w.webp/fotos-noticias/2020/07/toyota-camry-2021-gama-usa-specs-oficial-202069160-1594812986_1.jpg', 25, 'ABC123', 25000, 2020, 'Toyota', 'Camry',
    'Black', 'Silver', 'Automatic', 50000, 'New York',1,1,true, true, true,'Excellent', 'New York, NY', 'This is a high-quality Toyota Camry with low mileage.'
  ),
  (
    'Honda Civic', 'https://i.pinimg.com/736x/a4/a5/4d/a4a54d8f5b1c09f597253982c076bf42.jpg', 30, 'DEF456', 22000, 2018, 'Honda', 'Civic',
    'Beige', 'Gray', 'Manual', 70000, 'California',2,3,
    true, true, true, 'Good', 'Los Angeles, CA', 'This Honda Civic is in great condition with a manual transmission.'
  ),
  (
    'Ford Mustang', 'https://cdn.motor1.com/images/mgl/J7EjQ/s1/electric-ford-mustang-by-charge-cars.jpg', 40, 'GHI789', 35000, 2021, 'Ford', 'Mustang',
    'Red', 'Black', 'Automatic', 20000, 'Florida',
    3,5,
    true, true, true, 'Excellent', 'Miami, FL', 'This Ford Mustang is a powerful and stylish sports car.'
  ),
  (
    'Volkswagen Golf', 'https://hips.hearstapps.com/hmg-prod/images/db2023au01469-65b171f5d572f.jpg', 28, 'JKL012', 18000, 2016, 'Volkswagen', 'Golf',
    'Gray', 'White', 'Manual', 90000, 'Illinois',
    4,7,
    true, true, true, 'Good', 'Chicago, IL', 'This Volkswagen Golf is a reliable and efficient compact car.'
  ),
  (
    'BMW 3 Series', 'https://cdn.motor1.com/images/mgl/174Wp/s1/2019-bmw-3-series.jpg', 35, 'MNO345', 40000, 2019, 'BMW', '3 Series',
    'Black', 'Blue', 'Automatic', 40000, 'Texas',
    5,9,
    true, true, true, 'Excellent', 'Houston, TX', 'This BMW 3 Series is a premium luxury sedan with great performance.'
  ),
  (
    'Mercedes-Benz C-Class', 'https://media.ed.edmunds-media.com/mercedes-benz/c-class/2024/oem/2024_mercedes-benz_c-class_sedan_amg-c-43_fq_oem_1_1280.jpg', 32, 'PQR678', 45000, 2020, 'Mercedes-Benz', 'C-Class',
    'Beige', 'Silver', 'Automatic', 30000, 'Georgia',6,11,
    true, true, true, 'Excellent', 'Atlanta, GA', 'This Mercedes-Benz C-Class is a high-end luxury sedan with a premium interior.'
  ),
  (
    'Audi A4', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Audi_A4_Avant_B9_IMG_1973.jpg/800px-Audi_A4_Avant_B9_IMG_1973.jpg', 38, 'STU901', 30000, 2017, 'Audi', 'A4',
    'Black', 'Gray', 'Automatic', 60000, 'Washington',7,13,
    true, true, true, 'Good', 'Seattle, WA', 'This Audi A4 is a well-equipped luxury sedan with a smooth ride.'
  ),
  (
    'Nissan Altima', 'https://hips.hearstapps.com/hmg-prod/images/2019-nissan-altima-12-source-1200x699-1562955653.jpg?crop=0.760xw:0.798xh;0.218xw,0&resize=980:*', 27, 'VWX234', 20000, 2015, 'Nissan', 'Altima',
    'Beige', 'White', 'Automatic', 80000, 'Ohio',
   8,15,
    true, true, true, 'Good', 'Columbus, OH', 'This Nissan Altima is a reliable and affordable midsize sedan.'
  ),
  (
    'Chevrolet Silverado', 'https://www.hsv.com.au/images/see/silverado/Silverado-2500HD-LTZ-Midnight-Edition-Black.jpg', 45, 'YZA567', 50000, 2022, 'Chevrolet', 'Silverado',
    'Gray', 'Black', 'Automatic', 10000, 'Arizona',
   9,17,
    true, true, true, 'Excellent', 'Phoenix, AZ', 'This Chevrolet Silverado is a rugged and capable full-size pickup truck.'
  ),
  (
    'Hyundai Sonata', 'https://autoreview.ru/images/Article/1758/Article_175878_860_575.jpg', 30, 'BCD890', 23000, 2019, 'Hyundai', 'Sonata',
    'Beige', 'Silver', 'Automatic', 40000, 'California',
   10,19,
    true, true, true, 'Excellent', 'San Diego, CA', 'This Hyundai Sonata is a stylish and well-equipped midsize sedan.'
  );