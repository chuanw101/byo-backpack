const router = require('express').Router();
const { User, Event, Item } = require('../models');

// home route
router.get('/', (req, res) => {
  Event.findAll({
    include: [{
      model: Item,
      include: [User]
    }, {
      model: User,
      as: 'creator'
    }, {
      model: User,
      as: 'attendees'
    }],
  })
    .then(dbEvents => {
      const hbsEvents = dbEvents.map(event => event.get({ plain: true }))
      res.render('home', { event: hbsEvents })
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
      as: 'attendees'
    }],
  }).then(eventData => {
      const data = eventData.get({ plain: true })
      data.user = req.session?.user
      data.user.isRSVP = false;
      // check if user is RSVP'd
      for (const att of data.attendees) {
        if (att.id == data.user.id) {
          data.user.isRSVP = true;
        }
      }
      res.render("eventbyid", data)
  })
})

router.get('/profile', (req, res) => {
  const userEvent = Event.findAll({
    include: [{
      model: Item,
      include: [User]
  }, {
      model: User,
      as: 'creator'
  }, 
  {
      model: User,
      as: 'attendees'
  }
],
    where: {
      id: req.session.user.id
    }
  }).catch((err) => {
    res.json(err)
  })
  const events = userEvent.map((event) => event.get({ plain: true }));
  const user = req.session.user;
  console.log("---------")
  console.log(events)
  // console.log(user)
 if(events){

   res.render('profile', { events, user });
 }
})


router.get('/login', (req, res) => {

  res.render('login')
});


router.get('/signup', (req, res) => {
  res.render('signup')
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/login")
});
module.exports = router;
