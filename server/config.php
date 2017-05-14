<?php

$db = new mysqli("<DB_SERVER>", "<USERNAME>", "<PASSWORD>", "<DB_NAME>");
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
