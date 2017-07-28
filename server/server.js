var googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyDJp3hpJjzZXl6rcohe7MSdxlV6VZAMGgA"
});

var regex = /blvd\.|calz\.|av\.|entre([^,]+),|cp([^,]+)|c\.p\.([^,]+)|c\.p([^,]+)|\(oficial\)|carr\.|col\.|no\.|avenida|delg\.|d\.f|edo\. de \mexico|s\/n|edo\. de mex\.|#|del\.|cd\.|N°|lt.|u. hab.|mz\./gi;

var fs = require("fs");
var express = require("express");
var routes = require("./routes/routes");

var app = express();
var port = process.env.PORT || 4000;

var locations;
var retrievedLocations = [];

var isRetrieving;

var initialLocationsLength;
var retrieveCounter = 0;

var updatePercent = function(remainingLocations, obj) {
	retrieveCounter++;
	var percent = retrieveCounter / initialLocationsLength * 100;
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write("Retrieving locations: " + percent + "% ");
};

var saveFile = function() {
	fs.writeFile(
		"retrieved_locations.json",
		JSON.stringify(retrievedLocations),
		"utf8",
		function(err) {
			if (err)
				console.log(
					"\x1b[31m",
					"It wasn't possible to save retrieved locations file"
				);
			else console.log("Finished retrieving locations");
		}
	);
};

var getGeocodingLocations = function(remainingLocations) {
	if (!remainingLocations.length) {
		saveFile();
		return;
	}

	var address = remainingLocations[0].Address.replace(regex, "");
	googleMapsClient.geocode({ address: address }, (err, response) => {
		if (!err) {
			if (response.json.results[0]) {
				retrievedLocations.push({
					name: remainingLocations[0].Name,
					address: remainingLocations[0].Address,
					location: response.json.results[0].geometry.location
				});
			}
			updatePercent(remainingLocations, response.json.results);
			remainingLocations.shift();
			getGeocodingLocations(remainingLocations);
		} else {
			updatePercent(remainingLocations, response.json.results);
			remainingLocations.shift();
			getGeocodingLocations(remainingLocations);
		}
	});
};

routes(app);

app.listen(port);
console.log("Code challenge API started on: " + port);

try {
	require("./retrieved_locations.json");
	console.log("Retrieved locations file found");
} catch (e) {
	try {
		locations = require("./store_directory.json");
		if (locations.length > 0) {
			console.log(
				"No retrieved locations file detected. Starting to retrieve."
			);
			initialLocationsLength = locations.length;
			getGeocodingLocations(locations);
		} else {
			console.log("No content in store_directory.json");
		}
	} catch (e) {
		console.log(e);
		console.log("\x1b[31m", "It wasn't possible to get locations!!!!!!!!!!!!");
	}
}
