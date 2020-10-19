   // set the dimensions and margins of the graph
    var margin2 = {top: 20, right: 90, bottom: 70, left: 50},
        width2 = 1250 - margin2.left - margin2.right,
        height2 = 800 - margin2.top - margin2.bottom;
    
    // append the svg object to the body of the page
    var svg2 = d3.select("#my_dataviz2")
      .append("svg")
        .attr("width", width2 + margin2.left + margin2.right)
        .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin2.left + "," + margin2.top + ")");
    
    //Read the data
    // deaths_vs_officers.csv
    d3.csv("https://gist.githubusercontent.com/lnicoletti/1cc02dd942ff7efb1f7d7f1bc8e908cf/raw/c37b69c25c2855b8c7a7bd456561d9ff056757e7/deaths_vs_officers.csv", function(data) {
      // d3.csv("data/deaths_vs_officers.csv", function(data) {

        console.log(data)
      // data for text
      // pareto = data.filter(d => +d.d_2010 > 1500);
      pareto = data.filter(function(d){ return +d.d_2010/10 >= 0.8 || +d.police_hthou/10 >= 180})
      not_pareto = data.filter(function(d){ return +d.d_2010/10 < 12.2 && +d.police_hthou/10 < 180})

      console.log(pareto)
      console.log(not_pareto)
      // Add X axis
      let maxPolice = d3.max(data, d => +d.police_hthou)/10
      var x = d3.scaleLinear()
        .domain([0, maxPolice])
        .range([ 0, width2]);
      svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x))
        .attr("class", "axis");
    
      // Add Y axis
      let maxDeaths = d3.max(data, d => +d.d_2010)/10
      var y = d3.scaleLinear()
        .domain([0, maxDeaths])
        .range([ height2, 0]);
      svg2.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");
        d3.selectAll("path.domain").remove();
        // d3.selectAll("line").style("stroke", "silver");
        // d3.selectAll("text").style("fill", "silver");
        // d3.selectAll("text").style("font-size", "14px");

      // Add Axis Labels
      // Y axis
      svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin2.left)
        .attr("x",0 - (height2 / 2))
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
                           (height2 + margin2.top + 35) + ")")
       .style("text-anchor", "middle")
       .text("Police Officers Per 100,000 Inhabitants")
       .style("fill", "silver")   
       .style("font-weight", "bold") 
       .style("font-family", "sans-serif") 

      // Add a scale for bubble size
      var z = d3.scaleLinear()
        .domain([0, maxPolice])
        .range([ 1, 40]);

      // Add a scale for bubble color
      var myColor = d3.scaleOrdinal()
        .domain(["blue", "red"])
        .range(['#0076C0', '#DD1F26']);
      
      // -1- Create a tooltip div that is hidden by default:
      var tooltip = d3.select("#my_dataviz2")
        .append("div")
          .style("display", "none")
          .attr("class", "tooltipScatter")
          // .style("background-color", "black")
          // .style("border-radius", "5px")
          // .style("padding", "10px")
          // .style("color", "Black")

      // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
      var showTooltip = function(d) {
        var color = myColor(d.party)
        tooltip
        .style("display", "block")
          // .transition()
          // .duration(200)
          
        tooltip
          .style("opacity", 1)
          .html("<span style='color:" + color + ";'>" + "<b>" +d.city + "</b>"+"</br>"
          + "<b>" + Math.round(d.police_hthou*100)/100 + "</b> Police Officers per 100,000 Inhabitants </br>" 
          + "<b>" + Math.round(d.d_2010*100)/100 + "</b> Deaths by Police per 100,000 Inhabitants </span>")
          .style("left", (d3.mouse(this)[0]+30) + "px")
          .style("top", (d3.mouse(this)[1]+30) + "px")
          .style("color", "Silver")
          // .style("font-weight", "bold")
          .style('font', '12px sans-serif')
      }
      var moveTooltip = function(d) {
        tooltip
          .style("left", (d3.mouse(this)[0]+30) + "px")
          .style("top", (d3.mouse(this)[1]+30) + "px")
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
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(+d.police_hthou/10); } )
          .attr("cy", function (d) { return y(+d.d_2010/10); } )
          .attr("r", "7px" )
        //   .attr("r", function (d) { return z(d.police_hthou); } )
          .style("fill", function (d) { return myColor(d.party); } )
          .style("opacity", "0.7")
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          // -3- Trigger the functions
          .on("mouseover", showTooltip )
          .on("mousemove", moveTooltip )
          .on("mouseleave", hideTooltip )

      svg2.append('g')
        .selectAll("text")
        .data(pareto)
        .enter()
        .append("text")
          .attr("x", function (d) { return x(+d.police_hthou/10) + 10; } )
          .attr("y", function (d) { return y(+d.d_2010/10) + 5; } )
          .text(function (d) { return d.city; })
        
          .style("fill", function (d) { return myColor(d.party); } )
          .style("opacity", "0.7")
          // .attr("stroke", "white")
          .style("stroke-width", "1px")
          .style("font-family", "sans-serif")
          .style("font-size", "12") 
          .style("text-anchor", "start")


      // add interactivity
      // var focus = svg2.selectAll("dot")
      //    .data(not_pareto)
      //   .enter()
      //   .append("text")
      //   .attr("x", function (d) { return x(+d.police_hthou) + 10; } )
      //     .attr("y", function (d) { return y(+d.d_2010) + 5; } )
      //     .text(function (d) { return d.city; })
      //     .style("fill", function (d) { return myColor(d.party); } )
      //     // .style("font-weight","bold")
      //     .style("opacity", "0")
      //   //   .on("mouseover", function() { focus.style("display", null); })
      //     .on('mouseenter',function() {focus.style("opacity", "1")})
      //     .on('mouseleave',function () {focus.style("opacity", "0")})
    })