-- Query tasks table with more detail
SELECT id, task, reason.reason, priority.priority, length, time_unit.time_unit, status FROM tasks
JOIN reason
    ON tasks.for = reason.reason_id
JOIN priority
    ON tasks.priority = priority.priority_id
JOIN time_unit
    ON tasks.time_unit = time_unit.time_unit_id;