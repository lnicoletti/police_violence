   // set the dimensions and margins of the graph
    var margin2 = {top: 20, right: 70, bottom: 70, left: 70},
        width2 = 1250 - margin2.left - margin2.right,
        height2 = 800 - margin2.top - margin2.bottom;
    
    // append the svg object to the body of the page
    var svg2 = d3.select("div#my_dataviz2")
      .select("#scatterPolice")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 "+ (width2 + margin2.left + margin2.right) +"," + (height2 + margin2.top + margin2.bottom)+"")
      .append("g")
        .attr("transform",
              "translate(" + margin2.left + "," + margin2.top + ")");
      // .attr("viewBox", "0 0 "+ width2 +"," + 800+"")
            // .classed("svg-content", true);
      // .append("svg")
      //   .attr("width", width2 + margin2.left + margin2.right)
      //   .attr("height", height2 + margin2.top + margin2.bottom)
      // .append("g")
      //   .attr("transform",
      //         "translate(" + margin2.left + "," + margin2.top + ")");
    
    //Read the data
    d3.csv("https://gist.githubusercontent.com/lnicoletti/1cc02dd942ff7efb1f7d7f1bc8e908cf/raw/c37b69c25c2855b8c7a7bd456561d9ff056757e7/deaths_vs_officers.csv").then(function(data) {
      // d3.csv("data/deaths_vs_officers.csv", function(data) {

      console.log(data)
      // data for text
      // pareto = data.filter(d => +d.d_2010 > 1500);
      pareto = data.filter(function(d){ return +d.d_2010/10 >= 0.8 || +d.police_hthou/10 >= 180})
      not_pareto = data.filter(function(d){ return +d.d_2010/10 < 12.2 && +d.police_hthou/10 < 180})
      // data = data.filter(d=>d.population>200000)
      console.log(data)
      console.log(pareto)
      console.log(not_pareto)
      // Add X axis
      let maxPolice = d3.max(data, d => +d.police_hthou)/10
      var x = d3.scaleLinear()
        .domain([0, maxPolice+20])
        .range([ 0, width2]);

      svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        // .attr("transform", "translate(" + margin2.left + "," + height2 + ")")
        .call(d3.axisBottom(x).ticks(18))
        .attr("class", "axis")
    
      // Add Y axis
      let maxDeaths = d3.max(data, d => +d.d_2010)/10
      var y = d3.scaleLinear()
        .domain([0, maxDeaths+0.2])
        .range([ height2, 0]);
        
      svg2.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis")
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
                           (height2 + margin2.bottom) + ")")
       .style("text-anchor", "middle")
       .text("Police Officers Per 100,000 Inhabitants")
       .style("fill", "silver")   
       .style("font-weight", "bold") 
       .style("font-family", "sans-serif") 

      // Add a scale for bubble size
      let popExtent = d3.extent(data, d => +d.population)
      console.log(popExtent)
      var z = d3.scaleLinear()
        .domain(popExtent)
        .range([5, 30]);

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
      var showTooltip = function(d) {
        var color = myColor(d.party)
        tooltip
        .style("display", "block")
          // .transition()
          // .duration(200)
          
        tooltip
          .style("opacity", 1)
          .html("<span style='color:" + color + ";'>" + "<b>" +d.city + "</b>"+"</br>"
          + "<b>" + Math.round(d.police_hthou*100)/1000 + "</b> Police Officers per 100,000 Inhabitants </br>" 
          + "<b>" + Math.round(d.d_2010*100)/1000 + "</b> Deaths by Police per 100,000 Inhabitants </span>")
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
        .enter()
        .append("circle")
        .attr("class", "scatterBubble")
          .attr("cx", function (d) { return x(+d.police_hthou/10); } )
          .attr("cy", function (d) { return y(+d.d_2010/10); } )
          // .attr("r", "7px" )
          .attr("r", function (d) { return z(+d.population); } )
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
          .attr("x", d=> (d.city=="Oklahoma City, OK")|(d.city=="Omaha, NE")? x(+d.police_hthou/10) - 10:x(+d.police_hthou/10) + 10)
          .attr("y", d=> y(+d.d_2010/10) + 5)
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
               .attr("stroke-width","2px")
           
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