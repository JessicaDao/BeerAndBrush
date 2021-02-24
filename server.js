// Dependencies
var express = require("express");
// Sessions - generates server size cookies, stores data
const session = require("express-session");

// Create an instance of the express app.
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

// Models for syncing
const db = require("./models");

// Set up Express app to handle data parsing
app.use(express.urlencoded({extended: true}));

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
const controllers = require("./controllers/html-controllers")
app.use(controllers)

const userRoutes = require("./controllers/userController");
app.use(userRoutes);


// ----

db.sequelize.sync({force: false}).then(function () { // Start our server so that it can begin listening to client requests.
    app.listen(PORT, function () { // Log (server-side) when our server has started
        console.log("Server listening on: http://localhost:" + PORT);
    });
});
