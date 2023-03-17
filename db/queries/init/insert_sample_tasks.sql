-- Framework for inserting sample tasks
INSERT INTO tasks
    (`id`, `task`, `for`, `priority`, `length`, `time_unit`, `desc`)
VALUES
    (?, ?, ?, ?, ?, ?, ?);