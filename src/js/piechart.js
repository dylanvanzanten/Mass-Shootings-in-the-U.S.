// Original: https://bl.ocks.org/mbostock/3887235
width = 600;
height = 600;
var radius = Math.min(width, height) / 2;

var svgPie = d3.select(".svgPie")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

radius = Math.min(width, height) / 2;

// Set range of colors for the pie chart.
var colorPie = d3.scaleOrdinal()
    .range(["#E0E4CC", "#D6DAC2", "#7BB0A6", "#7BB0A6", "#92F22A", "#64DDBB"])

var pie = d3.pie()
    .sort(null)
    .value(function (d) {
        return d.Percentage;
    });

var pathPie = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.csv("data/shootingsperrace.csv", function (d) {
    d.Percentage = +d.Percentage;
    return d;
}, function (error, data) {
    if (error) throw error;

    var gPie = svgPie.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    gPie.append("path")
        .attr("d", pathPie)
        .attr("fill", function (d) {
            return colorPie(d.data.Race);
        });

    gPie.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 200)
        .attr("fill", "#050505");

    gPie.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .attr("dy", "0.35em")
        .text(function (d) {
            return d.data.Race;
        });

    // How to add a nice legend to a d3 pie chart: https://stackoverflow.com/questions/32298837/how-to-add-a-nice-legend-to-a-d3-pie-chart
    // Here we create a legend for the pie chart and load the data we are using in the pie chart also.
    var legend = svgPie.selectAll(".legend")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            return "translate(" + (width - 600) + "," + (i * 30 + -70) + ")";
        })
        .attr("class", "legend");

    legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", function (d, i) {
            return colorPie(i);
        })
        .attr("y", -20)

    legend.append("text")
        .text(function (d) {
            return d.data.Race + ": " + "" + d.data.Percentage + "%";
        })
        .style("font-size", 18)
        .attr("x", 35)
        .attr("y", -2);
});