const express = require("express");
const router = express.Router();
const { Event, Item, User, Attendee } = require("../../models");
const cloudinary = require("cloudinary").v2

//find all
router.get("/", (req, res) => {
    Event.findAll({
        include: [{
            model: Item,
            include: [User]
        }, {
            model: User,
            as: 'creator',
        }, {
            model: User,
            as: 'attendees',
        }, {
            model: User,
            as: 'noresponses',
            where: { '$noresponses.attendee.rsvp_status$': 0 }, required: false
        }, {
            model: User,
            as: 'yeses',
            where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
        }, {
            model: User,
            as: 'noes',
            where: { '$noes.attendee.rsvp_status$': 2 }, required: false
        }, {
            model: User,
            as: 'maybes',
            where: { '$maybes.attendee.rsvp_status$': 3 }, required: false
        },],
    })
        .then(dbEvents => {
            res.json(dbEvents);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//find one
router.get("/:id", (req, res) => {
    Event.findByPk(req.params.id, {
        include: [{
            model: Item,
            include: [User]
        }, {
            model: User,
            as: 'creator'
        }, {
            model: User,
            as: 'attendees',
        }, {
            model: User,
            as: 'noresponses',
            where: { '$noresponses.attendee.rsvp_status$': 0 }, required: false
        }, {
            model: User,
            as: 'yeses',
            where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
        }, {
            model: User,
            as: 'noes',
            where: { '$noes.attendee.rsvp_status$': 2 }, required: false
        }, {
            model: User,
            as: 'maybes',
            where: { '$maybes.attendee.rsvp_status$': 3 }, required: false
        }],
    })
        .then(dbEvent => {
            res.json(dbEvent);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});


//create Event
router.post("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Must log in to create event!" })
    }
    Event.create({
        event_name: req.body.event_name,
        location: req.body.location,
        city: req.body.city,
        state: req.body.state,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        picture_path: req.body.picture_path,
        description: req.body.description,
        creator_id: req.session.user.id,
        public: req.body.public
    })
        .then(newEvent => {
            Attendee.create({
                event_id: newEvent.id,
                user_id: newEvent.creator_id,
                rsvp_status: 1
            })
            return newEvent;
        })
        .then(newEvent => {
            // if have items, get itemsArray, fill in event_id, bulk create item
            if (req.body.items?.length) {
                const itemsArray = req.body.items.map((item_name) => {
                    return {
                        item_name,
                        event_id: newEvent.id,
                    };
                });
                return Item.bulkCreate(itemsArray);
            }
            // no items just respond
            res.json(newEvent);
        })
        .then(items => res.json(items))
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//update Event
router.put("/:id", async (req, res) => {
    if (!req.session?.user) {
        return res.status(401).json({ msg: "must log in to change event!" })
    }
    try {
        const curEvent = await Event.findByPk(req.params.id);
        // only creator can update event
        if (curEvent.creator_id != req.session?.user?.id) {
            return res.status(401).json({ msg: "You don't have access to change this event!" })
        }
        const updatedEvent = await Event.update({
            event_name: req.body.event_name,
            location: req.body.location,
            city: req.body.city,
            state: req.body.state,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            picture_path: req.body.picture_path,
            description: req.body.description,
            public: req.body.public
        }, {
            where: {
                id: req.params.id,
                creator_id: req.session.user.id
            }
        });
        res.json(updatedEvent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    }
});

//delete a Event
router.delete("/:id", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to delete event!" })
    }
    try {
        const curEvent = await Event.findByPk(req.params.id);
        // only creator can delete event
        if (curEvent.creator_id != req.session?.user?.id) {
            console.log(curEvent)
            return res.status(401).json({ msg: "you don't have access to delete this event!" })
        }
        const delEvent = await Event.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(delEvent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    }
});
module.exports = router;