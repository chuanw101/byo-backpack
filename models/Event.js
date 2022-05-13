const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model { }
Event.init({
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: "no description",
    },
    picture_path: {
        type: DataTypes.STRING,
        defaultValue: "/images/BYOB_Event_Default.png",
    },
    creator_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    public: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'event',
}
);

module.exports = Event