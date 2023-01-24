const db = require("./db_connection");
const fs = require("fs");

// Import queries
// const create_tasks_table = fs.readFileSync(__dirname + "/queries/init/create_tasks_table.sql", {encoding: "utf-8"});
// const drop_tasks_table = fs.readFileSync(__dirname + "/queries/init/drop_tasks_table.sql", {encoding: "utf-8"});
const insert_sample_tasks = fs.readFileSync(__dirname + "/queries/init/insert_sample_tasks.sql", {encoding: "utf-8"});
const read_tasks_table = fs.readFileSync(__dirname + "/queries/init/read_tasks_table.sql", {encoding: "utf-8"});
const read_tasks_detail = fs.readFileSync(__dirname + "/queries/init/read_tasks_detail.sql", {encoding: "utf-8"});
const clear_tasks_table = fs.readFileSync(__dirname + "/queries/init/clear_tasks_table.sql", {encoding: "utf-8"});

// Clear current tasks table
db.execute(clear_tasks_table);

// Insert sample data
db.execute(insert_sample_tasks, ['Math Homework', '2', '3', '20', '2', '0']);
db.execute(insert_sample_tasks, ['World Domination', '1', '1', '20', '3', '0']);
db.execute(insert_sample_tasks, ['Sleep', '1', '3', '8', '2', '0']);

// Read table
db.execute(read_tasks_table, 
    (error, results) => {
        console.log(results);   
    }
);

// Read with more detail
db.execute(read_tasks_detail, 
    (error, results) => {
        console.log(results);
    }
);

db.end();