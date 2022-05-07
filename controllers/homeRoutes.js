const router = require('express').Router();
const { User, Event } = require('../models');

// home route
router.get('/', (req, res) => {

  res.render('home')
});
router.get('/home', (req, res) => {
  
  const user = req.session.user
  res.render('home', {user });
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
