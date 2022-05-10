const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the custom helper methods
//const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ });
hbs.handlebars.registerHelper('format_time', function(date) {
  return date.toDateString()+ " - " +date.toLocaleTimeString();
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
