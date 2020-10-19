let Chartbody = d3.select("#RaceChartBody")
        d3.csv("https://gist.githubusercontent.com/lnicoletti/f941139d7bf40385a325b92e6750a14f/raw/677990a4c3de14e8b71756cbe5c7c4ec363b0be4/deaths_by_race_city_year.csv").then((data)=> {
    
        // d3.csv("data/deaths_by_race_city_year.csv").then((data)=> {
        
        populateDropdown(data)
        
        initialOption = "National Total"
        drawLines(data, initialOption)

        d3.select("#citydropdown").on("change", function(d) {
            // recover the option that has been chosen
            var selectedCity = d3.select(this).property("value")
            // run the updateChart function with this selected option
            d3.selectAll(".Raceline").remove()
            d3.selectAll(".Raceaxis").remove()
            d3.selectAll(".Racelegend").remove()
            d3.selectAll(".raceAxisText").remove()
            drawLines(data, selectedCity)
            })
        
        
        })

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

            let bodyHeight0 = 500
            let bodyWidth0 = 800

            year_filter = 2020
            populationfilter = 100000
            data = data.filter(d=>d.city==selectedCity)
            data = data.filter(d=>d.date<year_filter)
            
            // convert date field to datetime object
            data = data.map(d => ({
                date: new Date(d.date),
                black: +d.black,
                white: +d.white,
                latino: +d.latino
            }))
    
            console.log(data)
            
            let maxValues = [d3.max(data, d => d.black), d3.max(data, d => d.white), d3.max(data, d => d.latino)]
            maxValue = d3.max(maxValues)
            console.log(maxValue)
    
            // make yScale and yAxis
            let yScale = d3.scaleLinear()
                           .range([bodyHeight0, 0])
                           .domain([0, maxValue])
            Chartbody.append("g")
                .attr("class", "Raceaxis")
                .attr("transform", "translate("+bodyWidth0+",0)")
                .call(d3.axisLeft(yScale).ticks(5).tickSize(bodyWidth0))
            
            // make xScale and xAxis
            let xScale = d3.scaleUtc()
                           .domain(d3.extent(data, d => d.date))
                           .range([0, bodyWidth0])
            Chartbody.append("g")
                .attr("class", "Raceaxis")
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
            .attr("class", "raceAxisText")
                
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
                .attr("font-size", "14px")
    
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
                .attr("font-size", "14px")

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
                .attr("font-size", "14px")

                        
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
    
        