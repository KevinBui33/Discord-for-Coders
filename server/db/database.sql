create table accounts (
    user_id serial primary key, 
    username varchar (50) unique not null, 
    password varchar (50) not null, 
    email varchar (255) unique not null,
    created_on timestamp
);

insert into accounts (username, password, email) values ('kbui', 'somepass', 'kbui@gmail.com');
insert into accounts (username, password, email) values ('timmyQ', 'no pass', 'kbui@gmail.com');
insert into accounts (username, password, email) values ('guy', 'yes sir', 'kbui@gmail.com');