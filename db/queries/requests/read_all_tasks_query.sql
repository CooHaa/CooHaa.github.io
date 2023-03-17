-- Query all tasks
SELECT id, task, reason.reason, priority.priority, length, time_unit.time_unit, tasks.desc FROM tasks
JOIN reason
    ON tasks.for = reason.reason_id
JOIN priority
    ON tasks.priority = priority.priority_id
JOIN time_unit
    ON tasks.time_unit = time_unit.time_unit_id
WHERE
    userid = ?
ORDER BY tasks.priority DESC;