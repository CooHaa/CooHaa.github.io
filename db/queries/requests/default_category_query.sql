-- Defaults tasks with a deleted category to "Self"
UPDATE tasks
SET tasks.for = 1
WHERE tasks.for = ?;