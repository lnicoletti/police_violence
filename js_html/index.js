// // map constants

// set width and height of map
let bodyHeight = 600
let bodyWidth = 1250
// let body = d3.select("#body")

// let body = d3.select("div#chart").selectAll("svg").append("svg").attr("id", "timeMap")
let body = d3.select("div#mapChart").select("#timeMap")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 "+ bodyWidth +"," + bodyHeight+"")
            // .classed("svg-content", true);
                

// Make the slider
var dataTime = d3.range(0, 21).map(function(d) {
// return new Date(2000 + d, 01, 01);
return 2000 + d;
});

console.log(dataTime)
 // slider = d3.select("#slider")
 var sliderTime = d3
 .sliderBottom()
 .min(d3.min(dataTime))
 .max(d3.max(dataTime))
 // .step(1000 * 60 * 60 * 24 * 365)
 .step(1)
 .width(770)
 // .tickFormat(d3.timeFormat('%Y'))
 .tickValues(dataTime)
 .tickFormat(d3.format("d"))
 // .default(new Date(2000, 01, 01))
 .default(2000)
 // .on('onchange', val => {
 //   d3.select('p#value').text(d3.timeFormat('%Y')(val));
 // console.log(val)});

// set projection               
let projection = d3.geoAlbersUsa()
                    .scale(1300)
                    .translate([bodyWidth/2, bodyHeight/2])

let path = d3.geoPath()
                .projection(projection)

// // line chart constants
var margin2 = {top: 20, right: 70, bottom: 100, left: 70},
width2 = 1250 - margin2.left - margin2.right,
height2 = 600 - margin2.top - margin2.bottom;

// line chart
let Chartbody = d3.select("div#racechart").select("#raceContainer")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 "+ width2 +"," + height2+"")
                    .append("g")
                    .attr("transform",
                        "translate(" + margin2.left*3 + "," + margin2.top + ")");


// // scatter plot constants
var sliderScatter = d3
 .sliderBottom()
 .min(d3.min(dataTime))
 .max(d3.max(dataTime))
 .step(1)
 .width(770)
 .tickValues(dataTime)
 .tickFormat(d3.format("d"))
 .default(2000)

heightScatter = 750 - margin2.top - margin2.bottom;
var svg2 = d3.select("div#my_dataviz2")
      .select("#scatterPolice")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 "+ (width2 + margin2.left + margin2.right) +"," + (heightScatter + margin2.top + margin2.bottom)+"")
      .append("g")
        .attr("transform",
              "translate(" + margin2.left + "," + margin2.top + ")");

// // area chart constants
// set the dimensions and margins of the graph
var margin3 = {top: 20, right: 100, bottom: 30, left: 18},
width3 = 1250 - margin3.left - margin3.right,
height3 = 700 - margin3.top - margin3.bottom;

// append the svg object to the body of the page
var svg3 = d3.select("#my_dataviz3")
.append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 "+ (width3 + margin3.left + margin3.right) +"," + (height3 + margin3.top + margin3.bottom)+"")
.append("g")
.attr("transform",
      "translate(" + margin3.left + "," + margin3.top + ")");

// // small multiples constants
var margin4 = {top: 8, right: 15, bottom: 16, left: 30},
        width4 = 170 - margin4.left - margin4.right,
        height4 = 110 - margin4.top - margin4.bottom;
    
var xScale = d3.scaleLinear()
    .range([0, width4]);

var yScale = d3.scaleLinear()
    .range([height4, 0]);
    
var yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(3);

var area = d3.area()
    .x(function(d) { return xScale(+d.year); })
    .y0(height4)
    .y1(function(d) { return yScale(+d.value); });

var line = d3.line()
    .x(function(d) { return xScale(+d.year); })
    .y(function(d) { return yScale(+d.value); });

// Add a scale for bubble color
var myColor = d3.scaleOrdinal()
    .domain(["blue", "red"])
    .range(['#0076C0', '#DD1F26']);

// // bubble chart constants
let width5 = 1500;
let height5 = 540;

let barchart = d3.select("div#chart").select("#barchart")
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 "+ width5 +"," + height5+"")
                // .classed("svg-content", true);

let timeline = d3.select("#timeline").style("visibility", "hidden")

timeline.attr("height",height5/4)
timeline.attr("width", width5/5)

