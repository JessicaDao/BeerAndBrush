const cors = require("cors")
// Dependencies
var express = require("express");
// Sessions - generates server size cookies, stores data
const session = require("express-session");

// Create an instance of the express app.
const app = express();
app.use(cors());

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3001;

// Models for syncing
const db = require("./models");

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// saving data
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
    } // max time saved 2hrs before logout
}))

// Static directory
app.use(express.static("public"));


// Data

// Routes
app.use('/api/user', require("./controllers/user-controller"));
app.use('/api/project', require('./controllers/project-controller'));
app.use('/api/reviews', require('./controllers/review-controller'));
app.use('/api/gallery', require('./controllers/gallery-controller'));
app.use('/api/classes', require('./controllers/class-controller'));
app.use('/api/portfolio', require('./controllers/portfolio'));

// ----

db.sequelize.sync({ force: false }).then(function () { // Start our server so that it can begin listening to client requests.
    app.listen(PORT, function () { // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
