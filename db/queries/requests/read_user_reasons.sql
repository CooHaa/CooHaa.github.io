-- Reads all current reasons in DB w/ specified userid
SELECT reason_id, reason FROM reason
WHERE reason.userid = ?; 