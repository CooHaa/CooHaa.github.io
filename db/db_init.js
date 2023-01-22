const db = require("./db_connection");
const fs = require("fs");

// Import queries
const create_tasks_table = fs.readFileSync(__dirname + "/queries/init/create_tasks_table.sql", {encoding: "utf-8"});
const drop_tasks_table = fs.readFileSync(__dirname + "/queries/init/drop_tasks_table.sql", {encoding: "utf-8"});
const insert_sample_tasks = fs.readFileSync(__dirname + "/queries/init/insert_sample_tasks.sql", {encoding: "utf-8"});
const read_tasks_table = fs.readFileSync(__dirname + "/queries/init/read_tasks_table.sql", {encoding: "utf-8"});

// Drop former tasks table
db.execute(drop_tasks_table);

// Recreate table
db.execute(create_tasks_table);

// Insert sample data
db.execute(insert_sample_tasks, ['Math Homework', 'School', 'High', '20', 'minutes', '0']);
db.execute(insert_sample_tasks, ['World Domination', 'Self', 'Low', '20', 'years', '0']);
db.execute(insert_sample_tasks, ['Sleep', 'Self', 'High', '8', 'hours', '0']);

// Read table
db.execute(read_tasks_table, 
    (error, results) => {
        console.log(results);   
    }
);

db.end();