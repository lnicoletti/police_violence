
    let body = d3.select("#body")
    
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

    var gTime = d3
    .select('div#slider')
    .append("center")
    .append('svg')
    .attr('width', 800)
    .attr('height', 50)
    .append('g')
    .attr('transform', 'translate(15,10)')

    gTime.call(sliderTime);

    // set width and height of map
    let bodyHeight = 650
    let bodyWidth = 800
        

    // set projection               
    let projection = d3.geoAlbersUsa()
                        .scale(1400)
                        .translate([bodyWidth/2, bodyHeight/2])

    let path = d3.geoPath()
                    .projection(projection)


    Promise.all([
        d3.json("https://gist.githubusercontent.com/lnicoletti/57326b3b9e7bc72e2dc13dcb86df5404/raw/21f5c8df18527f2db881a46d8f59572fabeb3114/us-states.geojson"),
        // d3.csv("data/citiesYearDeaths.csv")]).then((datasources) => {
            d3.csv("https://gist.githubusercontent.com/lnicoletti/628370f9fc1aaa007ba0971992ff8369/raw/79cf991c84fde7bdad677e485321490e261205ad/citiesYearDeathsHT.csv")]).then((datasources) => {

            let mapInfo = datasources[0]
            let data = datasources[1]
            
            let filteredData = data.filter(d => +d.date === 2000)
            console.log(filteredData)
            showMap(mapInfo)
            showData(filteredData)
            showLegend(filteredData)
            // d3.select("#slider").on("input", function() {
            sliderTime.on("onchange", val => {
            // console.log(+this.value)
            let value = val
            // let value = +this.value
            console.log(value)
            filteredData = data.filter(d => +d.date === value);
            console.log(filteredData)
            // showData(filteredData, mapInfo)})
            showData(filteredData)})

        })
    
        // function showTooltip2(text, coords) {
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
            
            // draw the map
            body.selectAll("path")
                .data(mapInfo.features)
                .enter().append("path")
                .attr("d", d => path(d))
                .attr("stroke", "white")
                .attr("stroke-width", "1px")
                .attr("fill", "#d9d9d9")
                // .attr("fill-opacity", "0.5")
        }

    function showLegend (data) {

        let maxDeaths = d3.max(data, d => d.death_count)
        console.log(maxDeaths)
        var radius = d3.scaleSqrt()
                        .domain([0, maxDeaths])
                        .range([0, 11])
        // Legend
        var legend = body.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (bodyWidth + 100) + "," + (bodyHeight - 50) + ")")
        .selectAll("g")
            .data([5, 20, 50, 100])
        .enter().append("g");

        // legend.append("circle")
        //     .attr("cy", function(d) { return -radius(d); })
        //     .attr("r", radius);

        legend.append("text")
            .attr("y", function(d) { return -2 * radius(d); })
            .attr("dy", "1.3em")
            .text(d3.format(".1s"))
            .attr("stroke-width", "0")

        legend.append("text")
            .attr("dy", "1.3em")
            .text("Fatal Encounters With Police (2000 - Present)")
            .attr("stroke-width", "0")    
        
    }

    // function showData (datasources) {
    function showData (data) {
        
        let maxDeaths = d3.max(data, d => d.death_count)
        console.log(maxDeaths)
        var radius = d3.scaleSqrt()
                        .domain([0, maxDeaths])
                        .range([0, 11])
        
        join = body
            .attr("class", "bubble")
         .selectAll("circle")
            .data(data)
        
        console.log(d3.max(data, d=> +d.death_count))
            
        newelements = join.enter()
            .append("circle")
            // .attr("class", "bubble")
            // .attr("fill", "#03071e")
            .on("mouseover.raise", function() { d3.select(this).attr("stroke", "#000").raise(); })
            // .on("mousemove.raise", function() { d3.select(this).attr("stroke", "#000").raise(); })
            .on("mouseout.raise", function() { d3.select(this).attr("stroke", null); })
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

        join.merge(newelements)
            .attr("fill", function(d){ if(+d.death_count > (d3.max(data, d=> +d.death_count)-10)){return "brown"} else {return "#03071e"}})
            .attr("r", d => radius(+d.death_count))
            .attr("cx", function(d){ 
                if(projection([+d.Longitude, +d.Latitude])!== null) {
                    return projection([+d.Longitude, +d.Latitude])[0]} })
            .attr("cy", function(d){ 
                if(projection([+d.Longitude, +d.Latitude])!== null) {
                    return projection([+d.Longitude, +d.Latitude])[1]} })
    
        join.exit().remove()

        // // Legend circles
        var legendCircle = body.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (bodyWidth + 100) + "," + (bodyHeight - 50) + ")")
        .selectAll("g")
            .data([5, 20, 50, 100])
        .enter().append("g");

        legendCircle.append("circle")
            .attr("cy", function(d) { return -radius(d); })
            .attr("r", radius);       
    }
