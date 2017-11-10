// Original: https://bl.ocks.org/mbostock/3887235
// Width and height for the pie chart.
width = 900;
height = 600;

// Variable for the pie chart radius.
var radius = Math.min(width, height) / 2;

// Create a variable vor the pei chart.
// Give the variable with and height.
// Position the pie chart with calculation including the width and height variable.
var svgPie = d3.select(".svgPie")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Set the radius of the pie.
radius = Math.min(width, height) / 2;

// Set range of colors for the pie chart.
// Each color is linked to the data points.
var colorPie = d3.scaleOrdinal()
    .range(["rgba(183, 61, 55, 1)", "rgba(183, 61, 55, 0.75)", "rgba(183, 61, 55, 0.50)", "rgba(183, 61, 55, 0.25)", "#202020", "#666666"])

// Create variable fpr the pie chart and return the pie with the Percentage fromt the data.
var pie = d3.pie()
    .sort(null)
    .value(function (d) {
        return d.Percentage;
    });

// Path for the pie and calculate the outer and inner radius for the pie.
var pathPie = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

// Load the data give the data that the pie chart need to have.
d3.csv("data/shootingsperrace.csv", function (d) {
    d.Percentage = +d.Percentage;
    return d;
}, function (error, data) {
    if (error) throw error;

    // Select als the arc and append a group and attribute to it. In this case a classname.
    var gPie = svgPie.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

    // Append a path to the group and fill it eith the race from the data.
    gPie.append("path")
        .attr("d", pathPie)
        .attr("fill", function (d) {
            return colorPie(d.data.Race);
        });

    // Append a extra circle to the pie chart in the middle, so that is now looking like a donut chart.
    gPie.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 200)
        .attr("fill", "#050505");

    // How to add a nice legend to a d3 pie chart: https://stackoverflow.com/questions/32298837/how-to-add-a-nice-legend-to-a-d3-pie-chart
    // Here we create a legend for the pie chart and load the data we are using in the pie chart also.
    var legend = svgPie.selectAll(".legend")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            return "translate(" + (width - 950) + "," + (i * 30 + -80) + ")"; // place each legend on the right and bump each one down 15 pixels
        })
        .attr("class", "legend");

    // Append a rectangle to a legend and give it a width, height and ofcourse a position to it.
    // Fill the rectangles with the same color as the paths.
    legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("y", 5)
        .attr("x", -35)
        .attr("fill", function (d, i) {
            return colorPie(i);
        });

    // Append to the legend text.
    // Give it a font-size and position to it.
    // Return in the text the d.data.Race + the d.data.Percentage and finally add a % to it.
    legend
        .append("text")
        .style("font-size", 18)
        .attr("y", 10)
        .attr("x", 11)
        .text(function (d) {
            return d.data.Race + ": " + "" + d.data.Percentage + "%";
        });
});