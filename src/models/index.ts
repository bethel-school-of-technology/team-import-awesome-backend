import { Sequelize } from "sequelize";



const dbName = 'goalGetter_db';
const username = 'root';
const password = 'root';

const  sequelize = new Sequelize(dbName, username, password, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

//TaskFactory(sequelize);

export const db = sequelize;