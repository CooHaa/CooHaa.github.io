-- Reads all current reasons in DB
SELECT reason_id, reason FROM reason
WHERE (reason.userid IS NULL || reason.userid = ?); 