// Load data and run functions to render charts
Promise.all([
        d3.json("https://gist.githubusercontent.com/lnicoletti/57326b3b9e7bc72e2dc13dcb86df5404/raw/21f5c8df18527f2db881a46d8f59572fabeb3114/us-states.geojson"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/628370f9fc1aaa007ba0971992ff8369/raw/79cf991c84fde7bdad677e485321490e261205ad/citiesYearDeathsHT.csv"), // d3.csv("data/processed/citiesYearDeaths_28122020.csv")
        d3.csv("../data/processed/citiesYearDeaths_28122020.csv"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/f941139d7bf40385a325b92e6750a14f/raw/677990a4c3de14e8b71756cbe5c7c4ec363b0be4/deaths_by_race_city_year.csv"), // d3.csv("../data/processed/deaths_by_race_city_year_28122020.csv")
        d3.csv("../data/processed/deaths_by_race_city_year_28122020.csv"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/1cc02dd942ff7efb1f7d7f1bc8e908cf/raw/c37b69c25c2855b8c7a7bd456561d9ff056757e7/deaths_vs_officers.csv"), // d3.csv("../data/processed/deaths_vs_officers_28122020.csv"),
        d3.csv("../data/processed/deaths_vs_officers_20years_28122020.csv"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/bd55c7bd6b172270df1606b166071791/raw/f687c8d75e9333e06534710994aedf1fb7f9957c/death_by_city_party.csv"),
        d3.csv("../data/processed/death_by_city_party_28122020.csv"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/c312a25a680167989141e8315b26c92a/raw/707ead31e5bdbb886ff8f7dc5635d5d0568a0a81/citiesYearDeathsHT_party_n.csv"),
        d3.csv("../data/processed/citiesYearDeathsHT_party_n_28122020.csv"),
        // d3.csv("https://gist.githubusercontent.com/lnicoletti/2b332934b105db020c454251ce1f6fa3/raw/c63e340d29e2f322a2581f78dad930db160e862f/death_by_city_party_agg.csv"),
        d3.csv("../data/processed/death_by_city_party_agg_28122020.csv")]).then((datasources) => {

        let mapInfo = datasources[0]
        let mapData = datasources[1]
        let lineData = datasources[2]
        let scatterData = datasources[3]
        let SMdata = datasources[4]
        let bubbleData = datasources[5]
        let areaData = datasources[6]

        // map
        let filteredData = mapData.filter(d => +d.date === 2000)
        console.log(filteredData)
        makeSlider('div#slider', sliderTime)
        showMap(mapInfo)
        showData(filteredData)
        showLegend(filteredData)
        sliderTime.on("onchange", val => {
            let value = val
            console.log(value)
            filteredData = mapData.filter(d => +d.date === value);
            console.log(filteredData)
            showData(filteredData)
        })

        // lines
        populateDropdown(lineData)
        initialOption = "National Total"
        drawLines(lineData, initialOption)

        d3.select("#citydropdown").on("change", function(d) {
            // recover the option that has been chosen
            var selectedCity = d3.select(this).property("value")
            // run the updateChart function with this selected option
            d3.selectAll(".Raceline").remove()
            d3.selectAll(".Raceaxis").remove()
            d3.selectAll(".Racelegend").remove()
            d3.selectAll(".raceAxisText").remove()
            drawLines(lineData, selectedCity)
            })

        // scatter plot
        makeSlider('div#sliderScatter', sliderScatter)
        drawScatter(scatterData, "d_2000")
        sliderScatter.on("onchange", val => {
            // console.log(d3.select("#scatterPolice").selectAll(".highlighted"))
            d3.select("#scatterPolice").selectAll("circle").remove()
            d3.select("#scatterPolice").selectAll("text").remove()
            d3.select("#scatterPolice").selectAll(".axis").remove()
            d3.select("#tooltipScatter").remove()
            let value = "d_"+val
            console.log(value)
            drawScatter(scatterData, value)
        })

        // d3.select("#citySearchScatter").on("input", function() {

        //     selected_city = d3.event.target.value;
            
        //     console.log(selected_city.toLowerCase())
        //     // console.log(circles._groups[0].filter(d=>d.__data__.county === selected_city))
        //     // console.log(dot._groups[0].filter(d=>d.__data__.city.toLowerCase().match(selected_city)))
        //     d3.select("#scatterPolice").selectAll("circle").style("opacity", d=>d.city.toLowerCase().match(selected_city.toLowerCase())?"0.8":"0.2")
        //     // dot.style("opacity", d=>d.city.toLowerCase().match(selected_city.toLowerCase())?"0.8":"0.2")
        //     })

        // area chart
        drawArea(areaData)

        // small multiples
        showSmallMultiples(SMdata)

        // bubble chart
        type = "most"
        kind = "tot"
        bubbleData = bubbleData.filter(d=>d.county != "New York, NY")
        drawBubbleChart(bubbleData, type, 2020, kind)
    })

// map functions
function showTooltip2(text1, text2, text3, coords) {
        d3.select("#tooltipMap")
            .style("display", "block")
            .style("top", (coords[1]+10) + "px")
            .style("left", (coords[0]+10) + "px")
            // .style("top", (d3.mouse(this)[0]+90) + "px")
            // .style("left", (d3.mouse(this)[1]) + "px")
            .style('font', '12px sans-serif')
            // .style('fill-opacity', 0.5)
            .attr('stroke', '#ccc')
            // .text(text)
            .html("<b>" + text1 + "<br/>" + text2 + "</b> deaths by police in " + "<b>" + text3 + "</b>")
}

function showMap (mapInfo) {
        console.log(mapInfo)
        // draw the map
    map = body.selectAll("path")
            .data(mapInfo.features)
            .enter().append("path")
            .attr("d", d => path(d))
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .attr("fill", "#d9d9d9")
            .attr("opacity", "0.5")
            // .on("mouseover", function() { d3.select(this).lower(); })


    // var features = topojson.feature(world, world.objects.countries).features;
    var centroids = mapInfo.features.map(function (feature){
        return [{centroid: path.centroid(feature),
                 name: feature.properties.abbrev}];
    });

    console.log(centroids)
    
    centroids = body.selectAll(".states")
        .data(centroids)
        .join("text")
        .attr("class", "stateText")
        .attr("text-anchor", "middle")
        .style("fill", "rgb(77, 77, 77)")
        .text(d=>d[0].name)
        .attr("stroke", "none")
        // .attr("stroke-width", "1")
        // .attr("r", "20")
        .attr("x", function (d){ return d[0].centroid[0]; })
        .attr("y", function (d){ return d[0].centroid[1]; });

    // text = body.selectAll("text")
    //         .data(mapInfo.features)
    //         .enter().append("text")
    //         .attr("text", d => d.properties.name)
            // .attr("stroke", "white")
            // .attr("stroke-width", "0.5px")
            // .attr("fill", "#d9d9d9") 
            // .attr("fill-opacity", "0.5")
}

function showLegend (data) {

    let extentDeaths = d3.extent(data, d => d.death_count)
    console.log(extentDeaths)
    var radius = d3.scaleSqrt()
                    .domain(extentDeaths)
                    .range([2, 15])
    // Legend
    var legend = body.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (bodyWidth/1.1) + "," + (bodyHeight/1.1) + ")")
    .selectAll("g")
        .data([5, 20, 40])
    .enter().append("g");

    // legend.append("circle")
    //     .attr("cy", function(d) { return -radius(d); })
    //     .attr("r", radius);

    legend.append("text")
        .attr("class", "legend")
        .attr("y", function(d) { return -2 * radius(d); })
        .attr("dy", "1em")
        .text(d3.format(".1s"))
        .attr("stroke-width", "0")
        // .style("fill", "#777")
        .style("font-size", "10px")

    legend.append("text")
        .attr("class", "legend")
        .attr("dy", "1.3em")
        .text("Death Toll of Policing (2000 - Present)")
        .attr("stroke-width", "0")    
        .style("font-size", "11px")
    
}

function showData (data) {

    let extentDeaths = d3.extent(data, d => d.death_count)
    console.log(extentDeaths)
    var radius = d3.scaleSqrt()
                    .domain(extentDeaths)
                    .range([2, 15])
    
    join = body
        .selectAll("circle")
        .data(data)
    
    console.log(d3.max(data, d=> +d.death_count))
        
    // newelements = join.enter()
    //     .append("circle")
    newelements = join.join("circle")
        .attr("class", "bubble")
        // .append("circle")
        // .attr("class", "bubble")
        // .attr("fill", "#03071e")
        // .on("mouseover.raise", function() { d3.select(this).moveToFront(); })
        // .on("mousemove.raise", function() { d3.select(this).attr("stroke", "#000").raise(); })
        // .on("mouseout.raise", function() { d3.select(this).attr("stroke", null); })
        // .on("mouseout.raise", function() { d3.select(this).moveToBack(); })
        .on("mouseenter", d => {
            // show text and get x and y positon of mouse
            // showTooltip2(d.county + ": " + d.death_count + " Fatal Encounters With Police", [d3.event.clientX, d3.event.clientY])
            showTooltip2(d.county, d.death_count, d.date, [d3.event.clientX, d3.event.clientY])

        })
        .on("mousemove", d => {
            // do the same thing on mousemove so that it follows the mouse
            // showTooltip2(d.county + ": " + d.death_count + " Fatal Encounters With Police", [d3.event.clientX, d3.event.clientY])
            showTooltip2(d.county, d.death_count, d.date, [d3.event.clientX, d3.event.clientY])
        })
        .on("mouseleave", d => {
            d3.select("#tooltipMap").style("display", "none")
        })

    // join.merge(newelements)
        .attr("fill", function(d){ if(+d.death_count > (d3.max(data, d=> +d.death_count)-10)){return "#cc0000"} else {return "black"}})
        .attr("r", d => radius(+d.death_count))
        .attr("cx", function(d){ 
            if(projection([+d.Longitude, +d.Latitude])!== null) {
                return projection([+d.Longitude, +d.Latitude])[0]} })
        .attr("cy", function(d){ 
            if(projection([+d.Longitude, +d.Latitude])!== null) {
                return projection([+d.Longitude, +d.Latitude])[1]} })

    // join.exit().remove()

    // // Legend circles
    var legendCircle = body.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (bodyWidth/1.1) + "," + (bodyHeight/1.1) + ")")
    .selectAll("g")
        .data([5, 20, 40])
    .enter().append("g");

    legendCircle.append("circle")
        .attr("cy", function(d) { return -radius(d); })
        .attr("r", radius);       
}

// line functions
function populateDropdown(data) {
    var select = d3.select("#citydropdown")

    console.log(d3.map(data, d=>d.city).keys())

    unique_cities = d3.map(data, d=>d.city).keys()

    select
        .append("option")
        .attr("value", "National Total")
        .text("National Total");

    select.selectAll("option")
    .data(unique_cities)
    .enter()
        .append("option")
        .attr("value", d=>d)
        .text(d=>d);
}

function drawLines(data, selectedCity) {

    // d3.selectAll(".Racetext").remove()

    // d3.selectAll("line").remove()

    let bodyHeight0 = 400
    let bodyWidth0 = 600

    // year_filter = 2020
    populationfilter = 200000
    data = data.filter(d=>d.city==selectedCity)
    // data = data.filter(d=>d.date<year_filter)
    
    // convert date field to datetime object
    data = data.map(d => ({
        date: new Date(d.date),
        black: +d.black,
        white: +d.white,
        latino: +d.latino
    }))
    
    let maxValues = [d3.max(data, d => d.black), d3.max(data, d => d.white), d3.max(data, d => d.latino)]
    maxValue = d3.max(maxValues)
    console.log(maxValue)

    // make yScale and yAxis
    let yScale = d3.scaleLinear()
                   .range([bodyHeight0, 0])
                   .domain([0, maxValue])
                   
    Chartbody.append("g")
        .attr("class", "Raceaxis")
        // .attr("class", "axis")
        .attr("transform", "translate("+bodyWidth0+",0)")
        .call(d3.axisLeft(yScale).ticks(5).tickSize(bodyWidth0))
    
    // make xScale and xAxis
    let xScale = d3.scaleUtc()
                   .domain(d3.extent(data, d => d.date))
                   .range([0, bodyWidth0])

    Chartbody.append("g")
        .attr("class", "Raceaxis")
        // .attr("class", "axis")
        .attr("transform", "translate(0, "+bodyHeight0+")")
        // .call(d3.axisBottom(xScale).ticks(10).tickSize(bodyHeight0))
        .call(d3.axisBottom(xScale).ticks(10))
        // .tickFormat(d3.timeFormat("%b"))
    d3.selectAll("path.domain").remove();
    // d3.selectAll("line").style("stroke", "silver");
    // d3.selectAll("text").style("fill", "silver");
    // d3.selectAll("text").style("font-size", "14px");

    Chartbody.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x",0 - (bodyHeight0 / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("fill", "silver")
    .text("Deaths by Police per 100,000 Inhabitants")
    .style("font-weight", "bold")  
    .style("font-family", "sans-serif")
    .style("font-size", "11px")
    // .attr("class", "raceAxisText")
        
    // generate the lines
    // line for whites
    valueline_w = d3.line() //curve(d3.curveBasis)
                  .x(d => xScale(d.date))
                  .y(d => yScale(d.white))
                //   .defined(d => !!d.white)  

    let path1 = Chartbody.append("path")
        .datum(data)
        .attr("d", valueline_w)
        .attr("class", "Raceline")
        // .attr("stroke", "#bfbfbf")
        // .attr("fill", "black")
        .attr("stroke", "#e5e5e8")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
    Chartbody.append("text")
        .attr("y", yScale(data.map(d=>d.white)[data.length-1]))
        .attr("x", xScale(d3.max(data.map(d=>+d.date)))+4)
        .transition() // Call Transition Method
        .delay(2000)
        .text("European American/White")
        .attr("fill", "#bfbfbf")
        .attr("class", "Racelegend")

    // line for blacks
    valueline_b = d3.line()//.curve(d3.curveBasis)
                  .x(d => xScale(d.date))
                  .y(d => yScale(d.black))
                //   .defined(d => !!d.black)      
    let path2 = Chartbody.append("path")
        .datum(data)
        .attr("d", valueline_b)
        .attr("class", "Raceline")
        // .attr("stroke", "#404040")
        .attr("stroke", "#171717")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
    name2 = Chartbody.append("text")
        .attr("y", yScale(data.map(d=>d.black)[data.length-1]))
        .attr("x", xScale(d3.max(data.map(d=>+d.date)))+4)
        .transition() // Call Transition Method
        .delay(4000)
        .text("African American/Black")
        .attr("fill", "#171717")
        .attr("class", "Racelegend")
        .attr("font-size", "11px")

    // name2.transition()
    //     .duration(4000)
    //     .ease(d3.easeLinear)
    //     .attr("transform", function(d) { 
    //     return "translate(" + (bodyWidth0) +", " + yScale(d[n-2]) + ")";
    //     });

    // line for latino
    valueline_l = d3.line()//.curve(d3.curveBasis)
                  .x(d => xScale(d.date))
                  .y(d => yScale(d.latino))
                //   .defined(d => !!d.latino)      
    let path3 = Chartbody.append("path")
        .datum(data)
        .attr("d", valueline_l)
        .attr("class", "Raceline")
        // .attr("stroke", "#7f7f7f")
        .attr("stroke", "#61616d")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
    Chartbody.append("text")
        .attr("y", yScale(data.map(d=>d.latino)[data.length-1]))
        .attr("x", xScale(d3.max(data.map(d=>+d.date)))+4)
        .transition() // Call Transition Method
        .delay(3000)
        .text("Hispanic/Latino")
        .attr("fill", "#61616d")
        .attr("class", "Racelegend")
        .attr("font-size", "11px")

                
    var totalLength = [path1.node().getTotalLength(), path2.node().getTotalLength(), path3.node().getTotalLength()];
    // var totalLength = path1.node().getTotalLength()

    console.log(totalLength);
    console.log(totalLength[0])

    path1
        .attr("stroke-dasharray", totalLength[0] + " " + totalLength[0])
        .attr("stroke-dashoffset", totalLength[0])
    .transition() // Call Transition Method
        .duration(2000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0)

    path2
        .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1])
        .attr("stroke-dashoffset", totalLength[1])
    .transition() // Call Transition Method
        .duration(4000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0);

    path3
        .attr("stroke-dasharray", totalLength[2] + " " + totalLength[2])
        .attr("stroke-dashoffset", totalLength[2])
    .transition() // Call Transition Method
        .duration(3000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0);


}

// scatter functions
function drawScatter(data, year) {
    // function drawScatter(data) {
    // d3.csv("data/deaths_vs_officers.csv", function(data) {

    // year = "d_2000"

    console.log(data)
    // data for text
    data = data.filter(d => (+d[year] <= 4) && (+d[year] > 0) && (+d.police_hthou < 400));
    pareto = data.filter(function(d){ return +d[year] >= 2 || +d.police_hthou >= 260})
    not_pareto = data.filter(function(d){ return +d[year] < 12.2 && +d.police_hthou < 180})
    // data = data.filter(d=>d.population>200000)
    console.log(data)
    console.log(pareto)
    console.log(not_pareto)
    // Add X axis
    let maxPolice = d3.max(data, d => +d.police_hthou)
    var x = d3.scaleLinear()
      .domain([0, maxPolice+20])
      .range([ 0, width2]);

    svg2.append("g")
      .attr("transform", "translate(0," + heightScatter + ")")
      // .attr("transform", "translate(" + margin2.left + "," + height2 + ")")
      .call(d3.axisBottom(x).ticks(18))
      .attr("class", "axis")
  
    // Add Y axis
    let maxDeaths = d3.max(data, d => +d[year])
    var y = d3.scaleLinear()
      .domain([0, maxDeaths+0.2])
      .range([ heightScatter, 0]);
      
    svg2.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "axis")
      .attr("id", "scatterYaxis")
        // .attr("transform",
        //     "translate(" + margin2.left + "," + margin2.top + ")");
      d3.selectAll("path.domain").remove();
      // d3.selectAll("line").style("stroke", "silver");
      // d3.selectAll("text").style("fill", "silver");
      // d3.selectAll("text").style("font-size", "14px");

    // Add Axis Labels
    // Y axis
    svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin2.left)
      .attr("x",0 - (heightScatter / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "silver")
      .text("Deaths by Police per 100,000 Inhabitants")
      .style("font-weight", "bold")  
      .style("font-family", "sans-serif") 
    // X Axis
    // text label for the x axis
  svg2.append("text")             
     .attr("transform",
          "translate(" + (width2/2) + " ," + 
                         (heightScatter + margin2.bottom/1.5) + ")")
     .style("text-anchor", "middle")
     .text("Police Officers Per 100,000 Inhabitants")
     .style("fill", "silver")   
     .style("font-weight", "bold") 
     .style("font-family", "sans-serif") 

    // Add a scale for bubble size
    let popExtent = d3.extent(data, d => +d.population)
    console.log(popExtent)
    var z = d3.scaleSqrt()
      .domain(popExtent)
      .range([5, 27.5]);

    // Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
      .domain(["blue", "red"])
      .range(['#0076C0', '#DD1F26']);
    
    // -1- Create a tooltip div that is hidden by default:
    var tooltip = d3.select("#my_dataviz2")
      .append("div")
        .style("display", "none")
        .attr("id", "tooltipScatter")
        // .style("background-color", "black")
        // .style("border-radius", "5px")
        // .style("padding", "10px")
        // .style("color", "Black")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function(d, year) {
      var color = myColor(d.party)
      tooltip
      .style("display", "block")
        // .transition()
        // .duration(200)
        
      tooltip
        .style("opacity", 1)
        .html("<span style='color:" + color + ";'>" + "<b>" +d.city + "</b>"+"</br>"
        + "<b>" + Math.round(d.police_hthou*100)/100 + "</b> Police Officers per 100,000 Inhabitants </br>" 
        + "<b>" + Math.round(d[year]*100)/100 + "</b> Deaths by Police per 100,000 Inhabitants </span>")
        .style("left", (d3.event.clientX) + 10 + "px")
        .style("top", (d3.event.clientY) - 10 + "px")
        // .style("font-weight", "bold")
        .style('font', '12px sans-serif')
    }
    var moveTooltip = function(d) {
      tooltip
      .style("left", (d3.event.clientX) + 10 + "px")
      .style("top", (d3.event.clientY) - 10 + "px")
    }
    var hideTooltip = function(d) {
      tooltip
        // .transition()
        // .duration(200)
        .style("display", "none")
    }

    // Add dots
    var dot = 
    // svg2.append('g')
      svg2.selectAll("dot")
      .data(data)
      .join("circle")
      .attr("class", "scatterBubble")
        .attr("cx", function (d) { return x(+d.police_hthou); } )
        .attr("cy", function (d) { return y(+d[year]); } )
        // .attr("r", "7px" )
        .attr("r", function (d) { return z(+d.population); } )
        .style("fill", function (d) { return myColor(d.party); } )
        .style("opacity", "0.7")
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        // -3- Trigger the functions
        .on("mouseover", d=>showTooltip(d,year) )
        .on("mousemove", d=>moveTooltip(d,year) )
        .on("mouseleave", d=>hideTooltip(d,year) )

    var text = svg2.append('g')
      .selectAll("text")
      .data(pareto)
      .join("text")
        .attr("x", d=> (d.city=="Oklahoma City, OK")|(d.city=="Omaha, NE")? x(+d.police_hthou) - 10:x(+d.police_hthou) + 10)
        .attr("y", d=> y(+d[year]) + 5)
        .text(function (d) { return d.city; })
      
        .style("fill", function (d) { return myColor(d.party); } )
        .style("opacity", "0.7")
        // .attr("stroke", "white")
        .style("stroke-width", "1px")
        .style("font-family", "sans-serif")
        .style("font-size", "12") 
        .style("text-anchor", d=>(d.city=="Oklahoma City, OK")|(d.city=="Omaha, NE")?"end":"start")
        // .style("text-anchor", "start")

     // create the dataset for the bubble legend
     legendData = [{level: "100K People", radius: z(100000), y: 5, x: width2/2.2, anchor:"end", xtext: width2/2.27, ytext: 10,id: ""}, 
     {level: "", radius: z(3000000), y: 5, x: width2/2.05,id: ""}, 
     {level: "10M People", radius: z(10000000), y: 5, x: width2/1.85, anchor:"middle", xtext: width2/1.63, ytext: 10,id: ""}]
     // make the bubble legend and initialize the tooltip for methodology info if they hover on the "#info" circle
     legend = svg2.append("g")
             .selectAll("circle")
             .data(legendData)
             .join('circle')
             .attr("cx", d => d.x)
             .attr("cy", d => d.y)
             .attr("r", d => d.radius)
             .attr("fill","none")
             .attr("stroke","silver")
             .attr("stroke-width","1px")
         
     textLegend = svg2.append("g")
         // textLegend = legend.append("g")
             .selectAll("text")
             .data(legendData)
             .join("text")
             .text(d=>d.level)
             .attr("x", d => d.xtext)
             .attr("y", d => d.ytext)
             .attr("class", "legend")
             .style("text-anchor", d=>d.anchor)
             .attr("fill","silver")
             .attr("id", "info") 
            //  .call(wrap, 100)

    // Search functionality
    function updateOpacity() {
        d3.select("#citySearchScatter").on("input", function() {

            selected_city = d3.event.target.value;
            
            console.log(selected_city.toLowerCase())
            // console.log(circles._groups[0].filter(d=>d.__data__.county === selected_city))
            console.log(dot._groups[0].filter(d=>d.__data__.city.toLowerCase().match(selected_city)))
            dot.style("opacity", d=>d.city.toLowerCase().match(selected_city.toLowerCase())?"0.8":"0.2")
            text.style("opacity", d=>d.city.toLowerCase().match(selected_city.toLowerCase())?"0.8":"0.2")
            })
    }
    updateOpacity()

    // sliderScatter.on("onchange", val => {
    //     // d3.select("#scatterPolice").selectAll("circle").remove()
    //     // d3.select("#scatterPolice").selectAll("text").remove()
    //     d3.select("#scatterPolice").selectAll("#scatterYaxis").remove()
    //     // d3.select("#tooltipScatter").remove()
    //     let newYear = "d_"+val
    //     console.log(newYear)
    //     // update new data
    //     newData = data.filter(d => (+d[newYear] <= 4) && (+d[newYear] > 0) && (+d.police_hthou < 400));
    //     newPareto = newData.filter(function(d){ return +d[newYear] >= 2 || +d.police_hthou >= 260})
    //     console.log(newData)
    //     // update new scale domains
    //     let newMaxPolice = d3.max(newData, d => +d.police_hthou)
    //     x.domain([0, newMaxPolice+20])

    //     let newMaxDeaths = d3.max(newData, d => +d[newYear])
    //     y.domain([0, newMaxDeaths+0.2])

    //     svg2.append("g")
    //         .call(d3.axisLeft(y))
    //         .attr("class", "axis")
    //         .attr("id", "scatterYaxis")
        
    //     d3.selectAll("path.domain").remove();
    //     // update circles

    //     newDots = 
    //     svg2.selectAll("dot")
    //         .data(newData)
    //         // .join("circle")

    //     dot.join(newDots)
    //         .attr("cx", function (d) { return x(+d.police_hthou); } )
    //         .attr("cy", function (d) { return y(+d[newYear]); } )
    //         .style("opacity", "0.7")
    //         .on("mouseover", d=>showTooltip(d,newYear) )
    //         .on("mousemove", d=>moveTooltip(d,newYear) )
    //         .on("mouseleave", d=>hideTooltip(d,newYear) )

    //     // remove dots with 0 values
    //     dot.filter(d=>+d[newYear]===0).remove()
    // })
}

