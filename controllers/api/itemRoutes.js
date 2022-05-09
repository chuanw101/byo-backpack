const express = require("express");
const router = express.Router();
const { Item, User } = require("../../models");

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
router.post("/:event_id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to create item!" })
    }
    Item.create({
        item_name: req.body.item_name,
        owner_id: req.body.owner_id,
        event_id: req.params.event_id,
    })
        .then(newItem => {
            res.json(newItem);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//bring item for event
router.put("/:id", (req, res) => {
    console.log("hello")
    console.log(req)
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to create item!" })
    }
    Item.update({
        owner_id: req.session.user.id,
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