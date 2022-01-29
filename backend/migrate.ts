export const schema = {
  question:
    'CREATE TABLE IF NOT EXISTS `question` ( `id` varchar(100) NOT NULL, `type` int(2) NOT NULL, `placeholder` varchar(200) DEFAULT NULL,`question` varchar(500) DEFAULT NULL, `answer` varchar(50) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  rating:
    'CREATE TABLE IF NOT EXISTS `rating` ( `id` varchar(100) NOT NULL, `points` int(1) NOT NULL, `user_id` varchar(100) DEFAULT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  response:
    'CREATE TABLE IF NOT EXISTS `response` ( `id` varchar(100) NOT NULL, `response_data` json NOT NULL, `user_id` varchar(100) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
  user: 'CREATE TABLE IF NOT EXISTS `user` ( `id` varchar(100) NOT NULL, `rating_id` varchar(100) , `response_id` varchar(100) NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ) ENGINE=InnoDB DEFAULT CHARSET=latin1;',
}

export const ddl = {
  droptables: 'DROP TABLE IF EXISTS `question`,`rating`,`response`,`user`;',
}
