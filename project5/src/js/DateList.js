/* DateList.js: Date를 저장 */

export class DateList{
    constructor(){
        this.dates = [];
    }

    updateDate(date){
        if(!this.dates.includes(date)){
            this.dates.push(date);
        }
    }

    getDates(){
        return this.dates.sort();
    }

    getOldestDate(){
        this.dates.sort();
        return this.dates[0];
    }

    getLatestDate(){
        this.dates.sort();
        const len = this.dates.length;
        return this.dates[len - 1];
    }

    getList(){
        this.dates.sort();
        return this.dates;
    }
}


/*

updateOLDate(date){
        if(date < this.oldestDay){
            this.oldestDay = date;
        }
        if(date > this.latestDay){
            this.latestDay = date;
        }
    }

    parseDate(date){
        const d = date.split('-');
        return d.map(x => parseInt(x));
    }

    getDday(date){
        const [Y, M, D] = this.parseDate(date);
        let Dday = (Y - this.standardYear) * 365 + parseInt((Y - this.standardYear + 3) / 4);
        for(let i=1; i<M; i++){
            if((i == 2) && (Y % 4 == 0)){
                Dday += 29;
            } else{
                Dday += this.months[i];
            }
        }
        Dday += (D - 1);
        return Dday;
    }
*/