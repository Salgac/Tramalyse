import * as JSON5 from "json5";

export function readGpx(fileContent) {
  //fun reads .gpx content and creates a data object
  var parser = new DOMParser();
  var document = parser.parseFromString(fileContent, "text/xml");
  var trackPoints = Array.from(document.getElementsByTagName("trkpt"));
  var parsedPoints = [];

  //error handling
  if (trackPoints.length == 0) {
    return null;
  }

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
      speed: parseFloat(point.getElementsByTagName("speed")[0].innerHTML) * 3.6, //from m/s to km/h
      tramSpeed:
        parseFloat(point.getElementsByTagName("vtram")[0]?.innerHTML) * 3.6, //from m/s to km/h
      course: point.getElementsByTagName("course")[0]?.innerHTML,
      hacc: point.getElementsByTagName("hacc")[0]?.innerHTML,
      dst: prevPoint.dst + getDistance(prevPoint, { lat: lat, lon: lon }),
    };
    parsedPoints.push(pt);
    prevPoint = pt;
  });
  return parsedPoints;
}

// experimental
export function readLog(fileContent) {
  const lines = fileContent.split("\n").filter((n) => n);
  var parsedPoints = [];

  var prevPoint = {
    lat: JSON5.parse(lines[0]).lat,
    lon: JSON5.parse(lines[0]).lon,
    dst: 0,
  };

  var lastSpeed = 0.0;

  lines.forEach((line) => {
    try {
      var json = JSON5.parse(line);
      var lat = json.lat;
      var lon = json.lon;

      if (json.gSpeed != undefined) {
        lastSpeed = json.gSpeed;
      }

      if (lat != undefined && lon != undefined && lat != 0 && lon != 0) {
        var pt = {
          lat: lat,
          lon: lon,
          time: new Date(json.timestamp * 1000).toISOString(),
          ele: json.height / 1000,
          speed: lastSpeed * 0.036,
          course: json.heading,
          hacc: parseFloat(json.hAcc) / 100000,
          dst: prevPoint.dst + getDistance(prevPoint, { lat: lat, lon: lon }),
        };
        parsedPoints.push(pt);
        prevPoint = pt;
      }
    } catch (e) {
      //console.log(line);
    }
  });
  return parsedPoints;
}

export function generateInfo(points) {
  //error handling
  if (points.length == 0) {
    return {};
  }

  return {
    timeStart: new Date(points.at(0).time),
    timeEnd: new Date(points.at(-1).time),
    distance: points.at(-1).dst,
    elevationMin: Math.min(...points.map((p) => p.ele)),
    elevationMax: Math.max(...points.map((p) => p.ele)),
    speedAvg:
      points.reduce((total, next) => total + Number(next.speed), 0) /
      points.length,
    speedMax: Math.max(...points.map((p) => p.speed)),
    haccMin: Math.max(...points.map((p) => p.hacc)) * 10000,
    haccAvg:
      (points.reduce((total, next) => total + Number(next.hacc), 0) /
        points.length) *
      10000,
    haccMax: Math.min(...points.map((p) => p.hacc)) * 10000,
  };
}

export async function sliceByStops(points, stops) {
  var sections = [];

  var startIndex = 0,
    lastStop = { name: "Start" },
    currentStop = null;
  points.forEach((point, i) => {
    if (parseFloat(point.speed).toFixed(0) == 0) {
      //tram is stationary, is it in a stop?
      if (currentStop === null) {
        //test if is in stop
        stops.some((stop) => {
          stop.coordinates.forEach((coordinates) => {
            var dst = getDistance(point, coordinates);
            if (dst < 20) {
              //tram is within 20 metres from stop
              currentStop = stop;
              //console.log(stop.name);

              //end last segment and add it into a list of sections
              if (startIndex != i) {
                var newSegment = {
                  start: lastStop.name,
                  end: currentStop.name,
                  points: points.slice(startIndex, i),
                };
                sections.push(newSegment);
              }
              return;
            }
          });
        });
      } else {
        //tram is still in a stop
      }
    } else {
      if (currentStop !== null) {
        //tram has left the stop
        lastStop = currentStop;
        startIndex = i;
        currentStop = null;
      } else {
        //tram is moving
      }
    }
  });

  //handle edge case when recording was stopped outside of a stop
  if (currentStop === null) {
    var newSegment = {
      start: lastStop.name,
      end: "End",
      points: points.slice(startIndex, points.length),
    };
    sections.push(newSegment);
  }

  return sections;
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
