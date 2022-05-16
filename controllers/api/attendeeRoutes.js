const router = require('express').Router();
const { Attendee, Item, Event } = require('../../models');

//rsvp for event
router.post("/:event_id", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to rsvp event!" })
    }
    try {
        const event = await Event.findByPk(req.params.event_id);
        if (!event.public) {
            if (req.session.user.id != event.creator_id) {
                return res.status(401).json({ msg: "private event, invite only!" })
            }
        }
        const newAttendee = await Attendee.create({
            event_id: req.params.event_id,
            user_id: req.session.user.id,
            rsvp_status: req.body.rsvp_status,
        })
        res.json(newAttendee)
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    }
});

//invite for event
router.post("/invite/:event_id", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "must log in to invite for event!" })
    }
    try {
        const event = await Event.findByPk(req.params.event_id);
        // if private, then only owner can invite
        if (!event.public) {
            if (event.creator_id != req.session.user.id) {
                return res.status(401).json({ msg: "private event, only owner can invite!" })
            }
        }
        const newAttendee = await Attendee.create({
            event_id: req.params.event_id,
            user_id: req.body.user_id,
            rsvp_status: 0,
        })
        res.json(newAttendee)
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
    }
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
            // can't bring item if not going, set owner_id of item to null
            if (req.body.rsvp_status != 1) {
                return Item.update({
                    owner_id: null,
                }, {
                    where: {
                        event_id: req.params.event_id,
                        owner_id: req.session.user.id,
                    }
                })
            }
            res.json(updateAttendee);
        })
        .then(items => res.json(items))
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