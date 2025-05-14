import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'db5017842634.hosting-data.io',
  user: 'dbu2412816',
  password: 'fwP5t3Qe!MnpYTq',
  database: 'dbs14225309',
  port: 3306,
});
