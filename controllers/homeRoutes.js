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

  if (req.session.user.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.render('/login');
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;
