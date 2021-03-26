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

    this.computeNewLocation = function(){

    }

    this.checkRange = function(){

    }

    this.moveDuck = function(){

    }

    this.isSameLocation = function(){
        const {duckX, duckY} = this.duckLocation;
        const {curX, curY} = this.curLocation;
        if((duckX === curX) && (duckY == curY)){
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