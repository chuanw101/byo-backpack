const router = require('express').Router();
const { User, Event, Item } = require('../models');
const Op = require('sequelize').Op;

// home route, only shows public events
router.get('/', (req, res) => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
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
    where: { start_time: { [Op.gt]: dateTime } },
    order: ['start_time']
  })
    .then(dbEvents => {
      const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
      const user = req.session?.user
      res.render('home', { event: hbsEvents, user })
    });
});
// home route, only shows public events
router.get('/search/:location', (req, res) => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
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
    where: {
      start_time: { [Op.gt]: dateTime },
      city: req.params.location
    },
    order: ['start_time'],
    
  })
    .then(dbEvents => {
      console.log(dbEvents)
      const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
      const user = req.session?.user
      res.render('searchResult', { event: hbsEvents, user })
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
  }).catch(err => {
    console.log(err)
    //res.status(500).json({ msg: "an error occured", err })
    const user = req.session?.user
    res.render('error404', { user })
  })
})

router.get('/profile', async (req, res) => {
  try {
    const user = req.session?.user
    if (!req.session?.user?.logged_in) {
      res.render('error401', { user });
    } else {
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
        },
        order: ['start_time']
      })
      const events = dbEvents.map(event => event.get({ plain: true }))
      const publicEvents = events.filter(event => event.public)
      const privateEvents = events.filter(event => !event.public)

      const invited = await Event.findAll({
        include: [{
          model: Item,
        }, {
          model: User,
          as: 'attendees',
        }, {
          model: User,
          as: 'yeses',
          where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
        }],
        where: {
          '$attendees.id$': req.session.user?.id,
        },
        order: ['start_time']
      })
      const invitedEvents = invited.map(event => event.get({ plain: true }))
      res.render('profile', { publicEvents, privateEvents, invitedEvents, user })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err })
  }
});

router.get('/profile/invite/:id', async (req, res) => {
  try {
    const user = req.session?.user;
    if (!req.session?.user?.logged_in) {
      res.render('error401', { user });
    } else {
      //get curEvent
      const currentEvent = await Event.findByPk(req.params.id);
      const curEvent = currentEvent.get({ plain: true })
      // check to see if user is the owner, access deny if not
      if (curEvent.creator_id != req.session.user.id) {
        res.render('error401', { user });
      } else {
        const dbUsers = await User.findAll({
          include: [{
            model: Event,
            as: "invited",
          }],
        });
        const users = dbUsers.map(user => user.get({ plain: true }));
        // filter out users who are already invited
        for (let i = users.length - 1; i >= 0; i--) {
          let found = false;
          for (const event of users[i].invited) {
            if (event.id == req.params.id) {
              found = true;
            }
          }
          if (found) {
            users.splice(i, 1);
          }
        }

        res.render('invite', { users, user, curEvent })
      }
    }
  }
  catch (err) {
    //res.status(500).json({ msg: "an error occured", err })
    const user = req.session?.user
    res.render('error404', { user })
  }
})

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
        where: { '$maybes.attendee.rsvp_status$': 3 }, required: false
      },
      ],
    })
    const eventUpdate = dbEvent.get({ plain: true });
    const user = req.session?.user

    if (!req.session?.user?.logged_in) {
      res.render('error401');
    } else if (eventUpdate.creator_id != req.session?.user?.id) {
      // give 401 error page if not the owner trying to update event
      res.render('error401', { user });
    } else {
      res.render('updateEvent', { eventUpdate, user })
    }
  } catch (err) {
    console.log(err);
    //res.status(500).json({ msg: "an error occured", err })
    const user = req.session?.user
    res.render('error404', { user })
  }

});

router.get("/create_an_event", async (req, res) => {
  if (!req.session?.user?.logged_in) {
    res.render('error401');
  } else {
    const user = req.session?.user
    res.render('createEvent', { user })
  }
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

router.get('*', (req, res) => {
  const user = req.session?.user
  res.render('error404', { user })
})

module.exports = router;
