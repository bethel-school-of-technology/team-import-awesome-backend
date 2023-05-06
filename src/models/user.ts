import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare username: string;
    declare userId: number;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare age: number;
    declare email: string;
    declare avatar: string;
    declare bio: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://akns-images.eonline.com/eol_images/Entire_Site/2018024/rs_600x600-180124163953-600-tom-myspace.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top'

        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}