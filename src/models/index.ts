import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserGoal, GoalFactory } from "./goal";
import { AssociateGoalComment, AssociateUserComment, CommentFactory } from "./comment";

const dbName = 'goalgetter_db';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
  host: '127.0.0.1',
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