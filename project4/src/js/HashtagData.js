class Hashtag{
    constructor(name, order){
        this.name = name;
        this.order = order;
        this.selected = false;
    }

    getOrder(order){
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
    list = null

    constructor(list){
        this.list = {};
        for(let i=0; i<list.length; i++){
            const hashtagName = value[i];
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

    getHashtagList(){
        this.list.sort(this.sortBySelected(a, b));
        const hashtagList = [];
        for(let hashtagName in this.list){
            const hashtag = this.list[hashtagName];
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

class HashtagData{
    data = null;
    observers = [];

    constructor(hashtagList){
        this.data = {};
        for(let typeValue of hashtagList){
            this.addNewData(typeValue);
        }
    }

    addNewData({type, value}){
        this.data[type] = this.makeNewHashtagList(value);
    }

    makeNewHashtagList(value){
        return new HashtagList(value);
    }

    setSelected(type, value){
        const hashtag = this.data[type].getHashtag(value);
        hashtag.setSelected(value);
        this.notifyingObservers(type, value, hashtag.getSelected());
    }

    getHashtagList(){
        const selectedHashtag = {};
        for(let type in this.data){
            selectedHashtag[type] = this.data[type].getHashtagList();
        }
        return selectedHashtag;
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

    notifyingObservers(type, value, selected){
        for(let observer of this.observers){
            observer.update(type, value, selected);
        }
    }
}