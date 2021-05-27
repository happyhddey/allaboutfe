/* ConfirmedCaseLevel.js: 확진자 수에 따라 level을 정함 */

export class ConfirmedCaseLevel{
    constructor(){
        this.numLevel = 8;
        // unit: k
        this.scale = [0, 50, 100, 200, 500, 1000, 2000, 5000, 100000];
        this.highest = -1;
    }

    updateScale(numConfirmedCase){
        if(numConfirmedCase > this.highest){
            this.highest = numConfirmedCase;
        }
    }

    getLevel(numConfirmedCase){
        let level = 0;
        for(let i=1; i<=this.numLevel; i++){
            if(numConfirmedCase <= this.scale[i] * 1000){
                level = i;
                break;
            }
        }
        return level;
    }

    getDefaultLevel(){
        return this.numLevel + 1;
    }

    getLevelList(){
        const list = [];
        for(let i=0; i<this.numLevel; i++){
            list.push(this.scale[i]);
        }
        return list;
    }
}