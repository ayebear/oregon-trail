<?php
include "config.php";

if (empty($_POST)) {
	// Get deaths
	$deaths = [];
	if (!$result = $db->query("SELECT * FROM `deaths`")) {
		die("Error: " . $db->error);
	}
	while ($row = $result->fetch_assoc()) {
		array_push($deaths, [
			"name" => $row["name"],
			"location" => $row["location"],
			"date" => $row["date"]
		]);
	}

	// Return data as JSON
	echo json_encode($deaths);

} else if (isset($_POST["death"])) {
	// Add a death
	$json = json_decode($_POST["death"], true);

	$query = $db->prepare("INSERT INTO ehebert1.deaths VALUES (?, ?, ?)");
	$query->bind_param("si", $json["name"], $json["location"], $json["date"]);
	$query->execute();
}

$db->close();
