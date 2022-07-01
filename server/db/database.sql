create table accounts (
    user_id serial primary key, 
    username varchar (255) unique not null, 
    password varchar (255) not null, 
    email varchar (255) unique not null,
    created_on timestamp default now()
);

insert into accounts (username, password, email) values ('kbui', 'somepass', 'kbui@gmail.com');
insert into accounts (username, password, email) values ('timmyQ', 'no pass', 'kbui@gmail.com');
insert into accounts (username, password, email) values ('guy', 'yes sir', 'kbui@gmail.com');

create table friends(
    friends_id serial primary key, 
    created_on timestamp default now(), 
    user_a integer not null references accounts,
    user_b integer not null references accounts 
);

create table friendRequests(
    id serial primary key,
    user_from integer not null references accounts,
    user_to integer not null references accounts ,
    created_on timestamp default now(), 
    status varchar (255)
    
)