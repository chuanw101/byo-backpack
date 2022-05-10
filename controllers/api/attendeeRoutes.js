const router = require('express').Router();
const { Attendee, Item } = require('../../models');
const bcrypt = require("bcrypt");

//rsvp for event
router.post("/:event_id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to rsvp event!" })
    }
    Attendee.create({
        event_id: req.params.event_id,
        user_id: req.session.user.id,
        rsvp_status: req.body.rsvp_status,
    })
        .then(newAttendee => {
            res.json(newAttendee);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//change rsvp for event
router.put("/:event_id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to rsvp event!" })
    }
    Attendee.update({
        rsvp_status: req.body.rsvp_status,
    }, {
        where: {
            event_id: req.params.event_id,
            user_id: req.session.user.id,
        }
    })
        .then(updateAttendee => {
            res.json(updateAttendee);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

//leave event
router.delete("/:event_id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to leave event!" })
    }
    Attendee.destroy({
        where: {
            event_id: req.params.event_id,
            user_id: req.session.user.id,
        }
    })
        .then(delAttendee => {
            // can't bring item if not going, set owner_id of item to null
            return Item.update({
                owner_id: null,
            }, {
                where: {
                    event_id: req.params.event_id,
                    owner_id: req.session.user.id,
                }
            })
        })
        .then(items => res.json(items))
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});

module.exports = router;