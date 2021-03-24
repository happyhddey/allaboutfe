/*
==해결해야 할 점==
1. 코드 structure를 어떻게 만들면 좋을까?
   현재는 map과 버튼 입력 받는 부분을 분리한 상태
   그런데 꼭 나눠야할까 싶고, 만약 나눈다면 어떤 기준으로 나눌 것인지
2. cell에 어떤 정보를 저장하면 좋을까?

==발전시킬 점==
1. 이동할 때 최근에 지나온 자리의 색깔을 더 진하게
=> DOM을 이용하면 html 문서를 직접 편집할 수 있다고 함 (html 요소 변경)
   map을 cell 단위로 나눈 것을 html에 추가하고, style을 바꿔주면 되지 않을까?
2. 
*/

const MyMap = function(){

    const myMap = [];
    let mapSize = 0;

    
    const initBlock = function(){
        const obj = {
            type: 'bush',
            duck: false,
            developed: false
        }
        return obj;
    }

    const initMap = function(){
        for(let i = 0; i < mapSize; i++){
            const arr = Array.from({length: mapSize}, () => initBlock());
            myMap.push(arr);
        }
    }
    
    const initDuckLocation = function(){
        const startPoint = parseInt(mapSize / 2);
        const totalStep = startPoint;
        let duckX = Math.floor(Math.random() * mapSize);
        let leftStep = totalStep - Math.abs(totalStep - duckX);
        if(Math.random() > 0.5){
            duckY = totalStep - leftStep;
        }
        else{
            duckY = totalStep + leftStep;
        }
        myMap[duckX][duckY].duck = true;
    }

    const isDuckLocation = function(x, y){
        return myMap[x][y].duck;
    }
    
    const setMap = function(size = 25){
        mapSize = size;
        initMap();
        initDuckLocation();
    }

    const checkRange = function(x, y){
        if((x >= 0) && (x < mapSize) && (y >= 0) && (y < mapSize)){
            //console.log('right range');
            return true;
        }
        else{
            //console.log('wrong range');
            return false;
        }
    }

    const changeState = function(x, y){
        const isRightRange = checkRange(x, y);
        if(isRightRange){
            myMap[x][y].developed = true;
            return true;
        }
        else{
            return false;
        }
    }

    const isMyLocation = function(curX, curY, myLocation){
        const {x, y} = myLocation;
        return (curX == x) && (curY == y);
    }

    const isDeveloped = function(block){
        return block.developed;
    }

    const isType = function(block){
        if (block.type == "bush"){
            return ".";
        }
        else if(block.type == "lake"){
            return "~";
        }
    }

    const getMapText = function(myLocation){
        let mapText = ""
        for(let i=0; i<mapSize; i++){
            let mapTextLine = ""
            for(let j=0; j<mapSize; j++){
                const curBlock = myMap[i][j];
                if(isMyLocation(i, j, myLocation)){
                    mapTextLine += "A";
                }
                else if (isDeveloped(curBlock)){
                    mapTextLine += "#";
                }
                else{
                    mapTextLine += isType(curBlock);
                }
            }
            mapText = mapText + mapTextLine + "\n";
        }
        return mapText;
    }

    const getMapConsole = function(){
        console.log(myMap);
    }

    return {setMap, isDuckLocation, changeState, getMapText, getMapConsole};
}



const gameControl = function(htmlMapElement, htmlScoreElement, htmlModal){

    const mapElement = htmlMapElement;
    const scoreElement = htmlScoreElement;
    const modal_wrapper = htmlModal;
    const game = MyMap();
    let myLocation = {x:undefined, y:undefined};
    let score = 0;


    const updateMyLocation = function(curX, curY){
        myLocation.x = curX;
        myLocation.y = curY;
    }

    const initMyLocation = function(mapSize){
        const startPoint = parseInt(mapSize/2);
        updateMyLocation(startPoint, startPoint);
        // 왜 여기는 비구조화 할당이 안 되냐
        game.changeState(myLocation.x, myLocation.y);
    }

    const initScore = function(){
        scoreElement.innerText = "SCORE: " + score;
    }

    const updateScore = function(){
        score++;
        scoreElement.innerText = "SCORE: " + score;
    }

    const updateMapText = function(){
        mapElement.innerText = game.getMapText(myLocation);
    }

    const setGame = function(size){
        game.setMap(size);
        initMyLocation(size);
        initScore();
        updateMapText(myLocation);
    }

    const moveStepTo = function(nextX, nextY){
        const isChanged = game.changeState(nextX, nextY);
        if(isChanged){
            updateMyLocation(nextX, nextY);
            updateScore();
            if(game.isDuckLocation(nextX, nextY)){
                modal_wrapper.style.display = 'flex';
            }
        }
        updateMapText(myLocation);
        //console.log(getLocation());
    }

    const up = function(){
        const {x, y} = myLocation;
        moveStepTo(x-1, y);
    }

    const down = function(){
        const {x, y} = myLocation;
        moveStepTo(x+1, y);
    }

    const left = function(){
        const {x, y} = myLocation;
        moveStepTo(x, y-1);
    }

    const right = function(){
        const {x, y} = myLocation;
        moveStepTo(x, y+1);
    }

    const getLocation = function(){
        return myLocation;
    }

    return {setGame, updateMapText, up, down, left, right, getLocation};
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
//makeMapOntoHTML(5);








const map = document.getElementById('map');
const score = document.getElementById('score');
const modal_wrapper = document.querySelector('.modal-wrapper');
const game = gameControl(map, score, modal_wrapper);
game.setGame(7);

const button_up = document.getElementById('button_up');
const button_left = document.getElementById('button_left');
const button_right = document.getElementById('button_right');
const button_down = document.getElementById('button_down');

const button_close = document.getElementById('close');

button_up.onclick = () => {
    game.up();
}

button_left.onclick = () => {
    game.left();
}

button_right.onclick = () => {
    game.right();
}

button_down.onclick = () => {
    game.down();
}

button_close.onclick = () => {
    modal_wrapper.style.display = 'none';
    document.location.reload();
}