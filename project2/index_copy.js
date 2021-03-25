
/* Wrap-up 'Cell' constructor and its prototype functions */

const cellConstructor = function(){
    
    const Cell = function(){
        this.visitedTime = 0;
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
    
    Cell.prototype.setCellType = function(type){
        this.cellType = type;
    }
    
    Cell.prototype.isVisited = function(){
        if (this.visitedTime != 0){
            return true;
        }
        else{
            return false;
        }
    }
    
    // isCurrentLocation 함수를 만들어야 할까?
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
        const whiteValue = (highestWhiteValue / numColorStage) * cellColorStage;
        return `rgb(${whiteValue}, ${whiteValue}, ${whiteValue})`
    }
    
    // getColorStage를 따로 분리하는 게 나을까?
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

const Cell = cellConstructor();
const cell = new Cell();
console.log(cell);
console.log(cell.getText());
console.log(cell.getColor());
cell.setVisitedTime(4);
console.log(cell.getText(true));
console.log(cell.getText(false));
console.log(cell.getColor(4));




const DuckTravleMap = function(mapSize = 7){

    // makeCell을 생성자 함수로 만드는 건 어떨까?
    const makeCell = function(){
        const cell = {
            visitedTime: 0,
            cellType: 'bush',
        }
        return cell;
    }

    const makeMap = function(){
        for (let i=0; i<mapSize; i++){
            const arr = Array.from({length: mapSize}, () => makeCell());
            duckTravleMap.push(arr);
        }
    }

    return makeMap();
}



const duckTravle = function(){

    let duckLocation = {x:0, y:0};
    let curLocation = {x:0, y:0};
    

}



// Add HTML elements for duck map on index.html
const makeMapOntoHTML = function(mapSize){

    const testMap = document.getElementById('testmap');

    for (let i=0; i<mapSize; i++){
        let ithRow = document.createElement("div");
        let rowText = "row row" + i;
        ithRow.setAttribute("class", rowText);

        for (let j=0; j<mapSize; j++){
            let jthCol = document.createElement("p");
            let colText = "col col" + j;
            jthCol.setAttribute("class", colText);
            jthCol.innerHTML = "#";
            ithRow.appendChild(jthCol);
        }

        testMap.appendChild(ithRow);
    }
}
makeMapOntoHTML(5);







/*
const map = document.getElementById('map');
const score = document.getElementById('score');
const modal_wrapper = document.querySelector('.modal-wrapper');

const button_up = document.getElementById('button_up');
const button_left = document.getElementById('button_left');
const button_right = document.getElementById('button_right');
const button_down = document.getElementById('button_down');

const button_close = document.getElementById('close');

button_close.onclick = () => {
    modal_wrapper.style.display = 'none';
    document.location.reload();
}
*/