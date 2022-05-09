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
      res.render('home', {event: hbsEvents})
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
      res.render("eventbyid", data)
  })
})

router.get('/profile', (req, res) => {

  const user = req.session.user
  res.render('profile', { user });
});


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
