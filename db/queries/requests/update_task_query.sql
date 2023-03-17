-- Updates a specific task
UPDATE tasks
SET
    tasks.for = ?,
    tasks.priority = ?,
    tasks.length = ?,
    tasks.time_unit = ?,
    tasks.desc = ?
WHERE
    tasks.id = ?
    AND tasks.userid = ?;