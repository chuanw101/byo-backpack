// import models
const Item = require('./Item');
const User = require('./User');
const Event = require('./Event');
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
    as: 'creator',
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
    as: "invited",
    foreignKey: 'user_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    as: 'attendees',
    foreignKey: 'event_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    as: 'maybes',
    foreignKey: 'event_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    as: 'noes',
    foreignKey: 'event_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    as: 'noresponses',
    foreignKey: 'event_id',
});
Event.belongsToMany(User, {
    through: Attendee,
    as: 'yeses',
    foreignKey: 'event_id',
});

module.exports = {
    Event,
    User,
    Item,
    Attendee,
};