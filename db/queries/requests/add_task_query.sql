-- Creates a new task
INSERT INTO tasks
    (`task`, `for`, `priority`, `length`, `time_unit`, `desc`, `userid`)
VALUES
    (?, ?, ?, ?, ?, ?, ?);