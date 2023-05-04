"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserGoal = exports.GoalFactory = exports.Goal = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Goal extends sequelize_1.Model {
}
exports.Goal = Goal;
function GoalFactory(sequelize) {
    Goal.init({
        goalId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        plan: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'goals',
        sequelize
    });
}
exports.GoalFactory = GoalFactory;
function AssociateUserGoal() {
    user_1.User.hasMany(Goal, { foreignKey: 'username' });
    Goal.belongsTo(user_1.User, { foreignKey: 'username' });
}
exports.AssociateUserGoal = AssociateUserGoal;
