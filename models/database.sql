


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
 "listing_id" text,
"price" integer not null,
"year" integer not null,
"make" varchar(255) not null,
"model" varchar(255) not null,
"interiorc_olor" varchar(255) not null,
"exterior_color" varchar(255) not null,
"transmission" varchar(255) not null,
"odometer" integer not null,
"subcategory" integer not null,
"category" integer not null,
"power_windows" boolean default false not null,
"air_conditioning:" boolean default false not null,
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
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table subcategory(
 "id" serial primary key,
 "category_id" integer not null,
 "title" varchar(255),
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);




ALTER SEQUENCE my_kitchen_id_seq OWNED BY my_kitchen.id;
GRANT USAGE, SELECT ON SEQUENCE my_kitchen_id_seq TO uzdubuz_id_rsa;