// area chart functions
function drawArea(data) {
    
    // List of groups = header of the csv files
    var keys = data.columns.slice(2)
      console.log(data.columns.slice(2))
      console.log(data)

    // Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return +d.year; }))
      .range([ 0, width3 ]);
    svg3.append("g")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")))
      .attr("class", "axis");
  
    // Add Y axis
    let maxValue = d3.max(data, d => +d.red)
    var y = d3.scaleLinear()
      .domain([0, 1.3])
      .range([ height3, 0 ]);
    svg3.append("g")
      .call(d3.axisRight(y))
      .attr("class", "axis")
      .attr("id", "yAxis")
      .attr("transform", "translate(" + width3/1.00000005 + "0)")
      d3.selectAll("path.domain").remove();
      

      svg3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("class", "axisLabel")
        .attr("y", width3*1.04)
        .attr("x",0 - (height3 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "silver")
        .text("Deaths by Police per 100,000 Inhabitants")
        .style("font-weight", "bold")  
        .style("font-family", "sans-serif")

    // color palette
    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#0076C0', '#DD1F26'])
  
    //stack the data?
    var stackedData = d3.stack()
      .keys(keys)
      (data)
      console.log("This is the stack result: ", stackedData)
  
      // create a tooltip
    var Tooltip = svg3
        .append("text")
        .attr("id", "tooltip")
        .attr("x", 0)
        .attr("y", 0)
        .style("opacity", 0)

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1)
      d3.selectAll(".myArea").style("opacity", .2)
      d3.select(this)
        // .style("stroke", "black")
        // .style("stroke-width", "1")
        .style("opacity", 1)
    }
    var mousemove = function(d,i) {
      grp = keys[i]
      // console.log(d3.max(stackedData[i])[1])
      Tooltip.attr("y", y(stackedData[i][19][1]/10))
      Tooltip.attr("x", x(d3.max(data.map(d=>+d.year)))+4)
      // Tooltip.text("+ " + Math.round(d3.max(data.map(d=>+d[grp]))-d3.min(data.map(d=>+d[grp]))) + " deaths per 100,000")
      d3.selectAll("#yAxis").attr("opacity", "0")
      d3.selectAll(".axisLabel").attr("opacity", "0")
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0)
      d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
      d3.selectAll(".axisLabel").attr("opacity", "1")
      d3.selectAll("#yAxis").attr("opacity", "1")

     }
     
    // Show the areas
    svg3
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", "myArea")
      .attr("id", "myArea")
        .style("fill", function(d) { console.log(d.key) ; return color(d.key); })
        .attr("d", d3.area()
          .x(function(d, i) { return x(+d.data.year); })
          .y0(function(d) { return y(+d[0]); })
          .y1(function(d) { return y(+d[1]); }).curve(d3.curveNatural))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

      // Legend
      // svg3.append("circle").attr("cx",50).attr("cy",10).attr("r", 6).style("fill", "#404040")
      // svg3.append("circle").attr("cx",50).attr("cy",50).attr("r", 6).style("fill", "#7f7f7f")
      // svg3.append("circle").attr("cx",50).attr("cy",90).attr("r", 6).style("fill", "#bfbfbf")
    //   svg3.append("text").attr("id", "dem").attr("x", 0).attr("y", 12).text("Democrat Cities").attr("class", "legend")
    //   svg3.append("text").attr("id", "rep").attr("x", 0).attr("y", 52).text("Republican Cities").attr("class", "legend")  
  
}

