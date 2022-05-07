// import models
const User = require('./User');
const Event = require('./Event');
const Item = require('./Item');
const Attendee = require('./Attendee');

// Item belongsTo Event
Item.belongsTo(Event, {
    foreignKey: "event_id",
    onDelete: "CASCADE",
});
// Event has many Item
Event.hasMany(Item, {
    foreignKey: "event_id"
});

// Event belongs one creator
Event.belongsTo(User, {
    foreignKey: "creator_id"
});
User.hasMany(Event, {
    foreignKey: "creator_id"
});

// Item belongs to one owner
Item.belongsTo(User, {
    foreignKey: "owner_id"
});
User.hasMany(Item, {
    foreignKey: "owner_id"
});

// Many to many relationship between User and Event through Attendee
User.belongsToMany(Event, {
    through: Attendee,
    foreignKey: 'user_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    foreignKey: 'event_id',
});

module.exports = {
    Event,
    Item,
    User,
    Attendee,
};