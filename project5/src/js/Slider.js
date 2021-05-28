/* Slider.js: slider를 움직여 날짜별 검색 */

export class Slider{
    constructor(dateList, callback){
        this.dateList = dateList;
        this.scale = this.dateList.length;

        this.$slider = this.makeSlider();
        this.$board = this.makeDateBoard();
        this.$play = this.makePlayButton();
        this.$stop = this.makeStopButton();
        this.appendSlider();
        this.appendPlayer();
        this.setAction(callback);
    }

    makeSlider(){
        const $input = document.createElement('input');
        $input.type = "range";
        $input.min = "0";
        $input.max = this.scale-1;
        $input.value = this.scale-1;
        $input.classList.add("slider");
        return $input;
    }

    makeDateBoard(){
        const $button = document.createElement('button');
        const dateIndex = this.getSliderValue();
        $button.innerText = "DATE: " + this.dateList[dateIndex];
        $button.classList.add("board");
        return $button;
    }

    makePlayButton(){
        const $button = document.createElement('button');
        $button.innerText = "PLAY";
        $button.classList.add("button");
        return $button;
    }

    makeStopButton(){
        const $button = document.createElement('button');
        $button.innerText = "STOP";
        $button.classList.add("button");
        return $button;
    }

    setDateBoard(dateIndex){
        const date = this.dateList[dateIndex];
        this.$board.innerText = "DATE: " + date;
        return date;
    }

    appendSlider(){
        const $div = document.getElementsByClassName("slider-container")[0];
        $div.appendChild(this.$slider);
    }

    appendPlayer(){
        const $div = document.getElementsByClassName("player-container")[0];
        $div.appendChild(this.$play);
        $div.appendChild(this.$stop);
        //$div.appendChild(this.$board);
    }

    setSliderValue(value){
        this.$slider.value = value;
    }

    getSliderValue(){
        return this.$slider.value;
    }

    clearAllTimeout(){
        window.setTimeout(() => {console.log('Timeout');}, 500);
        let id = window.setTimeout(() => {}, 0);
        while (id) {
            window.clearTimeout(id);
            id--;
        }
    }

    setAction(callback){
        this.$slider.oninput = () => {
            const dateIndex = this.getSliderValue();
            const date = this.setDateBoard(dateIndex);
            callback(date);
        }

        this.$play.onclick = () => {
            this.clearAllTimeout();
            for(let i=0; i<this.scale; i++){
                setTimeout(() => {
                    this.setSliderValue(i);
                    const date = this.setDateBoard(i);
                    callback(date);
                }, 10 * i)
            }
        }

        this.$stop.onclick = () => {
            this.clearAllTimeout();
        }
    }
}