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

// search events by city or state
router.get('/search/:location', (req, res) => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;
  // its a city
  if (req.params.location.length > 2) {
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
        const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
        const user = req.session?.user
        user.searchTerm = req.params.location;
        res.render('searchResult', { event: hbsEvents, user })
      });
  }

  // its a state search
  else {
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
        state: req.params.location
      },
      order: ['start_time'],

    })
      .then(dbEvents => {
        const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
        const user = req.session?.user
        user.searchTerm = req.params.location;
        res.render('searchResult', { event: hbsEvents, user })
      });
  }

});


// search events by city and state
router.get('/search/:city/:state', (req, res) => {
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
      city: req.params.city,
      state: req.params.state
    },
    order: ['start_time'],

  })
    .then(dbEvents => {
      const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
      const user = req.session?.user
      user.searchTerm = req.params.city + ", " + req.params.state;
      res.render('searchResult', { event: hbsEvents, user })
    });
});

//render event by id
router.get("/eventbyid/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
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
      // check if user is creator
      if (data.creator_id == data.user.id) {
        data.user.isCreator = true;
      } else {
        data.user.isCreator = false;
      }
    }

    if (data.public) {
      res.render("eventbyid", data)
    } else {
      if (data.user.isRSVP) {
        res.render("eventbyid", data)
      } else if (data.creator_id == data.user.id) {
        res.render("eventbyid", data)
      } else {
        // access deny if private and not invited and not event creator
        const user = req.session?.user
        res.render('error401', { user })
      }
    }
    
  } catch (err) {
    console.log(err)
    const user = req.session?.user
    res.render('error404', { user })
  }
})

// render profile
router.get('/profile', async (req, res) => {
  try {
    if (!req.session?.user.logged_in) {
      res.render('error401', { user });
    } else {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      const dbEvents = await Event.findAll({
        include: [{
          model: Item,
        }, {
          model: User,
          as: 'yeses',
          where: { '$yeses.attendee.rsvp_status$': 1 }, required: false
        }],
        where: {
          creator_id: req.session.user?.id,
          start_time: { [Op.gt]: dateTime },
        },
        order: ['start_time']
      })
      const events = dbEvents.map(event => event.get({ plain: true }))
      const publicEvents = events.filter(event => event.public)
      const privateEvents = events.filter(event => !event.public)

      const past = await Event.findAll({
        where: {
          creator_id: req.session.user?.id,
          start_time: { [Op.lt]: dateTime },
        },
        order: ['start_time']
      })
      const pastEvents = past.map(event => event.get({ plain: true}))

      const invited = await Event.findAll({
        include: [{
          model: Item,
        }, {
          model: User,
          as: 'attendees',
        }, {
          model: User,
          as: 'yeses',
          where: {'$yeses.attendee.rsvp_status$': 1 }, required: false
        }],
        where: {
          //invited, not creator, and upcoming events only
          '$attendees.id$': req.session.user?.id,
          creator_id: { [Op.ne]: req.session.user?.id },
          start_time: { [Op.gt]: dateTime },
        },
        order: ['start_time']
      })
      let count = 0;
      for (const event of invited) {
        if (event.attendees[0].attendee.rsvp_status == 0) {
          count++;
        }
      }
      const invitedEvents = invited.map(event => event.get({ plain: true }))
      req.session.user.noti = 0;
      const user = req.session?.user
      user.noResCount = count;
      res.render('profile', { publicEvents, privateEvents, invitedEvents, pastEvents, user})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err })
  }
});

// render invite user invite
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
          users[i].isInvited = found;
        }

        res.render('invite', { users, user, curEvent })
      }
    }
  }
  catch (err) {
    const user = req.session?.user
    res.render('error404', { user })
  }
})

// render update page
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
