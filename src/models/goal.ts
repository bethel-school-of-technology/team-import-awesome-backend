import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>>{
    id?: number;
    title?: string;
    completed?: boolean;
  }


export function TaskFactory(sequelize: Sequelize) {
    Task.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        completed: {
            type: DataTypes.BOOLEAN
        }

    }, {
        freezeTableName: true,
        tableName: 'tasks',
        sequelize
    });
}