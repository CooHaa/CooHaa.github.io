// Creating app
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const { auth, requiresAuth } = require('express-openid-connect'); // Imports auth section of library

// Middleware
const logger = require('morgan');
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : false}));

// DB
const db = require('./db/db_pool');
const fs = require("fs");
const read_all_tasks_query = fs.readFileSync(__dirname + "/db/queries/requests/read_all_tasks_query.sql", {encoding: "utf-8"});
const read_task_query = fs.readFileSync(__dirname + "/db/queries/requests/read_task_query.sql", {encoding: "utf-8"});
const delete_task_query = fs.readFileSync(__dirname + "/db/queries/requests/delete_task_query.sql", {encoding : "utf-8"});
const add_task_query = fs.readFileSync(__dirname + "/db/queries/requests/add_task_query.sql", {encoding : "utf-8"});
const update_task_query = fs.readFileSync(__dirname + "/db/queries/requests/update_task_query.sql", {encoding : "utf-8"});
const count_tasks_query = fs.readFileSync(__dirname + "/db/queries/requests/count_tasks_query.sql", {encoding : "utf-8"});

// EJS Config
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Helmet - unfortunately, I wasn't able to get my page to work with helmet, so I have this commented out for now.
// const helmet = require('helmet');
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//           defaultSrc: ["'self'"],
//           scriptSrc: ["'self'", 'cdnjs.cloudflare.com', 'cdn.jsdelivr.net'],
//           styleSrc: ["'self'", 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net', 'fontawesome.com'],
//           fontSrc: ["'self'", 'fonts.googleapis.com', 'cdn.jsdelivr.net']
//         }
//     }
// }));

// Auth0
const dotenv = require("dotenv");
dotenv.config();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};
app.use(auth(config));

// Custom middleware to attach auth info to each request
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
});

// Routing
app.get("/", (req, res) => {
    if (req.oidc.isAuthenticated()) {
        db.execute(count_tasks_query, [req.oidc.user.email], (error, results) => {
            if (error) res.status(500).send(error);
            else {
                let total = results[0].count + results[1].count + results[2].count;
                let high = results[2].count;
                res.render("index", {total : total, high : high})
            }
        });
    }
    else {
        res.render("index")
    }
});

app.get("/authtest", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

// Get: Task list
app.get("/list", requiresAuth(), (req, res) => {
    db.execute(read_all_tasks_query, [req.oidc.user.email], (error, results) => {
        if (error) res.status(500).send(error);
        else res.render("list", {list : results})
    });
    // res.sendFile(__dirname + "/views/list.html");
});

// Get: Specific task
app.get("/list/task/:id", requiresAuth(), (req, res) => {
    db.execute(read_task_query, [req.params.id, req.oidc.user.email], (error, results) => {
        if (error) res.status(500).send(error);
        else if (results.length == 0) res.status(404).send(`No task found with id ${req.params.id}`);
        else {
            let data = results[0];
            res.render("task", data);
        }
    });
    // res.sendFile(__dirname + "/views/task1.html");
});

// Get: Delete specific task
app.get("/list/task/:id/delete", requiresAuth(), (req, res) => {
    db.execute(delete_task_query, [req.params.id, req.oidc.user.email], (error, results) => {
        if (error) res.status(500).send(error);
        else res.redirect("/list");
    });
});

// Get: Navigate to add task page
app.get("/list/addtask", requiresAuth(), (req, res) => {
    res.render("addtask");
});

// Post: Create new task
app.post("/list/addtask", requiresAuth(), (req, res) => {
    db.execute(add_task_query, [req.body.task_name, req.body.for, req.body.priority, req.body.length, req.body.time_unit, req.body.description, req.oidc.user.email], (error, results) => {
        if (error) res.status(500).send(error);
        else res.redirect(`task/${results.insertId}`);
    });
});

// Post: Update existing task
app.post("/list/task/:id", requiresAuth(), (req, res) => {
    db.execute(update_task_query, [req.body.for, req.body.priority, req.body.length, req.body.time_unit, req.body.description, req.params.id, req.oidc.user.email], (error, results) => {
        if (error) res.status(500).send(results);
        else res.redirect(`/list/task/${req.params.id}`);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});