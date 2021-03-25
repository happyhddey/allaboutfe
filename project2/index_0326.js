
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
        numColorStage: 5,
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
    // Cell.prototype.getColorStage = function(currentTime){
    //     let cellColorStage = 0;
    //     const timePassed = currentTime - this.visitedTime;
    //     if (timePassed <= this.colorStageInfo.numColorStage){
    //         cellColorStage = this.colorStageInfo.numColorStage - timePassed;
    //     }
    //     return cellColorStage;
    // }
    
    Cell.prototype.getColor = function(currentTime){
        let cellColorStage = 0;
        if (this.isVisited()){
            const timePassed = currentTime - this.visitedTime;
            if (timePassed <= this.colorStageInfo.numColorStage){
                cellColorStage = this.colorStageInfo.numColorStage - timePassed;
            }
        }
        return this.translateToRGB(cellColorStage, this.colorStageInfo);
    }

    return Cell;
}



// css grid 사용해보기
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





const gameControl = function(size = 7){
    
    const mapSize = size;
    let duckMap;
    let duckLocation;
    let curLocation;
    let currentTime;

    const checkRange = function(x, y){
        if((x >= 0) && (x < mapSize) && (y >= 0) && (y < mapSize)){
            return true;
        }
        else{
            return false;
        }
    }

    const updateCurLocation = function(newX, newY){
        curLocation.x = newX;
        curLocation.y = newY;
    }

    const getNewLocation = function(direction){
        const buttonType ={
            "up": (x, y) => {return [x-1, y]},
            "down": (x, y) => {return [x+1, y]},
            "left": (x, y) => {return [x, y-1]},
            "right": (x, y) => {return [x, y+1]}
        }

        const{x, y} = curLocation;
        const move = buttonType[direction];
        return move(x, y);
    }

    const updateCurrentTime = function(){
        currentTime++;
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

    const updateCellOnMap = function(dom, text, color){
        dom.innerText = text;
        dom.style.color = color;
    }

    const updateMap = function(){
        for (let i=0; i<mapSize; i++){
            for (let j=0; j<mapSize; j++){
                const elem = duckMap[i][j];
                const text = elem.cell.getText(isCurrentLocation(i, j, curLocation));
                const color = elem.cell.getColor(currentTime);
                updateCellOnMap(elem.dom, text, color);
            }
        }
    }

    const updateScore = function(){
        const score = document.getElementById('score');
        score.innerText = "SCORE: " + currentTime;
    }

    const isEqualToDuckLocation = function(){
        if((curLocation.x == duckLocation.x) && (curLocation.y == duckLocation.y)){
            return true;
        }
        else{
            return false;
        }
    }
    
    const callModal = function(){
        const modal_wrapper = document.querySelector('.modal-wrapper');
        modal_wrapper.style.display = 'flex';
    }

    const callRoutine = function(direction){
        [newX, newY] = getNewLocation(direction);
        
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

    const initDuckLocation = function(){
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
    }

    const initCurLocation = function(){
        const startPoint = Math.floor(mapSize/2);
        duckMap[startPoint][startPoint].cell.setVisited();
        return {x: startPoint, y:startPoint};
    }

    const initGame = function(){
        const duckTravelMap = DuckTravelMap(mapSize);
        duckMap = duckTravelMap.makeMap();
        duckLocation = initDuckLocation();
        curLocation = initCurLocation();
        currentTime = 0;
        updateScore();
        updateMap();
    }

    return {callRoutine, initGame};
}





/* Main */
const game = gameControl(7);
game.initGame();





/* Set button operation */
const buttonList = ['up', 'down', 'left', 'right'];
for (let buttonType of buttonList){
    const btn = document.getElementById('button_' + buttonType);
    btn.onclick = () => {
        console.log("click button " + buttonType);
        game.callRoutine(buttonType);
    }
}

const button_close = document.getElementById('close');
button_close.onclick = () => {
    const modal_wrapper = document.querySelector('.modal-wrapper');
    modal_wrapper.style.display = 'none';
    document.location.reload();
}
