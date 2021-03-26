/* Model: DuckTravelModel */

const DuckTravelModel = function(size = 7){
    this.mapSize = size;
    this.duckMap = [];
    this.duckLocation = {x:0, y:0};
    this.curLocation = {x:0, y:0};
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

    }
}



/* Controller: ModelViewIntermediator */

const ModelViewIntermediator = function(){
    this.duckMap = [];

    this.initMapView = function(){

    }

    this.drawScore = function(){

    }

    this.drawMap = function(){

    }

    this.directionButtonAction = function(){

    }

    this.popSuccessModal = function(){

    }

    this.closeButtonAction = function(){

    }
}