// small multiples functions
function showSmallMultiples(data) {

    console.log(data)
    data.sort(function(x, y){
      // return d3.ascending(x.MV - x.LV, y.MV - y.LV);
      return d3.ascending(x.party, y.party);
    })

    data = data.filter(d=>(+d.year===2000)|(+d.year===2020))

    xScale.domain(d3.extent(data, function(d) { return +d.year; }));
    yScale.domain([0,d3.max(data, function(d) {  return +d.value; })+0.5]);
    
    // Nest data by subject.
    var cities = d3.nest()
        .key(function(d) { return d.city; })
        .entries(data);
  
    console.log(cities)
    
    var us = cities.filter(function(d){ return d.key === "United States" });
    cities = cities.filter(function(d){ return d.key !== "United States" });
    var red = data.filter(function(d){ return d.party == "red" });
    red = d3.nest()
        .key(function(d) { return d.city; })
        .entries(red);
    var blue = data.filter(function(d){ return d.party == "blue" });
    blue = d3.nest()
        .key(function(d) { return d.city; })
        .entries(blue);
    
    console.log(red)
    console.log(blue)
    // Add an SVG element for each city
    var svg4 = d3.select("#charts").selectAll("svg")
        .data(cities)
      .enter().append("svg")
      .style("margin-bottom", "10px")
        .attr("width", width4 + margin4.left + margin4.right)
        .attr("height", height4 + margin4.top + margin4.bottom)
      .append("g")
        .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")")
        ;
    
    svg4.append("path")
        .attr("class", "line")
        .attr("d", function(d) {return line(us[0].values); })
            .style("stroke", "lightgrey")
    
  
    // Add the area path elements
    /*svg4.append("path")
        .attr("class", "area")
        .attr("d", function(d) { return area(d.values); });*/
  
    // Add the line path elements
    svg4.append("path")
        .attr("class", "line")
        .attr("d", function(d) {return line(d.values); })
        .style("stroke", function (d) { return myColor(d.values[0].party); });
  
    // Add the circles at each time step
    var dot = svg4.selectAll("dot")
       .data(function(d){return d.values})
      .enter()
      .append("circle")
        .attr("id", "myDots")
        .attr("cx", function (d) { return xScale(+d.year); } )
        .attr("cy", function (d) { return yScale(+d.value); } )
        .attr("r", "3.2px" )
      //   .attr("r", function (d) { return z(d.police_hthou); } )
        .style("fill", function (d) { return myColor(d.party); } )
        .style("opacity", "1")
  
      //   .attr("stroke", "white")
      //   .style("stroke-width", "3px")
      //   .style("stroke-opacity", "0")

    // Add a labels
    svg4.append("text")
        .attr("x", (width4 + 10)/2)
        .attr("y", height4 - 80) // -85 previously
        .style("text-anchor", "middle")
        // .style("font-size", "12px")
        .style("font", "12px Arial")
        .attr("fill", function (d) { return myColor(d.values[0].party); })
            .text(function(d) { return d.key; });	
         
    svg4.append("text")
        .text(xScale.domain()[0])
        .attr("x", 0)
        .attr("y", height4 + 15)
        .style("text-anchor", "start")
        // .style("font-size", "12px")
        .style("font", "12px Arial")
        .attr("fill", function (d) { return myColor(d.values[0].party); });
    
    svg4.append("text")
        .text(xScale.domain()[1])
        .attr("x", width4)
        .attr("y", height4 + 15)
        .style("text-anchor", "end")
        // .style("font-size", "12px")
        .style("font", "12px Arial")
        .attr("fill", function (d) { return myColor(d.values[0].party); });

    //add axes
    svg4.append("g").attr("id", "yAxisG").call(yAxis)
    .attr("class", "axisSM")
    // .style("font-size", "9px")
    d3.selectAll("path.domain").remove();
    // d3.selectAll("line").style("stroke", "silver");

    // add US average label first svg
    usLabel = d3.select("#charts").select("svg")
          .append("text")
          .attr("id", "usLabel")
          .text("US Average")
          .attr("x", "100")
          .attr("y", "73")

  var focus = svg4.selectAll("dot")
       .data(function(d){return d.values})
      .enter()
      .append("text")
        .attr("x", function (d) { return xScale(+d.year); } )
        .attr("y", function (d) { return yScale(+d.value)- 5; } )
        .text(function (d) { return Math.round(+d.value*10)/10; })
        .style("fill", function (d) { return myColor(d.party); } )
        .style("font", "10px Arial")
        .style("font-weight","bold")
        .style("opacity", "0")
        .on('mouseenter',function() {focus.style("opacity", "1")})
        .on('mousemove',function() {focus.style("opacity", "1")})
        .on('mouseleave',function () {focus.style("opacity", "0")})
};

