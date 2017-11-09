// Original: https://bl.ocks.org/mbostock/4090848
width = 960;
height = 600;

var svgMap = d3.select(".svgMap")
    .attr("width", width)
    .attr("height", height)
    .append("g");

var projection = d3.geoMercator()
var path = d3.geoPath();

// Load the json file where the map is being rendered.
d3.json("https://d3js.org/us-10m.v1.json", function (error, us) {
    if (error) throw error;

    // Loading in the data from a .csv file.
    d3.csv("data/data.csv", function (data) {
        // console.log(data)
        return data;
    }, function (error, data) {
        if (error) throw error;
        // Append a group element to the main svg of the map.
        svgMap.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path);
        // Append a path to the group object.
        svgMap.append("path")
            // Give the path a classname.
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            })));
        // Select all the circles and link the data to it.
        svgMap.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            // Set the radius to the amount of fatalities.
            .attr("r", function (d) {
                // Return with the data of the amount of fatalities. r now includes the amount of fatalities.
                return d.Fatalities;
            })
            // Set the cx of the circle the latitude where it is being located.
            .attr("cx", function (d) {
                //Use latitude as x-axis.
                console.log(projection([d.Latitude, d.Longitude])[0])
                projection([d.Latitude, d.Longitude])[0]
            })
            // Set the cy of the circle the longitude where it is being located.
            .attr("cy", function (d) {
                //Use longitude as y-axis.
                projection(d.Longitude)[0];
            })
            // Give the circles a color.
            .style("fill", "pink")
    });

});