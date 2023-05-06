"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function UserFactory(sequelize) {
    User.init({
        username: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        avatar: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://akns-images.eonline.com/eol_images/Entire_Site/2018024/rs_600x600-180124163953-600-tom-myspace.jpg?fit=around%7C1200:1200&output-quality=90&crop=1200:1200;center,top'
        },
        bio: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
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
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}
exports.UserFactory = UserFactory;
