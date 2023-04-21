"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const goal_1 = require("./goal");
const comment_1 = require("./comment");
const dbName = 'goalgetter_db';
const username = 'root';
const password = 'password';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, user_1.UserFactory)(sequelize);
(0, goal_1.GoalFactory)(sequelize);
(0, comment_1.CommentFactory)(sequelize);
(0, goal_1.AssociateUserGoal)();
(0, comment_1.AssociateUserComment)();
(0, comment_1.AssociateGoalComment)();
exports.db = sequelize;
