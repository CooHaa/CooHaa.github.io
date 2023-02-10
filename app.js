// Creating app
const express = require('express');
const app = express();
const port = 8080;

// Middleware
const logger = require('morgan');
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : false}));

// DB
const db = require('./db/db_connection');
const fs = require("fs");
const read_all_tasks_query = fs.readFileSync(__dirname + "/db/queries/requests/read_all_tasks_query.sql", {encoding: "utf-8"});
const read_task_query = fs.readFileSync(__dirname + "/db/queries/requests/read_task_query.sql", {encoding: "utf-8"});
const delete_task_query = fs.readFileSync(__dirname + "/db/queries/requests/delete_task_query.sql", {encoding : "utf-8"});
const add_task_query = fs.readFileSync(__dirname + "/db/queries/requests/add_task_query.sql", {encoding : "utf-8"});
const update_task_query = fs.readFileSync(__dirname + "/db/queries/requests/update_task_query.sql", {encoding : "utf-8"});

// EJS Config
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

// Get: Task list
app.get("/list", (req, res) => {
    db.execute(read_all_tasks_query, (error, results) => {
        if (error) res.status(500).send(error);
        else res.render("list", {list : results})
    });
    // res.sendFile(__dirname + "/views/list.html");
});

// Get: Specific task
app.get("/list/task/:id", (req, res) => {
    db.execute(read_task_query, [req.params.id], (error, results) => {
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
app.get("/list/task/:id/delete", (req, res) => {
    db.execute(delete_task_query, [req.params.id], (error, results) => {
        if (error) res.status(500).send(error);
        else res.redirect("/list");
    });
});

// Get: Navigate to add task page
app.get("/list/addtask", (req, res) => {
    res.render("addtask");
});

// Post: Create new task
app.post("/list/addtask", (req, res) => {
    db.execute(add_task_query, [req.body.task_name, req.body.for, req.body.priority, req.body.length, req.body.time_unit, req.body.description], (error, results) => {
        if (error) res.status(500).send(error);
        else res.redirect(`task/${results.insertId}`);
    });
});

// Post: Update existing task
app.post("/list/task/:id", (req, res) => {
    db.execute(update_task_query, [req.body.for, req.body.priority, req.body.length, req.body.time_unit, req.body.description, req.params.id], (error, results) => {
        if (error) res.status(500).send(results);
        else res.redirect(`/list/task/${req.params.id}`);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});