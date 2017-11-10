// Original: https://bl.ocks.org/mbostock/3885304
// Set the margins, wirth and height for the chart.
var margin = {
        top: 20,
        right: 20,
        bottom: 100,
        left: 40
    },
    width = 800,
    height = 600;

// Set the ranges and padding.
var xBar = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

var yBar = d3.scaleLinear()
    .range([height, 0]);

// Variable for the tooltip, which is later getting requested.
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

// Append the svg object to the body of the page.
// Append a 'group' element to 'svg'.
// Moves the 'group' element to the top left margin.
var svgBar = d3.select(".svgBar")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Load the data.
d3.csv("data/data.csv", function (error, data) {

    // Only get the first 15 data to be loaded into the bar chart.
    data = data.splice(0, 15)
    if (error) throw error;

    // Format the data towards the bar chart
    data.forEach(function (d) {
        d.Fatalities = +d.Fatalities;
    });

    // Scale the range of the data in the domains.
    xBar.domain(data.map(function (d) {
        return d.Location;
    }));
    yBar.domain([0, d3.max(data, function (d) {
        return d.Fatalities;
    })]);

    // Append the rectangles for the bar chart.
    // Link the data into it and enter for the rectangles.
    svgBar.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        // Bar Chart with Tooltip with Tooltip D3 V4: https://bl.ocks.org/alandunning/274bf248fd0f362d64674920e85c1eb7 
        // Mouseover event where the tooltip is being added to the bars.
        // It has a transition on 0.2 seconds before it is being shown.
        // Set in the tooltip the data of the airline name and the amount of incidents.
        .on("mousemove", function (d) {
            tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html((d.Location) + "<br>" + (d.Fatalities) + " Fatalities");
        })
        // Mouseout event to remove the tooltip.
        .on("mouseout", function (d) {
            tooltip.style("display", "none");
        })
        // Give the bars a classname.
        .attr("class", "bar")
        .style("fill", function (d) {
            if (d.Fatalities <= 5) {
                return "rgba(183, 61, 55, 0.25)"
            } else if (d.Fatalities <= 10) {
                return "rgba(183, 61, 55, 0.50)"
            } else if (d.Fatalities <= 15) {
                return "rgba(183, 61, 55, 0.75)"
            } else {
                return "rgba(183, 61, 55, 1)"
            }
        })
        .attr("x", function (d) {
            return xBar(d.Location);
        })
        .attr("width", xBar.bandwidth())
        .attr("y", function (d) {
            return yBar(d.Fatalities);
        })
        // Give height 0. After the transition the height is being added again with the data.
        .attr("height", 0)
        .transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .attr("height", function (d) {
            return height - yBar(d.Fatalities);
        });

    // Add the x-Axis.
    // Style and move a bit of the text.
    // Rotate the text.
    svgBar.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xBar))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)")
    d3.selectAll("line")
        .attr("y2", 15);
    d3.selectAll("text")
        .attr("x", -10)
        .attr("y", 20);

    // Add the y-Axis.
    svgBar.append("g")
        .call(d3.axisLeft(yBar));
});