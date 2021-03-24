// Set data
const Planet = function(planetName, planetOrder, planetSize, planetWeight, planetColor){
    this.name = planetName,
    this.order = planetOrder,
    this.size = planetSize,
    this.weight = planetWeight,
    this.color = planetColor
}

Planet.prototype.getName = function(){
    return this.name;
}
Planet.prototype.getOrder = function(){
    return this.order;
}
Planet.prototype.getSize = function(){
    return this.size;
}
Planet.prototype.getWeight = function(){
    return this.weight;
}
Planet.prototype.getLogSize = function(){
    const sizeScale = 40;
    return (1 + Math.log(this.size) / Math.log(10)) * sizeScale;
}
Planet.prototype.getColor = function(){
    return this.color;
}

const planets = [];
planets.push(new Planet ('MERCURY', 1, 0.3825, 0.0553, "lightgray"));
planets.push(new Planet ('VENUS', 2, 0.9488, 0.8811, "rgb(243, 160, 36)"));
planets.push(new Planet ('EARTH', 3, 1, 1, "rgb(56, 136, 173)"));
planets.push(new Planet ('MARS', 4, 0.53226, 0.107, "rgb(223, 100, 43)"));
planets.push(new Planet ('JUPITER', 5, 11.209, 318.7, "rgb(168, 147, 115)"));
planets.push(new Planet ('SATURN', 6, 9.449, 95.12, "rgb(226, 226, 198)"));
planets.push(new Planet ('URANUS', 7, 4.007, 14.53, "skyblue"));
planets.push(new Planet ('NEPTUNE', 8, 3.883, 17.145, "rgb(92, 101, 182)"));






// Set width and height
const width = 1000;
const height = 300;


// Make svg in HTML
const canvas = d3.select("#example-container #svg-container2 svg")
    .attr("width", width)
    .attr("height", height);


// functions
// const drawEllipse = function(canvas, rx, height, color){
//     canvas.append("ellipse")
//         .attr("cx", 0).attr("cy", height * 0.5)
//         .attr("rx", rx).attr("ry", rx * 0.2)
//         .attr("stroke", color)
//         .attr("stroke-width", 1)
//         .attr("fill", "none")
// }

const drawPlanetShadow = function(canvas, planet, x, y, shadowAttr){
    canvas.append("circle")
        .attr("id", planet.getName() + shadowAttr.selectTag)
        .attr(shadowAttr.x, x + shadowAttr.dx).attr(shadowAttr.y, y + shadowAttr.dy)        
        .attr("r", planet.getLogSize())
        .attr("fill", "black")
}

const drawPlanetBody = function(canvas, planet, x, y, bodyAttr){
    canvas.append("circle")
        .attr("id", planet.getName() + bodyAttr.selectTag)
        .attr(bodyAttr.x, x).attr(bodyAttr.y, y)        
        .attr("r", planet.getLogSize())
        .attr("fill", planet.getColor())
}

const drawPlanetText = function(canvas, planet, x, y, textAttr){
    canvas.append("text")
        .attr("id", planet.getName() + textAttr.selectTag)
        .attr(textAttr.x, x).attr(textAttr.y, y - (planet.getLogSize() + textAttr.dy))
        .attr("text-anchor", "middle")
        .style("font-size", textAttr.fontSize)
        .text(planet.getName());
}

const drawPlanet = function(canvas, planet, x, y){
    drawPlanetShadow(canvas, planet, x, y, planetElementsAttributes["shadow"]);
    drawPlanetBody(canvas, planet, x, y, planetElementsAttributes["body"]);
    drawPlanetText(canvas, planet, x, y, planetElementsAttributes["text"]);
}

const drawSolarSystem = function(canvas, planets, width, height){
    for(const planet of planets){
        drawPlanet(canvas, planet, width/2, height/2);
    }
}

const rearrangePlanet = function(canvas, planetName, planetLocation, planetElementsAttributes){
    const durationTime = 500, delayTime = 10;
    for (const element in planetElementsAttributes){
        const elementAttr = planetElementsAttributes[element];
        const planetElement = canvas.select("#" + planetName + elementAttr.selectTag);
        planetElement.transition()
            .duration(durationTime)
            .delay(delayTime)
            .attr(elementAttr.x, planetLocation + elementAttr.dx);
    }
}

const rearrangeSolarSystem = function(canvas, planets, planetElementsAttributes){
    const interval = 15, startPoint = 10;
    let planetLocation = startPoint;
    for(const planet of planets){
        const planetRadius = planet.getLogSize()
        planetLocation += (interval + planetRadius);
        rearrangePlanet(canvas, planet.getName(), planetLocation, planetElementsAttributes);
        planetLocation += planetRadius;
    }
}

const sortSolarSystemBy = function(prop, planets){
    planets.sort(function(a,b){
        return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
    })
}





// main
const planetElementsAttributes = {
    "body" : {selectTag: "", dx:0, dy:0, x:"cx", y:"cy"},
    "shadow" : {selectTag: "Shadow", dx:10, dy:18, x:"cx", y:"cy"},
    "text" : {selectTag: "Text", dx:0, dy:10, x:"x", y:"y", fontSize:"14px"}
};

drawSolarSystem(canvas, planets, width, height);
rearrangeSolarSystem(canvas, planets, planetElementsAttributes);





// Button
const button_reset = document.getElementById('button-reset');
const button_size = document.getElementById('button-size');
const button_weight = document.getElementById('button-weight');
const button_alphabet = document.getElementById('button-alphabet');

button_reset.onclick = () => {
    sortSolarSystemBy("order", planets);
    rearrangeSolarSystem(canvas, planets, planetElementsAttributes);
}
button_size.onclick = () => {
    sortSolarSystemBy("size", planets);
    rearrangeSolarSystem(canvas, planets, planetElementsAttributes);
}
button_weight.onclick = () => {
    sortSolarSystemBy("weight", planets);
    rearrangeSolarSystem(canvas, planets, planetElementsAttributes);
}
button_alphabet.onclick = () => {
    sortSolarSystemBy("name", planets);
    rearrangeSolarSystem(canvas, planets, planetElementsAttributes);
}