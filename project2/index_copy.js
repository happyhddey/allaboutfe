
/* Wrap-up 'Cell' constructor and its prototype functions */

const cellConstructor = function(){
    
    const Cell = function(){
        this.visitedTime = 0;
        this.visited = false;
        this.cellType = 'bush';
    }
    
    Cell.prototype.textSet = {
        current:'A',
        visited:'#',
        bush:','
    }
    
    Cell.prototype.colorStageInfo = {
        numColorStage: 4,
        highestWhiteValue: 211,
    }
    
    Cell.prototype.setVisitedTime = function(currentTime){
        this.visitedTime = currentTime;
    }
    
    Cell.prototype.setVisited = function(){
        this.visited = true;
    }

    Cell.prototype.setCellType = function(type){
        this.cellType = type;
    }
    
    Cell.prototype.isVisited = function(){
        if (this.visited){
            return true;
        }
        else{
            return false;
        }
    }
    
    Cell.prototype.getText = function(isCurrentLocation){
        const textSet = this.textSet;
        let text = ' ';
        if (isCurrentLocation){
            text = textSet["current"];
        }
        else if (this.isVisited()){
            text = textSet["visited"];
        }
        else {
            text = textSet[this.cellType];
        }
        return text;
    }
    
    Cell.prototype.translateToRGB = function(cellColorStage){
        const {numColorStage, highestWhiteValue} = this.colorStageInfo;
        const whiteValue = (highestWhiteValue / numColorStage) * (numColorStage - cellColorStage);
        return `rgb(${whiteValue}, ${whiteValue}, ${whiteValue})`
    }
    
    // getColorStage를 getColor랑 합치는 게 나을까?
    Cell.prototype.getColorStage = function(currentTime){
        let cellColorStage = 0;
        const timePassed = currentTime - this.visitedTime;
        if (timePassed <= this.colorStageInfo.numColorStage){
            cellColorStage = this.colorStageInfo.numColorStage - timePassed;
        }
        return cellColorStage;
    }
    
    Cell.prototype.getColor = function(currentTime){
        let cellColorStage = 0;
        if (this.isVisited()){
            cellColorStage = this.getColorStage(currentTime, this.colorStageInfo);
        }
        return this.translateToRGB(cellColorStage, this.colorStageInfo);
    }

    return Cell;
}



const DuckTravelMap = function(size = 7){

    const mapSize = size;
    const Cell = cellConstructor();

    const getSize = function(){
        return mapSize;
    }

    const createTagWithClass = function(tag, className){
        let newTag = document.createElement(tag);
        newTag.setAttribute("class", className);
        return newTag;
    }

    // html 파일에 map에 사용될 tag 추가
    const drawMapOutline = function(){
        const mapContainer = document.getElementById('testmap');

        for (let i=0; i<mapSize; i++){
            let ithRow = createTagWithClass("div", "row row" + i);

            for (let j=0; j<mapSize; j++){
                let jthCol = createTagWithClass("p", "col col" + j);
                jthCol.innerHTML = "#";
                ithRow.appendChild(jthCol);
            }
            mapContainer.appendChild(ithRow);
        }
    }

    // cell과 dom을 함께 저장하고 있는 map array 만듦
    const makeMap2 = function(){
        const duckTravelMap = [];
        for (let i=0; i<mapSize; i++){
            const arr = [];
            let rowElements = document.getElementsByClassName("row" + i)[0];
            for (let j=0; j<mapSize; j++){
                let cell = new Cell();
                let dom = rowElements.getElementsByClassName("col" + j)[0];
                arr.push({"cell":cell, "dom":dom});
            }
            duckTravelMap.push(arr);
        }
        return duckTravelMap;
    }

    // html 요소를 추가하면서, cell과 dom을 연결하는 map array 만듦
    const makeMap = function(){
        const htmlMap = document.getElementById('map');
        const duckMap = [];

        for (let i=0; i<mapSize; i++){
            const htmlRow = createTagWithClass("div", "row row" + i);
            const duckRow = [];

            for (let j=0; j<mapSize; j++){
                const htmlCol = createTagWithClass("p", "col col" + j);
                const duckCol = {"cell":new Cell(), "dom":htmlCol};
                // htmlCol.innerHTML = "#";
                htmlRow.appendChild(htmlCol);
                duckRow.push(duckCol);
            }
            htmlMap.appendChild(htmlRow);
            duckMap.push(duckRow);
        }
        return duckMap;
    }

    return {getSize, makeMap};
}





