-- Framework for inserting sample tasks
INSERT INTO tasks
    (`id`, `task`, `for`, `priority`, `length`, `time_unit`, `status`, `desc`)
VALUES
    (?, ?, ?, ?, ?, ?, ?, ?);