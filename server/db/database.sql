create table accounts (
    user_id serial primary key, 
    username varchar (255) unique not null, 
    password varchar (255) not null, 
    email varchar (255) unique not null,
    created_on timestamp default now()
);

create table friendship(
    id serial primary key,
    user_a integer not null references accounts,
    user_b integer not null references accounts ,
    created_on timestamp default now(), 
    status integer not null
);

-- status: 0 (pending), 1 (friends), 2(blocked), deleted is rejected  

create table notification (
    id integer primary key generated always as identity, 
    created_on timestamp default now(), 
    notification_type_id integer not null references notification_type(id),
    sender_id integer not null references accounts, 
    recipient_id integer not null references accounts 
);

create table notification_type(
    id integer primary key generated always as identity, 
    name varchar(255) not null, 
    description varchar(255) not null
);

insert into notification_type(name, description) values('friend_request', 'A user wants to be friends with another user'); 
insert into notification_type(name, description) values('message', 'Someone has sent a message'); 

