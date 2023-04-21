import { DataTypes, Model } from "sequelize";
import { User } from "./user";
export class Goal extends Model {
}
export function GoalFactory(sequelize) {
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
            unique: true
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
            allowNull: false,
        },
        timeframe: {
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