// bubble chart functions
function showTooltip5(ttip, text1, text2, text3, coords, data, county, c) {
    let x = coords[0]-120;
    let y = coords[1]-200;
    party = c.party
    console.log(c)

    // remove previous text: 
    timeline.selectAll("#tooltipText").remove()
    
    timeline
        .style("display", "block")
        .style("top", y + "px")
        .style("left", x + "px")
        .style("border", "solid 1px #ccc")
        .style("visibility", "visible")
        // .syle("display", "block")

    // rename data column based on what we are showing
    data = ttip === "tot"? data.map(function(d) {return {
                death_count: d.death_count,
                county: d.county,
                date: d.date,
                population:d.population}})
                :
                data.map(function(d) {return {
                death_count: d.death_hthou,
                county: d.county,
                date: d.date,
                population:d.population}})

    // console.log(data)
    // // remove all previous text
    d3.select("#timeline").selectAll("#yAxisLabel").remove()
    // // remove all previous dots
    d3.select("#timeline").selectAll("circle").remove()
    // // data = data.history;
    // console.log(ttip)
    data = data.filter(d=>d.county === county)
    // console.log(data)

    // console.log(data.length)
    let margin5 = { left: 40, bottom: 110, right: 20, top: 20 }

    let bodywidth5 = width5/7 - margin5.left - margin5.right;
    let bodyheight5 =height5/2.5 - margin5.top - margin5.bottom;

    let xScale = d3.scaleLinear()
        .range([0, bodywidth5])
        // .domain(d3.extent(data, d => d.date))
        .domain([2000, 2020])

    let yScale = d3.scaleLinear()
        .range([bodyheight5, 0])
        .domain([0, d3.max(data, d => +d.death_count)])

    let lineGenerator = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(+d.death_count))
        .curve(d3.curveBasis);

    // add max and min dots
    maxDot = timeline.select(".body").attr("id", "timeline")
    .attr("transform", `translate(${margin5.left},${margin5.top})`)
        .append("circle")
        .attr("cx", d=>xScale(data[data.length-1].date))
        .attr("cy", d=>yScale(+data[data.length-1].death_count))
        .style("fill", party==="red" ? '#DD1F26':'#0076C0')
        .style("r", "5")
        .attr("opacity", "0.8")
        .attr("stroke", "white")

    minDot = timeline.select(".body").attr("id", "timeline")
    .attr("transform", `translate(${margin5.left},${margin5.top})`)
    .append("circle")
        .attr("cx", d=>xScale(data[0].date))
        .attr("cy", d=>yScale(+data[0].death_count))
        .style("fill", party==="red" ? '#DD1F26':'#0076C0')
        .style("r", "5")
        .attr("opacity", "0.8")
        .attr("stroke", "white")

    // dots.exit().remove()
        // .attr("stroke-width", "4")

    // add lines
    timeline.select(".body")
        .attr("transform", `translate(${margin5.left},${margin5.top})`)
        .select("path").datum(data)
        .attr("id", "timeline")
        .attr("d", lineGenerator)
        .style("stroke", "#03071e")
        .style("stroke", party==="red" ? '#DD1F26':'#0076C0')
        .attr("opacity", "0.8")
        .style("stroke-width", "4")

    timeline.select(".xAxis")
        .attr("transform", `translate(${margin5.left},${height5/2.5 - margin5.bottom})`)
        // .attr("class", "axis")
        .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d")))
        .selectAll("text")
        .attr("font-size", "10px")
            .attr("fill", "silver")
            .attr("font-family", "arial")

    timeline.select(".yAxis")
        .attr("transform", `translate(${margin5.left},${margin5.top})`)
        // .attr("class", "axis")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .attr("font-size", "10px")
            .attr("fill", "silver")
            .attr("font-family", "arial")

    timeline.append("text")
        .attr("id", "yAxisLabel")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x",0 - (bodyheight5/1.3))
        .attr("dy", "1em")
        .attr("font-size", "9px")
        .style("text-anchor", "middle")
        .style("fill", "silver")
        .text(ttip === "tot" ? "Total Deaths by Police": "Deaths by Police per 100,000")
        .style("font-weight", "bold")  
        .style("font-family", "sans-serif")

    timeline.append("line")
        .attr("x1", width5/7)
        .attr("x2", width5/7)
        .attr("y1", 10)
        .attr("y2", bodyheight5*1.3)
        .style("stroke", "#ccc")

    timeline.append("text")
        .attr("id", "tooltipText")
        .attr("y", bodyheight5/4)
        .attr("x", width5/6.8)
        .attr("font-weight", "bold")
        .attr("fill", party==="red" ? '#DD1F26':'#0076C0')
        .html("<b>" + text1)
        .call(wrap, 80)

    timeline.append("text")
        .attr("id", "tooltipText")
        .attr("y", bodyheight5/2)
        .attr("x", width5/6.8)
        // .attr("font-weight", "bold")
        .attr("fill", party==="red" ? '#DD1F26':'#0076C0')
        .html(ttip === "tot" ? text2 +  "</b> deaths by police in " + "<b>" + text3 + "</b>" : 
           text2 + "</b> deaths by police per 100,000 individuals in " + "<b>" + text3 + "</b>")
        .call(wrap, 80)
}

