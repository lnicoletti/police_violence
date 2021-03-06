    let width5 = 1500;
    let height5 = 540;
    
    let barchart = d3.select("div#chart").select("#barchart")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 "+ width5 +"," + height5+"")
                    .classed("svg-content", true);
    // let barchart = d3.select("#barchart")

    let timeline = d3.select("#timeline")

    // let width5 = 1500;
    // let height5 = 540;

    // barchart.attr("height", height5)
    // barchart.attr("width", width5)

    timeline.attr("height",height5/4)
    timeline.attr("width", width5/5)

    // let selectedCountry = undefined;

    d3.csv("https://gist.githubusercontent.com/lnicoletti/c312a25a680167989141e8315b26c92a/raw/707ead31e5bdbb886ff8f7dc5635d5d0568a0a81/citiesYearDeathsHT_party_n.csv")
    // d3.csv("data/citiesYearDeathsHT_party_n.csv")
        .then((data) => {
        
            type = "most"
            kind = "tot"
            drawBarChart(data, type, 2020, kind)
        })
    
    // define this to move elments to front
    // d3.selection.prototype.moveToFront = function() {
    //     return this.each(function(){
    //         this.parentNode.appendChild(this);
    //     });
    //     };

    function showTooltip5(ttip, text1, text2, text3, coords, data, county, c) {
        let x = coords[0]-120;
        let y = coords[1]-200;
        party = c.party
        console.log(c)

        // remove previous text: 
        timeline.selectAll("#tooltipText").remove()
        // console.log(party)
        // tooltip = d3.select("#tooltipBar")
        //     .style("display", "block")
        //     .style("top", y + "px")
        //     .style("left", x + "px")
        //     // .html(text2>100? "hthough": "count")
            // .html(ttip === "tot" ? "<b>" + text1 + "<br/>" + text2 + "</b> deaths by police in " + "<b>" + text3 + "</b>" : 
            //     "<b>" + text1 + "<br/>" + text2 + "</b> deaths by police per 100,000 individuals in " + "<b>" + text3 + "</b>")
        timeline
            .style("display", "block")
            .style("top", y + "px")
            .style("left", x + "px")
            .style("border", "solid 1px #ccc")
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

    function drawLineChart(data, county, ttip) {
        // // rename data column based on what we are showing
        // data = ttip === "tot"? data.map(function(d) {return {
        //             death_count: d.death_count,
        //             county: d.county,
        //             date: d.date,
        //             population:d.population}})
        //             :
        //             data.map(function(d) {return {
        //             death_count: d.death_hthou,
        //             county: d.county,
        //             date: d.date,
        //             population:d.population}})

        // console.log(data)
        // // remove all previous text
        // d3.select("#timeline").selectAll("#yAxisLabel").remove()
        // // remove all previous dots
        // d3.select("#timeline").selectAll("circle").remove()
        // // data = data.history;
        // // console.log(ttip)
        // data = data.filter(d=>d.county === county)
        // // console.log(data.length)
        // let margin5 = { left: 40, bottom: 110, right: 20, top: 20 }

        // let bodywidth5 = width5/3 - margin5.left - margin5.right;
        // let bodyheight5 =height5/2 - margin5.top - margin5.bottom;

        // let xScale = d3.scaleLinear()
        //     .range([0, bodywidth5])
        //     // .domain(d3.extent(data, d => d.date))
        //     .domain([2000, 2020])

        // let yScale = d3.scaleLinear()
        //     .range([bodyheight5, 0])
        //     .domain([0, d3.max(data, d => +d.death_count)])

        // let lineGenerator = d3.line()
        //     .x(d => xScale(d.date))
        //     .y(d => yScale(+d.death_count))
        //     .curve(d3.curveBasis);

        // // add max and min dots
        // maxDot = timeline.select(".body").attr("id", "timeline")
        // .attr("transform", `translate(${margin5.left},${margin5.top})`)
        //     .append("circle")
        //     .attr("cx", d=>xScale(data[data.length-1].date))
        //     .attr("cy", d=>yScale(+data[data.length-1].death_count))
        //     .style("r", "5")
        //     .attr("opacity", "0.8")
        //     .attr("stroke", "white")

        // minDot = timeline.select(".body").attr("id", "timeline")
        // .attr("transform", `translate(${margin5.left},${margin5.top})`)
        // .append("circle")
        //     .attr("cx", d=>xScale(data[0].date))
        //     .attr("cy", d=>yScale(+data[0].death_count))
        //     .style("r", "5")
        //     .attr("opacity", "0.8")
        //     .attr("stroke", "white")

        // // dots.exit().remove()
        //     // .attr("stroke-width", "4")

        // // add lines
        // timeline.select(".body")
        //     .attr("transform", `translate(${margin5.left},${margin5.top})`)
        //     .select("path").datum(data)
        //     .attr("id", "timeline")
        //     .attr("d", lineGenerator)
        //     .style("stroke", "#03071e")
        //     // .attr("stroke", d=>d.party==="red" ? '#DD1F26':'#0076C0')
        //     .attr("opacity", "0.8")
        //     .attr("stroke-width", "4")

        // timeline.select(".xAxis")
        //     .attr("transform", `translate(${margin5.left},${height5/2 - margin5.bottom})`)
        //     // .attr("class", "axis")
        //     .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d")))
        //     .selectAll("text")
        //     .attr("font-size", "10px")
        //         .attr("fill", "silver")
        //         .attr("font-family", "arial")

        // timeline.select(".yAxis")
        //     .attr("transform", `translate(${margin5.left},${margin5.top})`)
        //     // .attr("class", "axis")
        //     .call(d3.axisLeft(yScale).ticks(5))
        //     .selectAll("text")
        //     .attr("font-size", "10px")
        //         .attr("fill", "silver")
        //         .attr("font-family", "arial")

        // timeline.append("text")
        //     .attr("id", "yAxisLabel")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 0)
        //     .attr("x",0 - (bodyheight5 / 2))
        //     .attr("dy", "1em")
        //     .attr("font-size", "12px")
        //     .style("text-anchor", "middle")
        //     .style("fill", "silver")
        //     .text(ttip === "tot" ? "Total Deaths by Police": "Deaths by Police per 100,000 People")
        //     .style("font-weight", "bold")  
        //     .style("font-family", "sans-serif")
    }

    function drawBarChart(data, type, year, kind) {
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

        filterData = data.filter(d=>+d.population > popFilter)
        filterData = filterData.filter(d=>+d.date === year)

        console.log(filterData)
        var xScale = d3.scaleSymlog()
                .range([5, bodywidth5])
                .domain([0, d3.max(filterData, d => +d.death_count)+4])

        // draw X-axis
        barchart.append("g")
            .call(d3.axisBottom(xScale))
            .attr("transform", "translate(0, "+bodyheight5+")")
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
                            .range([0, 60])

        var fontScale = d3.scaleLinear()
                            .domain([600000, maxpop])
                            .range([4.5, 10])

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
                    .force('x', d3.forceX().x(function(d) {
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
                .text(d=>+d.population>600000 ? d.county:'')
                .style("font-size", d=>fontScale(+d.population)+"px")

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
            .attr("y", bodyheight5*1.08)
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
            .attr("y", bodyheight5*1.08)
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
                .attr("transform", "translate(0, "+bodyheight5+")")
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
                        .force('x', d3.forceX().x(function(d) {
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
                .attr("transform", "translate(0, "+bodyheight5+")")
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
                        .force('x', d3.forceX().x(function(d) {
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
                xScale.domain([0, d3.max(filterData, d => +d.death_hthou)+1])

                barchart.append("g")
                .call(d3.axisBottom(xScale))
                .attr("transform", "translate(0, "+bodyheight5+")")
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
                        .force('x', d3.forceX().x(function(d) {
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
            .attr("transform", "translate(" + (bodywidth5/2) + "," + (bodyheight5*1.29) + ")")

        .selectAll("g")
            .data([100000, 500000, 1000000, 2000000])
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

    // function to wrap text
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