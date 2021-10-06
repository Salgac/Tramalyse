export function readGpx(fileContent) {
	//fun reads .gpx content and creates a data object
	var parser = new DOMParser();
	var document = parser.parseFromString(fileContent, "text/xml");
	var trackPoints = Array.from(document.getElementsByTagName("trkpt"));
	var parsedPoints = [];
	var prevPoint = {
		lat: trackPoints[0].getAttribute("lat"),
		lon: trackPoints[0].getAttribute("lon"),
		dst: 0,
	};

	trackPoints.forEach((point) => {
		var lat = point.getAttribute("lat");
		var lon = point.getAttribute("lon");

		var pt = {
			lat: lat,
			lon: lon,
			time: point.getElementsByTagName("time")[0].innerHTML,
			ele: point.getElementsByTagName("ele")[0].innerHTML,
			speed: point.getElementsByTagName("speed")[0].innerHTML,
			course: point.getElementsByTagName("course")[0].innerHTML,
			hacc: point.getElementsByTagName("hacc")[0].innerHTML,
			dst: prevPoint.dst + getDistance(prevPoint, { lat: lat, lon: lon }),
		};
		parsedPoints.push(pt);
		prevPoint = pt;
	});

	return parsedPoints;
}

export function generateInfo(points) {
	var info = {
		timeStart: new Date(points.at(0).time).toLocaleString("de-ch"),
		timeEnd: new Date(points.at(-1).time).toLocaleString("de-ch"),
		distance: points.at(-1).dst,
		elevationMin: Math.min(...points.map(p => p.ele)),
		elevationMax: Math.max(...points.map(p => p.ele)),
		speedAvg: points.reduce((total, next) => total + Number(next.speed), 0) / points.length,
		speedMax: Math.max(...points.map(p => p.speed)),
	}
	return info;
}

function getDistance(point1, point2) {
	// calculate the distance between point 1 and 2 in metres
	let R = 6378137;
	let dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
	let dLong = ((point2.lon - point1.lon) * Math.PI) / 180;
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((point1.lat * Math.PI) / 180) *
		Math.cos((point1.lat * Math.PI) / 180) *
		Math.sin(dLong / 2) *
		Math.sin(dLong / 2);

	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}