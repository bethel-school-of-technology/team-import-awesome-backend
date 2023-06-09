import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Goal extends Model<InferAttributes<Goal>, InferCreationAttributes<Goal>>{
    declare goalId: number;
    declare username: string;
    declare title: string;
    declare plan: string;
    declare completed: boolean;
    declare startDate: Date;
    declare endDate: Date;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}


export function GoalFactory(sequelize: Sequelize) {
    Goal.init({
        goalId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'goals',
        sequelize
    });
}

export function AssociateUserGoal() {
    User.hasMany(Goal, { foreignKey: 'username' });
    Goal.belongsTo(User, { foreignKey: 'username' });
}