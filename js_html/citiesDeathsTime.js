
    // set width and height of map
    let bodyHeight = 800
    let bodyWidth = 1250
    // let body = d3.select("#body")

    // let body = d3.select("div#chart").selectAll("svg").append("svg").attr("id", "timeMap")
    let body = d3.select("div#chart").select("#timeMap")
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

    var gTime = d3
                .select('div#slider')
                .append("center")
                .append('svg')
                .attr('width', 800)
                .attr('height', 50)
                .append('g')
                .attr('transform', 'translate(15,10)')

    gTime.call(sliderTime);  

    // set projection               
    let projection = d3.geoAlbersUsa()
                        .scale(1500)
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
            .text("Fatal Encounters With Police (2000 - Present)")
            .attr("stroke-width", "0")    
            .style("font-size", "11px")
        
    }

    // function showData (datasources) {
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

    d3.selection.prototype.moveToFront = function() {  
        return this.each(function(){
          this.parentNode.appendChild(this);
        });
      };
