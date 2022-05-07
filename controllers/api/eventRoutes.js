const express = require("express");
const router = express.Router();
const { Event, Item, User} = require("../../models");


//find all
router.get("/", (req, res) => {
    Event.findAll({
        include: [{
            model: Item,
            include: [User]
        }, User],
        nest: true,
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
        }, User],
        nest: true,
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
        return res.status(401).json({ msg: "must log in to create event!" })
    }
    Event.create({
        event_name: req.body.event_name,
        location: req.body.location,
        date: req.body.date,
        picture_path: req.body.picture_path,
        creator_id: req.session.user.id
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
router.put("/:id", (req, res) => {
    Event.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedEvent => {
        res.json(updatedEvent);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//delete a Event
router.delete("/:id", (req, res) => {
    Event.destroy({
        where: {
            id: req.params.id
        }
    }).then(delEvent => {
        res.json(delEvent);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

module.exports = router;