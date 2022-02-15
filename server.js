// Server Dependancies
require("dotenv").config();
const path = require('path');



// Web server config
const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./db/db');



// Express Middleware
const morgan = require("morgan");
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');
const sassMiddleware = require("./lib/sass-middleware");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride('_method'));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SECRET_KEY]
}));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);



// // User Routes
const userRouter = express.Router();
const userRoutes = require('./routes/userRoutes');
userRoutes(userRouter, db);
app.use('/', userRouter);
app.use(express.static(path.join(__dirname, './public')));


// API Routes
const apiRouter = express.Router();

const mapAPIRoutes = require('./routes/api/maps');
const pointAPIRoutes = require('./routes/api/points');
const userAPIRoutes = require('./routes/api/users');

mapAPIRoutes(userRouter, db);
pointAPIRoutes(userRouter, db);
userAPIRoutes(userRouter, db);

app.use('/api/map', apiRouter);
app.use('/api/point', apiRouter);
app.use('/api/user', apiRouter);



// App Listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
