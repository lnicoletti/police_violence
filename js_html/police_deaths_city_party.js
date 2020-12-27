
    // var margin4 = {top: 8, right: 15, bottom: 20, left: 40},
    //     width4 = 180 - margin4.left - margin4.right,
    //     height4 = 120 - margin4.top - margin4.bottom;

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
    //death_by_city_party.csv
    // d3.csv("https://gist.githubusercontent.com/lnicoletti/d8e01d5991e20eb19b7aa68b674311eb/raw/c87d0d8d0fa419878be0efe2917de2bb59c29bdb/death_by_city_party.csv", convertTextToNumbers, function(error, data) {
      // d3.csv("data/death_by_city_party.csv", convertTextToNumbers, function(error, data) {
      d3.csv("https://gist.githubusercontent.com/lnicoletti/bd55c7bd6b172270df1606b166071791/raw/f687c8d75e9333e06534710994aedf1fb7f9957c/death_by_city_party.csv").then((data)=>{
      showSmallMultiples(data)})

      function showSmallMultiples(data) {

      console.log(data)
      data.sort(function(x, y){
        // return d3.ascending(x.MV - x.LV, y.MV - y.LV);
        return d3.ascending(x.party, y.party);
      })

      data = data.filter(d=>(+d.year===2000)|(+d.year===2019))

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
    
    function convertTextToNumbers(d) {
      d.year = +d.year;
      d.value = +d.value;
      return d;
    }