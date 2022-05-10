const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attendee extends Model { }

Attendee.init({
    // define columns
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'event',
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    rsvp_status: {
        // 1=attending, 2=not attending, 3=maybe, other=no response
        type: DataTypes.INTEGER,
        default: 0
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'attendee',
}
);

module.exports = Attendee;