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
  keys: ['key1']
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
const userRoutes = require('./routes/userRoutes');
const userRouter = express.Router();
userRoutes(userRouter, db);
app.use('/', userRouter);
app.use(express.static(path.join(__dirname, './public')));





// API Routes
// const usersAPI = require("./routes/api/users");
// const mapsAPI = require("./routes/api/maps");
// const pointsAPI = require("./routes/api/points");
// app.use("/api/users", usersAPI(db));
// app.use("/api/maps", mapsAPI(db));
// app.use("/api/points", pointsAPI(db));



// App Listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
