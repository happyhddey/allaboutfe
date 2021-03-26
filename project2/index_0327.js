/* Model: DuckTravelModel */

const DuckTravelModel = function(size = 7){
    this.mapSize = size;
    this.duckMap = [];
    this.duckLocation = {duckX:0, duckY:0};
    this.curLocation = {curX:0, curY:0};
    this.currentTime = 0;

    this.initDuckLocation = function(){

    }

    this.initCurLocation = function(){

    }

    this.setDuckMap = function(){

    }

    this.setCurLocation = function(){

    }

    this.setCurrentTime = function(){

    }

    this.getDuckMap = function(){

    }

    this.getDuckLocation = function(){

    }
    
    this.getCurLocation = function(){

    }

    this.getCurrentTime = function(){

    }

    this.getNewLocation = function(direction){
        const moveOn ={
            "up": (x, y) => {return {"newX":x-1, "newY":y}},
            "down": (x, y) => {return {"newX":x+1, "newY":y}},
            "left": (x, y) => {return {"newX":x, "newY":y-1}},
            "right": (x, y) => {return {"newX":x, "newY":y+1}}
        }
        const move = moveOn[direction];
        const {curX, curY} = this.curLocation();
        return move(curX, curY);
    }

    this.checkRange = function(){

    }

    this.moveDuck = function(direction){
        const {newX, newY} = this.getNewLocation(direction);
        this.setCurLocation({"curX":newX, "curY":newY});
    }

    this.isSameLocation = function(){
        const {duckX, duckY} = this.getDuckLocation();
        const {curX, curY} = this.getCurLocation();
        if((duckX === curX) && (duckY == curY)){
            // TODO: Add nofitying function
            return true;
        }
        else{
            return false;
        }
    }
}



/* Controller: ModelViewIntermediator */

const ModelViewIntermediator = function(size = 7){

    this.duckTravel = new DuckTravelModel(size);

    this.initMapView = function(){

    }

    this.drawScore = function(){

    }

    this.drawMap = function(){

    }

    this.setDirectionButtonAction = function(){
        const directions = ['up', 'down', 'left', 'right'];
        for (let direction of directions){
            const button = document.getElementById('button_' + direction);
            button.onclick = () => {
                this.duckTravel.moveDuck(direction);
            }
        }
    }

    this.popSuccessModal = function(){
        const modalWrapper = document.querySelector('.modal_wrapper');
        modalWrapper.style.directions = 'flex';
    }

    this.closeButtonAction = function(){
        const buttonClose = document.getElementsById('close');
        buttonClose.onclick = () => {
            // const modalWrapper = document.querySelector('.modal_wrapper');
            // modalWrapper.style.directions = 'none';
            document.location.reload();
        }
    }
}