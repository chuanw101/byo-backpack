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

router.get('/profile', async (req, res) => {

  const userEvent = await Event.findAll({
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
