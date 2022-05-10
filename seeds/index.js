const sequelize = require("../config/connection");
const moment = require("moment");
const {User,Item,Event,Attendee} = require("../models");

const users = [
    {
        user_name:"chuan",
        password:"password"
    },
    {
        user_name:"saghar",
        password:"123"
    },
    {
        user_name:"jeff",
        password:"password"
    },{
        user_name:"lola",
        password:"password"
    }
]

const events = [
    {
        event_name:"potluck",
        location:"online",
        start_time:moment().toDate(),
        end_time:moment().toDate(),
        description: "a really good potluck",
        creator_id:1
    },{
        event_name:"potluck3",
        location:"online",
        start_time:moment().toDate(),
        end_time:moment().toDate(),
        creator_id:1
    },
    {
        event_name:"potluck4",
        location:"online",
        start_time:moment().toDate(),
        end_time:moment().toDate(),
        creator_id:1
    },
    {
        event_name:"poker night",
        location:"online",
        start_time:moment().toDate(),
        end_time:moment().toDate(),
        creator_id:2
    },
]

const items = [
    {
        item_name:"food",
        event_id:1,
        owner_id:1,
    },
    {
        item_name:"drinks",
        event_id:1,
        owner_id:2,
    },
    {
        item_name:"stuff",
        event_id:1,
        owner_id:3,
    },
    {
        item_name:"cards",
        event_id:2,
        owner_id:1,
    },
    {
        item_name:"snacks",
        event_id:2,
        owner_id:3,
    },
    {
        item_name:"beer",
        event_id:2,
        owner_id:1,
    },
]

const attendees = [
    {
        event_id:1,
        user_id:1,
    },
    {
        event_id:1,
        user_id:2,
    },
    {
        event_id:1,
        user_id:3,
    },
    {
        event_id:1,
        user_id:4,
    },
    {
        event_id:2,
        user_id:1,
    },
    {
        event_id:2,
        user_id:2,
    },
    {
        event_id:2,
        user_id:3,
    },
    {
        event_id:2,
        user_id:4,
    },
]

const feedMe = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Event.bulkCreate(events);
        await Item.bulkCreate(items);
        await Attendee.bulkCreate(attendees);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

feedMe()
