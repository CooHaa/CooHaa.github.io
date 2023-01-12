const express = require('express');
const app = express();
const port = 8080;

const logger = require('morgan');

app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/list", (req, res) => {
    res.sendFile(__dirname + "/views/list.html");
});

app.get("/list/task", (req, res) => {
    res.sendFile(__dirname + "/views/task1.html");
});

app.get("/list/addtask", (req, res) => {
    res.sendFile(__dirname + "/views/addtask.html");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});