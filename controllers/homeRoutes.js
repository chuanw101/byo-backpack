const router = require('express').Router();
const { User, Event, Item } = require('../models');

// home route, only shows public events
router.get('/', (req, res) => {
  Event.findAll({
    include: [{
      model: Item,
      include: [User]
    }, {
      model: User,
      as: 'creator',
      where: { '$public$': true }
    }, {
      model: User,
      as: 'attendees'
    }],
  })
    .then(dbEvents => {
      const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
      const user = req.session?.user
      res.render('home', { event: hbsEvents, user })
    });
});

//render event by id
router.get("/eventbyid/:id", (req, res) => {
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
    },
    ],
  }).then(eventData => {
    const data = eventData.get({ plain: true })
    data.user = req.session?.user
    if (data.user) {
      data.user.isRSVP = false;
      data.user.isGoing = false;
      // check if user is RSVP'd, if so, check if definately going
      for (const att of data.attendees) {
        if (att.id == data.user.id) {
          data.user.isRSVP = true;
          data.user.rsvp_status = att.attendee.rsvp_status;
          if (data.user.rsvp_status == 1) {
            data.user.isGoing = true;
          }
        }
      }
      // check if item is brought by user
      for (const item of data.items) {
        if (item.owner_id == data.user.id) {
          item.isBroughtByUser = true;
        }
      }
    }
    res.render("eventbyid", data)
  })
})

router.get('/profile', async (req, res) => {
  try {
    const dbEvents = await Event.findAll({
      include: [{
        model: Item,
      }, {
        model: User,
        as: 'yeses',
        where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
      }],
      where: {
        creator_id: req.session.user?.id
      }
    })
    const events = dbEvents.map(event => event.get({ plain: true }))
    const publicEvents = events.filter(event => event.public)
    const privateEvents = events.filter(event => !event.public)
    const user = req.session?.user
    const invited = await Event.findAll({
      include: [{
        model: Item,
      }, {
        model: User,
        as: 'attendees',
      },  {
        model: User,
        as: 'yeses',
        where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
      }],
      where: {
        '$attendees.id$' : req.session.user?.id,
      }
    })
    const invitedEvents = invited.map(event => event.get({ plain: true }))
    res.render('profile', { publicEvents, privateEvents, invitedEvents, user })
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err })
  }
});

//find one event 
router.get("/profile/update/:id", async (req, res) => {
  try {
    const dbEvent = await Event.findByPk(req.params.id, {
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
        where: {'$maybes.attendee.rsvp_status$': 3}, required: false
    },
  ],
  })
      const eventUpdate = dbEvent.get({ plain: true });
      const user = req.session.user
      res.render('updateEvent',{eventUpdate,user})

  } catch (err) {

    console.log(err);
    res.status(500).json({ msg: "an error occured", err })
  }

});

router.get("/create_an_event", async (req, res) => {
  const user = req.session?.user
  res.render('createEvent', { user })

});

router.get('/login', (req, res) => {

  res.render('login')
});


router.get('/signup', (req, res) => {
  res.render('signup')
});
router.get('/profile/changepassword', (req, res) => {
  const user = req.session.user
  res.render('changepassword', { user })
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/login")
});
module.exports = router;