function drawBubbleChart(data, type, year, kind) {
    popFilter = 50000
    // remove all previous text
    // console.log(data)
    // Store data with the right variable (hthou or tot) for line chart
    dataType = data
    ttip = kind
    // console.log(ttip)
    let margin5 = { left: 20, bottom: 20, right: 20, top: 110}

    let bodywidth5 = width5 - margin5.left - margin5.right;
    let bodyheight5 = height5 - margin5.top - margin5.bottom;

    filterData = data.filter(d=>(+d.population > popFilter)&&(d.county != "New York, NY"))
    filterData = filterData.filter(d=>+d.date === year)

    console.log(filterData)
    var xScale = d3.scaleSymlog()
            .range([5, bodywidth5])
            .domain([0, d3.max(filterData, d => +d.death_count)+4])

    // draw X-axis
    barchart.append("g")
        .call(d3.axisBottom(xScale))
        .attr("transform", "translate(0, "+bodyheight5*1.15+")")
        // .call(d3.axisTop(xScale).tickSize(300).ticks(7))
        // .attr("transform", "translate(0, "+bodyheight5+")")
        .attr("class", "yAxis")
        .selectAll("text")
            .attr("font-size", "10px")
            .attr("fill", "silver")
            .attr("font-family", "arial")
            // .attr("z-index", "-1")

    // var xScale = d3.scaleLog()
    //         .rangeRound([0, width]);
    
    maxpop = d3.max(filterData, d=>+d.population)
    console.log(maxpop)
    var radius = d3.scaleSqrt()
                        .domain([20000, maxpop])
                        .range([0.5, 65])

    var fontScale = d3.scaleLinear()
                        .domain([600000, maxpop])
                        .range([3, 15])

    console.log(fontScale(3000000)+"px")
    // xScale.domain(d3.extent(filterData, function(d) { return +d.death_count; }));
    // var init_decay; 
    // init_decay = setTimeout(function(){
    //     console.log('init alpha decay');
    //     simulation.alphaDecay(0.1);
    // }, 8000);

    let simulation = d3.forceSimulation()
                .nodes(filterData)
                .force('charge', d3.forceManyBody().strength(1))
                .force('x', d3.forceX().strength(0.1).x(function(d) {
                    return xScale(+d.death_count);
                }))
                .force("y", d3.forceY(bodyheight5/1.5).strength(0.05))
                .force('collide', d3.forceCollide((d)=>{ 
                    return radius(+d.population)}))
                // .alpha(0.5)
                // .alphaTarget(0.5)
                // .alphaDecay(0)
                // .alpha(1)
                .on('tick', function() {
    
    // collision detection
    for ( i = 0; i < filterData.length; i++ ) {
        var node = filterData[i];
        node.cx = node.x;
        node.cy = node.y;
    }
    
    circles = barchart.select(".body")
                    .selectAll('circle')
                    .data(filterData);

    annot = barchart.select(".body")
                    .selectAll('text')
                    .data(filterData);
        
    newCircles = circles.enter()
        .append('circle')
        .attr("class", "forceCircles")
        // .attr("fill", "#03071e")
        .attr("fill", d=>d.party==="red" ? '#DD1F26':'#0076C0')
        .attr("opacity", "0.8")
        .style('stroke', "white")
        .attr('r', d=>radius(+d.population))
        // .attr("fill", "#03071e")
        // .attr("opacity", "0.8")
        // .style('stroke', "white")
        // .merge(circles)
        // .attr('cx', function(d) {
        //     return d.x;
        // })
        // .attr('cy', function(d) {
        //     return d.y;
        // })
        .on("mouseenter", (d) => {
            showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
        })
        .on("mousemove", (d) => {
            showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
        })
        // .on("mouseleave", (d) => {
        //     d3.select("#tooltipBar").style("display", "none")
        // })
        .on("mouseleave", (d) => {
            d3.select("#timeline").style("display", "none")
        })
        // .on("mouseover.colorAll", function() { d3.selectAll(".forceCircles").attr("fill", d=>d.party==="red" ? '#DD1F26':'#0076C0').attr("opacity", "0.5"); })
        // .on("mouseleave.colorAll", function() { d3.selectAll(".forceCircles").attr("fill", d=>d.party==="red" ? '#DD1F26':'#0076C0').attr("opacity", "0.8"); })
        // .on("mouseover.color", function() { d3.select(this).attr("fill", d=>d.party==="red" ? '#DD1F26':'#0076C0').attr("opacity", "0.8"); })
        // .on("mouseleave.color", function() { d3.select(this).attr("fill", d=>d.party==="red" ? '#DD1F26':'#0076C0').attr("opacity", "0.8"); })
        .on("mouseover.color", function() { d3.select(this).style("stroke", "black"); })
        .on("mouseleave.color", function() { d3.select(this).style("stroke", "white"); })
        
        // on hover update line chart
        // .on("mouseover.update", d => {
        //     selectedCountry = d.county;
        //     console.log(d)
        //     drawLineChart(dataType, d.county, ttip)
        // })

    newText = annot.enter()
            .append("text")
            .attr("class", "forceText")
            .text(d=>+d.population>800000 ? d.county:'')
            .style("font-size", d=>fontScale(+d.population)+"px")
            // .on("mouseenter", (d) => {
            //     showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
            // })
            // .on("mousemove", (d) => {
            //     showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
            // })
            // .on("mouseleave", (d) => {
            //     d3.select("#timeline").style("display", "none")
            // })

    // transition to new updated year
    circles.merge(newCircles)
        .attr('cx', function(d) {
            return d.x;
        })
        .attr('cy', function(d) {
            return d.y;
        })

    annot.merge(newText)
        .attr('x', function(d) {
            return d.x;
        })
        .attr('y', function(d) {
            return d.y;
        })

    circles.exit().remove();
    annot.exit().remove();

        });

barchart.append("text")
        .attr("id", "xAxisLabel")
        // .attr("transform", "rotate(-90)")
        .attr("y", bodyheight5*1.23)
        .attr("x",0)
        .attr("dy", "1em")
        .attr("font-size", "17px")
        .style("text-anchor", "start")
        .style("fill", "silver")
        .text("← Less Deaths by Police")
        .style("font-weight", "bold")  
        .style("font-family", "sans-serif")

barchart.append("text")
        .attr("id", "xAxisLabel")
        // .attr("transform", "rotate(-90)")
        .attr("y", bodyheight5*1.23)
        .attr("x",bodywidth5)
        .attr("dy", "1em")
        .attr("font-size", "17px")
        .style("text-anchor", "end")
        .style("fill", "silver")
        .text("More Deaths by Police →")
        .style("font-weight", "bold")  
        .style("font-family", "sans-serif")

// Update year data on click
d3.select("#yearDropdown").on("change", function(d) {
        // recover the option that has been chosen
        var selectedYear = +d3.select(this).property("value")
        ttip = "tot"
        // var type = d3.select("#typeDropdown").property("value")
        // console.log(type)
        // console.log(selectedYear)
        // update the data with right year
        filterData = data.filter(d=>+d.population > popFilter)
        filterData = filterData.filter(d=>+d.date === selectedYear)
        // console.log(filterData)
        // Remove X-Axis
        d3.select("#barchart").selectAll(".yAxis").remove()
            // Update the X-scale and X-Axis
            xScale.domain([0, d3.max(filterData, d => +d.death_count)+4])

            barchart.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0, "+bodyheight5*1.15+")")
            .attr("class", "yAxis")
            .selectAll("text")
                .attr("font-size", "10px")
                .attr("fill", "silver")
                .attr("font-family", "arial")
            
            // restart simulation
            simulation
            .alpha(1)
                // .alphaTarget(0.3)
                // .alphaDecay(0.3)
                .restart();

            simulation.nodes(filterData)
                    // .force("center", d3.forceCenter(bodywidth5/ 1.38, bodyheight5 / 1.5))
                    .force('charge', d3.forceManyBody().strength(1))
                    .force('x', d3.forceX().strength(0.1).x(function(d) {
                        return xScale(+d.death_count);
                    }))
                    .force("y", d3.forceY(bodyheight5/1.5).strength(0.05))
                    .force('collide', d3.forceCollide((d)=>{ 
                        return radius(+d.population)}).strength(1))
                    
            // DONT KNOW WHY THIS WORKS
            circles = barchart.select(".body")
                .selectAll('circle')
                .data(filterData[0]);

            annot = barchart.select(".body")
                .selectAll('text')
                .data(filterData[0]);

            newText = annot.enter()
                .append("text")
                .attr("class", "forceText")
                .text(d=>+d.population>600000 ? d.county:'')
                
            // newCircles = circles.enter()
            //     .append('circle')
            //     .attr("class", "forceCircles")

            circles//.merge(newCircles)
                .attr('x', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .on("mouseenter", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                .on("mousemove", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                // on hover update line chart
                // .on("mouseover.update", d => {
                //     selectedCountry = d.county;
                //     drawLineChart(dataType, d.county, ttip)
                // })

            annot.merge(newText)
                .attr('x', function(d) {
                    return d.x;
                })
                .attr('y', function(d) {
                    return d.y;
                })

                circles.exit().remove();
                annot.exit().remove();
        })

// Update metric data on click
    d3.selectAll("button").on("click", function() {
        // Remove X-Axis
        d3.select("#barchart").selectAll(".yAxis").remove()
        // var type = d3.select("#typeDropdown").property("value")
        let metric = d3.select(this).property("value")
        // console.log(metric)
        if (metric === "death_count") {
            // Update the X-scale and X-Axis
            xScale.domain([0, d3.max(filterData, d => +d.death_count)+4])

            barchart.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0, "+bodyheight5*1.15+")")
            .attr("class", "yAxis")
            .selectAll("text")
                .attr("font-size", "10px")
                .attr("fill", "silver")
                .attr("font-family", "arial")

            ttip = "tot"
            // restart simulation
            simulation
            .alpha(1)
                // .alphaTarget(0.3)
                // .alphaDecay(0.3)
                .restart();

            simulation
                    // .force('charge', d3.forceManyBody().strength(1))
                    // .force("center", d3.forceCenter(bodywidth5/ 1.38, bodyheight5 / 1.5))
                    .force('x', d3.forceX().strength(0.1).x(function(d) {
                        return xScale(+d.death_count);
                    }))
                    .force("y", d3.forceY(bodyheight5/1.5).strength(0.05))
                    .force('collide', d3.forceCollide((d)=>{ 
                        return radius(+d.population)}).strength(1))
                
            circles//.merge(newCircles)
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .on("mouseenter", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                .on("mousemove", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_count), d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                // on hover update line chart
                // .on("mouseover.update", d => {
                //     selectedCountry = d.county;
                //     drawLineChart(dataType, d.county, ttip)
                // })

        } else {
            // Remove X-Axis
            d3.select("#barchart").selectAll(".yAxis").remove()
            // Update the X-scale and X-Axis
            xScale.domain([-0.17, d3.max(filterData, d => +d.death_hthou)+1])

            barchart.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0, "+bodyheight5*1.15+")")
            .attr("class", "yAxis")
            .selectAll("text")
                .attr("font-size", "10px")
                .attr("fill", "silver")
                .attr("font-family", "arial")

            ttip = "hthou"
            // reheat the simulation:
            simulation
                .alpha(1)
                // .alphaTarget(0.3)
                // .alphaDecay(0.05)
                .restart();

            simulation
                    // .force('charge', d3.forceManyBody().strength(1))
                    // .force("center", d3.forceCenter(bodywidth5/ 2, bodyheight5 / 1.5))
                    .force('x', d3.forceX().strength(0.1).x(function(d) {
                        return xScale(+d.death_hthou);
                    }))
                    .force("y", d3.forceY(bodyheight5/1.5).strength(0.05))
                    .force('collide', d3.forceCollide((d)=>{ 
                        return radius(+d.population)}).strength(1))

            circles//.merge(newCircles)
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })
                .on("mouseenter", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_hthou*100)/100, d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                .on("mousemove", (d) => {
                    showTooltip5(ttip, d.county, Math.round(d.death_hthou*100)/100, d.date, [d3.event.clientX, d3.event.clientY], dataType, d.county, d)
                })
                // on hover update line chart
                // .on("mouseover.update", d => {
                //     selectedCountry = d.county;
                //     drawLineChart(dataType, d.county, ttip)
                // })

                }
            })

    // Search functionality
    d3.select("#citySearch").on("input", function() {

    selected_city = d3.event.target.value;
    
    console.log(selected_city.toLowerCase())
    // console.log(circles._groups[0].filter(d=>d.__data__.county === selected_city))
    console.log(circles._groups[0].filter(d=>d.__data__.county.toLowerCase().match(selected_city)))
    circles.attr("opacity", d=>d.county.toLowerCase().match(selected_city.toLowerCase())?"0.8":"0.2")

    })
    
    var legend = barchart.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (bodywidth5/2) + "," + (100) + ")")

    .selectAll("g")
        .data([500000, 1000000, 3000000, 6000000])
    .enter().append("g");

    legend.append("circle")
        .attr("cy", function(d) { return -radius(d); })
        .attr("r", radius);

    legend.append("text")
        .attr("y", function(d) { return -2 * radius(d); })
        .attr("dy", "1.3em")
        .text(d3.format(".1s"))

    legend.append("text")
        .attr("dy", "1.3em")
        .text("Population")
        // .style("font-size", "10px")
}

// general functions
function makeSlider(div, slider) {

    var gTime = d3
                .select(div)
                .append("center")
                .append('svg')
                .attr('width', 800)
                .attr('height', 50)
                .append('g')
                .attr('transform', 'translate(15,10)')

    gTime.call(slider);  
}

function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}