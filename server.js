const path = require("path");
const express = require("express");
const session = require("session");
const exphb = require("express-handlebars");
const helpers = require('./utils/helpers');

const app = express();
const PORT = port.env.PORT || 3001;

const sequelize = require("./config/config");
const SequelizeStore = require("connecdt-session-sequelize")(session.Store);

const sess = {
  secret: "Super duper secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  }
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({ helpers });

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log('Now listening on Port ${PORT}!');
  sequelize.sync({ force: false });
});
