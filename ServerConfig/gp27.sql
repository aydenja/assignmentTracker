drop database if exists gp27;
create database gp27;

use gp27;
drop table if exists users;

SET FOREIGN_KEY_CHECKS=0;

-- user table will store info about each user
create table users
(
	UserID INT auto_increment,
	username varchar(40) not null unique,
    phash varchar(255) not null unique,
    fname varchar(40),
    lname varchar(40), 
    primary key(UserID)
);

drop table if exists assignments;

-- user table will store info about each user
create table assignments
(
	UserID INT,
	class varchar(40),
    aname varchar(40),
    dyear INT,
    dmonth INT, 
    dday INT,
    primary key(UserID, class, aname),
    foreign key (UserID)references users(UserID)
);


-- Stored procedure can be used to add a user to the database, passwords are stored as hashbytes, 
-- can be used by the create account screen
-- can be called by 'call adduser(username, password, first name, last name);'
drop procedure if exists addUser;
delimiter //
create procedure addUser(IN n_username varchar(40), IN n_passw varchar(40), IN n_fname varchar (40), IN n_lname varchar (40))
begin
insert into users (username, phash, fname, lname)
values (n_username,  md5(n_passw), n_fname, n_lname);
end;//
delimiter ;

-- cleaning out user table
truncate users;

-- adding admin account for testing
call adduser('admin@test.com', 'password', 'Admin', '');
insert into assignments values (1, 'COM S 363', 'HW-1', 2022, 4, 30);
insert into assignments values (1, 'COM S 363', 'HW-2', 2022, 4, 31);

-- procedure is used for looging users in, checks to make sure that the username/password is correct
-- used by 'call loginUser (username, password, message);'
-- message is an output param that will say if login was sucessfull
drop procedure if exists loginUser;
delimiter //
create procedure loginUser(IN n_username varchar(40), IN n_passw varchar(40), OUT message varchar(100))
begin
declare id int;
set id = (
	select UserID from users where username = n_username and phash = md5(n_passw)
);

if (id is null) then
	set message = 'Incorrect user/password';
else
	set message = 'Login Success';
end if;
end;//
delimiter ;

SET FOREIGN_KEY_CHECKS=1;

-- Example use of login stored procedure
-- set @message = '';
-- call loginUser('Admin', 'password', @message);
-- select @message as message;


	

