import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";
import { Goal } from "./goal";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>{
    declare commentId: number;
    declare username: string;
    declare goalId: number;
    declare comment: string;
    declare createdAt?: Date;
}

export function CommentFactory(sequelize: Sequelize) {
    Comment.init({
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        goalId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'comments',
        sequelize
    });
}

export function AssociateUserComment() {
    User.hasMany(Comment, { foreignKey: 'username' });
    Comment.belongsTo(User, { foreignKey: 'username' });
}

export function AssociateGoalComment() {
    Goal.hasMany(Comment, { foreignKey: 'goalId' });
    Comment.belongsTo(Goal, { foreignKey: 'goalId' });
}