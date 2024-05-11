
create table car(
 "id" serial primary key,
 "title"  
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);








ALTER SEQUENCE my_kitchen_id_seq OWNED BY my_kitchen.id;
GRANT USAGE, SELECT ON SEQUENCE my_kitchen_id_seq TO uzdubuz_id_rsa;