-- Framework for inserting sample tasks
INSERT INTO tasks
    (`task`, `for`, `priority`, `length`, `time_unit`, `status`)
VALUES
    (?, ?, ?, ?, ?, ?);