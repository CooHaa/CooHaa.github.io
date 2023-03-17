-- Counts high priority tasks in the task inventory
SELECT count(tasks.id) AS count FROM priority
LEFT JOIN tasks
	ON priority.priority_id = tasks.priority
    AND userid = ?
GROUP BY priority.priority_id;