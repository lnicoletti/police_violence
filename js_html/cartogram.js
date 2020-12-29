var margin2 = {top: 20, right: 70, bottom: 70, left: 70},
width2 = 1250 - margin2.left - margin2.right,
height2 = 600 - margin2.top - margin2.bottom;

// line chart
let g = d3.select("div#cartogram").select("#cartoMap")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 "+ width2 +"," + height2+"")
                    .append("g")
                    .attr("transform",
                        "translate(" + margin2.left + "," + margin2.top + ")");


layout = [[2,0,"AK"],[12,0,"ME"],[7,1,"WI"],[11,1,"VT"],[12,1,"NH"],[2,2,"WA"],[3,2,"ID"],[4,2,"MT"],
         [5,2,"ND"],[6,2,"MN"],[7,2,"IL"],[8,2,"MI"],[10,2,"NY"],[11,2,"MA"],[2,3,"OR"],[3,3,"NV"],
         [4,3,"WY"],[5,3,"SD"],[6,3,"IA"],[7,3,"IN"],[8,3,"OH"],[9,3,"PA"],[10,3,"NJ"],[11,3,"CT"],
         [12,3,"RI"],[2,4,"CA"],[3,4,"UT"],[4,4,"CO"],[5,4,"NE"],[6,4,"MO"],[7,4,"KY"],[8,4,"WV"],
         [9,4,"VA"],[10,4,"MD"],[11,4,"DE"],[3,5,"AZ"],[4,5,"NM"],[5,5,"KS"],[6,5,"AR"],[7,5,"TN"],
         [8,5,"NC"],[9,5,"SC"],[5,6,"OK"],[6,6,"LA"],[7,6,"MS"],[8,6,"AL"],[9,6,"GA"],[5,7,"TX", 4],
         [10,7,"FL"],[2,7,"HI"]]

squareSize = 50

// seats = ({
//     "AK": [1, 1],
//     "AL": [7, 7],
//     "AR": [4, 4],
//     "AZ": [8, 9],
//     "CA": [53, 53],
//     "CO": [7, 7],
//     "CT": [5, 5],
//     "DE": [1, 1],
//     "FL": [25, 27],
//     "GA": [13, 14],
//     "HI": [2, 2],
//     "IA": [5, 4],
//     "ID": [2, 2],
//     "IL": [19, 18],
//     "IN": [9, 9],
//     "KS": [4, 4],
//     "KY": [6, 6],
//     "LA": [7, 6],
//     "MA": [10, 9],
//     "MD": [8, 8],
//     "ME": [2, 2],
//     "MI": [15, 14],
//     "MN": [8, 8],
//     "MO": [9, 8],
//     "MS": [4, 4],
//     "MT": [1, 1],
//     "NC": [13, 13],
//     "ND": [1, 1],
//     "NE": [3, 3],
//     "NH": [2, 2],
//     "NJ": [13, 12],
//     "NM": [3, 3],
//     "NV": [3, 4],
//     "NY": [29, 27],
//     "OH": [18, 16],
//     "OK": [5, 5],
//     "OR": [5, 5],
//     "PA": [19, 18],
//     "RI": [2, 2],
//     "SC": [6, 7],
//     "SD": [1, 1],
//     "TN": [9, 9],
//     "TX": [32, 36],
//     "UT": [3, 4],
//     "VT": [1, 1],
//     "VA": [11, 11],
//     "WA": [9, 10],
//     "WV": [3, 3],
//     "WI": [8, 8],
//     "WY": [1, 1],
//   })

seats = ({
    'AK': [121, 121],
    'AL': [647, 647],
    'AR': [364, 364],
    'AZ': [856, 856],
    'CA': [4688, 4688],
    'CO': [639, 639],
    'CT': [137, 137],
    'DC': [83, 83],
    'DE': [60, 60],
    'FL': [1782, 1782],
    'GA': [1109, 1109],
    'HI': [107, 107],
    'IA': [271, 271],
    'ID': [143, 143],
    'IL': [1070, 1070],
    'IN': [557, 557],
    'KS': [401, 401],
    'KY': [398, 398],
    'LA': [617, 617],
    'MA': [195, 195],
    'MD': [521, 521],
    'ME': [99, 99],
    'MI': [857, 857],
    'MN': [332, 332],
    'MO': [894, 894],
    'MS': [416, 416],
    'MT': [103, 103],
    'NC': [620, 620],
    'ND': [38, 38],
    'NE': [198, 198],
    'NH': [56, 56],
    'NJ': [520, 520],
    'NM': [404, 404],
    'NV': [391, 391],
    'NY': [667, 667],
    'OH': [961, 961],
    'OK': [679, 679],
    'OR': [328, 328],
    'PA': [941, 941],
    'RI': [28, 28],
    'SC': [559, 559],
    'SD': [57, 57],
    'TN': [632, 632],
    'TX': [2597, 2597],
    'UT': [247, 247],
    'VA': [601, 601],
    'VT': [40, 40],
    'WA': [646, 646],
    'WI': [445, 445],
    'WV': [179, 179],
    'WY': [58, 58]})