const gameControl = function(duckTravelMap){
    
    const mapSize = duckTravelMap.getSize();
    const duckMap = duckTravelMap.makeMap();
    let duckLocation = (function() {
        const startPoint = Math.floor(mapSize / 2);
        const totalStep = startPoint;
        let duckX = Math.floor(Math.random() * mapSize);
        let leftStep = totalStep - Math.abs(totalStep - duckX);
        if(Math.random() > 0.5){
            duckY = totalStep - leftStep;
        }
        else{
            duckY = totalStep + leftStep;
        }
        return {x: duckX, y:duckY};
    })();
    let curLocation = (function() {
        const startPoint = Math.floor(mapSize/2);
        duckMap[startPoint][startPoint].cell.setVisited();
        return {x: startPoint, y:startPoint};
    })();
    let currentTime = 0;

    const updateCurLocation = function(newX, newY){
        curLocation.x = newX;
        curLocation.y = newY;
    }

    const checkRange = function(x, y){
        if((x >= 0) && (x < mapSize) && (y >= 0) && (y < mapSize)){
            return true;
        }
        else{
            return false;
        }
    }

    const updateCellState = function(curLocation, currentTime){
        const {x, y} = curLocation;
        const cell = duckMap[x][y].cell;
        cell.setVisitedTime(currentTime);
        cell.setVisited();
    }

    const isCurrentLocation = function(mapX, mapY, curLocation){
        const {x, y} = curLocation;
        if((mapX == x) && (mapY == y)){
            return true;
        }
        else{
            return false;
        }
    }

    const isEqualToDuckLocation = function(){
        if((curLocation.x == duckLocation.x) && (curLocation.y == duckLocation.y)){
            return true;
        }
        else{
            return false;
        }
    }

    const updateCell = function(dom, text, color){
        dom.innerText = text;
        dom.style.color = color;
    }

    const updateMap = function(){
        for (let i=0; i<mapSize; i++){
            for (let j=0; j<mapSize; j++){
                const elem = duckMap[i][j];
                const elemCell = elem.cell;
                const elemDom = elem.dom;
                const text = elemCell.getText(isCurrentLocation(i, j, curLocation));
                const color = elemCell.getColor(currentTime);
                updateCell(elemDom, text, color);
            }
        }
    }


    const clickButton = function(direction){
        const button ={
            "up": (x, y) => {return [x-1, y]},
            "down": (x, y) => {return [x+1, y]},
            "left": (x, y) => {return [x, y-1]},
            "right": (x, y) => {return [x, y+1]}
        }
        return button[direction];
    }

    const updateCurrentTime = function(){
        currentTime++;
    }

    const updateScore = function(){
        const score = document.getElementById('score');
        score.innerText = "SCORE: " + currentTime;
    }

    const callModal = function(){
        const modal_wrapper = document.querySelector('.modal-wrapper');
        modal_wrapper.style.display = 'flex';
    }

    const buttonRoutine = function(direction){
        const {x, y} = curLocation;
        const move = clickButton(direction);
        [newX, newY] = move(x, y);
        
        if (checkRange(newX, newY)){
            updateCurLocation(newX, newY);
            updateCurrentTime();
            updateCellState(curLocation, currentTime);
            updateMap();
            updateScore();
            if(isEqualToDuckLocation()){
                callModal();
            }
        }
    }

    return {updateCurLocation, updateScore, updateMap, buttonRoutine};
}

const duckTravelMap = DuckTravelMap(5);
const gc = gameControl(duckTravelMap);
gc.updateMap();
gc.updateScore();




const button_up = document.getElementById('button_up');
const button_left = document.getElementById('button_left');
const button_right = document.getElementById('button_right');
const button_down = document.getElementById('button_down');
const button_close = document.getElementById('close');

button_up.onclick = () => {
    gc.buttonRoutine("up");
}

button_left.onclick = () => {
    gc.buttonRoutine("left");
}

button_right.onclick = () => {
    gc.buttonRoutine("right");
}

button_down.onclick = () => {
    gc.buttonRoutine("down");
}

button_close.onclick = () => {
    const modal_wrapper = document.querySelector('.modal-wrapper');
    modal_wrapper.style.display = 'none';
    document.location.reload();
}
