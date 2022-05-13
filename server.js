const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
require("dotenv").config();
const moment = require('moment');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the custom helper methods
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ });

// helper for formatting time
hbs.handlebars.registerHelper('format_time', function(date) {
  return date.toDateString()+ " at " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
})
hbs.handlebars.registerHelper('format_time_value', function(date) {
  return moment(date).format("YYYY-MM-DDThh:mm");
})
hbs.handlebars.registerHelper('compare', function(a, b) {
  return a==b;
})

const sess = {
  secret: process.env.SESSION_SECRET,
//   secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to port'+ PORT ));
});
