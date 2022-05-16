const sequelize = require("../config/connection");
const moment = require("moment");
const { User, Item, Event, Attendee } = require("../models");

const users = [
    {
        user_name:"Chuan",
        password:"password"
    },
    {
        user_name:"Saghar",
        password:"123"
    },
    {
        user_name:"Jeff",
        password:"password"
    },{
        user_name:"Lola",
        password:"password"
    }
]

const events = [
    {
        event_name:"Cheese Tasting Party",
        location:"Cheese Hall",
        city:"Seattle",
        state:"WA",
        start_time:"2022-05-24T15:30",
        end_time:"2022-05-24T17:45",
        description: "We will be tasting a variety of cheeses!",
       picture_path: "https://res.cloudinary.com/da2jrzaai/image/upload/c_crop,g_custom/v1652467865/kmkcnk7l6hq835uuumfo.jpg",
        creator_id:3
    },{
        event_name:"Pub Crawl",
        location:"Thunderbolt",
        city:"Los Angeles",
        state:"CA",
        start_time:"2022-06-01T17:00",
        end_time:"2022-06-21T17:00",
        description: "We are starting at the Tunderbolt bar in LA and crawling North until we hit Seattle. We won't stop hiking or drinking the whole time!",
        picture_path: "http://res.cloudinary.com/da2jrzaai/image/upload/v1652382780/udnctsa9paulo6v0s6aj.jpg",
        creator_id:1
    },
    {
        event_name:"Dungeons and Dragons",
        location:"Mox",
        city:"Seattle",
        state:"WA",
        start_time:"2022-05-28T10:00",
        end_time:"2022-05-28T23:59",
        description: "Ready your dice and join me for a once in a lifetime exculsive campaign!",
       picture_path: "http://res.cloudinary.com/da2jrzaai/image/upload/v1652382481/dw3mkitqbxw8zyehzykx.png",
        creator_id:2
    },
    {
        event_name:"Beach Party",
        location:"Alki Beach",
        city:"Seattle",
        state:"WA",
        start_time:"2022-07-13T15:00",
        end_time:"2022-07-13T20:00",
        description: "Everyone knows Wednesday's are the best days to throw a massive beach party! Come join me for a wonderful day on the beach. ",
        picture_path: "http://res.cloudinary.com/da2jrzaai/image/upload/v1652382833/tm7vqsevolhs3deuk41v.jpg",
        creator_id:4
    },
]

const items = [
    {
        item_name:"Burrata",
        event_id:1,
    },
    {
        item_name:"Greek Feta",
        event_id:1
    },
    {
        item_name:"Brie de Meaux-Style Brie",
        event_id:1,
    },
    {
        item_name:"Pyrénées Sheep",
        event_id:1,
    },
    {
        item_name:"Comté",
        event_id:1,
    },
    {
        item_name:"drinks",
        event_id:3,
    },
    {
        item_name:"Pizza",
        event_id:3,
    },
    {
        item_name:"Large Umbrella",
        event_id:4,
    },
    {
        item_name:"Lounge Blanket/Towel",
        event_id:4,
    },
    {
        item_name:"Volleyball",
        event_id:4,
    },
]

const attendees = [
    {
        event_id: 1,
        user_id: 1,
    },
    {
        event_id: 1,
        user_id: 2,
    },
    {
        event_id: 1,
        user_id: 3,
    },
    {
        event_id: 1,
        user_id: 4,
    },
    
    {
        event_id: 2,
        user_id: 1,
    },
    {
        event_id: 2,
        user_id: 2,
    },
    {
        event_id: 2,
        user_id: 3,
    },
    {
        event_id: 2,
        user_id: 4,
    },
    
    {
        event_id:3,
        user_id:1,
    },
    {
        event_id:3,
        user_id:2,
    },
    {
        event_id:3,
        user_id:3,
    },
    {
        event_id:3,
        user_id:4,
    },
    
    {
        event_id:4,
        user_id:1,
    },
    {
        event_id:4,
        user_id:2,
    },
    {
        event_id:4,
        user_id:3,
    },
    {
        event_id:4,
        user_id:4,
    },
    
]

const feedMe = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        });
        await Event.bulkCreate(events);
        await Item.bulkCreate(items);
        await Attendee.bulkCreate(attendees);
        process.exit(0);
    } catch (err) {
        console.log(err)
    }
}

feedMe()
