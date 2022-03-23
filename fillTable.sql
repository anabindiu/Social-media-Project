SELECT * FROM project.administrator;
SELECT * FROM project.event;
SELECT * FROM project.features;
SELECT * FROM project.features_sp;
SELECT * FROM project.has_friend;
SELECT * FROM project.modify;
SELECT * FROM project.monthly_stats;
SELECT * FROM project.notes;
SELECT * FROM project.profile;
SELECT * FROM project.reminder;
SELECT * FROM project.schedule;
SELECT * FROM project.send_report;
SELECT * FROM project.settings;
SELECT * FROM project.task;
SELECT * FROM project.task_list;
SELECT * FROM project.usage_statistics;
SELECT * FROM project.user;
SELECT * FROM project.view;
SELECT * FROM project.yearly;


insert into administrator values ("admin@project.com");

insert into `user` values ("ana@gmail.com");
insert into `user` values ("derek@gmail.com");
insert into `user` values ("parth@gmail.com");

insert into `profile` values("Parth", "parth@gmail.com", "_Parth_", "password", "2000-08-31", "parth.jpg", "parth@gmail.com");
insert into `profile` values("ana", "ana@gmail.com", "_ana_", "password", "1885-02-01", "ana.jpg", "ana@gmail.com");
insert into `profile` values("derek", "derek@gmail.com", "_derek_", "password", "0000-12-25", "derek.jpg", "derek@gmail.com");

insert into `schedule` values ("parth@gmail.com", "_Parth_", "My Calendar", "Dark");
insert into `schedule` values ("derek@gmail.com", "_derek_", "work", "Dark");

insert into `event` values (1, "Calgary", "attend concert", "Concert", "2022-03-08", "2022-03-09", "My calendar");
insert into `event` values (2, "Calgary", "attend concert", "Concert", "2022-03-08", "2022-03-09", "work");

insert into settings(Email, Username, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification)  values("parth@gmail.com", "_Parth_","dd/mm/yyyy", "12:00", "MDT", "English", "Dark", "Canada", "There are no new notifications");
insert into settings(Email, Username, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification) values("derek@gmail.com", "_derek_", "dd/mm/yyyy", "12:00", "MDT", "English", "Dark", "Canada", "There are no new notifications");

insert into features(profile_Email, Username, User_eMail) values("parth@gmail.com", "_Parth_", "parth@gmail.com"); 
insert into features(profile_Email, Username, User_eMail) values("derek@gmail.com", "_derek_", "derek@gmail.com"); 

alter table has_friend add column Friend_Email varchar(255);

insert into has_friend values ("parth@gmail.com","_Parth_", "derek@gmail.com");

insert into `modify` values ("admin@project.com", "parth@gmail.com", "_Parth_");

insert into yearly values("parth@gmail.com", "_Parth_", "2022");

insert into monthly_stats values("parth@gmail.com", "_Parth_", "2022-08-00", 5,10, 20, 30, "2022");

insert into notes(profile_Email, Username, Date_Created, Title, Content) values ("parth@gmail.com", "_Parth_", "2022-03-00", "Notes", "No notes");

insert into reminder(Location, `Description`, Title, Calendar_Name, `Date`) values ("Calgary", "no reminders", "Reminder", "My Calendar", "2022-03-00");

insert into task_list values("parth@gmail.com", "_Parth_", "Task Header", "Dark");

insert into task (profile_Email, Username, Header, Deadline, Completion_status, `Description`, Title, Location) values ("parth@gmail.com", "_Parth_", "Task Header", "2023-04-02", false, "This is a task", "Task Header", "Calgary");

insert into usage_statistics values ("parth@gmail.com", "_Parth_", "Usage");

insert into `view` values ("admin@project.com", "parth@gmail.com", "_Parth_");

-- Skipped: features_sp,  send_report
