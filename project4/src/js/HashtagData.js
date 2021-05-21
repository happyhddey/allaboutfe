class Hashtag{
    constructor(name, order){
        this.name = name;
        this.order = order;
        this.selected = false;
    }

    getOrder(){
        return this.order;
    }

    setSelected(){
        this.selected = !this.selected;
    }

    getName(){
        return this.name;
    }

    getSelected(){
        return this.selected;
    }
}

class HahstagList{

    constructor(list){
        this.list = {};
        for(let i=0; i<list.length; i++){
            const hashtagName = list[i];
            this.list[hashtagName] = new Hashtag(hashtagName, i);
        }
    }

    setSelected(hashtagName){
        this.list[hashtagName].setSelected();
    }

    getHashtag(hashtagName){
        return this.list[hashtagName];
    }

    sortBySelected(a, b){
        if(a.getSelected() === b.getSelected()){
            if(a.getOrder() < b.getOrder()){
                return -1;
            } else if(a.getOrder() > b.getOrder()){
                return 1;
            } else{
                return 0;
            }
        } else{
            if(a.getSelected()){
                return -1;
            } else{
                return 1;
            }
        }
    }

    getAllHashtagList(){
        const list = [];
        for(let temp in this.list){
            list.push(this.list[temp]);
        }
        list.sort((a, b) => {
            return this.sortBySelected(a, b);
        });
        const hashtagList = [];
        for(let hashtag of list){
            hashtagList.push({
                name : hashtag.getName(),
                order : hashtag.getOrder(),
            });
        }
        return hashtagList;
    }

    getSelectedHashtagList(){
        const selectedHashtag = [];
        for(let hashtagName of this.list){
            const hashtag = this.list[hashtagName];
            if(hashtag.getSelected()){
                selectedHashtag.push(hashtag.getName());
            }
        }
        return selectedHashtag;
    }
}



/*
input = [
    {
        type : genre,
        value : [action, adventure, ...]
    },
    {
        type : genre,
        value : [action, adventure, ...]
    }
]

해당 input을 객체에 저장
저장할 때 prop = type, value = hashtagList(value)

HashtagData.data = {
    type : hashtagList(value),
    genre : hashtagList([action, adventure, ...])
    occupation : hashtagList([educator, teacher, ...])
}
*/

export class HashtagData{

    constructor(hashtagList){
        this.data = {};
        this.observers = [];

        for(let typeValue in hashtagList){
            this.addNewData(hashtagList[typeValue]);
        }
    }

    addNewData({type, value}){
        this.data[type] = this.makeNewHashtagList(value);
    }

    makeNewHashtagList(value){
        const a = new HahstagList(value);
        return a;
    }

    setSelected(type, value){
        const hashtag = this.data[type].getHashtag(value);
        hashtag.setSelected(value);
        this.notifyingObservers(type, value);
    }

    getAllHashtagList(){
        const hashtag = {};
        for(let type in this.data){
            hashtag[type] = this.data[type].getAllHashtagList();
        }
        return hashtag;
    }

    getSelectedHashtagList(){
        const selectedHashtag = {};
        for(let type in this.data){
            selectedHashtag[type] = this.data[type].getSelectedHashtagList();
        }
        return selectedHashtag;
    }

    registerObserver(observer){
        this.observers.push(observer);
    }

    notifyingObservers(type, value){
        for(let observer of this.observers){
            observer.update(type, value);
        }
    }
}