console.log(seats)

function drawCartogram() {
    const padding = 1;
    
    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, squareSize - padding]);
    const y = d3.scaleSqrt()
      .domain([0, 5500])
      .range([squareSize - (padding * 1.5), 0]);
  
    const area = d3.area()
      .x((d, i) => x(i))
      .y0(squareSize - (padding * 1.5))
      .y1(d => y(d));
    
    g.selectAll("rect")
      .data(layout)
      .enter()
        .append("rect")
        .attr("x", d => d[0] * squareSize)
        .attr("y", d => d[1] * squareSize)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("stroke", "#fff")
        .attr("stroke-width", `${padding}px`)
        .style("fill-opacity", 0.7)
        .style("fill", "#ddd");
    
    g.selectAll("path")
      .data(layout)
      .enter()
        .append("path")
        .attr("transform", d => `
          translate(${d[0] * squareSize + (padding / 2)},${d[1] * squareSize + padding})
        `)
        .attr("d", d => area(seats[d[2]]))
        .style("stroke-width", 0)
        .style("fill-opacity", 0.7)
        .style("fill", "#cc0000");
        // .style("fill", (d) => {
        //   const [first, second] = seats[d[2]];
        //   if (first === second) return "#9b9c9f";
        //   return second > first ? "#00868a" : "#ed1651";
        // });
    
    g.selectAll("text")
      .data(layout)
      .enter()
        .append("text")
        .attr("x", d => (d[0] * squareSize) + (squareSize / 2))
        .attr("y", d => (d[1] * squareSize) + (squareSize / 2) + 6)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-family", "Helvetica Neue, Helvetica, sans-serif")
        .text(d => d[2]);
    
    const legend = g.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(605,335)`)
      .style("font-size", "14px")
      .style("font-family", "Helvetica Neue, Helvetica, sans-serif");
      
    legend.append("text")
      .attr("transform", "translate(20,-20)")
      .style("font-weight", "bold")
      .text("Death Toll of Policing 2000-2020")
  
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", squareSize)
      .attr("height", squareSize)
      .style("fill-opacity", 0.7)
      .style("fill", "#ddd");
    
    legend.append("line")
      .attr("x1", 0)
      .attr("x2", squareSize + 5)
      .attr("y1", squareSize)
      .attr("y2", squareSize)
      .attr("stroke", "#9b9c9f");
    
    legend.append("text")
      .attr("transform", "translate(65,52.5)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text("0");
    
    legend.append("line")
      .attr("x1", 0)
      .attr("x2", squareSize + 5)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#9b9c9f");
    
    legend.append("text")
      .attr("transform", "translate(80,2.5)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text("5000 Deaths");
    
    legend.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", squareSize)
      .attr("y2", squareSize + 5)
      .attr("stroke", "#9b9c9f");
    
    // legend.append("text")
    //   .attr("transform", "translate(0,65)")
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", "10px")
    //   .attr("font-weight", "bold")
    //   .text("2000");
    
    legend.append("line")
      .attr("x1", squareSize)
      .attr("x2", squareSize)
      .attr("y1", squareSize)
      .attr("y2", squareSize + 5)
      .attr("stroke", "#9b9c9f");
    
    // legend.append("text")
    //   .attr("transform", "translate(50,65)")
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", "10px")
    //   .attr("font-weight", "bold")
    //   .text("2010");
    
    // const shapeG = legend.append("g")
    //   .attr("transform", "translate(85,15)")
    //   .style("font-size", "12px");
    
    // shapeG.append("path")
    //   .style("fill", "#00868a")
    //   .style("fill-opacity", 0.7)
    //   .attr("transform", "scale(0.4) translate(0,-45)")
    //   .attr("d", area([0, 53]));
    
    // shapeG.append("text")
    //   .attr("transform", "translate(25,-2.5)")
    //   .text("Increase");
    
    // shapeG.append("path")
    //   .style("fill", "#ed1651")
    //   .style("fill-opacity", 0.7)
    //   .attr("transform", "scale(0.4) translate(0,35)")
    //   .attr("d", area([53, 0]));
    
    // shapeG.append("text")
    //   .attr("transform", "translate(25,30)")
    //   .text("Decrease");
}

drawCartogram()