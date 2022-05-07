const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Item extends Model { }

Item.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id',
            }
        },
        owner_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            references: {
                model: 'user',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
    }
);

module.exports = Item;