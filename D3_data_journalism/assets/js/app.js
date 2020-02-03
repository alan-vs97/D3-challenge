// @TODO: YOUR CODE HERE!
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    padding = 40;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


//Read the data
d3.csv("assets/data/data.csv", function (data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([8, 20])
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + (height-padding) + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([3, 27])
        .range([height-padding, 0]);

    svg.append("g")
        //.attr("transform", "translate(0," + (0 - padding) + ")")
        .call(d3.axisLeft(y));
    
    // Add dots
    svg.append('g')
        .append("circle")
        .attr("cx", x(data.poverty))
        .attr("cy", y(data.healthcare))
        .attr("r", 15)
        .style("fill", "#21908dff")

    // Add Text
    svg.append('g')
        .append("text")
        .attr("x", x(data.poverty))
        .attr("y", y(data.healthcare))
        .text(data.abbr)
        .attr("font-size", "15px")
        .attr("transform", "translate(-10,3)")
        .attr("fill", "white");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (0-padding)+ ","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Lacks in Healthcare %");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (width / 2) + "," + (height) + ")")  // centre below axis
        .text("In Poverty %");
})