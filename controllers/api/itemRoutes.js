const express = require("express");
const router = express.Router();
const { Item, User, Event } = require("../../models");

//find all
router.get("/", (req, res) => {
    Item.findAll({
        include: User,
    })
        .then(dbItems => {
            res.json(dbItems);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//find one
router.get("/:id", (req, res) => {
    Item.findByPk(req.params.id, {
        include: User,
    })
        .then(dbItem => {
            res.json(dbItem);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//create new item for event
router.post("/:event_id", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to create item!" })
    }
    try {
        const curEvent = await Event.findByPk(req.params.event_id);
        // only creator can add items
        if (curEvent.creator_id != req.session?.user?.id) {
            return res.status(401).json({ msg: "you don't have access to change this event!" })
        }
        const newItem = await Item.create({
            item_name: req.body.item_name,
            owner_id: req.body.owner_id,
            event_id: req.params.event_id,
        })
        res.json(newItem);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    }
});

//bring/cant bring item for event
router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to create item!" })
    }
    let id = null;
    if (req.body.bring) {
        id = req.session.user.id;
    }
    Item.update({
        owner_id: id,
    }, {
        where: {
            id: req.params.id,
        }
    })
        .then(updateItem => {
            res.json(updateItem);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//delete a Item
router.delete("/:id", (req, res) => {
    console.log("//////////////////iiiii")
    console.log(req.params.id)
    Item.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(delItem => {
            res.json(delItem);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

module.exports = router;