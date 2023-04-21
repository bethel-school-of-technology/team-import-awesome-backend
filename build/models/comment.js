"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateGoalComment = exports.AssociateUserComment = exports.CommentFactory = exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const goal_1 = require("./goal");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
function CommentFactory(sequelize) {
    Comment.init({
        commentId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        goalId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'comments',
        sequelize
    });
}
exports.CommentFactory = CommentFactory;
function AssociateUserComment() {
    user_1.User.hasMany(Comment, { foreignKey: 'username' });
    Comment.belongsTo(user_1.User, { foreignKey: 'username' });
}
exports.AssociateUserComment = AssociateUserComment;
function AssociateGoalComment() {
    goal_1.Goal.hasMany(Comment, { foreignKey: 'goalId' });
    Comment.belongsTo(goal_1.Goal, { foreignKey: 'goalId' });
}
exports.AssociateGoalComment = AssociateGoalComment;
