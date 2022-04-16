-- CREATE SCHEMA if not exists Project;

-- drop TABLE `profile`;
create table if not exists `Profile`(
    ID int auto_increment not null,
	Email varchar(255) UNIQUE NOT NULL,
	Username varchar(255) UNIQUE NOT NULL,
    `Password` varchar(255) NOT NULL,
	`Name` varchar(255),
    B_Date TEXT, 
    Profile_Pic TEXT,
    PRIMARY KEY(ID, Email, Username)
);

-- drop TABLE HAS_FRIEND;
create table if not exists Has_Friend(
	ID_1 int not null,
    ID_2 int not null,
    PRIMARY KEY(ID_1, ID_2),
	FOREIGN KEY(ID_1) REFERENCES `PROFILE`(ID),
	FOREIGN KEY(ID_2) REFERENCES `PROFILE`(ID)
);

-- drop table administrator;
create table if not exists Administrator(
	ID int auto_increment not null,
	Email varchar(255) unique not null,
    primary key(ID, Email)
);

-- drop TABLE SETTINGS;
create table if not exists Settings(
    ID int unique NOT NULL auto_increment,
    Profile_ID int not null,
	PRIMARY KEY(ID),
	FOREIGN KEY(Profile_ID) REFERENCES `PROFILE`(ID),
    Date_Format ENUM('dd/mm/yyyy','mm/dd/yyyy') default 'dd/mm/yyyy',
    Time_Format ENUM('24:00','12:00') default '24:00', 
    TimeZone varchar(3) default 'MDT', 
    `Language` ENUM('English', 'French') default 'English',
    Theme ENUM('Dark', 'Light') default 'Light',
    Country varchar(20),
    Notification varchar(255)
);




-- drop table monthly_stats;
create table if not exists Monthly_Stats(
	
	Profile_ID int NOT NULL,
	`Month` varchar(15),
    `Year` varchar(5),
    
	primary key(`Year`, Profile_ID, `Month`),
    
    Total_Events int,
    Total_Tasks int,
    Total_Notes int,
    foreign key(Profile_ID) references `Profile`(ID)
);


-- drop table notes;
create table if not exists Notes(
	ID int auto_increment NOT NULL, 
    Profile_ID int not null,
	primary key(ID),
    foreign key(Profile_ID) references `PROFILE`(ID)
);

create table if not exists Note(
	ID int auto_increment NOT NULL,
    Notes_ID int not null, 
    primary key(ID, Notes_ID),
    foreign key (Notes_ID) references Notes(ID),
    
	Date_Created TEXT,
    Last_Modified TEXT,
    Title TEXT,
    Content TEXT    
);

-- drop table task_list;
create table if not exists Tasks(
	ID int auto_increment NOT NULL, 
    Profile_ID int not null,
	Header TEXT,
	primary key(ID),
    foreign key(Profile_ID) references `PROFILE`(ID)
);

-- drop table task;
create table if not exists Task(
    ID int NOT NULL auto_increment, 
    primary key(ID),
    
    Tasks_ID int not null, 
    foreign key (Tasks_ID) references Tasks(ID),
    
    Title TEXT,
    `Description` TEXT,
    Location TEXT,
    Deadline TEXT,
    Completion_Status BOOLEAN default false
);

-- drop table `schedule`;
create table if not exists `Schedule`(
	ID int not null auto_increment,
    Profile_ID int not null,
	Calendar_Name TEXT NOT NULL,
	primary key(ID),
    foreign key(Profile_ID) references `PROFILE`(ID)
);

-- drop table `Event`;
create table if not exists `Event`(
	ID int auto_increment not null, 
    Schedule_ID int not null,
    primary key(ID),
    Title TEXT NOT NULL, 
    `Description` TEXT,
    Location TEXT,
    `Day` TEXT,
    Start_Time TEXT, 
    End_Time TEXT, 
    Label TEXT,
    foreign key (Schedule_ID) references `Schedule`(ID)
);

-- drop table features;
create table if not exists Features(
	Profile_ID int not null,
    
    Schedule_ID  int not null,
    Notes_ID int not null,
    Tasks_ID int not null,
    Setting_ID int NOT NULL,
    
    primary key(Profile_ID),
	foreign key(Profile_ID) references `PROFILE`(ID),
    
    foreign key(Setting_ID) references settings(ID),
    foreign key(Notes_ID) references Notes(ID),
    foreign key(Tasks_ID) references Tasks(ID),
    foreign key(Schedule_ID) references `Schedule`(ID)
);

-- drop table features_sp;
create table if not exists Shared_Features(
	Profile_ID_Author int not null,
    Profile_ID_Recipient int not null,
    
    Permissions enum('view', 'edit') default 'view',

	Feature_ID int not null,
    Feature_type enum('Schedule', 'Note', 'Task', 'Notes', 'Tasks', 'Event') not null,
    
    primary key(Profile_ID_Author, Profile_ID_Recipient),
	foreign key(Profile_ID_Author) references `PROFILE`(ID),
    foreign key(Profile_ID_Recipient) references `PROFILE`(ID)
);