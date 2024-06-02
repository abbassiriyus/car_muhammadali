


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









INSERT INTO category (title) VALUES
  ('Toyota'), ('Honda'), ('Ford'), ('Volkswagen'), ('BMW'),
  ('Mercedes-Benz'), ('Audi'), ('Nissan'), ('Chevrolet'), ('Hyundai');



INSERT INTO car_image (image,car_id) VALUES
  ('https://www.automoblog.com/wp-content/uploads/2020/02/01-2021-Honda-Civic-Type-R-Limited-Edition.jpg',1),
  ('https://cdn.motor1.com/images/mgl/B7eBA/s1/2021-honda-civic-type-r-limited-edition-exterior-front-quarter.jpg',1),
  ('https://www.hondacarmine.ru/images/text/729.jpg',1),
  ('https://images.cars.com/cldstatic/wp-content/uploads/510581268-1425511299511.jpeg',2),
  ('https://img.supercarros.com/AdsPhotos/1024x768/0/11504103.jpg?wmo=c86d9d83ec8d5d3d5e3e0bb3e504071a0a9456cf646fa39bcdd8825046d24ada8dd583e665b099ad649f026515bb54a205774d71c0a06062c10d74ee018987e0',2),
  ('https://www.allcarz.ru/wp-content/uploads/2016/11/foto-mustang-6-fl_12.jpg',2),
  ('https://autopremiumgroup.ru/m/_versions/info/ford/mustang/2020/18_preview_image.jpg',2),
  ('https://images.prismic.io/carwow/2b4b884f-fa2b-40e2-9182-2d2c9450ac5b_37018-ThenewVolkswagenGolfeHybrid.jpg?auto=format&cs=tinysrgb&fit=crop&q=60&w=750',3),
  ('https://repost.uz/storage/uploads/979-1696967394-avto11-post-material.jpeg',3),
  ('https://mediacloud.carbuyer.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1605613521/carbuyer/2020/11/Volkswagen%20Golf%20GTI%20hatchback%20review%202020%20carbuyer%20-14.jpg',3),
  ('https://www.auto-mgn.ru/resources/images/upload/00052352374e94938257_990x0_C.jpg',3),
  ('https://s.auto.drom.ru/i24203/c/photos/fullsize/volkswagen/golf/volkswagen_golf_652589.jpg',3),
  ('https://img-c.drive.ru/models.photos/0000/000/000/001/451/48d6600d18e9571a-large.jpg',4),
  ('https://www.bmw.uz/content/dam/bmw/common/all-models/3-series/sedan/2018/navigation/bmw-3-series-modellfinder.png',4),
  ('https://m.atcdn.co.uk/vms/media/w612/f80f238753dd41af898e6f87f94ec855.jpg',4),
  ('https://avatars.dzeninfra.ru/get-zen_doc/198554/pub_5bc0b09f38a33e00a9f7c4ff_5bc0b0a4cf1f9400abd50a10/scale_1200',4),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUP4F5Wqr7wq9-wy5jBYpmN5Qi_nwdo940FQ&s',5),
  ('https://mercedes-tashkent.uz/sites/default/files/video/c-class-sedan.jpg',5),
  ('https://s0.rbk.ru/v6_top_pics/media/img/8/94/754788638961948.jpeg',5),
  ('https://img.mercedes-benz-kiev.com/data/lineup/c-class-limousine/c-class-limousine-5.jpeg',5),
  ('https://www.audicentrebrighton.com.au/content/dam/iph/international/au/general_assets/Models/A4/A4_Sedan/Stage/1920x600-A4-sedan-mirror-hero-image.png/_jcr_content/renditions/cq5dam.thumbnail.640.360.iph.hero.png?imwidth=320&imdensity=1',6),
  ('https://carexpert.ru/img/int1200/audi4i19-04.jpg',6),
  ('https://carexpert.ru/img/int1200/audi4i19-05.jpg',6),
  ('https://media.ed.edmunds-media.com/for-sale/cb-1n4al3ap2gc289972/img-1-600x263.jpg',7),
  ('https://cimg3.ibsrv.net/ibimg/hgm/2000x1125-1/100/552/2016-nissan-altima-2-5-sl_100552023.jpg',7),
  ('https://cars.usnews.com/pics/size/390x290/images/Auto/izmo/i2314279/2016_nissan_altima_dashboard.jpg',7),
  ('https://cdn.jdpower.com/JDPA_2020%20Chevrolet%20Silverado%201500%20LT%20Trail%20Boss%20Black%20Front%20View%20Small.jpg',8),
  ('https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2024/trucks/silverado-ld-1500/mov/2024-silverado-specialeditions-03.jpg?imwidth=960',8),
  ('https://specialtyvehicleengineering.com/wp-content/uploads/2022/07/2023_silverado_small_1.jpg',8),
  ('https://www.allcarz.ru/wp-content/uploads/2017/12/foto-silverado-4_12.jpg',8),
  ('https://autopremiumgroup.ru/m/_versions/info/chevrolet/silverado_2500_hd/2021/features/6_banner.jpg',8),
  ('https://autopremiumgroup.ru/m/_versions/info/chevrolet/silverado_1500/2020/13_preview_image.jpg',8),
  ('https://hips.hearstapps.com/hmg-prod/images/2024-hyundai-sonata-n-line-101-64ef8c4d94261.jpg?crop=0.864xw:0.791xh;0.0765xw,0.0791xh&resize=980:*',9),
  ('https://i.gaw.to/vehicles/photos/40/34/403449-2024-hyundai-sonata.jpg',9),
  ('https://s7d1.scene7.com/is/image/hyundai/2024-sonata-hev-dn8hev-0458-carousel:2560-2560x1240?qlt=85,0&fmt=webp',9),
  ('https://lh3.googleusercontent.com/proxy/SVVDMrNAsfYzWMhMi32aD8DWDdNn-HKnMMKjkEtxeO5HV9jMe71F06hE7ADg9cakYRydIekwm1Ama7KmIesSlNBSkQ',9),
  ('https://sonata-club.net/photo/files/1/hyundai-sonata-2020-us-spec-18.jpg',9),
  ('https://s.auto.drom.ru/d24289/foreignimport/737650502/803294692.jpg',9),
  ('https://toyotacamry.ru/gallery/files/1/2018-toyota-camry-xle-by-zeid-nasser-1-1600x915.jpg',10),
  ('https://www.auto-loker.ru/upload/iblock/7c3/salon2_camry70_13.jpg',10),
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxegz3K1tOMcikyjjhZnGg3FnM2YAsA8qMw&s',10);


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
    'Toyota Camry', 'https://tengrimotors.kz/photo/%D0%9A%D0%B0%D0%BC%D1%80%D0%B8%2070%20%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9/IMG_0630.JPG', 25, 'ABC123', 25000, 2020, 'Toyota', 'Camry',
    'Black', 'Silver', 'Automatic', 50000, 'New York',1,1,true, true, true,'Excellent', 'New York, NY', 'This is a high-quality Toyota Camry with low mileage.'
  ),
  (
    'Honda Civic', 'https://www.topgear.com/sites/default/files/images/cars-road-test/2020/09/fb96baaf2acc8929744af2d1a9d7b7e8/308638_2020_civic_type_r_limited_edition.jpg', 30, 'DEF456', 22000, 2018, 'Honda', 'Civic',
    'Beige', 'Gray', 'Manual', 70000, 'California',2,3,
    true, true, true, 'Good', 'Los Angeles, CA', 'This Honda Civic is in great condition with a manual transmission.'
  ),
  (
    'Ford Mustang', 'https://upload.wikimedia.org/wikipedia/commons/d/d1/2018_Ford_Mustang_GT_5.0.jpg', 40, 'GHI789', 35000, 2021, 'Ford', 'Mustang',
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
    'Nissan Altima', 'https://media.ed.edmunds-media.com/for-sale/cb-1n4al3ap2gc289972/img-1-600x263.jpg', 27, 'VWX234', 20000, 2015, 'Nissan', 'Altima',
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