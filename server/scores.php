<?php
include "config.php";

if (empty($_POST)) {
	// Get scores
	$scores = [];
	if (!$result = $db->query("SELECT * FROM `scores` ORDER BY `score` DESC LIMIT 0, 10")) {
		die("Error: " . $db->error);
	}
	while ($row = $result->fetch_assoc()) {
		array_push($scores, [
			"name" => $row["name"],
			"score" => $row["score"]
		]);
	}

	// Return data as JSON
	echo json_encode($scores);

} else if (isset($_POST["score"])) {
	// Add a score
	$json = json_decode($_POST["score"], true);

	$query = $db->prepare("INSERT INTO ehebert1.scores VALUES (?, ?)");
	$query->bind_param("si", $json["name"], $json["score"]);
	$query->execute();
}

$db->close();
