// Original: https://bl.ocks.org/mbostock/4063269
// Sets the diameter of the svg.
var diameter = 900;

// Selects svg from document and sets the diameter.
// Gives a attribute thw isth and height to it.
var svgBubble = d3.select('.svgBubble')
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g");

// Format for the bubble chart.
var format = d3.format(",d");

var pack = d3.pack()
    .size([diameter, diameter])
    .padding(6);

// Load the data.
// Link the correct data to the places I want to show them on the bubble chart.
d3.csv("data/shootingsperstate.csv", function (d) {
    d.value = +d.value;
    if (d.value) return d;
}, function (error, classes) {
    if (error) throw error;

    var root = d3.hierarchy({
            children: classes
        })
        .sum(function (d) {
            return d.value;
        })
        .each(function (d) {
            if (id = d.data.id) {
                var id, i = id.lastIndexOf(".");
                d.id = id;
                d.package = id.slice(0, i);
                d.class = id.slice(i + 1);
            }
        });

    // Select all the nodes and append a group to it.
    // The group gets a classname.
    var node = svgBubble.selectAll(".node")
        .data(pack(root)
        .leaves())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // Append circle to the root node and adds atrributes
    node.append("circle")
        .attr("id", function (d) {
            return d.id;
        })
        // Give the bubbles a style.
        // If the value is lower or the same with 5 show this color.
        .style("fill", function (d) {
            if (d.value <= 5) {
                return "rgba(183, 61, 55, 0.25)"
            } else if (d.value <= 10) {
                return "rgba(183, 61, 55, 0.50)"
            } else if (d.value <= 15) {
                return "rgba(183, 61, 55, 0.75)"
            } else {
                return "rgba(183, 61, 55, 1)"
            }
        })
        // Animation with a fade transition and a ease to it. 
        // Has a delay of 1000
        .transition()
        .delay(1000)
        .ease(d3.easeElasticOut)
        .attr("r", function (d) {
            return d.r;
        })
        .duration(2000);

    node.append("clipPath")
        .attr("id", function (d) {
            return "clip-" + d.id;
        })
        .append("use")
        .attr("xlink:href", function (d) {
            return "#" + d.id;
        });

    node.append("text")
        .attr("clip-path", function (d) {
            return "url(#clip-" + d.id + ")";
        })
        // Select all the tspan aka text.
        .selectAll("tspan")
        .data(function (d) {
            return d.class.split(/(?=[A-Z][^A-Z])/g);
        })
        .enter()
        .append("tspan")
        .attr("x", 0)
        // Animation with a fade transition and a ease to it. 
        // Has a delay of 1000
        .transition()
        .delay(1000)
        .ease(d3.easeElasticOut)
        // Sets the radius of the circles
        .duration(2000)
        .attr("y", function (d, i, nodes) {
            return 13 + (i - nodes.length / 2 - 0.5) * 10;
        })
        .text(function (d) {
            return d;
        })
});