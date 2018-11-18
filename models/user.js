const DB = require('../config/connection')

DB.query(`CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY NOT NULL UNIQUE,
    name character varying(45) NOT NULL,
    password character varying(256) NOT NULL,
    email character varying(45) NOT NULL UNIQUE
)`);