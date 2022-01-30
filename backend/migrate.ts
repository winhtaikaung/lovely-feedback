export const schema = {
  question:
    'CREATE TABLE IF NOT EXISTS `question` ( `id` varchar(100) NOT NULL, `type` int(2) NOT NULL, `placeholder` varchar(200) DEFAULT NULL,`question` varchar(500) DEFAULT NULL,`field_name` varchar(500) DEFAULT NULL, `answer` varchar(50) DEFAULT NULL,`required` BOOLEAN NOT NULL DEFAULT FALSE,`enable` BOOLEAN NOT NULL DEFAULT TRUE,`is_deleted` BOOLEAN NOT NULL DEFAULT FALSE, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  rating:
    'CREATE TABLE IF NOT EXISTS `rating` ( `id` varchar(100) NOT NULL, `points` int(1) NOT NULL, `user_id` varchar(100) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  response:
    'CREATE TABLE IF NOT EXISTS `response` ( `id` varchar(100) NOT NULL, `response_data` json NOT NULL, `user_id` varchar(100) NOT NULL,`is_deleted` BOOLEAN NOT NULL DEFAULT FALSE, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  user: 'CREATE TABLE IF NOT EXISTS `user` ( `id` varchar(100) NOT NULL, `rating_id` varchar(100) , `response_id` varchar(100) NULL,`is_deleted` BOOLEAN NOT NULL DEFAULT FALSE, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
}

export const ddl = {
  droptables: 'DROP TABLE IF EXISTS `question`,`rating`,`response`,`user`;',
}

// REPORTING QUERY

// SELECT DISTINCT P1.totalPoints,P2.totalPoints,P3.totalPoints ,P4.totalPoints,P5.totalPoints,P6.totalPoints FROM rating T,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =1) as P1,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =2) as P2,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =3) as P3,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =4) as P4,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =5) as P5,
// (SELECT COUNT(*)as totalPoints from rating WHERE points =6) as P6;
