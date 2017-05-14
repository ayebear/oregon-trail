<?php
header("Access-Control-Allow-Origin: *");

include "config.php";

$data = [
	"scores" => [],
	"deaths" => []
];

if (isset($_POST["score"])) {
	$json = json_decode($_POST["score"]);
	// Add a score
	$query = $db->prepare("INSERT INTO ehebert1.scores VALUES (?, ?)");
	$query->bind_param("si", $json["name"], $json["score"]);
	$query->execute();

} elseif (isset($_POST["death"])) {
	// Add a death

} else {
	// Get scores
	if (!$result = $db->query("SELECT * FROM `scores` LIMIT 0, 10")) {
		die("Error: " . $db->error);
	}
	while ($row = $result->fetch_assoc()) {
		array_push($data["scores"], [
			"name" => $row["name"],
			"score" => $row["score"]
		]);
	}

	// Get deaths
	if (!$result = $db->query("SELECT * FROM `deaths`")) {
		die("Error: " . $db->error);
	}
	while ($row = $result->fetch_assoc()) {
		array_push($data["deaths"], [
			"name" => $row["name"],
			"location" => $row["location"],
			"date" => $row["date"]
		]);
	}

	// Return data as JSON
	echo json_encode($data);
}

$db->close();
