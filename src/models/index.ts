import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserGoal, GoalFactory } from "./goal";
import { CommentFactory, AssociateGoalComment, AssociateUserComment } from "./comment";

const dbName = 'goalGetter_db';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

UserFactory(sequelize);
GoalFactory(sequelize);
CommentFactory(sequelize);

AssociateUserGoal();
AssociateUserComment();
AssociateGoalComment();

export const db = sequelize;